import { PortfolioItem, TranslationSample, ServiceItem, StatItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'editing',
    icon: '🎬',
    badge: {
      KR: '비디오 에디팅',
      EN: 'Video Editing',
    },
    title: {
      KR: '감각적인 영상 편집',
      EN: 'Creative Video Editing',
    },
    desc: {
      KR: '유튜브부터 기업 행사·홍보영상까지, 시선을 사로잡는 컷 편집과 감각적인 자막 모션 디자인을 선사합니다.',
      EN: 'From YouTube to corporate event films, capturing audience attention with rhythmic cutting and kinetic typography.',
    },
    points: {
      KR: ['트렌디한 리듬감의 컷 편집', '맞춤형 모션 그래픽 & 자막', '전문적인 4K 색보정 (Color Grading)', '고품질 음향 믹싱 및 사운드 디자인'],
      EN: ['Rhythmic & high-retention cuts', 'Custom motion graphics & captions', 'Pro 4K color grading (LUTs & Log)', 'Audio mastering & sound SFX design'],
    },
    bgGradient: 'from-sky-50/70 to-blue-50/50',
  },
  {
    id: 'translation',
    icon: '🌐',
    badge: {
      KR: '영한·한영 전문',
      EN: 'KR ⇄ EN Specialized',
    },
    title: {
      KR: '문맥을 살리는 영어 번역',
      EN: 'Contextual Translation',
    },
    desc: {
      KR: '단순 직역을 넘어 영상의 분위기와 문화적 뉘앙스를 완벽히 살리는 영-한/한-영 번역 및 영상 자막화.',
      EN: 'Far beyond literal translation—preserving emotional nuances, colloquial humor, and cultural context with seamless subtitle timing.',
    },
    points: {
      KR: ['원어민 수준의 자연스러운 어휘 선택', '가독성을 고려한 글자수/줄바꿈 최적화', '글로벌 테크·스타트업·컬처 전문 번역', 'SRT / VTT / Premiere XML 완벽 지원'],
      EN: ['Native-level nuance & slang handling', 'Optimized character count for reading speed', 'Specialized in Tech, Business & Lifestyle', 'Complete SRT, VTT, and XML delivery'],
    },
    bgGradient: 'from-blue-50/70 to-indigo-50/50',
  },
  {
    id: 'all-in-one',
    icon: '✨',
    badge: {
      KR: '원스톱 솔루션',
      EN: 'One-Stop Solution',
    },
    title: {
      KR: 'All-in-One 글로벌 패키지',
      EN: 'All-in-One Global Suite',
    },
    desc: {
      KR: '외국어 인터뷰, 행사, 글로벌 콘텐츠의 번역부터 영상 편집까지 한 번에 해결하는 올인원 솔루션.',
      EN: 'End-to-end solution from foreign language interview transcription, contextual translation, to final polished video production.',
    },
    points: {
      KR: ['외주 분산 없는 단일 창구 소통', '작업 기간 평균 50% 단축', '영상 호흡과 자막 싱크 100% 일치', '다국어 버전 동시 제작 가능'],
      EN: ['Single point of communication', '50% faster turnaround vs separate vendors', '100% synchronized audio-subtitle rhythm', 'Multi-language versioning capability'],
    },
    bgGradient: 'from-sky-100/60 to-cyan-50/50',
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // 1. 인터뷰(행사) - 요청 영상 1
  {
    id: 'yt-fire-expo',
    category: 'interview_event',
    title: {
      KR: '[스페셜클립] 국제소방안전박람회 현장 스케치 & 인터뷰 (대구 엑스포)',
      EN: 'Daegu International Fire & Safety Expo - Special Clip & Interviews',
    },
    client: '소방청TV',
    duration: '06:42',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    thumbnail: 'https://i.ytimg.com/vi/_MdfnRlkCgg/hqdefault.jpg',
    videoUrl: 'https://youtu.be/_MdfnRlkCgg?si=HomuIqc_ScDYpT2U',
    youtubeId: '_MdfnRlkCgg',
    description: {
      KR: '대구 엑스코에서 개최된 국제소방안전박람회의 생생한 볼거리와 소방관 현장 인터뷰를 스케치한 스페셜 영상. 다채로운 전시 부스와 소방 장비 시연, 인터뷰를 리듬감 있게 엮어냈습니다.',
      EN: 'Official highlight sketch capturing firefighting demonstrations, exhibitor booths, and on-site interviews at the Daegu Fire & Safety Expo.',
    },
    features: {
      KR: ['현장감을 극대화하는 빠른 템포의 스케치 컷 편집', '시인성 높은 모션 자막 및 타이틀 그래픽', '공공기관 채널 맞춤형 친근하고 재미있는 톤앤매너'],
      EN: ['High-energy rhythmic event cutting', 'High-visibility motion captions & title graphics', 'Audience-friendly tone tailored for official public channel'],
    },
    hasSubtitles: true,
    subtitleSample: {
      kr: '“실제 현장에서 착용하는 특수 진압 방화복의 성능을 직접 체감해보겠습니다!”',
      en: '“Let’s test the high-heat resistance of structural turnout gear in real-time!”',
      timecode: '01:24',
      speaker: '소방관 인터뷰',
      keyPoint: '현장 생동감 & 전문용어 싱크',
    },
  },
  // 1. 인터뷰(행사) - 요청 영상 2
  {
    id: 'yt-dave-busan-expo',
    category: 'interview_event',
    title: {
      KR: '부산 엑스포 자전거 기부 & 현장 인터뷰 (feat. 2030 부산 엑스포)',
      EN: 'Busan World Expo 2030 - Bike Donation & Street Interviews',
    },
    client: '데이브 World of Dave',
    duration: '05:18',
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    thumbnail: 'https://i.ytimg.com/vi/yDSuyLXMKVQ/hqdefault.jpg',
    videoUrl: 'https://youtu.be/yDSuyLXMKVQ?si=_6xUZZInENchP7_c',
    youtubeId: 'yDSuyLXMKVQ',
    description: {
      KR: '2030 부산 세계 박람회 유치 홍보 행사에서 시민들과 함께한 유쾌한 현장 인터뷰와 자전거 에너지 기부 챌린지 영상. 인터뷰이들의 솔직하고 활기찬 리액션을 유쾌한 자막과 컷 편집으로 완성했습니다.',
      EN: 'Energetic on-site street interviews and bicycle charity challenge at the 2030 Busan World Expo promotion festival with creator Dave.',
    },
    features: {
      KR: ['유쾌하고 빠른 호흡의 스트리트 인터뷰 컷 편집', '재치있는 영·한 자막 및 말풍선 모션 그래픽', '행사 현장 BGM & 타이밍 사운드 싱크'],
      EN: ['Fast-paced street interview editing', 'Witty bilingual captions & comic motion bubbles', 'High-tempo BGM and impact SFX sync'],
    },
    hasSubtitles: true,
    subtitleSample: {
      kr: '“자전거 페달 10초만 힘차게 밟으면 부산 엑스포 기부금이 팍팍 쌓입니다!”',
      en: '“Just 10 seconds of rapid pedaling racks up huge donations for the Expo!”',
      timecode: '00:48',
      speaker: '데이브 & 시민 인터뷰',
      keyPoint: '스트리트 유머 & 즉각 반응 자막',
    },
  },
  // 1. 인터뷰(행사) - 요청 영상 3
  {
    id: 'yt-interviewbox-promo',
    category: 'interview_event',
    title: {
      KR: '인터뷰박스 화상면접 합격후기 & 공간 인터뷰 홍보 영상',
      EN: 'Interview Box - Virtual Interview Testimonial & Space Promo',
    },
    client: '인터뷰박스',
    duration: '02:45',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    thumbnail: 'https://i.ytimg.com/vi/PTuGbTAhHbc/hqdefault.jpg',
    videoUrl: 'https://youtu.be/PTuGbTAhHbc?si=cq6hHmySrnTgGVOS',
    youtubeId: 'PTuGbTAhHbc',
    description: {
      KR: '화상면접 전문 공간 인터뷰박스를 이용한 실제 합격자의 진솔한 후기 인터뷰와 시설의 장점을 감각적으로 소개하는 브랜드 홍보 영상입니다.',
      EN: 'Authentic candidate testimonial interview combined with a sleek facility tour for Korea’s premier virtual interview studio space.',
    },
    features: {
      KR: ['안정감 있는 구도의 1인 인터뷰 컷 구성', '신뢰감을 주는 정갈한 타이포그래피 & 자막 디자인', '시설 내부 특장점 인서트 컷 및 B-roll 전환'],
      EN: ['Balanced single-subject interview composition', 'Trust-inspiring clean typography & subtitle styling', 'Smooth B-roll room tours & feature highlights'],
    },
    hasSubtitles: true,
    subtitleSample: {
      kr: '“완벽한 방음 부스 덕분에 면접관님의 질문과 제 답변 호흡에 온전히 집중했어요.”',
      en: '“Thanks to the acoustic booth, I could dial in completely on the interview rhythm.”',
      timecode: '01:12',
      speaker: '합격자 인터뷰',
      keyPoint: '인터뷰 호흡 & 신뢰감 있는 폰트',
    },
  },
  // 2. 예능(토크)
  {
    id: 'yt-kdrama-reaction',
    category: 'variety_talk',
    title: {
      KR: '한국 드라마 전세계 열풍과 해외반응 (폭싹 속았수다)',
      EN: 'Global K-Drama Craze & Overseas Fan Reactions',
    },
    client: '크리스 이슈 Kris Issue',
    duration: '11:28',
    tools: ['Premiere Pro', 'Audition', 'Photoshop'],
    thumbnail: 'https://i.ytimg.com/vi/IVrqVAP3rEY/hqdefault.jpg',
    videoUrl: 'https://youtu.be/IVrqVAP3rEY?si=iEAp7S_C8wU4L4cM',
    youtubeId: 'IVrqVAP3rEY',
    description: {
      KR: '글로벌 K-드라마에 대한 전 세계 시청자들의 리얼한 반응과 외신 보도를 분석한 토크/리뷰 영상. 현지 영어 표현과 슬랭을 한국어 문맥에 맞게 매끄럽게 번역하고 전달력 높은 자막 싱크를 구현했습니다.',
      EN: 'In-depth cultural review and commentary on international reactions to Korean dramas, featuring contextual slang translation, crisp subtitle sync, and dynamic B-roll.',
    },
    features: {
      KR: ['영어권 현지 관용구 및 신조어 맞춤 번역', '가독성과 리듬감을 극대화한 영상 자막 싱크', '시청 지속 시간을 끌어올리는 인서트 및 컷 타이밍'],
      EN: ['Contextual English idiom & slang localization', 'Rhythm-synced readable subtitle typography', 'Retention-optimized cut sequencing'],
    },
    hasSubtitles: true,
    subtitleSample: {
      kr: '“진짜 이번 반전은 뒤통수 맞은 기분이에요, 완전 대박이네요!”',
      en: '“That plot twist came completely out of left field—mind-blowing!”',
      timecode: '04:15',
      speaker: '해외 팬 리액션',
      keyPoint: '관용적 슬랭 & 감정선 전달',
    },
  },
  // 2. 예능(토크)
  {
    id: 'yt-lee-junghoo-interview',
    category: 'variety_talk',
    title: {
      KR: '이정후 선수 인터뷰 & 미국 현지 반응 토크',
      EN: 'MLB Star Lee Jung-hoo: U.S. Fan Reactions & Interview Talk',
    },
    client: '크리스 이슈 Kris Issue',
    duration: '10:15',
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    thumbnail: 'https://i.ytimg.com/vi/D84D3Zy_3Cc/hqdefault.jpg',
    videoUrl: 'https://youtu.be/D84D3Zy_3Cc?si=hE9sSyjAkhhNlTfV',
    youtubeId: 'D84D3Zy_3Cc',
    description: {
      KR: '샌프란시스코 현지 팬과 미디어의 반응, 인터뷰를 다룬 토크 영상. 미국 스포츠 팬들의 생생한 영어 구어체 표현과 농담을 맛깔나게 한국어로 번역하고, 야구 경기 및 현장 인서트를 적재적소에 배치했습니다.',
      EN: 'Engaging sports reaction piece covering U.S. fan sentiment and English interview clips for MLB star Lee Jung-hoo, with colloquial translation and punchy SFX.',
    },
    features: {
      KR: ['생생한 미국 현지 스포츠 팬 인터뷰 및 슬랭 번역', '핵심 멘트를 강조하는 모션 텍스트 & 효과음', '야구 경기 및 현장 자료화면 인서트 연출'],
      EN: ['Lively conversational sports slang translation', 'Kinetic emphasis captions & SFX', 'B-roll footage synchronization'],
    },
    hasSubtitles: true,
    subtitleSample: {
      kr: '“타석에서 배트 스피드가 엄청나서 공이 순식간에 사라집니다.”',
      en: '“His bat speed at the plate is unreal—the ball just vanishes.”',
      timecode: '02:50',
      speaker: '현지 해설 & 팬 토크',
      keyPoint: '스포츠 현장감 & 박진감 자막',
    },
  },
  // 3. 부동산
  {
    id: 'item-realestate-hannam',
    category: 'real_estate',
    title: {
      KR: '한남동 하이엔드 펜트하우스 룸투어 & 조망 시네마틱',
      EN: 'Hannam-dong Luxury Penthouse Tour & City Views',
    },
    client: '리얼에스테이트 마스터',
    duration: '12:40',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: {
      KR: '한강 파노라마 조망과 초호화 인테리어를 담은 고급 주거 룸투어 영상. 감각적인 카메라 워킹 보정과 매끄러운 짐벌 컷 연결, 자재 스펙을 깔끔하게 보여주는 인포그래픽 자막을 적용했습니다.',
      EN: 'Cinematic luxury penthouse walkthrough highlighting custom materials, architectural specs, and panoramic skyline vistas.',
    },
    features: {
      KR: ['공간감을 극대화하는 매끄러운 스테디캠 컷 호흡', '면적 및 자재 스펙을 정리한 세련된 모션 자막', '고급스러운 앰비언트 BGM과 차분한 컬러 그레이딩'],
      EN: ['Smooth architectural spatial flow', 'Minimalist material spec overlays', 'High-end ambient grading and audio mastering'],
    },
    hasSubtitles: true,
    subtitleSample: {
      kr: '“거실 전면 통창으로 한강의 석양이 파노라마로 펼쳐집니다.”',
      en: '“Panoramic floor-to-ceiling glass frames the golden Han River sunset.”',
      timecode: '03:10',
      speaker: '도슨트 해설',
      keyPoint: '차분한 고급 무드 & 인포그래픽',
    },
  },
  {
    id: 'item-realestate-seongsu',
    category: 'real_estate',
    title: {
      KR: '성수동 신축 크리에이티브 사옥 공간 투어',
      EN: 'Seongsu Creative Hub: Modern Commercial Space Tour',
    },
    client: '빌딩로그 코리아',
    duration: '08:20',
    tools: ['Premiere Pro', 'After Effects'],
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: {
      KR: '성수동 핫플레이스에 위치한 크리에이티브 오피스 사옥 투어. 건축가의 인터뷰와 실사용 공간의 동선을 감각적인 템포로 구성했습니다.',
      EN: 'Modern corporate office architectural showcase capturing collaborative work zones, lighting design, and creative amenities.',
    },
    features: {
      KR: ['층별 도면 모션 그래픽 안내', '자연광 채광을 살린 화사한 색보정', '임대 조건 및 입주 혜택 깔끔한 요약 자막'],
      EN: ['Architectural floorplan animations', 'Natural daylight balance LUT grading', 'Clear commercial spec cards'],
    },
    hasSubtitles: true,
  },
  // 4. 여행
  {
    id: 'item-travel-kyoto',
    category: 'travel',
    title: {
      KR: '도쿄·교토 골목길 감성 필름 여행 에세이 4K',
      EN: 'Tokyo & Kyoto Old Alleys: 4K Film Travelogue',
    },
    client: 'Urban Wanderers',
    duration: '07:15',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'Audition'],
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    description: {
      KR: '오래된 골목과 전통 가옥의 서정을 담은 감성 트래블로그. 필름 그레인과 로파이 사운드로 시청자에게 따뜻한 여행의 기억을 선사합니다.',
      EN: 'Poetic travel essay through heritage alleys, featuring analog color toning and authentic spatial field recordings.',
    },
    features: {
      KR: ['Kodak 2383 필름 룩 컬러 그레이딩', '골목 현장음(Foley) 디테일 사운드 디자인', '여행 에세이풍의 서정적인 타이포 자막'],
      EN: ['Vintage film emulation color', 'Rich ambient foley restoration', 'Poetic subtitle typesetting'],
    },
    hasSubtitles: true,
  },
  {
    id: 'item-travel-swiss',
    category: 'travel',
    title: {
      KR: '스위스 인터라켄 파노라마 기차 여행기',
      EN: 'Swiss Alps Panorama Train Journey',
    },
    client: '트래블러 K',
    duration: '09:30',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    thumbnail: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: {
      KR: '만년설 산맥과 에메랄드빛 호수를 가로지르는 스위스 기차 여행. 웅장한 자연 경관과 감성적인 컷 편집이 어우러집니다.',
      EN: 'Epic alpine train expedition through glaciers and azure lakes with pristine HDR color mastering.',
    },
    features: {
      KR: ['4K 드론 샷과 창가 뷰의 극적 교차 편집', '여행 꿀팁과 환율·교통 안내 자막', '웅장한 오케스트라 사운드트랙 믹싱'],
      EN: ['Dynamic aerial & cabin transitions', 'Travel budget & route info graphics', 'Orchestral audio mix'],
    },
    hasSubtitles: true,
  },
  // 5. 먹방
  {
    id: 'item-mukbang-omakase',
    category: 'mukbang',
    title: {
      KR: '한우 오마카세 12코스 풀미식 탐방 & 리얼 사운드',
      EN: 'Hanwoo Beef Omakase 12-Course Culinary Tasting',
    },
    client: '미식가 테이스티',
    duration: '11:45',
    tools: ['Premiere Pro', 'Audition', 'Photoshop'],
    thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: {
      KR: '셰프의 섬세한 조리 과정과 지글거리는 숯불 고기 굽는 소리를 생생하게 담아낸 고품질 미식 먹방. 맛에 대한 직관적인 리액션 자막을 배치했습니다.',
      EN: 'Sensory gastronomic feast featuring ultra-crisp grilling audio, chef plating close-ups, and appetizing color enhancement.',
    },
    features: {
      KR: ['식욕을 돋우는 극단적 클로즈업 컷 편집', '고기 지글거림을 증폭하는 ASMR 사운드 마스터링', '부위별 특징과 맛 표현 맞춤 자막'],
      EN: ['Macro food texture framing', 'Hi-Fi sizzle ASMR enhancement', 'Flavour profile graphical badges'],
    },
    hasSubtitles: false,
  },
  {
    id: 'item-mukbang-street',
    category: 'mukbang',
    title: {
      KR: '도쿄 츠키지 장외시장 길거리 음식 털기 먹방 투어',
      EN: 'Tokyo Street Food Market Run: Seafood & Wagyu Skewers',
    },
    client: '먹로드 투어',
    duration: '10:05',
    tools: ['Premiere Pro', 'Photoshop'],
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: {
      KR: '해산물 꼬치부터 와규 스틱까지 쉴 새 없이 이어지는 스트리트 푸드 먹방. 활기찬 시장 분위기와 솔직한 음식 평가를 유쾌하게 담아냈습니다.',
      EN: 'Vibrant street food crawl featuring rapid-fire tastings, vendor interactions, and punchy comedic captions.',
    },
    features: {
      KR: ['빠르고 경쾌한 리듬의 핑퐁 컷 편집', '가격 및 메뉴명 깔끔한 정보 팝업', '솔직 담백한 리액션 말풍선 자막'],
      EN: ['Brisk upbeat food montage rhythm', 'Menu pricing pop-up badges', 'Comedic reaction overlays'],
    },
    hasSubtitles: true,
  },
  // 6. 일상(브이로그)
  {
    id: 'item-vlog-designer',
    category: 'vlog_daily',
    title: {
      KR: '스타트업 디자이너의 감각적인 24시간 일상 브이로그',
      EN: 'A Day in the Life of a Tech Product Designer',
    },
    client: 'Studio Mono',
    duration: '08:35',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: {
      KR: '감각적인 오피스 워크스페이스, 모닝 커피 루틴, 팀 미팅 현장을 감각적인 톤으로 담아낸 24시간 일상 브이로그.',
      EN: 'Aesthetic daily vlog capturing morning routines, creative workstation setups, and collaborative product team sprints.',
    },
    features: {
      KR: ['감성적인 모닝 루틴 타임랩스 편집', '잔잔한 로파이 BGM과 조화로운 컷 싱크', '영·한 감성 자막 병기'],
      EN: ['Morning routine speedramping', 'Cozy Lo-Fi audio balance', 'Bilingual subtitle typography'],
    },
    hasSubtitles: true,
  },
  {
    id: 'item-vlog-weekend',
    category: 'vlog_daily',
    title: {
      KR: '주말 홈카페 & 감성 인테리어 리빙 브이로그',
      EN: 'Cozy Weekend Home Cafe & Interior Reset Vlog',
    },
    client: '슬로우 라이프',
    duration: '06:30',
    tools: ['Premiere Pro', 'Audition'],
    thumbnail: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: {
      KR: '원목 가구와 자연광이 어우러진 집안에서의 여유로운 핸드드립 커피와 책 읽기. 편안한 힐링 영상미를 전달합니다.',
      EN: 'Peaceful weekend vlog centered around specialty pour-over brewing, botanical decor, and serene daylight ambiance.',
    },
    features: {
      KR: ['물 붓는 소리와 커피 방울 ASMR 사운드', '미니멀하고 깔끔한 감성 자막', '따뜻한 웜톤 컬러 튜닝'],
      EN: ['Pour-over drip audio enhancement', 'Minimalist calm text overlays', 'Warm cozy daylight color tone'],
    },
    hasSubtitles: false,
  },
  // 7. 헬스(운동)
  {
    id: 'item-fitness-bodyprofile',
    category: 'fitness',
    title: {
      KR: '바디프로필 D-30 극한 헬스 루틴 & 오운완 브이로그',
      EN: 'Body Profile D-30: Hardcore Workout Routine & Motivation',
    },
    client: '팀 피트니스 코리아',
    duration: '07:50',
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: {
      KR: '스쿼트, 데드리프트, 벤치프레스 등 3대 운동 세트와 식단 관리를 담은 모티베이션 영상. 심장을 뛰게 하는 비트 매칭으로 에너지 넘치는 컷을 완성했습니다.',
      EN: 'High-octane fitness motivation video featuring heavy compound lifting, clean nutrition prep, and thunderous beat drops.',
    },
    features: {
      KR: ['반복 세트 카운트 및 중량 모션 인포그래픽', '비트 드롭에 맞춘 슬로우모션 램핑', '운동 자극을 극대화하는 임팩트 사운드 FX'],
      EN: ['Live rep & barbell weight tracking graphics', 'Bass-drop speedramping', 'Hard-hitting training sound effects'],
    },
    hasSubtitles: false,
  },
  {
    id: 'item-fitness-crossfit',
    category: 'fitness',
    title: {
      KR: '크로스핏 게임즈 와드(WOD) 챔피언십 역동적 하이라이트',
      EN: 'CrossFit Games Championship: Dynamic WOD Highlights',
    },
    client: '박스 핏 매거진',
    duration: '04:10',
    tools: ['Premiere Pro', 'After Effects'],
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: {
      KR: '선수들의 한계 돌파 현장을 박진감 넘치는 앵글로 포착한 스포츠 하이라이트 영상.',
      EN: 'Adrenaline-packed athletic showdown cut with kinetic tempo and high-retention pacing.',
    },
    features: {
      KR: ['1초 단위 긴장감 넘치는 빠른 컷 전환', '선수별 기록 타이머 모션 자막', '응원 함성과 거친 호흡을 살린 사운드 믹스'],
      EN: ['Split-second kinetic cuts', 'On-screen interval timer UI', 'Crowd cheering & heavy breathing mix'],
    },
    hasSubtitles: true,
  },
  // 8. 낚시
  {
    id: 'item-fishing-jeju',
    category: 'fishing',
    title: {
      KR: '제주도 대물 방어 선상 지깅 낚시 & 리얼 입질 손맛',
      EN: 'Jeju Deep-Sea Yellowtail Jigging: Epic Strikes & Battles',
    },
    client: '바다낚시 원정대',
    duration: '13:20',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: {
      KR: '제주 앞바다 거친 파도를 뚫고 펼쳐진 1미터급 대물 방어 파이팅. 낚싯대 휨새와 릴 드랙음의 긴박감을 생생하게 살려냈습니다.',
      EN: 'High-seas jigging adventure battling meter-class yellowtails, capturing violent drag screeches and rod bends.',
    },
    features: {
      KR: ['입질 순간 드랙음 사운드 증폭 연출', '선상 멀티캠(고프로+미러리스) 싱크 교차 편집', '수심·채비·어종 정보 깔끔한 그래픽 안내'],
      EN: ['Reel drag scream audio amplification', 'Multicam synchronization on rocking boat', 'Depth and tackle spec telemetry overlay'],
    },
    hasSubtitles: false,
  },
  {
    id: 'item-fishing-bass',
    category: 'fishing',
    title: {
      KR: '안동호 탑워터 배스 낚시 테크닉 & 바이트 슬로우모션',
      EN: 'Lake Bass Topwater Strike: Slow-Motion Surface Bites',
    },
    client: '루어 피싱 클럽',
    duration: '09:10',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    thumbnail: 'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: {
      KR: '물안개 피어오르는 새벽 안동호에서 포착한 배스의 수면 폭발 바이트 순간을 초고속 카메라 슬로우모션으로 담아낸 테크니컬 루어 영상.',
      EN: 'Dawn topwater bass fishing showcasing explosive surface strikes captured in crystal slow-motion.',
    },
    features: {
      KR: ['수면 폭발 입질 순간 120fps 슬로우모션 줌', '루어 운용 액션별 텍스트 설명', '잔잔한 호수 앰비언스 사운드 복원'],
      EN: ['120fps strike slow-motion zooms', 'Lure twitching cadence guides', 'Lake dawn acoustic ambience'],
    },
    hasSubtitles: true,
  },
  // 9. 골프
  {
    id: 'item-golf-swing',
    category: 'golf',
    title: {
      KR: '필드 18홀 라운딩 & 슬로우모션 드라이버 스윙 분석',
      EN: 'Championship 18-Hole Round & Pro Driver Swing Breakdown',
    },
    client: '골프랩 아카데미',
    duration: '10:45',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    description: {
      KR: '푸른 페어웨이에서의 티샷부터 정밀한 퍼팅까지. 궤적 트래킹 라인과 임팩트 사운드를 살려 골퍼들이 몰입할 수 있는 라운딩 하이라이트 영상.',
      EN: 'Pristine fairway round featuring ball flight shot-tracer overlays, impact sound tuning, and slow-mo swing analysis.',
    },
    features: {
      KR: ['샷 트레이서(Shot Tracer) 공 궤적 그래픽', '경쾌하고 시원한 드라이버 타구음 마스터링', '홀별 거리/파/스코어카드 실시간 인포그래픽'],
      EN: ['Shot Tracer trajectory overlays', 'Crisp driver impact acoustic tuning', 'Hole distance & scorecard graphics'],
    },
    hasSubtitles: false,
  },
  {
    id: 'item-golf-course',
    category: 'golf',
    title: {
      KR: '해안 절경 파인비치 명문 코스 명랑 골프 브이로그',
      EN: 'Coastal Pine Beach Golf Vlog: Ocean Views & Fun Rounding',
    },
    client: '골프 앤 라이프',
    duration: '08:15',
    tools: ['Premiere Pro', 'Photoshop'],
    thumbnail: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: {
      KR: '바다를 넘기는 아일랜드 홀과 유쾌한 동반자들과의 티키타카. 골프의 재미와 필드의 청량함을 극대화한 브이로그 영상입니다.',
      EN: 'Ocean-side links round packed with fun banter, thrilling ocean-carry tee shots, and sunny golf lifestyle aesthetics.',
    },
    features: {
      KR: ['바다 바람과 필드 채광을 살린 시원한 블루톤 색보정', '동반자 리액션을 살리는 재치있는 예능 자막', '퍼팅 성공/실패 드라마틱한 배경음악 타이밍'],
      EN: ['Vibrant coastal blue LUT color grading', 'Fun conversational comedy subtitle styling', 'Dramatic putting tension soundtracking'],
    },
    hasSubtitles: true,
  },
];

