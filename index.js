let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
let button = document.querySelector('#info');
let dropdowns = document.querySelectorAll('.dropdown select');

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
       newOption.value = currCode;
        select.append(newOption);
        if(currCode=='USD'&& select.name =='from'){
            newOption.selected = 'selected';

        }
        else if(currCode=='INR' && select.name == 'to'){
            newOption.selected = 'selected';
        }
    }
    select.addEventListener('change',(evt)=>{  // evt is event object which has information about the event that happened
        changeFlag(evt.target);  // evt.target is the element that was changed during that event
    })
}
let changeFlag = (element)=>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
let image =  element.parentElement.querySelector("img");
image.src = newSrc;
}

button.addEventListener('click', (evt)=>{
    evt.preventDefault();
    updateExchangerate();
})
async function updateExchangerate(){
    let amount = document.querySelector('#amount');
   let  amountVal = amount.value;
    if(amountVal === "" || amountVal<1){
      amount.value = "1";
      amountVal = 1;
    }
    

   let currFrom = fromCurr.value.toLowerCase();
   let currTo = toCurr.value.toLowerCase();
   const newUrl = `${url}/${currFrom}.json`;

let response = await fetch(newUrl);
let data = await response.json();

let rate = data[currFrom][currTo];

console.log(rate);
let finalValue = amountVal * rate ;
console.log(finalValue);
let message = document.querySelector('.msg');
message.innerText= `${amountVal}${fromCurr.value} = ${finalValue}${toCurr.value}`;
}
window.addEventListener('load',()=>{
updateExchangerate();
})