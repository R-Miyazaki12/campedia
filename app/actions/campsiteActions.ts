'use server';

import { prisma } from '../lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateCampsite(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const editorVoice = formData.get('editorVoice') as string;
    const address = formData.get('address') as string;

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
            images
        }
    });

    revalidatePath('/admin/campsites');
    revalidatePath(`/spot/${id}`);
    revalidatePath('/');
    redirect('/admin/campsites');
}
