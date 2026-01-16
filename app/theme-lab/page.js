"use client";

// Helper component to replicate exact structure of CommentItem but with dynamic styles
function ThemeCard({ title, styles, description }) {
    // Determine if child background applies (simulating a reply)
    // For this demo, we'll keep it simple as root comment look

    return (
        <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', color: '#666', marginBottom: '10px', fontWeight: 'bold' }}>{title}</h2>

            {/* Replicating structure from app/view/page.js: CommentItem */}
            <div className="w-full flex flex-col mt-3.5">
                <div className="flex items-start">
                    {/* .comment-item */}
                    <div className="flex-1" style={{
                        // Base layout styles from globals.css
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        border: '1px solid',
                        minWidth: 0,
                        // Dynamic styles
                        backgroundColor: styles.cardBg,
                        borderColor: styles.cardBorder,
                        boxShadow: styles.boxShadow || 'none'
                    }}>
                        <div className="comment-header" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            {/* .comment-author */}
                            <span style={{
                                fontWeight: '700',
                                fontSize: '1.0rem',
                                color: styles.authorColor,
                                backgroundColor: styles.authorBg,
                                padding: styles.authorPadding,
                                borderRadius: styles.authorRadius,
                                border: styles.authorBorder
                            }}>행복한 강아지</span>

                            {/* .comment-time */}
                            <span style={{
                                color: styles.timeColor,
                                fontSize: '0.9rem'
                            }}>10분 전</span>

                            {/* .comment-vote */}
                            <span style={{
                                marginLeft: 'auto',
                                fontWeight: '600',
                                fontSize: '1.0rem',
                                color: styles.voteColor
                            }}>👍 50</span>
                        </div>

                        {/* .comment-body */}
                        <div style={{
                            lineHeight: '1.5',
                            fontSize: '1.0rem',
                            color: styles.bodyColor
                        }}>
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ThemeLab() {
    const GREEN = "#03c75a"; // Naver Green
    const LIGHT_BG = "#f5f6f8";

    return (
        <div style={{
            backgroundColor: LIGHT_BG,
            minHeight: '100vh',
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 9999,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif'
        }}>
            <header style={{
                backgroundColor: '#fff',
                height: '50px',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1rem',
                position: 'sticky',
                top: 0
            }}>
                <button onClick={() => window.history.back()} style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1rem',
                    color: '#333',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    ← 뒤로
                </button>
                <h1 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginLeft: '1rem', color: '#000' }}>
                    10가지 색상 테마 (레이아웃 고정)
                </h1>
            </header>

            <main style={{ maxWidth: '600px', margin: '0 auto', padding: '20px 16px' }}>

                <ThemeCard
                    title="1. 기본 화이트 (Basic White)"
                    description="가장 깔끔한 기본형입니다. 흰 배경에 연한 회색 테두리, 초록색 포인트."
                    styles={{
                        cardBg: '#ffffff',
                        cardBorder: '#e5e7eb',
                        authorColor: '#000000',
                        timeColor: '#9ca3af',
                        voteColor: GREEN,
                        bodyColor: '#374151'
                    }}
                />

                <ThemeCard
                    title="2. 소프트 그린 (Soft Green)"
                    description="카드 배경에 아주 연한 초록빛을 넣어 편안함을 줍니다."
                    styles={{
                        cardBg: '#f0fdf4', // green-50
                        cardBorder: '#dcfce7', // green-100
                        authorColor: '#166534', // green-800
                        timeColor: '#4ade80', // green-400
                        voteColor: '#15803d',
                        bodyColor: '#14532d'
                    }}
                />

                <ThemeCard
                    title="3. 볼드 그린 보더 (Bold Green Border)"
                    description="테두리를 초록색으로 강조하여 카드를 명확하게 구분합니다."
                    styles={{
                        cardBg: '#ffffff',
                        cardBorder: GREEN,
                        authorColor: '#000000',
                        timeColor: '#9ca3af',
                        voteColor: GREEN,
                        bodyColor: '#000000'
                    }}
                />

                <ThemeCard
                    title="4. 다크 그린 헤더 (Dark Green Header Text)"
                    description="닉네임과 주요 텍스트를 짙은 초록색으로 통일했습니다."
                    styles={{
                        cardBg: '#ffffff',
                        cardBorder: '#e5e7eb',
                        authorColor: '#14532d', // Dark green
                        timeColor: '#86efac', // Light green text for time
                        voteColor: '#14532d',
                        bodyColor: '#374151'
                    }}
                />

                <ThemeCard
                    title="5. 그레이 & 그린 (Grey & Green)"
                    description="차분한 회색 톤에 초록색 추천수만 포인트로 남긴 모던한 스타일."
                    styles={{
                        cardBg: '#f9fafb', // gray-50
                        cardBorder: '#f3f4f6', // gray-100
                        authorColor: '#111827',
                        timeColor: '#9ca3af',
                        voteColor: GREEN,
                        bodyColor: '#4b5563'
                    }}
                />

                <ThemeCard
                    title="6. 작성자 하이라이트 (Author Highlight)"
                    description="닉네임에만 연한 초록색 배경을 넣어 강조했습니다."
                    styles={{
                        cardBg: '#ffffff',
                        cardBorder: '#e5e7eb',
                        authorColor: '#15803d',
                        authorBg: '#dcfce7',
                        authorPadding: '2px 8px',
                        authorRadius: '4px',
                        timeColor: '#9ca3af',
                        voteColor: '#15803d',
                        bodyColor: '#374151'
                    }}
                />

                <ThemeCard
                    title="7. 초록 테두리 배지 (Green Border Badge)"
                    description="닉네임에 초록색 테두리 배지를 적용했습니다."
                    styles={{
                        cardBg: '#ffffff',
                        cardBorder: '#e5e7eb',
                        authorColor: GREEN,
                        authorBorder: `1px solid ${GREEN}`,
                        authorPadding: '1px 6px',
                        authorRadius: '12px',
                        timeColor: '#9ca3af',
                        voteColor: GREEN,
                        bodyColor: '#374151'
                    }}
                />

                <ThemeCard
                    title="8. 인버트 그린 (Inverted Green)"
                    description="닉네임 배경을 진한 초록색으로, 글씨를 흰색으로 하여 강력하게 강조."
                    styles={{
                        cardBg: '#ffffff',
                        cardBorder: '#e5e7eb',
                        authorColor: '#ffffff',
                        authorBg: GREEN,
                        authorPadding: '2px 8px',
                        authorRadius: '4px',
                        timeColor: '#9ca3af',
                        voteColor: GREEN,
                        bodyColor: '#374151'
                    }}
                />

                <ThemeCard
                    title="9. 페일 옐로우 (Pale Yellow Mix)"
                    description="네이버 카페의 댓글(대댓글) 배경 느낌을 살짝 섞은 미색 배경."
                    styles={{
                        cardBg: '#fffff0', // Ivory/Pale Yellow
                        cardBorder: '#f0f0e0',
                        authorColor: '#444',
                        timeColor: '#aaa',
                        voteColor: '#d4a017', // Gold-ish
                        bodyColor: '#333'
                    }}
                />

                <ThemeCard
                    title="10. 쉐도우 카드 (Shadow Card)"
                    description="테두리 대신 그림자를 사용하여 입체감을 준 화이트 카드."
                    styles={{
                        cardBg: '#ffffff',
                        cardBorder: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        authorColor: '#000',
                        timeColor: '#bbb',
                        voteColor: GREEN,
                        bodyColor: '#222'
                    }}
                />

            </main>
        </div>
    );
}
