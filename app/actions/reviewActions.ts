'use server';

import { prisma } from '../lib/db';
import { revalidatePath } from 'next/cache';

export async function approveReview(id: string) {
    await prisma.review.update({
        where: { id },
        data: { isApproved: true }
    });

    // Recalculate ratings? (Ideally yes, but for prototype we skip or use aggregation in DB)
    // For now just approve.
    revalidatePath('/admin/reviews');
    revalidatePath('/'); // Just simpler to revalidate details but we don't know campsite id easily here without fetch.
    // Actually we should revalidate specific pages, but global revalidate is ok for now.
}

export async function deleteReview(id: string) {
    await prisma.review.delete({
        where: { id }
    });
    revalidatePath('/admin/reviews');
}
