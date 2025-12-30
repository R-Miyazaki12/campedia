'use client';

import { approveReview, deleteReview } from '../../actions/reviewActions';
import { useTransition } from 'react';

interface ReviewWithCampsite {
    id: string;
    userName: string;
    content: string;
    ratingTotal: number;
    isApproved: boolean;
    date: Date;
    campsite: { name: string };
}

export default function ReviewAdminList({ reviews }: { reviews: ReviewWithCampsite[] }) {
    const [isPending, startTransition] = useTransition();

    const handleApprove = (id: string) => {
        startTransition(() => approveReview(id));
    };

    const handleDelete = (id: string) => {
        if (!confirm('本当に削除しますか？')) return;
        startTransition(() => deleteReview(id));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {reviews.length === 0 && <p>口コミはありません。</p>}
            {reviews.map(review => (
                <div key={review.id} style={{
                    padding: '15px',
                    background: review.isApproved ? '#e8f5e9' : '#fff3e0',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                                {review.campsite.name} • {review.userName} • {new Date(review.date).toLocaleDateString()}
                            </div>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>評価: {review.ratingTotal}</div>
                            <p style={{ margin: 0 }}>{review.content}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {!review.isApproved && (
                                <button
                                    onClick={() => handleApprove(review.id)}
                                    disabled={isPending}
                                    style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    承認する
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(review.id)}
                                disabled={isPending}
                                style={{ background: '#f44336', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                削除
                            </button>
                        </div>
                    </div>
                    {review.isApproved && <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#2E7D32', fontWeight: 600 }}>✓ 承認済み</div>}
                </div>
            ))}
        </div>
    );
}
