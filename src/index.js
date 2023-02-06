import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  images: document.querySelector('.gallery'),
  btn: document.querySelector('.load-more'),
  btnUp: document.querySelector('.to-up'),
};
let gallery = new SimpleLightbox('.gallery a');
let page = 1;
let query = '';
//let markup = '';

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
      return;
    }
    if (data.totalHits > 0) {
      Notify.success('Hooray! We found totalHits images.');
    }
    if (data.totalHits <= 40) {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    renderListCard(data);
    //refs.images.innerHTML = markup;
    //gallery.refresh();

    refs.btn.style.display = 'flex';
  });
  e.currentTarget.reset();
  return query;
};
refs.form.addEventListener('submit', onSubmit);

const KEY = '33375890-4af8fec24bfa9f2a58a45d278';

const fetchQuery = async (query, page) => {
  const URL = `https://pixabay.com/api/?key=${KEY}&q=${query}&per_page=40&page=${page}&orientation=horizontal&safesearch=true&image_type=photo`;

  try {
    const dataQuery = await axios.get(URL).then(res => res);
    const { data } = dataQuery;

    return data;
  } catch (error) {
    {
      console.log(error.message);
    }
  }
};

const renderListCard = ({ hits }) => {
  markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item"><b>Likes</b><br>${likes}</p>
            <p class="info-item"><b>Views</b><br>${views}</p>
            <p class="info-item"><b>Comments</b><br>${comments}</p>
            <p class="info-item"><b>Downloads</b><br>${downloads}</p>
        </div>
        </div>
  `;
      }
    )
    .join('');
  refs.images.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
};

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
      refs.btn.style.display = 'none';
      return;
    }
    renderListCard(data);
    refs.btn.style.display = 'flex';
  });
};
refs.btn.addEventListener('click', onBthLoadMore);

refs.btnUp.addEventListener('click', () => {
  refs.form.scrollIntoView(top);
});
