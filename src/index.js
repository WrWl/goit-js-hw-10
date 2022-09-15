import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;


function outputCountry(countries) {
    const markup = countries
        .map((country) => {
            return `<div class="country-info">
        
        <img src = "${country.flags.svg}" width = 20>
        <p><b>Name</b>:${country.name.official}</p>
        <p><b>Capital</b>:${country.capital}</p>
        <p><b>Population</b>:${country.population}</p>
        <p><b>Languages</b>:${Object.values(country.languages)}</p>
        
        </div>
        `
        })
        .join("");
  countryInfo.innerHTML = markup;
} 
function outputCountries(countries) {
    const markup = countries
        .map((country) => {
            return `<ul class="country-list">
        <li>
        <img src = "${country.flags.svg}" width = 20>
        <p><b>Name</b>:${country.name.official}</p>
        </li>
        </ul>
        `
        })
        .join("");
  countryList.innerHTML = markup;
} 


input.addEventListener("input",
    _.debounce(country => {
    country = input.value.trim();
        fetchCountries(country)
            .then(data => {
                if (data.length > 10) {
                    Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            return
                } else if (data.length <= 10 && data.length >= 2) {
                    outputCountries(data);
                    countryInfo.innerHTML = '';
                } else if (data.length === 1) {
                    outputCountry(data);
                    countryList.innerHTML = '';
                }
            })
            .catch(() => {
                Notify.failure("Oops, there is no country with that name");
                countryList.innerHTML = '';
                countryInfo.innerHTML = '';
   })
    
    
}, DEBOUNCE_DELAY))