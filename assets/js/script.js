let term = '';
const countryContainer = document.getElementById('countryContainer');

const updateTerm = () => {
    term = document.getElementById('searchInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const words = term.split(" ");
    
    
    
    if(!term || term === '') {
        errorMessage.classList.add('error');
        errorMessage.innerHTML = "please enter a countries name"
    } else {
        
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
        }
        term = words.join(" ");

        const url = `https://covid-api.mmediagroup.fr/v1/cases?country=${term}`;
        
        fetch(url)
        .then((res) => {
            return res.json(); 
        })
        .then((data) => {
            errorMessage.classList.remove('error');
            errorMessage.innerHTML = ' ';
            
            const cData = data;
            const update = document.getElementById('lastUpdated'); 
            const updatedData = data[Object.keys(data)[1]];
            console.log(cData)
            
            let recoverCalc = Math.ceil(data.All.recovered / data.All.confirmed * 100) + '%';
            let deathCalc = Math.ceil(data.All.deaths / data.All.confirmed * 100) + '%';
            
            
            if (data.All.updated != undefined) {
                update.innerHTML = data.All.updated.slice(0, 10);
            } else if (updatedData != undefined) {
                update.innerHTML = data[Object.keys(data)[1]].updated.slice(0, 10);
            } else {
                update.innerHTML = 'Update not found'
            }
            
            function thOrMi(number){
                let num = number.toString().length;
                console.log(num);
                switch(num) {
                    case 4:
                    return number.toString().slice(0,1) + 'K';
                    break;
                    
                    case 5:
                    return number.toString().slice(0,2) + 'K';
                    break;

                    case 6:
                    return number.toString().slice(0,3) + 'K';
                    break;

                    case 7:
                    return number.toString().slice(0,1) + 'M';
                    break;
                    
                    case 8:
                    return number.toString().slice(0,2) + 'M';
                    break;
                    
                    case 9:
                    return number.toString().slice(0,3) + 'M';
                    break;
                    
                    case 10:
                    return number.toString().slice(0,1) + 'B';
                    break;
                    
                    default: 
                    return number.toString().slice(0,2) + 'B';    
                }
            }

            document.getElementById('country').innerHTML = data.All.country;
            document.getElementById('population').innerHTML = thOrMi(data.All.population);
            document.getElementById('confirmed').innerHTML = thOrMi(data.All.confirmed);
            document.getElementById('recovered').innerHTML = thOrMi(data.All.recovered);
            document.getElementById('deaths').innerHTML = thOrMi(data.All.deaths);          
            document.getElementById('recovery').innerHTML = recoverCalc;
            document.getElementById('mortality').innerHTML = deathCalc;
            
            let easy = thOrMi(data.All.population);
            console.log(easy);
            
            
        })
        .catch(error => {
            errorMessage.innerHTML = "ERROR! Make sure the country is spelled correctly";
            errorMessage.classList.add('error');
            
            console.log('request failed', error);
        }
        )};
    };
    
    const searchBtn = document.querySelector('button');
    const searchInpt = document.getElementById('searchInput')
    searchBtn.addEventListener('click', updateTerm);
    searchInpt.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          searchBtn.click();
        }
      }); 