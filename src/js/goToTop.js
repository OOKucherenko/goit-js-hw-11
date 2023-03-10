const backToTopButton = document.querySelector('.back-to-top');
const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener('scroll', () => {
  if (scrollContainer().scrollTop > 70) {
    backToTopButton.classList.remove('hidden');
  } else {
    backToTopButton.classList.add('hidden');
  }
});
const goToTop = () => {
  document.body.scrollIntoView({
    behavior: 'smooth',
  });
};
export { goToTop };
