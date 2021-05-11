let term = '';
const countryContainer = document.getElementById('countryContainer');

const updateTerm = () => {
    term = document.getElementById('searchInput').value;
    if(!term || term === '') {
        alert('please enter a search term');
    } else {
            const url = `https://covid-api.mmediagroup.fr/v1/cases?country=${term}`;

            fetch(url)
            .then((res) => {
                return res.json(); 
            })
            .then((data) => {
                const cData = data;
                console.log(cData)

                let recoverCalc = Math.ceil(data.All.recovered / data.All.confirmed * 100) + '%';
                let deathCalc = Math.ceil(data.All.deaths / data.All.confirmed * 100) + '%';

                const name = document.getElementById('country').innerHTML = data.All.country;
                const population = document.getElementById('population').innerHTML = data.All.population;
                const confirmed = document.getElementById('confirmed').innerHTML = data.All.confirmed;
                const recovered = document.getElementById('recovered').innerHTML = data.All.recovered;
                const deaths = document.getElementById('deaths').innerHTML = data.All.deaths;

                const pRecovered = document.getElementById('recovery').innerHTML = recoverCalc;
                const pdeath = document.getElementById('mortality').innerHTML = deathCalc;
            })
            .catch(error => console.log('request failed', error));
                }
            };

            const searchBtn = document.querySelector('button');
            searchBtn.addEventListener('click', updateTerm);

            document.addEventListener('play', event => {
                const audio = document.getElementsByTagName('audio');

                for(let i = 0; i < audio.length; i++) {
                    if(audio[i] != event.target) {
                        audio[i].pause();
                    }
                }
            }, true);