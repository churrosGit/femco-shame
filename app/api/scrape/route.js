import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ success: false, error: 'URL을 입력해주세요.' }, { status: 400 });
        }

        // 1. Validate URL format
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch (e) {
            return NextResponse.json({ success: false, error: '유효하지 않은 URL 형식입니다.' }, { status: 400 });
        }

        // 2. Validate FMKorea Domain
        if (!parsedUrl.hostname.includes('fmkorea.com')) {
            return NextResponse.json({ success: false, error: '에펨코리아 주소가 아닙니다.' }, { status: 400 });
        }

        // 3. Validate Post (simplistic check for document_srl or number)
        // Common patterns: https://www.fmkorea.com/12345678 or https://www.fmkorea.com/index.php?document_srl=1234567
        const isPost = /\/\d+/.test(parsedUrl.pathname) || parsedUrl.searchParams.has('document_srl');

        // Additional check: exclude purely list pages if possible. 
        // However, fmkorea often uses purely numeric paths for posts. 
        // If it's just 'fmkorea.com/best', that's not a post.
        if (!isPost && parsedUrl.pathname.length < 2) {
            return NextResponse.json({ success: false, error: '게시글이 아닌 것 같습니다. (메인/목록 페이지)' }, { status: 400 });
        }

        // Fetch and Scrape
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            return NextResponse.json({ success: false, error: '사이트에 접속할 수 없습니다.' }, { status: 500 });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Try to find the title. 
        // Strategy 1: The standard content header title
        // Strategy 2: The meta title (often has " - 에펨코리아" appended)
        let title = $('.np_18px').first().text().trim(); // Common class for titles in some skins

        if (!title) {
            // Fallback to <title> tag and clean it up
            const metaTitle = $('title').text().trim();
            // Remove trailing " - 에펨코리아" or similar if present
            title = metaTitle.replace(/ - 에펨코리아.*$/, '');
        }

        // NEW: Scrape content
        // .rd_body is the main content container in XE (FMKorea's engine)
        const $content = $('.rd_body').first();

        // REMOVE UNWANTED ELEMENTS
        // 1. Remove 'Copy URL' button box (Find buttons with text '복사' and remove parent)
        $content.find('button').filter((_, el) => $(el).text().trim() === '복사').parent().remove();

        // 2. Remove Source Link (Find links containing 'fmkorea.com')
        $content.find('a').filter((_, el) => $(el).text().includes('fmkorea.com')).remove();

        let content = $content.html();

        // SCRAPE DATE
        // FMKorea usually has date in .date or .time class, inside .top_area or similar
        // Try multiple selectors
        let date = $('.date').first().text().trim() ||
            $('.time').first().text().trim() ||
            $('.regdate').first().text().trim(); // Common XE classes

        // SCRAPE BEST COMMENTS
        let comments = [];

        // Random Nickname Generators
        const adjectives = [
            '행복한', '슬픈', '화난', '신난', '피곤한',
            '배고픈', '춤추는', '노래하는', '달리는', '잠자는',
            '용감한', '웃고있는', '울고있는', '멍때리는', '여행하는'
        ];

        const animals = [
            '코끼리', '강아지', '고양이', '호랑이', '사자',
            '펭귄', '판다', '토끼', '거북이', '독수리',
            '부엉이', '곰', '여우', '원숭이', '캥거루'
        ];

        // 1. Selector Refinement to avoid duplicates
        // FMKorea usually puts Best Comments in a separate container at the top.
        // We trigger only the first container or use a specific ID if possible.
        // However, simple deduplication by author+date might be safer if structures vary.
        // Let's use a Map to handle deduplication AND author mapping.

        const authorMap = new Map(); // OriginalNick -> RandomNick
        const uniqueComments = []; // To store unique comment elements/data

        // Iterate all found best comments, but filter duplicates
        const debugLogs = [];

        $('.fdb_lst_ul .comment_best').each((i, el) => {
            const $el = $(el);

            // Extract Original Author for mapping
            // CRITICAL FIX: Use specific class selector and .first() to avoid joining multiple links (like 'Reply')
            let originalAuthor = $el.find('.meta a[class*="member_"]').first().text().trim() ||
                $el.find('.meta a.author').first().text().trim() ||
                $el.find('.meta a').first().text().trim();

            // Just in case, if empty, ignore mapping for this one (or set default)

            // Check for duplicates (using content + date as a simplistic hash)
            const contentHtml = $el.find('.comment-content').html();
            const date = $el.find('.date').text().trim();
            const uniqueKey = date + '||' + originalAuthor + '||' + $el.find('.comment-content').text().substring(0, 20);

            // If we already processed this comment, skip it (Fixes duplication bug)
            if (uniqueComments.some(c => c.uniqueKey === uniqueKey)) return;

            // Generate Random Nickname
            let randomNickname;

            if (originalAuthor && authorMap.has(originalAuthor)) {
                // REUSE existing nickname if author is already known
                randomNickname = authorMap.get(originalAuthor);
            } else {
                // GENERATE NEW nickname if first time seeing this author
                const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
                const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
                randomNickname = `${randomAdjective} ${randomAnimal}`;

                if (originalAuthor) {
                    authorMap.set(originalAuthor, randomNickname);
                }
            }

            debugLogs.push(`[DEBUG] Push ${i}: contentHtml prefix=${contentHtml ? contentHtml.substring(0, 20) : 'null'}`);

            uniqueComments.push({
                uniqueKey,
                originalAuthor,
                randomNickname,
                contentHtml,
                date
            });
        });

        const totalBestComments = uniqueComments.length;

        // Generate random vote counts, sorted descending (High -> Low)
        const randomVotes = Array.from({ length: totalBestComments }, () => Math.floor(Math.random() * (50 - 11 + 1)) + 11)
            .sort((a, b) => b - a);

        // Process Unique Comments
        uniqueComments.forEach((item, i) => {
            let { contentHtml, randomNickname, date } = item;
            debugLogs.push(`[DEBUG] Pass 2 Processing: ${i}, Nick: ${randomNickname}, ContentStart: ${contentHtml ? contentHtml.substring(0, 30) : 'null'}`);

            // Pass 2: Mention Handling in Content
            // Load content into a temporary Cheerio instance for manipulation
            const $temp = cheerio.load(contentHtml || '', null, false); // null, false for fragment

            // ... (omitted similar logic)
            // Note: I am not replacing the inner logic since it is long, but I need to make sure I don't break it.
            // Wait, I am replacing lines 108 to 226 almost entirely?
            // The instruction is to replace to add logs.

            // Re-using inner logic:
            $temp('a').each((_, link) => {
                const $link = $temp(link);
                const href = $link.attr('href') || '';
                const text = $link.text().trim();
                const isExternal = href.startsWith('http') && !href.includes('fmkorea');
                const isMemberLink = href.includes('member_') || ($link.attr('class') || '').includes('member_') || ($link.attr('onclick') || '').includes('popup');
                if (isMemberLink || !isExternal) {
                    if (authorMap.has(text)) {
                        const mappedNick = authorMap.get(text);
                        $link.replaceWith(`<span class="mention-replaced" style="color: #818cf8; font-weight: bold;">@${mappedNick}</span>`);
                    } else {
                        if (text.length < 30) {
                            $link.remove();
                        }
                    }
                }
            });

            // Update contentHtml with processed content
            contentHtml = $temp.html();

            // Assign sorted vote count
            const voteCount = randomVotes[i];

            comments.push({
                author: randomNickname,
                content: contentHtml,
                date: date,
                voteCount: voteCount
            });
        });

        if (!title) {
            return NextResponse.json({ success: false, error: '제목을 찾을 수 없습니다. 게시글이 맞나요?' }, { status: 404 });
        }

        return NextResponse.json({ success: true, title, content, date, comments, debugLogs });

    } catch (error) {
        console.error('Scraping error:', error);
        return NextResponse.json({ success: false, error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
    }
}
