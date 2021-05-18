let term = '';
const countryContainer = document.getElementById('countryContainer');

const updateTerm = () => {
    term = document.getElementById('searchInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const words = term.split(" ");
    
    //Searches the term but if the term isn't met it passes an error
    
    if(!term || term === '') {
        errorMessage.classList.add('error');
        errorMessage.innerHTML = "ERROR: Search Box empty"
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
            //Whenever the term is correct it removes an error if it was visable before
            errorMessage.classList.remove('error');
            errorMessage.innerHTML = '---';
            

            //variables to use later
            const cData = data;
            const update = document.getElementById('lastUpdated'); 
            const updatedData = data[Object.keys(data)[1]];
            console.log(cData)
            
            let recoverCalc = Math.ceil(data.All.recovered / data.All.confirmed * 100) + '%';
            let deathCalc = Math.ceil(data.All.deaths / data.All.confirmed * 100) + '%';


            //Whenever the updated isn't found it goes to the next Object item and fings the last updated
            
            if (data.All.updated != undefined) {
                update.innerHTML = "Last Updated: " + data.All.updated.slice(0, 10);
            } else if (updatedData != undefined) {
                update.innerHTML = "Last Updated: " + data[Object.keys(data)[1]].updated.slice(0, 10);
            } else {
                update.innerHTML = 'Update not found'
            }

            //Function takes a large number and adds commas in the correct places
            function formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
              }

            //grabs the documents ID's and replaces the Inner with the correct information

            document.getElementById('country').innerHTML = data.All.country;
            document.getElementById('population').innerHTML = formatNumber(data.All.population);
            document.getElementById('confirmed').innerHTML =  formatNumber(data.All.confirmed);           
            document.getElementById('recovered').innerHTML =  formatNumber(data.All.recovered);           
            document.getElementById('deaths').innerHTML =  formatNumber(data.All.deaths);     
            document.getElementById('recovery').innerHTML = recoverCalc;
            document.getElementById('mortality').innerHTML = deathCalc;






            //SUB COUNTRIES SECTION (IF APPLICABLE)
        dataO = Object.entries(cData)
        console.log(dataO)
        
        
        subCountryContainer = document.getElementById('subCountryBox');
        
            return dataO.map(sub => { 


                const paragraph = document.createElement('p');
                const article = document.createElement('article')
                article.classList.add('subCountry')
                subCountry = document.createElement('h3')
                subCountry.innerHTML = sub[0]
                
                const subCasesDiv = document.createElement('div'),
                casesParagraph = document.createElement('p')
                casesParagraph.innerHTML = "Cases",
                subCases = document.createElement('p')
                subCases.innerHTML = sub[1].confirmed
                
                subCasesDiv.appendChild(casesParagraph)
                subCasesDiv.appendChild(subCases)

                const subRecoveredDiv = document.createElement('div'),
                recoveredParagraph = document.createElement('p')
                recoveredParagraph.innerHTML = "Recovered",
                subRecovered = document.createElement('p')
                subRecovered.innerHTML = sub[1].recovered
                
                subRecoveredDiv.appendChild(recoveredParagraph)
                subRecoveredDiv.appendChild(subRecovered)

                const subDeathsDiv = document.createElement('div'),
                deathsParagraph = document.createElement('p')
                deathsParagraph.innerHTML = "Deaths",
                subDeaths = document.createElement('p')
                subDeaths.innerHTML = sub[1].deaths
                
                subDeathsDiv.appendChild(deathsParagraph)
                subDeathsDiv.appendChild(subDeaths)

                article.appendChild(subCountry)
                article.appendChild(subCasesDiv)
                article.appendChild(subRecoveredDiv)
                article.appendChild(subDeathsDiv)
    
                subCountryContainer.appendChild(article)
    
            })
    })





        //Catches an error and passes through and displays on screen
        .catch(error => {
            errorMessage.innerHTML = "ERROR: Incorrect spelling";
            errorMessage.classList.add('error');
            
            console.log('request failed', error);
        }
        )};
    };

    //Triggers the Search function
    
    const searchBtn = document.querySelector('button');
    const searchInpt = document.getElementById('searchInput')
    searchBtn.addEventListener('click', updateTerm);
    searchInpt.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          searchBtn.click();
        }
      }); 