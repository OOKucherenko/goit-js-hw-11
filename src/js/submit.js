import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchQuery } from './fetch';
import { renderListCard } from './renderData';

const refs = {
  form: document.querySelector('#search-form'),
  images: document.querySelector('.gallery'),
  btn: document.querySelector('.load-more'),
};
let page = 1;
let query = '';

const reset = () => {
  page = 1;
  query = '';
  refs.images.innerHTML = '';
};

const onSubmit = (e, markup) => {
  reset();
  e.preventDefault();

  const {
    elements: {
      searchQuery: { value },
    },
  } = e.currentTarget;
  query = value;
  fetchQuery(query, page).then(data => {
    if (data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.btn.style.display = 'none';
      return;
    }
    if (data.totalHits > 0) {
      Notify.success('Hooray! We found totalHits images.');
      refs.btn.style.display = 'flex';
    }
    if (data.totalHits <= 40) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      refs.btn.style.display = 'none';
    }
    renderListCard(data);
  });
  e.currentTarget.reset();
  return query;
};

export { onSubmit, query };
