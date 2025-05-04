export const scrollToLastLink = () => {
  const linkElements = document.querySelectorAll('[id^="link-"]');

  if (linkElements.length === 0) return;

  const lastLink = linkElements[linkElements.length - 1];
  const scrollContainer = document.querySelector('.custom-scrollbar');

  if (!lastLink || !scrollContainer) return;

  setTimeout(() => {
    const containerRect = scrollContainer.getBoundingClientRect();
    const elementRect = lastLink.getBoundingClientRect();

    const offsetPosition =
      elementRect.top - containerRect.top + scrollContainer.scrollTop - 20;

    scrollContainer.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    const input = lastLink.querySelector('input');
    input?.focus();
  }, 100);
};
