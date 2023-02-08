import { fetchQuery } from './fetch';
import { query } from './submit';
import { renderListCard } from './renderData';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btn = document.querySelector('.load-more');
let page = 1;
const onBthLoadMore = e => {
  page += 1;
  fetchQuery(query, page).then(data => {
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    if (data.totalHits <= 40) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      btn.style.display = 'none';
      return;
    }
    renderListCard(data);
    btn.style.display = 'flex';
  });
};

export { onBthLoadMore };
