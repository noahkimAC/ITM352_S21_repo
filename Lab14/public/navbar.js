// Noah Kim's navbar.js 
// For Assignment 2, I added 2 new tabs for the Navbar, labeled Registration and Login, which just gives users the option to login or register before they are required to after selecting quantities

// Navbar borrowed & modified from BrowserHistory WODs, Professor Port helped me with this
// This consolidates my Navbar list in this .js document that I can link and then call on in my other pages
function navbar() {
document.write(`
<ul>
    <li style="float:left"><a href="./index.html">Noah's Mac Shack Home</a></li><br>
    <li><a href="./products_display.html">Shopping Cart</a></li>
    <li><a href="./products_display.html">Products</a></li>
    <li><a href="./login.html">Login</a></li>
    <li><a href="./register.html">Registration</a></li>
</ul>
`);
}