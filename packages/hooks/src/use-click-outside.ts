import { onBeforeUnmount, onMounted, Ref } from "vue";

export const useClickOutside = (
  elementRef: Ref<HTMLElement | null>,
  callback: (event: MouseEvent) => any
) => {
  const onDocumentClick = (event: MouseEvent) => {
    if (!elementRef.value) {
      return;
    }
    if (!elementRef.value.contains(event.target as Node)) {
      callback(event);
    }
  };

  onMounted(() => {
    document.addEventListener("click", onDocumentClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", onDocumentClick);
  });
};
