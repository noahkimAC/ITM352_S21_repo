attributes  =  "Noah;20;MIS"; 
parts = attributes.split(';');
console.log(parts);

age = 20;
name = "Noah";

attributes  =  name + ";" + age + ";" + (age + 0.5) + ";" + (0.5 - age);
pieces = attributes.split(';');
for(i in parts) {
    parts[i] = `${typeof parts[i]} ${parts[i]}`;
}
console.log(parts.join(","));

