'use server';

import { prisma } from '../lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Update existing campsite
export async function updateCampsite(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const editorVoice = formData.get('editorVoice') as string;
    const address = formData.get('address') as string;
    const isPublic = formData.get('isPublic') === 'on';

    // Tags (comma separated)
    const vibeTagsRaw = formData.get('vibeTags') as string;
    const vibeTags = JSON.stringify(vibeTagsRaw.split(',').map(s => s.trim()).filter(Boolean));

    const facilitiesRaw = formData.get('facilities') as string;
    const facilities = JSON.stringify(facilitiesRaw.split(',').map(s => s.trim()).filter(Boolean));

    const youtubeVideoId = formData.get('youtubeVideoId') as string;

    // Video Links (one per line)
    const videoLinksRaw = formData.get('videoLinks') as string;
    const videoLinks = JSON.stringify(videoLinksRaw.split('\n').map(s => s.trim()).filter(Boolean));

    // Images (one per line)
    const imagesRaw = formData.get('images') as string;
    const images = JSON.stringify(imagesRaw.split('\n').map(s => s.trim()).filter(Boolean));

    await prisma.campsite.update({
        where: { id },
        data: {
            name,
            description,
            editorVoice,
            address,
            vibeTags,
            facilities,
            youtubeVideoId,
            videoLinks,
            images,
            isPublic
        }
    });

    revalidatePath('/admin/campsites');
    revalidatePath(`/spot/${id}`);
    revalidatePath('/');
    redirect('/admin/campsites');
}

// Create new campsite (Admin)
export async function createCampsite(formData: FormData) {
    const name = formData.get('name') as string;

    // Create with minimal defaults
    await prisma.campsite.create({
        data: {
            name,
            description: '',
            editorVoice: '',
            address: '',
            lat: 0,
            lng: 0,
            vibeTags: '[]',
            facilities: '[]',
            images: '[]',
            noiseLevel: 3,
            ratingTotal: 0,
            isPublic: false // Start as draft
        }
    });

    revalidatePath('/admin/campsites');
    redirect('/admin/campsites');
}

// Submit Request (User)
export async function submitCampsiteRequest(formData: FormData) {
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const description = formData.get('description') as string;
    const editorVoice = formData.get('editorVoice') as string;

    // Optional Fields
    const vibeTagsRaw = formData.get('vibeTags') as string;
    const vibeTags = JSON.stringify(vibeTagsRaw ? vibeTagsRaw.split(',').map(s => s.trim()).filter(Boolean) : []);

    const facilitiesRaw = formData.get('facilities') as string;
    const facilities = JSON.stringify(facilitiesRaw ? facilitiesRaw.split(',').map(s => s.trim()).filter(Boolean) : []);

    const youtubeVideoId = formData.get('youtubeVideoId') as string;

    const videoLinksRaw = formData.get('videoLinks') as string;
    const videoLinks = JSON.stringify(videoLinksRaw ? videoLinksRaw.split('\n').map(s => s.trim()).filter(Boolean) : []);

    const imagesRaw = formData.get('images') as string;
    const images = JSON.stringify(imagesRaw ? imagesRaw.split('\n').map(s => s.trim()).filter(Boolean) : []);

    if (!name || !address) throw new Error('Required fields missing');

    await prisma.campsite.create({
        data: {
            name,
            address,
            description: description || '',
            editorVoice: editorVoice || 'ユーザー投稿',
            lat: 0,
            lng: 0,
            vibeTags,
            facilities,
            images,
            youtubeVideoId: youtubeVideoId || null,
            videoLinks,
            noiseLevel: 3,
            ratingTotal: 0,
            isPublic: false // Pending approval
        }
    });

    // No redirect, return success to show message
    return { success: true };
}
