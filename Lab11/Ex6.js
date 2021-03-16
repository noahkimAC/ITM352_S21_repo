function isNonNegInt(string_to_check, returnErrors = false) {
errors = []; 
// This function will return true if string_to_check is a NonNegInt. If returnErrors = true, it will return an array of reasons why it is a NonNegInt. 
if(Number(string_to_check) != string_to_check) errors.push('Not a number!'); 
// Check if string is a number value
if(string_to_check < 0) errors.push('Negative value!'); 
// Check if it is non-negative
if(parseInt(string_to_check) != string_to_check) errors.push('Not an integer!'); 
// Check that it is an integer
return returnErrors ? errors : (errors.length == 0);
}
    
    
age = 20;
name = "Noah";

attributes  =  name + ";" + age + ";" + (age + 0.5) + ";" + (0.5 - age);
pieces = attributes.split(';');

function checkIt(part, i) { 
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
}

pieces.forEach((item,index) => {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);
})