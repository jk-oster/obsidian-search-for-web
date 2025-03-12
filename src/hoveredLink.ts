import { ref, onMounted, onUnmounted } from 'vue';

export function useHoveredLink(delay: number = 100) {
  const hoveredLink = ref(null);
  let timeout = 0;

  function handleMouseOver(event: Event) {
    // @ts-ignore
    if (event?.target?.tagName === 'A' || event?.target?.closest('a')) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // @ts-ignore
        hoveredLink.value = (event?.target?.href ? event?.target?.href : event?.target?.closest('a')?.href) ?? '';
      }, delay);
    }
  }
  
  function handleMouseOut(event: Event) {
    // @ts-ignore
    if (event?.target?.tagName === 'A' || event?.target?.closest('a')) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        hoveredLink.value = null;
      }, delay);
    }
  }

  onMounted(() => {
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
  });

  onUnmounted(() => {
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
  });

  return { 
    hoveredLink 
  };
}
