import Link from 'next/link';
import { prisma } from '../../lib/db';

export const dynamic = 'force-dynamic';

export default async function CampsiteAdminList() {
    const sites = await prisma.campsite.findMany();

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>キャンプ場一覧</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
                {sites.map(site => (
                    <div key={site.id} style={{ padding: '15px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{site.name}</div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>{site.address}</div>
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
