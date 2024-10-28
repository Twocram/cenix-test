export const useObserver = (el: HTMLElement, callback: () => void) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  });

  observer.observe(el);
};
