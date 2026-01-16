"use client";

import Link from 'next/link';

export default function DesignLab() {
    return (
        <div className="mobile-view-wrapper">
            <header className="mobile-header">
                <button onClick={() => window.history.back()} className="back-btn">
                    ← 뒤로
                </button>
                <h1 className="header-title">닉네임 10가지 아이디어</h1>
                <div className="w-8"></div>
            </header>

            <main className="mobile-container pt-16 pb-8 px-4 space-y-8">

                {/* 1. Neon Glow */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">1. 글로우 효과 (Neon Glow)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{ color: '#fff', textShadow: '0 0 8px rgba(96, 165, 250, 0.8)' }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem]">
                                어두운 배경에서 은은하게 빛나는 네온 효과입니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Colored Underline */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">2. 형광 밑줄 (Highlight Underline)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{
                                    background: 'linear-gradient(rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.4))',
                                    backgroundSize: '100% 40%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '0 90%'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem]">
                                형광펜으로 밑줄을 그은 듯한 하이라이트 효과입니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Dotted Border */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">3. 점선 테두리 (Dotted Border)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{
                                    border: '1px dotted #60a5fa',
                                    borderRadius: '6px',
                                    padding: '2px 8px',
                                    color: '#60a5fa'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem] mt-1">
                                얇은 점선으로 감싸 가벼운 명찰 같은 느낌을 줍니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Left Bullet Point */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">4. 왼쪽 불렛 (Left Bullet)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header flex items-center">
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#60a5fa', marginRight: '8px' }}></div>
                                <span className="comment-author text-[1.0rem]">행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem]">
                                닉네임 앞에 작은 점을 찍어 시선을 유도합니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Italic Emphasis */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">5. 이탤릭 강조 (Italic)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.1rem]" style={{
                                    fontStyle: 'italic',
                                    fontFamily: 'serif',
                                    color: '#93c5fd'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem]">
                                폰트 스타일을 이탤릭으로 변경하여 우아하게 구분합니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Wide Spacing */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">6. 자간 확장 (Wide Spacing)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: '#fff',
                                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                                    paddingBottom: '2px'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem]">
                                글자 간격을 넓혀 타이틀 같은 느낌을 줍니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Monospace Font */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">7. 모노스페이스 (Code Font)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{
                                    fontFamily: 'monospace, Consolas, Monaco',
                                    color: '#bfdbfe',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    padding: '2px 6px',
                                    borderRadius: '4px'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem] mt-1">
                                코딩 폰트를 사용하여 기계적이고 독특한 느낌을 줍니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Inverse Badge */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">8. 역상 배지 (High Contrast)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{
                                    backgroundColor: '#cbd5e1',
                                    color: '#0f172a',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontWeight: '800'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem] mt-1">
                                밝은 배경에 어두운 글씨로 가장 강력하게 강조합니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. Gradient Border Bottom */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">9. 그라데이션 라인 (Gradient Line)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{
                                    borderBottom: '2px solid transparent',
                                    borderImage: 'linear-gradient(to right, #60a5fa, #a78bfa) 1'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem]">
                                하단에 그라데이션 라인을 추가하여 세련됨을 더합니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. Subtle Gradient BG */}
                <section>
                    <h2 className="text-gray-400 mb-2 text-sm font-bold uppercase tracking-wider">10. 은은한 배경 (Subtle Gradient)</h2>
                    <div className="card text-left p-4">
                        <div className="comment-item w-full flex flex-col">
                            <div className="comment-header">
                                <span className="comment-author text-[1.0rem]" style={{
                                    background: 'linear-gradient(90deg, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 100%)',
                                    padding: '2px 12px 2px 8px',
                                    borderRadius: '4px',
                                    color: '#60a5fa'
                                }}>행복한 강아지</span>
                                <span className="comment-time text-[0.9rem]">10분 전</span>
                                <span className="comment-vote text-[1.0rem]">👍 50</span>
                            </div>
                            <div className="comment-body text-[1.0rem] mt-1">
                                배경이 자연스럽게 사라지는 그라데이션 효과입니다.
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
