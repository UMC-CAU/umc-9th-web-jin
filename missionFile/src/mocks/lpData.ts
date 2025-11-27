import { Lp } from "../types/lp";

export const mockLpData: Lp[] = [
    {
        id: 1,
        title: "Classic Rock Hits",
        content: "최고의 클래식 록 명곡들을 모았습니다. Led Zeppelin, Queen, The Beatles 등의 전설적인 밴드들의 히트곡을 즐겨보세요.",
        thumbnail: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&fit=crop",
        published: true,
        authorid: 1,
        createAt: new Date("2024-01-15"),
        updateAt: new Date("2024-01-15"),
        tags: [
            { id: 1, name: "Rock" },
            { id: 2, name: "Classic" }
        ],
        likes: [
            { id: 1, userId: 1, lpId: 1 },
            { id: 2, userId: 2, lpId: 1 }
        ]
    },
    {
        id: 2,
        title: "K-Pop Favorites",
        content: "최신 K-Pop 히트곡부터 명곡까지! BTS, BLACKPINK, NewJeans 등 인기 아티스트들의 곡을 만나보세요.",
        thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
        published: true,
        authorid: 1,
        createAt: new Date("2024-02-10"),
        updateAt: new Date("2024-02-10"),
        tags: [
            { id: 3, name: "K-Pop" },
            { id: 4, name: "Pop" }
        ],
        likes: [
            { id: 3, userId: 1, lpId: 2 }
        ]
    },
    {
        id: 3,
        title: "Jazz Essentials",
        content: "재즈의 정수를 담은 플레이리스트. Miles Davis, John Coltrane, Billie Holiday의 명곡들을 감상하세요.",
        thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500&h=500&fit=crop",
        published: true,
        authorid: 2,
        createAt: new Date("2024-03-05"),
        updateAt: new Date("2024-03-05"),
        tags: [
            { id: 5, name: "Jazz" },
            { id: 6, name: "Classic" }
        ],
        likes: []
    },
    {
        id: 4,
        title: "Electronic Vibes",
        content: "일렉트로닉 음악의 세계로! Daft Punk, Calvin Harris, The Chainsmokers의 신나는 비트를 즐겨보세요.",
        thumbnail: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500&h=500&fit=crop",
        published: true,
        authorid: 2,
        createAt: new Date("2024-03-20"),
        updateAt: new Date("2024-03-20"),
        tags: [
            { id: 7, name: "Electronic" },
            { id: 8, name: "Dance" }
        ],
        likes: [
            { id: 4, userId: 3, lpId: 4 }
        ]
    },
    {
        id: 5,
        title: "Chill Acoustic",
        content: "편안한 어쿠스틱 사운드. 조용한 오후나 집중이 필요할 때 듣기 좋은 곡들을 모았습니다.",
        thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=500&fit=crop",
        published: true,
        authorid: 3,
        createAt: new Date("2024-04-01"),
        updateAt: new Date("2024-04-01"),
        tags: [
            { id: 9, name: "Acoustic" },
            { id: 10, name: "Chill" }
        ],
        likes: [
            { id: 5, userId: 1, lpId: 5 },
            { id: 6, userId: 2, lpId: 5 },
            { id: 7, userId: 3, lpId: 5 }
        ]
    },
    {
        id: 6,
        title: "Hip Hop Classics",
        content: "힙합의 역사를 만든 명곡들. Tupac, Notorious B.I.G., Jay-Z의 전설적인 트랙들을 만나보세요.",
        thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
        published: true,
        authorid: 3,
        createAt: new Date("2024-04-15"),
        updateAt: new Date("2024-04-15"),
        tags: [
            { id: 11, name: "Hip Hop" },
            { id: 12, name: "Rap" }
        ],
        likes: [
            { id: 8, userId: 2, lpId: 6 }
        ]
    },
    {
        id: 7,
        title: "Indie Discoveries",
        content: "숨겨진 인디 음악의 보석들. 새로운 아티스트들의 신선한 사운드를 발견해보세요.",
        thumbnail: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=500&fit=crop",
        published: true,
        authorid: 1,
        createAt: new Date("2024-05-01"),
        updateAt: new Date("2024-05-01"),
        tags: [
            { id: 13, name: "Indie" },
            { id: 14, name: "Alternative" }
        ],
        likes: []
    },
    {
        id: 8,
        title: "90s Nostalgia",
        content: "90년대의 향수를 느껴보세요. Backstreet Boys, Spice Girls, Oasis 등 90년대를 대표하는 곡들!",
        thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop",
        published: true,
        authorid: 2,
        createAt: new Date("2024-05-10"),
        updateAt: new Date("2024-05-10"),
        tags: [
            { id: 15, name: "90s" },
            { id: 16, name: "Pop" }
        ],
        likes: [
            { id: 9, userId: 1, lpId: 8 },
            { id: 10, userId: 3, lpId: 8 }
        ]
    }
];
