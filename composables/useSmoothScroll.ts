export const useSmoothScroll = () => {
  const smoothScrollTo = (target: any, duration = 500, offset = 0) => {
    console.log("target in smooth", target);
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
    const startingPosition = window.pageYOffset;
    const distance = targetPosition - startingPosition;
    let startTime: any = null;

    if (duration <= 1) {
      console.log("direct scrolling", targetPosition);

      setTimeout(() => {
        window.scrollTo(0, targetPosition);
      }, 10);
      return;
    }

    const animateScroll = (currentTime: any) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startingPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    };

    const ease = (t: any, b: any, c: any, d: any) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame((time) => {
      animateScroll(time);
    });
  };

  return {
    smoothScrollTo,
  };
};
