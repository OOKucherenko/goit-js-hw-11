import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  images: document.querySelector('.gallery'),
};
const page = 1;
const onSubmit = e => {
  e.preventDefault();

  const {
    elements: {
      searchQuery: { value },
    },
  } = e.currentTarget;

  fetchQuery(value, page).then(data => {
    if (data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  });
  e.currentTarget.reset();
};
refs.form.addEventListener('submit', onSubmit);

// refs.images.addEventListener('click', onClick);
const KEY = '33375890-4af8fec24bfa9f2a58a45d278';

const fetchQuery = async (query, page) => {
  const URL = `https://pixabay.com/api/?key=${KEY}&q=${query}&per_page=40&page=${page}&orientation=horizontal&safesearch=true&image_type=photo`;

  try {
    const dataQuery = await axios.get(URL).then(res => res);
    const { data } = dataQuery;
    renderListCard(data);

    return data;
  } catch (error) {
    {
      console.log(error.message);
    }
  }
};

const renderListCard = ({ hits }) => {
  const markup = hits
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
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${views}
      </p>
      <p class="info-item">
        <b>Comments</b> ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> ${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');
  refs.images.innerHTML = markup;
};
