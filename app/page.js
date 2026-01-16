"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [url, setUrl] = useState('');
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        // Redirect to the View page
        router.push(`/view?url=${encodeURIComponent(url)}`);
    };

    return (
        <main className="container">
            <div className="card">
                <h1>펨코가 창피해?</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="게시글 URL을 입력하세요 (예: https://www.fmkorea.com/123...)"
                            autoComplete="off"
                        />
                    </div>

                    <button type="submit" disabled={!url.trim()}>
                        제목 찾아오기
                    </button>
                </form>
            </div>
        </main>
    );
}
