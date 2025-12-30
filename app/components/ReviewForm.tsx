'use client';

import { useState } from 'react';
import { submitPublicReview } from '../actions/publicReview';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
    campsiteId: string;
}

export default function ReviewForm({ campsiteId }: ReviewFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await submitPublicReview(formData);
            setIsSuccess(true);
            setIsOpen(false);
        } catch (e) {
            alert('エラーが発生しました。もう一度お試しください。');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.successMessage}>
                <p>口コミを投稿しました！<br />管理者の承認後に掲載されます。</p>
                <button onClick={() => setIsSuccess(false)} className={styles.resetBtn}>他の口コミを書く</button>
            </div>
        );
    }

    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(true)} className={styles.openBtn}>
                ✎ 口コミを投稿する
            </button>
        );
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>口コミ投稿</h3>
            <form action={handleSubmit} className={styles.form}>
                <input type="hidden" name="campsiteId" value={campsiteId} />

                <div className={styles.field}>
                    <label>ニックネーム</label>
                    <input name="userName" required placeholder="例: キャンプ好き" className={styles.input} />
                </div>

                <div className={styles.field}>
                    <label>評価 (1-5)</label>
                    <select name="rating" className={styles.select}>
                        <option value="5">★★★★★ (5)</option>
                        <option value="4">★★★★☆ (4)</option>
                        <option value="3">★★★☆☆ (3)</option>
                        <option value="2">★★☆☆☆ (2)</option>
                        <option value="1">★☆☆☆☆ (1)</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label>コメント</label>
                    <textarea name="content" required rows={4} placeholder="感想を教えてください..." className={styles.textarea} />
                </div>

                <div className={styles.actions}>
                    <button type="button" onClick={() => setIsOpen(false)} className={styles.cancelBtn}>キャンセル</button>
                    <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                        {isSubmitting ? '送信中...' : '送信する'}
                    </button>
                </div>
            </form>
        </div>
    );
}
