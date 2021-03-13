function isNonNegInt(string_check, returnErrors = false) {
errors = []; 
// This function will return true if string_check is a NonNegInt. If returnErrors = true, it will return an array of reasons why it is a NonNegInt. 
if(Number(string_check) != string_check) errors.push('Not a number!'); 
// Check if string is a number value
if(string_check < 0) errors.push('Negative value!'); 
// Check if it is non-negative
if(parseInt(string_check) != string_check) errors.push('Not an integer!'); 
// Check that it is an integer

return returnErrors ? errors : (errors.length == 0);
}

attributes  =  "Noah;20;MIS"; 
parts = attributes.split(';');

for(part of parts) {
    console.log(isNonNegInt(part));
}



    


    