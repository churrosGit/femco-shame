import "./globals.css";

export const metadata = {
    title: "펨코가 창피해?",
    description: "에펨코리아 게시글 제목 추출기",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
