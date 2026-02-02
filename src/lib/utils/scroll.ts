export function getHeaderOffset(defaultDesktop = 80, defaultMobile = 64): number {
  if (typeof window === 'undefined') {
    return defaultDesktop;
  }

  const header = document.querySelector('header');
  const headerHeight = header?.getBoundingClientRect().height;
  if (headerHeight && headerHeight > 0) {
    return headerHeight;
  }

  return window.innerWidth >= 1024 ? defaultDesktop : defaultMobile;
}

export function getScrollTargetTop(element: HTMLElement, extraOffset = 0): number {
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  return elementTop - getHeaderOffset() - extraOffset;
}
