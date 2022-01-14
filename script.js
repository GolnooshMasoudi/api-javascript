'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   console.log(request.responseText);
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫${(
//               +data.population / 1000000
//             ).toFixed(1)}</span></p>
//             <p class="country__row"><span>🗣️${
//               Object.keys(data.languages)[0]
//             }</span></p>
//             <p class="country__row"><span>💰${
//               Object.keys(data.currencies)[0]
//             }</span></p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('iran');
// getCountryData('sweden');
// getCountryData('usa');
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
              <h3 class="country__name">${Object.values(data.name)[0]}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫${(
                +data.population / 1000000
              ).toFixed(1)}</span></p>
              <p class="country__row"><span>🗣️${
                Object.keys(data.languages)[0]
              }</span></p>
              <p class="country__row"><span>💰${
                Object.keys(data.currencies)[0]
              }</span></p>
            </div>
          </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //AJAX Call Country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //RENDER cOUNTRY 1
    renderCountry(data);
    //Get Neighbour Country
    const [neighbour] = data.borders;

    if (!neighbour) return;
    //AJAX Call Country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('sweden');

//TRY TO USE FETCH //
//   const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

//   const request = new XMLHttpRequest();

//TRY TO CONSUME PROMISE

// const getCountryData = function (country) {
//country1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;
//       //country2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'));
// };
// getCountryData('china');
