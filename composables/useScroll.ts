export default function useScroll() {
  const isScrolledToTop = ref(true);

  function checkScrollPosition() {
    isScrolledToTop.value = window.scrollY === 0;
  }

  onMounted(() => {
    window.addEventListener("scroll", checkScrollPosition);
  });

  return {
    isScrolledToTop,
  };
}
