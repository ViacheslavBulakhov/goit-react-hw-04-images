import axios from 'axios';

export async function fetchArticles({ page, searchQuery }) {
  const API_KEY = '32899430-8e4282f6a276a3be5999f0793';
  const perPage = 12;

  const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    timeout: 1000,
    params: {
      key: `${API_KEY}`,
      q: `${searchQuery}`,
      page: `${page}`,
      per_page: `${perPage}`,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });

  const response = await instance;
  return response()
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}
