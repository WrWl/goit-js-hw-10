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


input.addEventListener("input", _.debounce((country) => {
    country = input.value.trim();
    
    if (fetchCountries(country).length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if (fetchCountries(country).length <= 10 && fetchCountries(country).length >= 2) {
        fetchCountries(country)
            .then(outputCountries);
        
    }
        
    else if (fetchCountries == 1) {
         fetchCountries(country)
            .then(outputCountry)
        
    }
    
    
}, DEBOUNCE_DELAY))