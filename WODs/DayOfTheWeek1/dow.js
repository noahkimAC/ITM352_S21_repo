day = 30;
month = 'Nov';
year = 2000;

if (month == "Jan" | month == "Feb") {
    step1 = year - 1;
} else {
    step1 = year;
}
step2 = parseInt(step1/4) + step1;
step3 = step2 - parseInt(step1/100);
step4 = parseInt(step1/400) + step3;
step5 = day + step4;
var monthKey = {
    'Jan' : 0,
    'Feb' : 3,
    'Mar' : 2,
    'Apr' : 5,
    'May' : 0,
    'Jun' : 3,
    'Jul' : 5,
    'Aug' : 1,
    'Sep' : 4,
    'Oct' : 6,
    'Nov' : 2,
    'Dec' : 4
};
step6 = monthKey[month] + step5;
step7 = step6 % 7;
var dow = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

console.log(`${month} ${day}, ${year} was a ${dow[step7]}`)