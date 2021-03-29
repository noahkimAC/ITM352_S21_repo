// Navbar borrowed & modified from BrowserHistory WODs, Professor Port helped me with this
// This consolidates my Navbar list in this .js document that I can link and then call on in my other pages
function navbar() {
document.write(`
<ul>
    <li style="float:left"><a href="./index.html">Noah's Mac Shack Home</a></li><br>
    <li><a href="./products_display.html${location.search}">Shopping Cart</a></li>
    <li><a class="active" href="./products_display.html">Products</a></li>
</ul>
`);
}