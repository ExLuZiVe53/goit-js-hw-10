import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_xHJI2SqFGgGKcxowQZaISzhfoylqpxintocK4n97CiiSy4vIKaPZq3xGgkqRWlbP';

const BASE_URL = 'https://api.thecatapi.com/v1';

function fetchBreedsAuto() {
  return axios
    .get(`${BASE_URL}/breeds`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'live_xHJI2SqFGgGKcxowQZaISzhfoylqpxintocK4n97CiiSy4vIKaPZq3xGgkqRWlbP',
      },
    })
    .then(resp => {
      return resp.data;
    });
}
function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios
    .get(`${BASE_URL}/images/search?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'live_xHJI2SqFGgGKcxowQZaISzhfoylqpxintocK4n97CiiSy4vIKaPZq3xGgkqRWlbP',
      },
    })
    .then(resp => {
      if (!resp.data.length) {
        throw new Error(resp.statusText);
      }
      return resp.data;
    });
}

export { fetchBreedsAuto, fetchCatByBreed };
