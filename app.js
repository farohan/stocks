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
        sharePrice.innerHTML = `Current Share Price: $${stockPrice.toFixed(2)}`;

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
            Dividend Yield: ${(data.DividendYield * 100).toFixed(2)}%
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

submitBtn.addEventListener('click', getCompanyData);

//Adds commas to all the large numbers

function addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
