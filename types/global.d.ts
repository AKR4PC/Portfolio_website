export {};

declare global {
  interface Window {
    __portfolioLenis?: {
      scrollTo: (
        target: HTMLElement | string,
        options?: { offset?: number; duration?: number; immediate?: boolean },
      ) => void;
      stop: () => void;
      start: () => void;
    };
  }
}
