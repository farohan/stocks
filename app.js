//Welcome to app.js!

/* Generating the charts */

function generateStockChart() {
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
    Plotly.newPlot('stock-chart', data, layout);
}

generateStockChart();

function generateAssetsChart() {
    const xArray = ['Equity', 'Liabilities'];
    const yArray = [50, 50];

    const layout = {title:"Assets"};
    const data = [{labels:xArray, values:yArray, type:"pie"}];

    Plotly.newPlot('assets-chart', data, layout);
}

generateAssetsChart();

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
const apiKey = 'EVD5GPKP3HYZB2FO';
let func;

function getCompanyData() {
    const inc = input.value;
    func = 'OVERVIEW';
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${inc}&apikey=${apiKey}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
}

function getBalanceSheetData() {
    const inc = input.value;
    func = 'BALANCE_SHEET';
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${inc}&apikey=${apiKey}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.quarterlyReports[0]);
    })
}

function getStockData() {
    const inc = input.value;
    func = 'TIME_SERIES_MONTHLY';
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${inc}&apikey=${apiKey}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
}

submitBtn.addEventListener('click', getCompanyData);
submitBtn.addEventListener('click', getBalanceSheetData);
submitBtn.addEventListener('click', getStockData);
