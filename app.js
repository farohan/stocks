//Welcome to app.js!

/* Generating the chart */

const xArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const yArray = [2, 4, 7, 3, 10, 12, 15, 14, 25, 35, 27, 32, 36, 42, 75];

//Defining data
const data = [{
    x: xArray,
    y: yArray,
    mode: 'lines'
}];

//Defining layout
const layout = {
    xaxis: {range: [1, 15], title: 'Time'},
    yaxis: {range: [0, 75], title: 'Price'},
    title: 'Price over Time'
};

//Display new chart
Plotly.newPlot('chart', data, layout);


/* Call the Alpha Vantage API and display data */

//Prevent form from refreshing

const form = document.getElementById('form');
const input = document.getElementById('input');
const submitBtn = document.getElementById('submit');

function formHandler(event) {
    event.preventDefault();
}

form.addEventListener('submit', formHandler);

//Call the API

function getCompanyData() {
    const inc = input.value;
    const apiKey = 'EVD5GPKP3HYZB2FO';
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${inc}&apikey=${apiKey}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
}

submitBtn.addEventListener('click', getCompanyData);
