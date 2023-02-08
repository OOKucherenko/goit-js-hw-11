import { onSubmit, onBthLoadMore, goToTop } from './js/index';

const refs = {
  form: document.querySelector('#search-form'),
  btn: document.querySelector('.load-more'),
  backToTopButton: document.querySelector('.back-to-top'),
};

refs.form.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onBthLoadMore);
refs.backToTopButton.addEventListener('click', goToTop);
