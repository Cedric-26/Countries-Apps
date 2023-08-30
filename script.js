const countriesList = document.getElementById('countries-list');
const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('region');
const themeSwitch = document.getElementById('theme-switch');

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await response.json();

        countriesList.innerHTML = '';
        countriesData.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            countryCard.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common}">
                <h2>${country.name.common}</h2>
                <p>Population: ${country.population}</p>
                <p>Region: ${country.region}</p>
            `;
            countriesList.appendChild(countryCard);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function filterCountries() {
    const searchText = searchInput.value.toLowerCase();
    const selectedRegion = regionSelect.value.toLowerCase();
    const countryCards = countriesList.getElementsByClassName('country-card');

    Array.from(countryCards).forEach(card => {
        const countryName = card.querySelector('h2').textContent.toLowerCase();
        const countryRegion = card.querySelector('p:nth-child(3)').textContent.toLowerCase();

        if (
            countryName.includes(searchText) &&
            (selectedRegion === '' || countryRegion.includes(selectedRegion))
        ) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

fetchCountries();
searchInput.addEventListener('input', filterCountries);
regionSelect.addEventListener('change', filterCountries);