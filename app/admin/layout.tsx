import Link from 'next/link';

export const metadata = {
    title: 'Campedia 管理画面',
    robots: 'noindex, nofollow',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <header style={{ background: '#333', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Campedia 管理画面</h1>
                <Link href="/" style={{ fontSize: '0.9rem', color: '#ccc' }}>表側サイトを見る</Link>
            </header>
            <div style={{ display: 'flex', flex: 1 }}>
                <aside style={{ width: '250px', background: '#f5f5f5', padding: '1rem', borderRight: '1px solid #ddd' }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Link href="/admin" style={{ padding: '8px', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>ダッシュボード</Link>
                        <Link href="/admin/reviews" style={{ padding: '8px', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>口コミ承認・管理</Link>
                        <Link href="/admin/campsites" style={{ padding: '8px', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>キャンプ場編集</Link>
                    </nav>
                </aside>
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
