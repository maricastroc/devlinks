import { FormErrors } from '@/Pages/Dashboard/Index';

// utils/scrollToInvalidLink.ts
export const scrollToInvalidLink = (errors: FormErrors) => {
  // Pega o primeiro erro disponível
  const firstErrorId = Object.keys(errors)[0];
  if (!firstErrorId) return;

  const element = document.getElementById(`link-${firstErrorId}`);
  const scrollContainer = document.querySelector('.custom-scrollbar');

  if (!element || !scrollContainer) return;

  // Força a renderização inicial
  element.scrollIntoView({ block: 'nearest' });

  // Ajuste fino com timeout
  setTimeout(() => {
    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const offsetPosition =
      elementRect.top - containerRect.top + scrollContainer.scrollTop;

    scrollContainer.scrollTo({
      top: offsetPosition - 20, // 20px de margem
      behavior: 'smooth'
    });

    // Foca no campo com erro
    const input = element.querySelector('input');
    input?.focus();
  }, 100);
};
