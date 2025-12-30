import { prisma } from '../../lib/db';
import ReviewAdminList from './ReviewAdminList';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    const reviews = await prisma.review.findMany({
        orderBy: { date: 'desc' },
        include: { campsite: true }
    });

    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>口コミ管理</h2>
            <ReviewAdminList reviews={reviews} />
        </div>
    );
}
