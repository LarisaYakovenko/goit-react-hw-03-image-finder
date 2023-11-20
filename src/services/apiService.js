import axios from "axios";
const API_KEY = '39853966-e469fabc3a3d91d6ce6cd4aef';
axios.defaults.baseURL = 'https://pixabay.com/';

export async function getImages(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  return await axios.get('/api/', { params });
}





