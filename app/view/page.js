"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ViewPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const url = searchParams.get('url');

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [counts, setCounts] = useState({ rec: 0, com: 0 });

    useEffect(() => {
        // Randomize counts once on mount
        const rec = Math.floor(Math.random() * (200 - 30 + 1)) + 30;
        const com = Math.floor(rec * 0.7);
        setCounts({ rec, com });

        if (!url) return;

        const fetchData = async () => {
            try {
                const response = await fetch('/api/scrape', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || '오류가 발생했습니다.');
                }

                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (!url) {
        return (
            <div className="mobile-container p-6 text-center">
                <p className="text-red-400">잘못된 접근입니다.</p>
                <Link href="/" className="mt-4 inline-block text-blue-400 underline">홈으로 돌아가기</Link>
            </div>
        );
    }

    return (
        <div className="mobile-view-wrapper">
            {/* Mobile Header */}
            <header className="mobile-header">
                <button onClick={() => router.push('/')} className="back-btn">
                    ← 뒤로
                </button>
                <h1 className="header-title">펨코가 창피해?</h1>
                <div className="w-8"></div> {/* Spacer for centering */}
            </header>

            {/* Main Content */}
            <main className="mobile-container pt-16 pb-8 px-4">
                {loading && (
                    <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                        <div className="spinner"></div>
                        <p className="text-gray-400">게시글을 불러오는 중...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-10 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-center">
                        <p className="font-bold mb-2">오류 발생</p>
                        <p>{error}</p>
                        <button onClick={() => router.push('/')} className="mt-4 px-4 py-2 bg-red-500/20 rounded hover:bg-red-500/30 transition">
                            다시 검색하기
                        </button>
                    </div>
                )}

                {data && (
                    <article className="post-container">
                        <h2 className="post-title">{data.title}</h2>
                        <div className="post-meta">
                            <span>익명의 게시자</span>
                            <span className="dot">·</span>
                            <span>{data.date || '날짜 정보 없음'}</span>
                            <span className="dot">·</span>
                            <span className="text-blue-400">추천 {counts.rec}</span>
                            <span className="dot">·</span>
                            <span className="text-gray-400">댓글 {counts.com}</span>
                        </div>

                        <div className="divider"></div>

                        <div
                            className="post-content scraped-content"
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />

                        {/* Recommendation Button */}
                        <div className="recommendation-area">
                            <button className="recommendation-btn">
                                <span className="rec-icon">👍</span>
                                <span className="rec-count">{counts.rec}</span>
                            </button>
                        </div>

                        <div className="divider"></div>

                        {/* Best Comments Section */}
                        {data.comments && data.comments.length > 0 && (
                            <section className="best-comments-area">
                                <h3 className="section-title">베스트 댓글</h3>
                                <div className="comment-list">
                                    {organizeComments(data.comments).map((comment, index) => (
                                        <CommentItem key={index} comment={comment} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </article>
                )}
            </main>
        </div>
    );
}

// Helper function to organize comments into a hierarchy
function organizeComments(comments) {
    // 1. Create Nodes with unique IDs (using index)
    const nodes = comments.map((comment, index) => ({
        ...comment,
        id: `comment-${index}`,
        children: []
    }));

    const roots = [];

    // 2. Build Author Lookup (AuthorName -> Array of Nodes)
    // Since multiple comments can have same author, we store them in a list
    const authorLookup = new Map();
    nodes.forEach(node => {
        if (!authorLookup.has(node.author)) {
            authorLookup.set(node.author, []);
        }
        authorLookup.get(node.author).push(node);
    });

    // 3. Build Tree
    nodes.forEach(node => {
        let parentFound = false;

        // Check for mentions to find parent
        // We look for "@AuthorName" in the content
        // We iterate over known authors to see if any are mentioned
        for (const [authorName, potentialParents] of authorLookup.entries()) {
            if (authorName === node.author) continue; // Skip self-mention (optional rule)

            if (node.content.includes(`@${authorName}`)) {
                // Found a mention!
                // Attach to the *first* comment by that author (or logic could be improved to find 'closest')
                // For now, attaching to the first one found handles the hierarchy reasonably well for Best Comments
                const parentNode = potentialParents[0];

                if (parentNode) {
                    parentNode.children.push(node);
                    parentFound = true;
                    break; // Stop after finding first valid parent reference
                }
            }
        }

        if (!parentFound) {
            roots.push(node);
        }
    });

    return roots;
}

function ReplyArrow() {
    return (
        <div className="mr-2 flex-shrink-0 flex flex-col items-end" style={{ width: '1.5rem' }}>
            <svg width="1.5rem" height="2.5rem" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                <path d="M12 0 V15 C12 25 24 25 24 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
        </div>
    );
}

function CommentItem({ comment, isChild = false }) {
    return (
        <div className="w-full flex flex-col mt-3.5">
            <div className="flex items-start">

                {isChild && <ReplyArrow />}

                <div className={`comment-item flex-1 ${isChild ? 'bg-gray-100' : ''}`} style={{ minWidth: 0 }}>
                    <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-time">{comment.date}</span>
                        <span className="comment-vote">👍 {comment.voteCount}</span>
                    </div>
                    <div
                        className="comment-body"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                </div>
            </div>

            {/* Render Children (Recursive) */}
            {comment.children && comment.children.length > 0 && (
                <div className="pl-0 w-full">
                    {comment.children.map((child, idx) => (
                        <div key={idx} className="w-full"> {/* Indent removed as requested */}
                            <CommentItem comment={child} isChild={true} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

