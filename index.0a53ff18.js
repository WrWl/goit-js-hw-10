function n(n){return fetch(`https://restcountries.com/v3.1/name/${n}?fields=name,capital,population,languages,flags`).then((n=>{if(!n.ok)throw new Error(n.status);return n.json()})).catch((n=>console.log(n)))}const t=document.querySelector("#search-box"),e=document.querySelector(".country-list"),o=document.querySelector(".country-info");function a(n){const t=n.map((n=>`<div class="country-info">\n        \n        <img src = "${n.flags.svg}" width = 20>\n        <p><b>Name</b>:${n.name.official}</p>\n        <p><b>Capital</b>:${n.capital}</p>\n        <p><b>Population</b>:${n.population}</p>\n        <p><b>Languages</b>:${n.languages}</p>\n        \n        </div>\n        `)).join("");o.innerHTML=t}function i(n){const t=n.map((n=>`<ul class="country-list">\n        <li>\n        <img src = "${n.flags.svg}" width = 20>\n        <p><b>Name</b>:${n.name.official}</p>\n        </li>\n        </ul>\n        `)).join("");e.innerHTML=t}t.addEventListener("input",_.debounce((e=>{n(e=t.value).length>10?alert("too much"):n(e).length<=10&&n(e).length>=2?n(e).then(i):1==n?n(e).then(a):alert("eror")}),300));
//# sourceMappingURL=index.0a53ff18.js.map