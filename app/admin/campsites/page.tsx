import Link from 'next/link';
import { prisma } from '../../lib/db';
import { createCampsite } from '../../actions/campsiteActions';

export const dynamic = 'force-dynamic';

export default async function CampsiteAdminList() {
    const sites = await prisma.campsite.findMany({
        orderBy: { isPublic: 'asc' } // Drafts first
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>キャンプ場一覧</h2>

                <form action={createCampsite}>
                    <button
                        name="name"
                        value="新規キャンプ場"
                        type="submit"
                        style={{ background: '#2E7D32', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        ＋ 新規作成
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
                {sites.map(site => (
                    <div key={site.id} style={{ padding: '15px', background: site.isPublic ? '#fff' : '#fff3e0', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{site.name}</span>
                                {!site.isPublic && <span style={{ background: '#ffa000', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>下書き / 申請中</span>}
                                {site.isPublic && <span style={{ background: '#4caf50', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>公開中</span>}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>{site.address || '住所未設定'}</div>
                        </div>
                        <Link
                            href={`/admin/campsites/${site.id}`}
                            style={{ background: '#0070f3', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem' }}
                        >
                            編集
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
