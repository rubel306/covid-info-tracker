//DOM SELECTION 

const countries = document.querySelector('datalist');
const search = document.querySelector('#search');
const date = document.querySelector('#date');
const nameCountry = document.querySelector('#name-country');
const confirmed = document.querySelector('.confirmed')
const deaths = document.querySelector('.deaths')
const recovered = document.querySelector('.recovered')
const chart = document.querySelector('#chart');

let dataChart = [];

const API_URL = 'https://api.covid19api.com/summary';

async function covid(country){
    const res = await fetch(API_URL);
    // console.log(res);
    const data = await res.json();
    console.log(data);

    if( res.status === 4 ||  res.status === 200){
        date.textContent = new Date(data.Date).toDateString();

        

        //  console.log(data.Global);

        //all cuntries list 
        // console.log(data.Countries);

        if(country === '' || country === 'world'){
            const {NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered} = data.Global;
            //total confirmed 
            confirmed.children[1].textContent = TotalConfirmed;
            confirmed.children[2].textContent = NewConfirmed;

            //total death
            deaths.children[1].textContent = TotalDeaths;
            deaths.children[2].textContent = NewDeaths;

            //total recovery 
            recovered.children[1].textContent = TotalRecovered;
            recovered.children[1].textContent = NewRecovered;

            //country name 
            nameCountry.textContent = 'The World';
        }

        data.Countries.forEach(item => {
            const option = document.createElement('option');
            option.value= item.Country;
            option.textContent = item.Country;
            countries.appendChild(option);

            if(country === item.Country){
                //country name 
                nameCountry.textContent = item.Country;
                //total confirmed 
                confirmed.children[1].textContent = item.TotalConfirmed;
                confirmed.children[2].textContent = item.NewConfirmed;
    
                //total death
                deaths.children[1].textContent = item.TotalDeaths;
                deaths.children[2].textContent = item.NewDeaths;
    
                //total recovery 
                recovered.children[1].textContent = item.TotalRecovered;
                recovered.children[1].textContent = item.NewRecovered;
            }
        })

        

        
        
    }else{
        chart.innerHTML = '<h2 style="color:red">Data Loading ..... </h2>'
    }
}
covid(search.value);

const searchBtn = document.querySelector('button');

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    covid(search.value);
    search.value = '';
});