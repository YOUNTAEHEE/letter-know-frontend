import { create } from 'zustand';

// Zustand 상태의 타입 정의
interface LocaleState {
  locale: string; // 로케일은 문자열
  toggleLocale: () => void; // 로케일을 전환하는 함수
}

// Zustand store 생성
const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'ko', // 기본 로케일을 'ko'로 설정
  toggleLocale: () => set((state) => ({
    locale: state.locale === 'ko' ? 'en' : 'ko', // 'ko' <-> 'en' 전환
  })),
}));

export default useLocaleStore;