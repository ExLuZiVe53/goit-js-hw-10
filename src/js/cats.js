import '../css/common.css';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchBreedsAuto, fetchCatByBreed } from './cat-api';

// axios.defaults.headers.common['x-api-key'] =
//   'live_xHJI2SqFGgGKcxowQZaISzhfoylqpxintocK4n97CiiSy4vIKaPZq3xGgkqRWlbP';

console.log('Hello');

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  infoCat: document.querySelector('.cat-info'),
  // spiner: document.querySelector('.loader-spiner'),
};

function slimSelectEl() {
  new SlimSelect({
    select: refs.select,
    settings: {
      showSearch: false,
      searchText: 'Sorry nothing to see here',
      searchPlaceholder: 'Search for the good stuff!',
      searchHighlight: true,
    },
  });
}

refs.error.classList.add('is-hidden');
refs.infoCat.classList.add('is-hidden');
refs.select.classList.add('is-hidden');

fetchBreedsAuto()
  .then(data => {
    refs.select.innerHTML = createListMarkup(data);
    slimSelectEl();
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');
  })
  .catch(onError);

refs.select.addEventListener('change', onSelect);

function onSelect(event) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.select.classList.add('is-hidden');
  refs.infoCat.classList.add('is-hidden');
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.select.classList.remove('is-hidden');
      createMarkup(data);

      refs.infoCat.classList.remove('is-hidden');
    })
    .catch(onError);
}

function createListMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createMarkup(data) {
  const cardMarkup = data
    .map(el => {
      return `<div class="flex"><img src="${el.url}" alt="${el.breeds[0].name}" width="500"/><div class="wrapper"><h2>${el.breeds[0].name}</h2><p>${el.breeds[0].description}</p><h3>Temperament</h3><p>${el.breeds[0].temperament}</p></div></div>`;
    })
    .join('');
  refs.infoCat.innerHTML = cardMarkup;
}

function onError(error) {
  refs.select.classList.remove('is-hidden');
  refs.loader.classList.replace('loader', 'is-hidden');
  console.log(error);
  refs.infoCat.innerHTML = '';

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
