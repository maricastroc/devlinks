import { FieldErrors } from 'react-hook-form';

export const scrollToInvalidInput = (
  errors: FieldErrors,
  containerRef?: React.RefObject<HTMLElement>
) => {
  requestAnimationFrame(() => {
    const firstErrorKey = Object.keys(errors)[0];
    if (!firstErrorKey) return;

    const element =
      document.getElementById(firstErrorKey) ||
      document.querySelector(`[name="${firstErrorKey}"]`);

    if (!element) {
      console.warn(`Element for field ${firstErrorKey} not found`);
      return;
    }

    if (containerRef?.current) {
      const container = containerRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const scrollPosition =
        elementRect.top - containerRect.top + container.scrollTop - 20;

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    } else {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    const focusable =
      element.querySelector('input, textarea, select') || element;
    (focusable as HTMLElement)?.focus();
  });
};
