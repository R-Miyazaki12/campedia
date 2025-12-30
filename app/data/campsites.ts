import { CampingSpot } from '../types/camping';

export const CAMPSITES: CampingSpot[] = [
    {
        id: 'c1',
        name: '支笏湖の秘密のビーチ',
        description: '支笏湖の北岸、細い小道の先にある隔離されたスポット。',
        editorVoice: '究極の静寂がここにある。朝霧に包まれた湖の青さは息をのむ美しさ。設備は何もない、ただあなたとカルデラ湖があるだけ。',
        location: {
            lat: 42.7845,
            lng: 141.3854,
            address: '北海道千歳市',
            accessNote: 'ラスト500mは未舗装路。4WD推奨。'
        },
        features: {
            vibe: ['Lake', 'Quiet', 'Solo'],
            noiseLevel: 1,
            facilities: ['電源なし', '水場なし'],
        },
        media: {
            images: ['/images/shikotsu-1.jpg'],
            youtubeVideoId: 'dQw4w9WgXcQ',
        },
        nearby: {
            onsen: { name: '丸駒温泉', driveTimeMin: 15 },
        },
        rating: {
            total: 4.5,
            nature: 5.0,
            facilities: 2.0,
            cleanliness: 4.0,
            access: 2.5,
            quietness: 5.0
        },
        reviews: [
            {
                id: 'r1',
                userName: 'ソロキャンパーT',
                date: '2025-05-20',
                rating: 5,
                content: '本当に誰もいなくて最高でした。波の音しか聞こえません。トイレがないのだけが難点ですが、それを補って余りある絶景です。'
            },
            {
                id: 'r2',
                userName: 'NatureLover',
                date: '2024-09-15',
                rating: 4,
                content: 'アクセスは少し大変ですが、苦労して行く価値があります。朝日は必見。'
            }
        ]
    },
    {
        id: 'c2',
        name: 'オホーツク星空の森',
        description: '網走の森深く、光害ゼロで有名な野営地。',
        editorVoice: 'コーヒーカップに天の川が映るのを見たいならここだ。21時以降「完全消灯」のルールが、スターゲイザーの楽園を守っている。',
        location: {
            lat: 43.987,
            lng: 144.256,
            address: '北海道網走市',
        },
        features: {
            vibe: ['Forest', 'Starry Sky', 'No Music'],
            noiseLevel: 1,
            facilities: ['トイレあり', '水場あり'],
        },
        media: {
            images: ['/images/okhotsk-1.jpg'],
        },
        nearby: {
            supermarket: { name: 'ベーシック網走', driveTimeMin: 20 },
        },
        rating: {
            total: 4.2,
            nature: 4.8,
            facilities: 3.5,
            cleanliness: 4.5,
            access: 3.0,
            quietness: 5.0
        },
        reviews: [
            {
                id: 'r3',
                userName: '星空ハンター',
                date: '2025-08-10',
                rating: 5,
                content: '満天の星空に感動しました。管理人さんも親切で、トイレも綺麗に掃除されています。'
            }
        ]
    },
    {
        id: 'c3',
        name: '日高 源流の野営地',
        description: 'ベテランキャンパー向けの、荒々しい河原サイト。',
        editorVoice: '川の轟音が全てをかき消す。自分の食事を釣る、真のワイルドキャンプ体験。',
        location: {
            lat: 42.567,
            lng: 142.567,
            address: '北海道日高町',
        },
        features: {
            vibe: ['Forest', 'Solo'],
            noiseLevel: 2,
            facilities: ['電源なし'],
        },
        media: {
            images: ['/images/hidaka-1.jpg'],
        },
        nearby: {
            onsen: { name: 'みついし昆布温泉', driveTimeMin: 30 },
        },
        rating: {
            total: 3.8,
            nature: 4.5,
            facilities: 1.5,
            cleanliness: 3.0,
            access: 2.0,
            quietness: 4.0
        },
        reviews: [
            {
                id: 'r4',
                userName: 'WildOne',
                date: '2024-10-01',
                rating: 4,
                content: 'かなりワイルドな場所です。初心者にはお勧めしませんが、自然と一体になりたい人には最高。'
            }
        ]
    }
];
