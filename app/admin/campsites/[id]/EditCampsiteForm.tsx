'use client';

import { updateCampsite } from '../../../actions/campsiteActions';
import { useState } from 'react';

// Type matching Prisma entity partially
type CampsiteData = {
    id: string;
    name: string;
    description: string;
    editorVoice: string;
    address: string;
    vibeTags: string;
    facilities: string;
    youtubeVideoId: string | null;
    videoLinks: string; // JSON string
    images: string; // JSON string
};

export default function EditCampsiteForm({ site }: { site: CampsiteData }) {
    const initialDeepTags = JSON.parse(site.vibeTags) as string[];
    const initialFacilities = JSON.parse(site.facilities) as string[];

    // Parse video links safely
    let initialVideoLinks: string[] = [];
    try {
        initialVideoLinks = JSON.parse(site.videoLinks);
    } catch (e) {
        initialVideoLinks = [];
    }

    // Parse images safely
    let initialImages: string[] = [];
    try {
        initialImages = JSON.parse(site.images);
    } catch (e) {
        initialImages = [];
    }

    const [images, setImages] = useState(initialImages); // Manage local state for UI feedback
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setImages(prev => [data.url, ...prev]); // Add new image to top
            } else {
                alert('アップロードに失敗しました');
            }
        } catch (err) {
            console.error(err);
            alert('エラーが発生しました');
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    return (
        <form action={updateCampsite.bind(null, site.id)} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>キャンプ場名 (Name)</label>
                <input name="name" defaultValue={site.name} style={{ padding: '8px', border: '1px solid #ddd' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>住所 (Address)</label>
                <input name="address" defaultValue={site.address} style={{ padding: '8px', border: '1px solid #ddd' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>紹介文 (Description)</label>
                <textarea name="description" rows={4} defaultValue={site.description} style={{ padding: '8px', border: '1px solid #ddd' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>編集者の声 (Editor's Voice)</label>
                <textarea name="editorVoice" rows={3} defaultValue={site.editorVoice} style={{ padding: '8px', border: '1px solid #ddd' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>画像 (Images)</label>

                {/* File Upload UI */}
                <div style={{ padding: '10px', background: '#f5f5f5', borderRadius: '4px', marginBottom: '10px' }}>
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#333', color: '#fff', padding: '8px 16px', borderRadius: '4px', fontSize: '0.9rem' }}>
                        <span>{uploading ? 'アップロード中...' : '📤 画像をアップロード'}</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ display: 'none' }} />
                    </label>
                </div>

                {/* Textarea is hidden source of truth or editable */}
                <textarea
                    name="images"
                    rows={4}
                    value={images.join('\n')}
                    onChange={(e) => setImages(e.target.value.split('\n'))}
                    placeholder="https://example.com/image1.jpg"
                    style={{ padding: '8px', border: '1px solid #ddd', fontFamily: 'monospace', fontSize: '0.9rem' }}
                />
                <small style={{ color: '#666' }}>
                    ※上がメイン画像(サムネイル)になります。URLを直接編集して並べ替えも可能です。
                </small>

                {/* Preview */}
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginTop: '10px', paddingBottom: '5px' }}>
                    {images.filter(url => url.trim().length > 0).map((url, i) => (
                        <div key={i} style={{ flexShrink: 0, width: '80px', height: '80px', position: 'relative' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt={`img-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>雰囲気タグ (Vibe Tags)</label>
                <input name="vibeTags" defaultValue={initialDeepTags.join(', ')} style={{ padding: '8px', border: '1px solid #ddd' }} />
                <small style={{ color: '#666' }}>※カンマ区切り (例: 静寂, 湖畔, ソロ)</small>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>設備 (Facilities)</label>
                <input name="facilities" defaultValue={initialFacilities.join(', ')} style={{ padding: '8px', border: '1px solid #ddd' }} />
                <small style={{ color: '#666' }}>※カンマ区切り (例: トイレ, 水場, 電源なし)</small>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>メイン動画 (YouTube ID)</label>
                <input name="youtubeVideoId" defaultValue={site.youtubeVideoId || ''} placeholder="例: dQw4w9WgXcQ" style={{ padding: '8px', border: '1px solid #ddd' }} />
                <small style={{ color: '#666' }}>※YouTubeのURLの「v=」より後ろの11桁のIDを入力</small>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>その他の動画リンク (Video Links)</label>
                <textarea name="videoLinks" rows={3} defaultValue={initialVideoLinks.join('\n')} placeholder="https://youtube.com/...\nhttps://vimeo.com/..." style={{ padding: '8px', border: '1px solid #ddd' }} />
                <small style={{ color: '#666' }}>※1行に1つのURLを入力（2つ目以降の動画としてリンク表示されます）</small>
            </div>

            <button type="submit" style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
                更新する
            </button>
        </form>
    );
}
