/* Noah Kim's Assignment 1 Array of Products */
products = [
// Product 1
{
    "name" : "MacBook Pro M1 Base Model",
    "price" : 1300.00,
    "description" : "Dedicated for both professional and casual use with an integrated TouchBar and fingerprint ID sensor! Up to 2.8x CPU performance, 5x the graphics speed, 20 hours of battery life and up to 11x faster machine learning with Apple's Neural Engine. (8 GB Unified Memory, 256 SSD)",
    "image" : "MacBookPro.jpeg"
},
// Product 2
{
    "name" : "MacBook Air M1 Base Model",
    "price" : 1000.00,
    "description" : "Thinnest M1 MacBook with an integrated fingerprint ID sensor! Up to 3.5x faster CPU speeds, 5x faster GPU speeds, silent fanless design and up to 9x faster machine learning with Apple's Neural Engine. (8 GB Unified Memory, 512 SSD)",
    "image" : "MacBookAir.jpeg"
},
// Product 3
{
    "name" : "Mac mini M1 Base Model",
    "price" : 700.00,
    "description" : "Powerful, form-factor desktop with up to 3x faster CPU performance, 6x faster graphics and up to 15x faster machine learning with Apple's Neural Engine. (8 GB Unified Memory, 256 SSD)",
    "image" : "Macmini.jpeg"
},
// Product 4
{
    "name" : "AirPods Pro",
    "price" : 250.00,
    "description" : "Powered by the H1 chip, these AirPods Pro are equipped with Active Noise Cancellation and a transparency mode to either block the world out or let them in. New in-ear design with 3 customizable fits to both equalize pressure in your ear while maintaining a seal for Active Noise Cancellation. Water resistant with superb audio quality, the Wireless Charging Case delivers more than 24 hours of battery life with up to 4.5 hours of listening time and 1 hours of listening time after 5 minutes of charging!",
    "image" : "AirPodsPro.jpeg"
},
// Product 5
{
    "name" : "AirPods 2",
    "price" : 200.00,
    "description" : "Powered by the H1 chip, these AirPods 2 take the well-loved design and comfort of the first generation AirPods with subtle improvements. The AirPods 2 has more than 24 hours of battery life with up to 5 hours of listening time and 3 hours of listening time after 15 minutes of charging",
    "image" : "AirPods2.jpeg"
}
]
if (typeof module != 'undefined') {
    module.exports.products = products;
}