export const TRANSLATION_SAMPLES: TranslationSample[] = [
  {
    id: 'sample-1',
    title: {
      KR: '실리콘밸리 테크 창업자 인터뷰',
      EN: 'Silicon Valley Founder Interview',
    },
    context: {
      KR: '스타트업 실패 후 피벗(Pivot) 과정에 대해 설명하는 감정적인 순간',
      EN: 'Describing a painful moment before pivoting the startup',
    },
    source: "We were burning cash like crazy and the runway was literally down to two weeks. Everyone told us to pull the plug, but we doubled down on the user feedback loop.",
    literal: '우리는 미친 듯이 현금을 태우고 있었고 활주로는 문자 그대로 2주로 줄어들었습니다. 모두가 우리에게 플러그를 뽑으라고 말했지만, 우리는 사용자 피드백 루프에 두 배로 베팅했습니다.',
    target: '매달 감당하기 힘들 만큼 자금이 바닥나고 있었고, 남은 시간은 고작 2주였습니다. 다들 이제 그만 사업을 접으라며 만류했지만, 우리는 오히려 고객의 생생한 목소리에 모든 것을 걸었습니다.',
    explanation: {
      KR: '스타트업 은어인 "runway"(자금 소진까지의 잔여 기간)와 "pull the plug"(사업을 중단하다)의 비유적 뉘앙스를 한국 창업 생태계에 와닿는 자연스러운 어휘로 탈바꿈했습니다.',
      EN: 'Replaced rigid literal translations ("burning cash", "runway", "pull the plug") with natural business narrative language that carries emotional tension.',
    },
  },
  {
    id: 'sample-2',
    title: {
      KR: '글로벌 크리에이터 브이로그 유머 컷',
      EN: 'Creator Vlog: Casual & Witty Banter',
    },
    context: {
      KR: '갑작스러운 비를 맞으며 친구와 장난스럽게 불평하는 장면',
      EN: 'Playfully complaining while getting caught in sudden rain',
    },
    source: "Look at my hair! I look like a drowned rat, and the worst part is my phone battery just kicked the bucket.",
    literal: '내 머리를 봐! 나는 물에 빠진 쥐처럼 보이고, 가장 나쁜 부분은 내 휴대전화 배터리가 양동이를 찼다는 것입니다.',
    target: '아 내 머리 꼬라지 좀 봐! 완전 물에 빠진 생쥐 꼴인데, 화룡점정으로 폰 배터리까지 저세상 갔네.',
    explanation: {
      KR: '유튜브 시청자의 눈높이에 맞춰 "kicked the bucket"(사망하다/고장나다) 관용구를 최신 한국어 신조어 "저세상 갔다"와 "화룡점정"으로 치환하여 웃음 포인트를 살렸습니다.',
      EN: 'Localized English slang into contemporary Korean digital humor, preserving comedic timing and character authenticity.',
    },
  },
  {
    id: 'sample-3',
    title: {
      KR: 'AI 제품 키노트 프레젠테이션',
      EN: 'AI Keynote: Executive Clarity',
    },
    context: {
      KR: '신기술 도입 시 기존 레거시 시스템과의 호환성을 강조하는 비즈니스 발표',
      EN: 'Highlighting backward compatibility with legacy enterprise systems',
    },
    source: "It doesn't ask you to boil the ocean or rebuild your stack from scratch. It slots seamlessly right into what you already run.",
    literal: '그것은 당신에게 바다를 끓이거나 처음부터 스택을 다시 구축하도록 요구하지 않습니다. 당신이 이미 실행하는 것에 매끄럽게 끼워 맞춥니다.',
    target: '불필요하게 판을 다 뒤엎거나 기존 시스템을 갈아엎을 필요가 없습니다. 지금 사용 중인 워크플로우에 그대로 가볍게 안착합니다.',
    explanation: {
      KR: '비즈니스 관용구 "boil the ocean"(불가능하거나 비효율적으로 판을 크게 벌리다)을 "불필요하게 판을 뒤엎다"로 명쾌하게 풀어내어 전달력을 극대화했습니다.',
      EN: 'Translated corporate idiom "boil the ocean" into precise executive language that communicates frictionless integration.',
    },
  },
];

