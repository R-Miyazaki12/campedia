'use client';

import { useState } from 'react';
import { submitCampsiteRequest } from '../actions/campsiteActions';
import Link from 'next/link';

export default function RequestPage() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setSubmitting(true);
        try {
            await submitCampsiteRequest(formData);
            setSuccess(true);
        } catch (e) {
            alert('送信に失敗しました。');
        } finally {
            setSubmitting(false);
        }
    }

    if (success) {
        return (
            <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2E7D32' }}>送信完了！</h1>
                <p>掲載リクエストありがとうございます。<br />管理者が内容を確認し、追記・修正を行った上で掲載されます。</p>
                <div style={{ marginTop: '30px' }}>
                    <Link href="/" style={{ textDecoration: 'underline', color: '#666' }}>トップページへ戻る</Link>
                </div>
            </div>
        )
    }

    return (
        <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>キャンプ場掲載リクエスト</h1>
            <p style={{ marginBottom: '30px', color: '#666' }}>あなたの知っている素敵なキャンプ場を教えてください。</p>

            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 600 }}>キャンプ場名 (必須)</label>
                    <input name="name" required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 600 }}>住所・エリア (必須)</label>
                    <input name="address" required placeholder="例: 北海道〇〇郡..." style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontWeight: 600 }}>おすすめポイント</label>
                    <textarea name="description" rows={5} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: '15px',
                        background: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.7 : 1
                    }}
                >
                    {submitting ? '送信中...' : 'リクエストを送信'}
                </button>
            </form>
        </div>
    );
}
