import { FormErrors } from '@/Pages/Dashboard/Index';

export const scrollToInvalidLink = (errors: FormErrors) => {
  const firstErrorId = Object.keys(errors)[0];

  if (!firstErrorId) return;

  const element = document.getElementById(`link-${firstErrorId}`);
  const scrollContainer = document.querySelector('.custom-scrollbar');

  if (!element || !scrollContainer) return;

  element.scrollIntoView({ block: 'nearest' });

  setTimeout(() => {
    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const offsetPosition =
      elementRect.top - containerRect.top + scrollContainer.scrollTop;

    scrollContainer.scrollTo({
      top: offsetPosition - 20,
      behavior: 'smooth'
    });

    const input = element.querySelector('input');
    input?.focus();
  }, 100);
};
