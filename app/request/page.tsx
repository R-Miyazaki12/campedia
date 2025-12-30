'use client';

import { useState } from 'react';
import { submitCampsiteRequest } from '../actions/campsiteActions';
import Link from 'next/link';

export default function RequestPage() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Simple state for textarea-based array inputs to mirror functionality of Admin
    // Ideally we would share components, but for now copying logic is safer for different contexts (User vs Admin)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                // Append to textarea
                const textarea = document.getElementById('images') as HTMLTextAreaElement;
                if (textarea) {
                    textarea.value = (textarea.value ? textarea.value + '\n' : '') + data.url;
                }
            } else {
                alert('アップロード失敗: ' + data.message);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('アップロード中にエラーが発生しました');
        } finally {
            setUploading(false);
            // Clear input
            e.target.value = '';
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setSubmitting(true);
        try {
            await submitCampsiteRequest(formData);
            setSuccess(true);
        } catch (e) {
            console.error(e);
            alert('送信に失敗しました。');
        } finally {
            setSubmitting(false);
        }
    }

    if (success) {
        return (
            <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2E7D32' }}>リクエスト送信完了！</h1>
                <p>詳細な情報の提供ありがとうございます。<br />管理者が内容を確認し、追記・修正を行った上で掲載されます。</p>
                <div style={{ marginTop: '30px' }}>
                    <Link href="/" style={{ textDecoration: 'underline', color: '#666' }}>トップページへ戻る</Link>
                </div>
            </div>
        )
    }

    return (
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>キャンプ場掲載リクエスト</h1>
            <p style={{ marginBottom: '30px', color: '#666' }}>
                知っているキャンプ場の情報を入力してください。<br />
                <span style={{ fontSize: '0.9rem', color: '#888' }}>※ 分かる範囲で構いません。必須項目以外は空欄でもOKです。</span>
            </p>

            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                {/* Basic Info */}
                <div style={{ display: 'grid', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 600 }}>キャンプ場名 (必須)</label>
                        <input name="name" required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 600 }}>住所・アクセス (必須)</label>
                        <input name="address" required placeholder="例: 北海道〇〇郡..." style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 600 }}>紹介文・特徴</label>
                        <textarea name="description" rows={4} placeholder="どんなキャンプ場ですか？" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 600 }}>あなたのレビュー (Editor's Voice)</label>
                        <textarea name="editorVoice" rows={3} placeholder="個人的な感想やおすすめポイントがあれば..." style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} />
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />

                {/* Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 600 }}>雰囲気タグ (カンマ区切)</label>
                        <input name="vibeTags" placeholder="例: 林間, 静か, 湖畔" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 600 }}>設備 (カンマ区切)</label>
                        <input name="facilities" placeholder="例: トイレ, 水場, 電源" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />

                {/* Media */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 600 }}>メイン動画 (YouTube ID)</label>
                    <input name="youtubeVideoId" placeholder="例: dQw4w9WgXcQ (URLではなくID)" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 600 }}>その他の動画リンク (改行区切)</label>
                    <textarea name="videoLinks" rows={3} placeholder="https://..." style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 600 }}>画像URL (改行区切)</label>

                    {/* Add Image Upload Button for User */}
                    <div style={{ marginBottom: '5px' }}>
                        <label
                            htmlFor="file-upload"
                            style={{
                                display: 'inline-block',
                                padding: '5px 10px',
                                background: uploading ? '#ccc' : '#e0e0e0',
                                borderRadius: '4px',
                                cursor: uploading ? 'not-allowed' : 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            {uploading ? 'アップロード中...' : '📤 画像をアップロード'}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <textarea
                        id="images"
                        name="images"
                        rows={4}
                        placeholder="https://..."
                        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
                    />
                    <small style={{ color: '#666' }}>※アップロードすると自動でURLが入力されます</small>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.7 : 1
                    }}
                >
                    {submitting ? '送信中...' : 'リクエストを送信する'}
                </button>
            </form>
        </div>
    );
}
