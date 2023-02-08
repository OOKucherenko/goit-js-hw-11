import axios from 'axios';
const fetchQuery = async (query, page) => {
  const KEY = '33375890-4af8fec24bfa9f2a58a45d278';
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

export { fetchQuery };
