//Welcome to app.js!

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
    const dataTitle = document.getElementById('data-title');
    const sharePrice = document.getElementById('share-price');
    const identification = document.getElementById('identification');
    const companyData = document.getElementById('company-data');

    const inc = input.value;
    func = 'OVERVIEW';
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${inc}&apikey=${apiKey}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        const marketCap = parseInt(data.MarketCapitalization);
        const numOfShares = parseInt(data.SharesOutstanding);
        const stockPrice = marketCap / numOfShares;
        console.log(stockPrice);
        sharePrice.innerHTML = `Current Share Price: $${Math.round(stockPrice)}`;

        identification.innerHTML = `
        ${data.Name} (${data.Exchange}: ${data.Symbol})
        `;

        dataTitle.innerHTML = `An Overview of ${data.Name}`;

        companyData.innerHTML = `
            Ticker Symbol: ${data.Symbol}
            <br>
            <br>
            Description: ${data.Description}
            <br>
            <br>
            Address: ${data.Address}
            <br>
            Market Capitalization: $${addCommas(data.MarketCapitalization)}
            <br>
            Shares Outstanding: ${addCommas(data.SharesOutstanding)}
            <br>
            Sector: ${data.Sector}
            <br>
            Dividend Yield: ${data.DividendYield * 100}%
            <br>
            Dividend per Share: ${data.DividendPerShare}
            <br>
            Previous Dividend Date: ${data.DividendDate}
            <br>
            PE Ratio: ${addCommas(data.PERatio)}
            <br>
            Earnings per Share (EPS): ${addCommas(data.EPS)}
            <br>
            Analyst Target Price: $${addCommas(data.AnalystTargetPrice)}
            <br>
            Return on Assets: ${Math.round(data.ReturnOnAssetsTTM * 100)}%
            <br>
            EBITDA: $${addCommas(data.EBITDA)}
        `;
    })
}

function getBalanceSheetData() {
    const stats = document.getElementById('stats');

    const inc = input.value;
    func = 'BALANCE_SHEET';
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${inc}&apikey=${apiKey}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((info) => {
        const liabilities = info.quarterlyReports[0].totalLiabilities;
        const equity = info.quarterlyReports[0].totalShareholderEquity;

        const xArray = ['Equity', 'Liabilities'];
        const yArray = [equity, liabilities];

        const layout = {title: `${inc.toUpperCase()}'s Assets`};
        const data = [{labels: xArray, values: yArray, type: "pie"}];

        Plotly.newPlot('assets-chart', data, layout);

        stats.innerHTML = `
            Assets: $${addCommas(JSON.parse(liabilities) + JSON.parse(equity))}
            <br>
            Liabilities: $${addCommas(liabilities)}
            <br>
            Shareholder's Equity: $${addCommas(equity)}
            <br>
            Remember this: A = L + E;
        `;
    })
}

function getStockData() {
    const inc = input.value;
    func = 'TIME_SERIES_MONTHLY_ADJUSTED';
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${inc}&apikey=${apiKey}`;

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data['Monthly Adjusted Time Series']);
    })

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

submitBtn.addEventListener('click', getCompanyData);
submitBtn.addEventListener('click', getBalanceSheetData);
submitBtn.addEventListener('click', getStockData);

//Adds commas to all the large numbers

function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