export const TRUST_STATS: StatItem[] = [
  {
    id: 'stat-1',
    value: '3년+',
    unit: {
      KR: '년+',
      EN: 'Yrs+',
    },
    label: {
      KR: '경력 since 2020',
      EN: 'Experience since 2020',
    },
    sublabel: {
      KR: '예능·여행·일상·브이로그·토크·먹방·헬스·운동·낚시·골프·육아·부동산·인터뷰',
      EN: 'Entertainment, Travel, Daily, Vlog, Talk, Mukbang, Fitness, Workout, Fishing, Golf, Parenting, Real Estate, Interview',
    },
    icon: '🎥',
  },
  {
    id: 'stat-2',
    value: '500,000+',
    unit: {
      KR: '단어',
      EN: 'Words',
    },
    label: {
      KR: '누적 번역 단어 수',
      EN: 'Translated Words',
    },
    sublabel: {
      KR: '전문 용어부터 유튜브 위트 자막까지',
      EN: 'From specialized tech to wit',
    },
    icon: '📝',
  },
  {
    id: 'stat-3',
    value: '98%',
    unit: {
      KR: '만족도',
      EN: 'Satisfaction',
    },
    label: {
      KR: '고객 만족도',
      EN: 'Client Satisfaction',
    },
    sublabel: {
      KR: '5점 만점 기준 4.9점 기록',
      EN: '4.9 / 5.0 Average Rating',
    },
    icon: '⭐️',
  },
  {
    id: 'stat-4',
    value: '85%',
    unit: {
      KR: '재의뢰',
      EN: 'Retention',
    },
    label: {
      KR: '파트너 재의뢰율',
      EN: 'Client Re-hire Rate',
    },
    sublabel: {
      KR: '정기 계약 및 후속 프로젝트 지속',
      EN: 'Ongoing series & retainers',
    },
    icon: '🤝',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: {
      KR: '문의 및 기획 조율',
      EN: 'Inquiry & Consultation',
    },
    desc: {
      KR: '영상 레퍼런스, 목적, 톤앤매너, 희망 납기일을 검토하여 최적의 편집 방향과 번역 가이드를 협의합니다.',
      EN: 'Reviewing reference styles, target audience, tone, and timeline to build custom editing & translation specs.',
    },
    icon: '💬',
    highlight: {
      KR: '카카오톡 오픈채팅 또는 이메일 30분 내 회신',
      EN: 'Quick reply within 30 min via OpenChat/Email',
    },
  },
  {
    step: '02',
    title: {
      KR: '스크립트 번역 & 타임싱크',
      EN: 'Script Translation & Sync',
    },
    desc: {
      KR: '단순 직역을 배제하고 영상의 호흡과 말하는 사람의 어조를 반영하여 완벽한 타임코드 맞춤 자막을 작성합니다.',
      EN: 'Crafting colloquial, nuance-rich translations timed down to milliseconds for effortless readability.',
    },
    icon: '✍️',
    highlight: {
      KR: 'SRT/자막 사전 검토 및 수정 지원',
      EN: 'Pre-edit subtitle approval & adjustment',
    },
  },
  {
    step: '03',
    title: {
      KR: '컷 편집 & 모션 디자인',
      EN: 'Cut Editing & Motion Design',
    },
    desc: {
      KR: '시선을 사로잡는 오프닝 훅, 지루함 없는 컷 전환, 4K 색보정, 볼륨 밸런싱 및 BGM 사운드 마스터링을 진행합니다.',
      EN: 'High-retention opening hooks, dynamic tempo cuts, 4K grading, and immersive audio balancing.',
    },
    icon: '✂️',
    highlight: {
      KR: '지루할 틈 없는 하이라이트 구성',
      EN: 'Rhythmically paced retention curve',
    },
  },
  {
    step: '04',
    title: {
      KR: '시사(Preview) 및 마스터 납품',
      EN: 'Preview & Master Delivery',
    },
    desc: {
      KR: '비공개 프리뷰 링크로 피드백을 수렴하여 디테일을 보정하고, 플랫폼별 최적화된 마스터 영상 및 자막본을 납품합니다.',
      EN: 'Private preview link review with fast revisions, delivering final 4K masters and standalone subtitle files.',
    },
    icon: '🚀',
    highlight: {
      KR: '기본 2회 꼼꼼한 수정 피드백 포함',
      EN: 'Includes 2 rounds of precision revisions',
    },
  },
];
