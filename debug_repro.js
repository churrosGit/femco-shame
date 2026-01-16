const cheerio = require('cheerio');

// Mock HTML structure mimicking FMKorea Best Comments
const html = `
<ul class="fdb_lst_ul">
    <li class="fdb_itm comment_best">
        <div class="meta">
            <a href="#popup_menu_area" class="member_123456" onclick="return false">호옹이12</a>
            <span class="date">8 시간 전</span>
        </div>
        <div class="comment-content">
            <div class="comment_123456_7890">bufferiy 또 무작정 충 등장했네 영끌족 븅신들</div>
        </div>
    </li>
    <li class="fdb_itm comment_best">
        <div class="meta">
            <a href="#popup_menu_area" class="member_123456" onclick="return false">호옹이12</a>
            <span class="date">8 시간 전</span>
        </div>
        <div class="comment-content">
            <div class="comment_123456_7891">그럴줄 알았다 ㅋㅋㅋ 6월 선거전까지는 절대로 안올림</div>
        </div>
    </li>
    <li class="fdb_itm comment_best">
        <div class="meta">
            <a href="#popup_menu_area" class="member_987654" onclick="return false">씹창용</a>
            <span class="date">8 시간 전</span>
        </div>
        <div class="comment-content">
            <div class="comment_987654_1111">창용씨 미국따라 신나서 내리니깐 좋았지요? ㅋㅋㅋㅋㅋㅋㅋ</div>
        </div>
    </li>
     <li class="fdb_itm comment_best">
        <div class="meta">
            <a href="#popup_menu_area" class="member_123456" onclick="return false">호옹이12</a>
            <span class="date">8 시간 전</span>
        </div>
        <div class="comment-content">
            <div class="comment_123456_7892">
                bufferiy 
                <a href="https://cdn.bosik.kr/news/photo/202510/22695_26813_2511.png">https://cdn.bosik.kr/news/photo/202510/22695_26813_2511.png</a>
                <br>
                못맞춰서 느그 정권부터 차이가 확벌어지는구나 ㅋㅋ
            </div>
        </div>
    </li>
</ul>
`;

const $ = cheerio.load(html);

const authorMap = new Map();
const uniqueComments = [];
const adjectives = ['행복한'];
const animals = ['강아지'];

// LOGIC FROM ROUTE.JS
$('.fdb_lst_ul .comment_best').each((i, el) => {
    const $el = $(el);

    let originalAuthor = $el.find('.meta a[class*="member_"]').first().text().trim();
    const contentHtml = $el.find('.comment-content').html();
    const date = $el.find('.date').text().trim();
    const uniqueKey = date + '||' + originalAuthor + '||' + $el.find('.comment-content').text().substring(0, 20);

    if (uniqueComments.some(c => c.uniqueKey === uniqueKey)) return;

    let randomNickname;
    if (originalAuthor && authorMap.has(originalAuthor)) {
        randomNickname = authorMap.get(originalAuthor);
    } else {
        randomNickname = `행복한 강아지 ${i}`; // Simple mock
        if (originalAuthor) {
            authorMap.set(originalAuthor, randomNickname);
        }
    }

    console.log(`[DEBUG] Push ${i}: Author=${originalAuthor}, ContentPrefix=${contentHtml.substring(0, 20).replace(/\n/g, '')}`);

    uniqueComments.push({
        $el,
        uniqueKey,
        originalAuthor,
        randomNickname,
        contentHtml,
        date
    });
});

console.log('--- Pass 2 ---');
const comments = [];

uniqueComments.forEach((item, i) => {
    let { contentHtml, randomNickname } = item;

    console.log(`[DEBUG] Pass 2 Start ${i}: ${contentHtml.substring(0, 20).replace(/\n/g, '')}`);

    const $temp = cheerio.load(contentHtml || '', null, false);

    // Logic from Pass 2
    $temp('a').each((_, link) => {
        const $link = $temp(link);
        const text = $link.text().trim();
        // Mock author map check
        if (authorMap.has(text)) {
            const mappedNick = authorMap.get(text);
            $link.replaceWith(`@${mappedNick}`);
        }
    });

    contentHtml = $temp.html();

    console.log(`[DEBUG] Pass 2 End ${i}: ${contentHtml.substring(0, 20).replace(/\n/g, '')}`);

    comments.push({
        author: randomNickname,
        content: contentHtml
    });
});

console.log('--- Final Comments ---');
comments.forEach((c, i) => {
    console.log(`${i}: ${c.author} => ${c.content.substring(0, 40).replace(/\n/g, '')}`);
});
