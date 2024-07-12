const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const number = document.querySelectorAll(".numbers");

const operation = document.querySelectorAll(".opr");
const equal= document.querySelector(".opr-equal");

// string to store the content of display/ result
var str = "";

// boolian to check whether we just calculated result from expression or not
var resultDisplayed=false;

// clearing the screen
clear.addEventListener("click", ()=>{
    str= "";
    result.textContent = str;
});

// to include numbers in string
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", (currentElement) => {
    var lastChar = str[str.length - 1];
    var decimalAlreadyUsed =str.indexOf(".");
    console.log("index " + decimalAlreadyUsed);
    console.log("string " + str);
    console.log("comparison " + currentElement.target.innerHtml ==".");
    
    // if result is displayed, then keep adding new numbers in str
    if(resultDisplayed===false){
        str+= currentElement.target.textContent;
        result.textContent = str;
    }
    else if(resultDisplayed===true && lastChar==="+" || lastChar==="-" || lastChar==="×" || lastChar==="÷"){
        // adding numbers to perform operation with prev result
        resultDisplayed= false;
        str+= currentElement.target.textContent;
        result.textContent = str;
    }
    else{
        // if result is just displayed and user press some number
        // Thus clear the screen, and start new operation
        resultDisplayed= false;
        str= "";
        str+= currentElement.target.textContent;
        result.textContent = str; 
    }
  });
};

// for operators
for(let i=0; i<operation.length; i++){
    operation[i].addEventListener("click", (currentElement)=>{
    var lastChar = str[str.length - 1];

    // if last char was an oprator, then replace that with currently pressed opr
    if(lastChar==="+" || lastChar==="-" || lastChar==="×" || lastChar==="÷"){
        var newStr= str.substring(0, str.length -1) + currentElement.target.textContent;
        str = newStr;
        result.textContent =str;
    }
    else if(str.length==0){
        // do nothing
        alert("Invalid!! Enter a Number first.");
        console.log("Invalid!! Enter a Number first.");
    }
    else{
        // just add operator in string
        str += currentElement.target.textContent;
        result.textContent = str;
    }
  });
};

// on click on Equal Sign
equal.addEventListener("click", ()=>{

    // converting string into array of numbers by spiliting using operator
    //  here "/ /g" used to write regular expression 
    var arr = str.split(/\+|\-|\×|\÷/g);

    //replacing all the numbers and dot with empty string and then split
    var opr_Arr = str.replace(/[0-9]|\./g, "").split("");
    console.log(str);
    console.log(opr_Arr);
    console.log(arr);
    console.log("----------------------------");

    var divide=opr_Arr.indexOf("÷");
    while(divide != -1){
        // performing operation b/w two operand and replacing with thier result
        arr.splice(divide, 2, arr[divide]/ arr[divide + 1]);
        opr_Arr.splice(divide, 1);
        divide = opr_Arr.indexOf("÷");
    }

    var multiply=opr_Arr.indexOf("×");
    while( multiply != -1){
        arr.splice(multiply, 2, arr[multiply] * arr[multiply + 1]);
        opr_Arr.splice(multiply, 1);
        multiply= opr_Arr.indexOf("×");
    }

    var subtract= opr_Arr.indexOf("-");
    while(subtract != -1){
        arr.splice(subtract, 2, arr[subtract] - arr[subtract + 1]);
        opr_Arr.splice(subtract, 1);
        subtract= opr_Arr.indexOf("-");
    }
    
    var add= opr_Arr.indexOf("+");
    while(add != -1){
        // using parseFloat is necessary, otherwise it will result in string concatenation
        arr.splice(add, 2, parseFloat(arr[add]) + parseFloat(arr[add + 1]));
        opr_Arr.splice(add, 1);
        add= opr_Arr.indexOf("+");
    }

    result.textContent= arr[0];
    console.log(arr[0]); //====================
    console.log(result.textContent); //====================
    str= result.textContent;
    resultDisplayed= true;
});