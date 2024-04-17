let FromAmountElement = document.querySelector(".amount");   //select the input element,where you put the currency
let FromCurrencyElement = document.querySelector(".fromcurrancy");      //select the select element,where you change the type of currency you enter as input
let ConvertedAmountElement = document.querySelector(".convertedAmount");   //select the input element,where converted currency will be shown
let ToCurrencyElement = document.querySelector(".tocurrancy");   //select the select element,where you change the type of currency you want to convert as output
let resultElement = document.querySelector(".result");   //


// ****************************************************************LEARN:how to put value in a select tag
// array of popular currency in the form of {code and name} by countries as name
let Countries = [                                   //this is a array of object
    
        {code: "USD", name: "United States Dollar"},
        {code: "EUR", name: "Euro"},
        {code: "JPY", name: "Japanese Yen"},
        {code: "GBP", name: "British Pound Sterling"},
        {code: "AUD", name: "Australian Dollar"},
        {code: "CAD", name: "Canadian Dollar"},
        {code: "CHF", name: "Swiss Franc"},
        {code: "CNY", name: "Chinese Yuan"},
        {code: "SEK", name: "Swedish Krona"},
        {code: "NZD", name: "New Zealand Dollar"},
        {code: "KRW", name: "South Korean Won"},
        {code: "SGD", name: "Singapore Dollar"},
        {code: "NOK", name: "Norwegian Krone"},
        {code: "MXN", name: "Mexican Peso"},
        {code: "INR", name: "Indian Rupee"},
        {code: "RUB", name: "Russian Ruble"},
        {code: "ZAR", name: "South African Rand"},
        {code: "BRL", name: "Brazilian Real"},
        {code: "TRY", name: "Turkish Lira"},
        {code: "HKD", name: "Hong Kong Dollar"}
    
    
];

// showing countries(code and name) from array to select,in both tag fromcurrancy & tocurrency
Countries.forEach(country => {                                  //in this loop country fetch pair of {code,name} one after another
    let option1=document.createElement('option');               //creating option element
    option1.value=country.code;  //during api call we need the value for that we are pushing code one by one
    option1.textContent= `${country.code}  (${country.name})`;  //this show in the select tag list
    FromCurrencyElement.append(option1);                         //one after another pair of {code & name} appending in the select element,where you select the type of currency you enter as input,which is store in the option1 in the 37&38 line
    FromCurrencyElement.value="USD"                              //default valiue

    let option2=document.createElement('option');
    option2.value=country.code;
    option2.textContent= `${country.code} (${country.name})`;
    ToCurrencyElement.append(option2);                          //one after another pair of {code & name} appending in the select element,where you change the type of currency you want to convert as output,which is store in the option2 in the 43&44 line
    ToCurrencyElement.value="INR"   //default value
});




//api fetching.................
let getExchangeRate = async() => {
    let amount=parseFloat(FromAmountElement.value);  //entered amount ar value store korbe
    let fromcurrancy=FromCurrencyElement.value;    //input currency type store korbe
    let tocurrancy=ToCurrencyElement.value;        //output currency type store korbe

    //fetch data from api
    let responce=await fetch(`https://api.exchangerate-api.com/v4/latest/${fromcurrancy} `);
    let data=await responce.json();
    console.log(data);

    let conversionRate=data.rates[tocurrancy];     //fetch the rate of currency respect to 1 from rates array 
    let convertedAmount=(amount*conversionRate);    //convert into required amount

    ConvertedAmountElement.value = parseFloat(convertedAmount.toFixed(2));
    resultElement.textContent=`${amount} ${fromcurrancy} = ${ConvertedAmountElement.value} ${tocurrancy}`
}




//fetching exchange rate when user inputs data in the below mentioned field
FromAmountElement.addEventListener('input',getExchangeRate);
FromCurrencyElement.addEventListener('input',getExchangeRate);
ToCurrencyElement.addEventListener('input',getExchangeRate);
window.addEventListener('input',getExchangeRate);



//button
let butt1=document.querySelector(".button1");
let butt2=document.querySelector(".button2");

butt1.addEventListener("click",()=>{
    let currentValue = parseInt(FromAmountElement.value);       // Getting the current value of the input field and parsing it to an integer
    FromAmountElement.value = currentValue + 1;        // Incrementing the value by 1 and updating the input field

    getExchangeRate();
});

butt2.addEventListener("click",()=>{
    let currentValue = parseInt(FromAmountElement.value);       // Getting the current value of the input field and parsing it to an integer
    if(currentValue<1){        // Checking if the current value is less than 1
        FromAmountElement.value = currentValue+0;
    }else{        // If it's greater than or equal to 1, decrement the value by 1 and update the input field
        FromAmountElement.value = currentValue - 1;
    }
    getExchangeRate();
});