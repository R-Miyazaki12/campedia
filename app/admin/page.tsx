import Link from 'next/link';
import { prisma } from '../lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const pendingReviewsCount = await prisma.review.count({
        where: { isApproved: false }
    });

    const campsiteCount = await prisma.campsite.count();

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>ダッシュボード</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#666' }}>承認待ちの口コミ</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{pendingReviewsCount}件</p>
                    <Link href="/admin/reviews" style={{ marginTop: '10px', display: 'inline-block', fontSize: '0.9rem', color: '#0070f3' }}>確認する &rarr;</Link>
                </div>

                <div style={{ padding: '20px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#666' }}>掲載中のキャンプ場</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>{campsiteCount}件</p>
                    <Link href="/admin/campsites" style={{ marginTop: '10px', display: 'inline-block', fontSize: '0.9rem', color: '#0070f3' }}>管理画面へ &rarr;</Link>
                </div>
            </div>
        </div>
    );
}
