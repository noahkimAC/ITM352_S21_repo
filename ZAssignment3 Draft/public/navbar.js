// Noah Kim's navbar.js 
// Author: Noah Kim
// navbar.js

// Navbar borrowed & modified from BrowserHistory WODs, Professor Port helped me with this
// This consolidates my Navbar list in this .js document that I can link and then call on in my other pages

// For Assignment 3, I added a drop down button for my 4 different product pages and assigned prodtype in allProducts which will let me retrieve the data for allProducts with one code in my index.html (Home Page)
function navbar() {
document.write(`
<ul>
    <li style="float:left"><a href="./index.html">Noah's Mac Shack Home</a></li><br>
    <li><a href="./products.html${location.search}">Shopping Cart</a></li>
        <li><div class="dropdown">
    <li><a href="./index.html${location.search}">Products</a></li>
        <div class="dropdown-content">`);
        for(let prodtype in allProducts) {
            document.write(`<a href="products.html?product_key=${prodtype}">${prodtype}s</a><br>`)
        }
        document.write(`
    <li><a href="./login.html${location.search}">Login</a></li>
    <li><a href="./register.html${location.search}">Registration</a></li>
    <li><a href="./index.html${location.search}">Logout</a></li>
</ul>
`);
}