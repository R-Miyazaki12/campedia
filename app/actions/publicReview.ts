'use server';

import { prisma } from '../lib/db';
import { revalidatePath } from 'next/cache';

export async function submitPublicReview(formData: FormData) {
    const campsiteId = formData.get('campsiteId') as string;
    const userName = formData.get('userName') as string;
    const content = formData.get('content') as string;
    const ratingTotal = parseInt(formData.get('rating') as string, 10);

    if (!campsiteId || !userName || !content || !ratingTotal) {
        throw new Error('Missing fields');
    }

    await prisma.review.create({
        data: {
            campsiteId,
            userName,
            content,
            ratingTotal,
            // Default detailed ratings to total for now
            ratingNature: ratingTotal,
            ratingFacilities: ratingTotal,
            ratingCleanliness: ratingTotal,
            ratingAccess: ratingTotal,
            ratingQuietness: ratingTotal,
            isApproved: false // Pending approval
        }
    });

    // Revalidate Admin Dashboard so new review shows up
    revalidatePath('/admin/reviews');
    revalidatePath('/admin');

    return { success: true };
}
