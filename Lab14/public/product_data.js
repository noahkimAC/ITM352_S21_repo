/* Noah Kim's Assignment 1 Array of Products */
products = [
// Product 1
{
    "name" : "MacBook Pro M1 Base Model",
    "price" : 1300.00,
    "description" : "Dedicated for both professional and casual use with an integrated TouchBar and fingerprint ID sensor! <br> (M1 chipset, 8 GB Unified Memory, 256 SSD)",
    "image" : "MacBookPro.jpeg"
},
// Product 2
{
    "name" : "MacBook Air M1 Base Model",
    "price" : 1000.00,
    "description" : "Thinnest M1 MacBook with an integrated fingerprint ID sensor & silent fan design! <br> (M1 chipset, 8 GB Unified Memory, 512 SSD)",
    "image" : "MacBookAir.jpeg"
},
// Product 3
{
    "name" : "Mac mini M1 Base Model",
    "price" : 700.00,
    "description" : "Powerful, mini form-factor desktop ready to plug & use! <br> (M1 chipset, 8 GB Unified Memory, 256 SSD)",
    "image" : "Macmini.jpeg"
},
// Product 4
{
    "name" : "AirPods Pro",
    "price" : 250.00,
    "description" : "Equipped with Active Noise Cancellation and a transparency mode, Apple's flagship AirPods deliver superior sound quality with an IPX4 water resistance rating! <br> (H1 chipset, 3 customizable in-ear cushions)",
    "image" : "AirPodsPro.jpeg"
},
// Product 5
{
    "name" : "AirPods 2",
    "price" : 200.00,
    "description" : "The reiterated AirPods 2 maintains the classic fit and design of its predecessor with significant improvements to battery life! <br> (H1 chipset)",
    "image" : "AirPods2.jpeg"
}
]
if (typeof module != 'undefined') {
    module.exports.products = products;
}