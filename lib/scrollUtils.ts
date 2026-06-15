/**
 * Custom smooth scrolling utility powered by requestAnimationFrame.
 * Guarantees buttery-smooth cubic-bezier eased scrolling across all mobile and desktop browsers,
 * bypasses buggy native implementations (especially in iOS Safari).
 */
export const smoothScrollTo = (targetY: number, duration: number = 800) => {
  if (typeof window === "undefined") return;
  
  const startY = window.scrollY || document.documentElement.scrollTop;
  const difference = targetY - startY;
  let startTime: number | null = null;

  // Premium cubic-bezier transition matching Apple's easing
  const easeInOutCubic = (t: number) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const animateScroll = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percent = Math.min(progress / duration, 1);
    
    const easedPercent = easeInOutCubic(percent);
    window.scrollTo(0, startY + difference * easedPercent);

    if (progress < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};
