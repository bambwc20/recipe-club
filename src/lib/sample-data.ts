export type Recipe = {
  id: string;
  title: string;
  summary: string;
  emoji: string;
  cookTime: string;
  difficulty: string;
  premium: boolean;
  ingredients: string[];
  steps: string[];
};

export const sampleRecipes: Recipe[] = [
  {
    id: "kimchi-jjigae",
    title: "묵은지 돼지고기 김치찌개",
    summary: "묵은지 하나로 맛집처럼 끓이는 비법. 쌀뜨물이 포인트.",
    emoji: "🍲",
    cookTime: "25분",
    difficulty: "쉬움",
    premium: false,
    ingredients: [
      "묵은지 300g",
      "돼지고기 목살 200g",
      "두부 1/2모",
      "대파 1대",
      "쌀뜨물 500ml",
      "고춧가루 1큰술",
      "다진마늘 1큰술",
    ],
    steps: [
      "돼지고기는 먹기 좋은 크기로 썰어 소금·후추로 밑간",
      "냄비에 기름 두르고 김치와 돼지고기를 볶아 향을 올림",
      "쌀뜨물을 붓고 끓인 뒤 고춧가루·마늘 추가",
      "중불에서 15분 끓이고 두부·대파 넣고 5분 더",
    ],
  },
  {
    id: "creamy-pasta",
    title: "10분 크림 파스타",
    summary: "우유와 파마산 치즈만으로 끝내는 속성 크림파스타.",
    emoji: "🍝",
    cookTime: "10분",
    difficulty: "쉬움",
    premium: false,
    ingredients: [
      "스파게티 120g",
      "우유 200ml",
      "파마산 치즈 30g",
      "버터 1큰술",
      "다진마늘 1작은술",
      "소금·후추",
    ],
    steps: [
      "스파게티를 소금물에 8분 삶기",
      "팬에 버터 녹이고 마늘 볶음",
      "우유와 파마산 치즈 넣고 저어가며 끓이기",
      "삶은 면을 넣고 30초 볶기, 후추로 마무리",
    ],
  },
  {
    id: "teriyaki-chicken",
    title: "데리야키 치킨덮밥",
    summary: "간장 3, 미림 2, 설탕 1 황금비율로 만드는 덮밥.",
    emoji: "🍱",
    cookTime: "20분",
    difficulty: "쉬움",
    premium: false,
    ingredients: [
      "닭다리살 300g",
      "밥 2공기",
      "간장 3큰술",
      "미림 2큰술",
      "설탕 1큰술",
      "생강 약간",
    ],
    steps: [
      "닭고기는 포크로 찔러 간장 반 큰술로 밑간",
      "팬에 기름 두르고 껍질쪽부터 노릇하게 굽기",
      "간장·미림·설탕·생강 소스 넣고 졸이기",
      "밥 위에 얹고 쪽파로 마무리",
    ],
  },
  {
    id: "galbi-jjim",
    title: "[프리미엄] 전통 갈비찜",
    summary: "명절 상에 올리던 손맛, 압력솥 없이도 부드럽게.",
    emoji: "🥘",
    cookTime: "90분",
    difficulty: "중간",
    premium: true,
    ingredients: [
      "소갈비 1kg",
      "배 1/2개",
      "양파 1개",
      "당근·감자",
      "대추·밤·은행",
      "간장·설탕·마늘",
    ],
    steps: [
      "갈비는 찬물에 2시간 핏물 빼기",
      "배즙·간장·설탕·마늘로 양념 만들기",
      "갈비·양념을 섞고 30분 재우기",
      "냄비에 물 붓고 1시간 약불에 졸이기",
    ],
  },
  {
    id: "bibimbap",
    title: "[프리미엄] 전주식 비빔밥",
    summary: "나물 5종을 따로 무치는 전통 방식.",
    emoji: "🍚",
    cookTime: "40분",
    difficulty: "중간",
    premium: true,
    ingredients: [
      "밥",
      "시금치·콩나물·도라지·고사리·호박나물",
      "소고기 우둔살",
      "계란 프라이",
      "고추장·참기름",
    ],
    steps: [
      "각 나물을 따로 무치기",
      "소고기는 간장·설탕에 볶기",
      "돌솥에 밥·나물·소고기 담기",
      "계란 프라이 올리고 고추장·참기름",
    ],
  },
  {
    id: "tom-yum",
    title: "[프리미엄] 홈메이드 똠얌꿍",
    summary: "태국 현지 맛을 재현하는 5가지 허브 조합.",
    emoji: "🍤",
    cookTime: "30분",
    difficulty: "중간",
    premium: true,
    ingredients: [
      "새우 10마리",
      "레몬그라스·라임잎·갈랑가",
      "양송이버섯",
      "피쉬소스·라임즙",
      "칠리페이스트",
    ],
    steps: [
      "물에 허브 3종 넣고 10분 끓이기",
      "버섯과 새우 넣고 3분 익히기",
      "피쉬소스·라임즙·칠리페이스트로 간",
      "고수 올리고 마무리",
    ],
  },
];
