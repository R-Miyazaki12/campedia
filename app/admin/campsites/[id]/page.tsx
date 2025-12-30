import { prisma } from '../../../lib/db';
import EditCampsiteForm from './EditCampsiteForm';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditCampsitePage({ params }: PageProps) {
    const { id } = await params;
    const site = await prisma.campsite.findUnique({ where: { id } });

    if (!site) return <div>見つかりませんでした。</div>;

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>編集: {site.name}</h2>
            <EditCampsiteForm site={site} />
        </div>
    );
}
