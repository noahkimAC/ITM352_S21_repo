/* Noah Kim's Assignment 1 Array of Products */

var products_array = [
    {
        'type':"laptop"
    },
    {
        'type': "desktop"
    },
    {
        'type': "airpods"
    },
    {
        'type': "externals"
    }
]
var laptop = [
    // Laptop Product 1
    {
        "name" : "MacBook Air M1 Base Model",
        "price" : 1000.00,
        "description" : "Thinnest M1 MacBook with an integrated fingerprint ID sensor & silent fan design! <br> (13 in., M1 chipset, 8-core CPU, 7-core GPU, 8 GB Unified Memory, 256 GB SSD)",
        "image" : "MacBookAir.jpeg"
    },
    // Laptop Product 2
    {
        "name" : "MacBook Air M1 Upgraded Model",
        "price" : 1400.00,
        "description" : "MacBook Air M1 with upgraded 16 GB Unified Memory and 512 GB SSD!",
        "image" : "MacBookAir.jpeg"
    },
    // Laptop Product 3
    {
        "name" : "MacBook Pro M1 Base Model",
        "price" : 1300.00,
        "description" : "Dedicated for both professional and casual use with an integrated TouchBar and fingerprint ID sensor! <br> (13 in., M1 chipset, 8-core CPU, 8-core GPU, 8 GB Unified Memory, 256 GB SSD)",
        "image" : "MacBookPro.jpeg"
    },
    // Laptop Product 4
    {
        "name" : "MacBook Pro M1 Upgraded Model",
        "price" : 1700.00,
        "description" : "MacBook Pro M1 with upgraded 16 GB Unified Memory and 512 GB SSD!",
        "image" : "MacBookPro.jpeg"
    },
    // Laptop Product 5
    {
        "name" : "Incase Compact Flight Nylon Sleeve Black (MacBook Air and Pro)",
        "price" : 50.00,
        "description" : "(Black) With a durable Flight Nylon material, this completely cushioned MacBook sleeve with plush faux-fur lining fits both the MacBook Air/ Pro. <br> (Custom barrel zipper pulls, additional front panel pocket)",
        "image" : "incaseblk.jpeg"
    },
    // Laptop Product 6
    {
        "name" : "Incase Compact Flight Nylon Sleeve Navy (MacBook Air and Pro)",
        "price" : 50.00,
        "description" : "(Navy) With a durable Flight Nylon material, this completely cushioned MacBook sleeve with plush faux-fur lining fits both the MacBook Air/ Pro. <br> (Custom barrel zipper pulls, additional front panel pocket)",
        "image" : "incasenavy.jpeg"
    }
]
var desktop = [
    // Desktop Product 1
    {
        "name" : "Mac mini M1 Base Model",
        "price" : 700.00,
        "description" : "Powerful, mini form-factor desktop ready to plug & use! <br> (M1 chipset, 8-core CPU, 8-core GPU, 8 GB Unified Memory, 256 GB SSD)",
        "image" : "Macmini.jpeg"
    },
    // Desktop Product 2
    {
        "name" : "Mac mini M1 Upgraded Model",
        "price" : 1100.00,
        "description" : "Mac mini with upgraded 16 GB Unified Memory and 512 GB SSD!",
        "image" : "Macmini.jpeg"
    },
    // Desktop Product 3
    {
        "name" : "Satechi Mac mini Aluminum Stand & Hub",
        "price" : 80.00,
        "description" : "Type-C aluminum stand & hub that the Mac mini rests on top of, providing your small desktop with a USB-C port, 3 USB-A ports, micro/ SD card readers, and a 3.5mm headphone jack.",
        "image" : "satechi.jpeg"
    }, 
    // Desktop Product 4
    {
        "name" : "Mac mini Monitor Mount",
        "price" : 25.00,
        "description" : "Universal metal-free monitor mount maximizes Wi-Fi performance while including ventilation channels to allow cooling airflow with access to all ports. Snugly holds the Mac mini, maximizing desk real-estate!",
        "image" : "mount.jpeg"
    },   
    // Desktop Product 5
    {
        "name" : "Belkin Ultra HD High Speed 4K HDMI Cable (2m)",
        "price" : 30.00,
        "description" : "Provides the ultimate 4K HDR viewing experience, Dolby Vision HDR compatible and supports up to 7680-by-4320 resolution and bandwidth up to 48 GPBS!",
        "image" : "hdmi.jpeg"
    }      
]
var airpods = [
    // AirPod Product 1
    {
        "name" : "AirPods 2",
        "price" : 200.00,
        "description" : "The reiterated AirPods 2 maintains the classic fit and design of its predecessor with significant improvements to battery life! <br> (H1 chipset)",
        "image" : "AirPods2.jpeg"
    },
    // AirPod Product 2
    {
        "name" : "AirPods Pro",
        "price" : 250.00,
        "description" : "Equipped with Active Noise Cancellation and a transparency mode, Apple's flagship AirPods deliver superior sound quality with an IPX4 water resistance rating! <br> (H1 chipset, 3 customizable in-ear cushions)",
        "image" : "AirPodsPro.jpeg"
    },    
    // AirPod Product 3
    {
        "name" : "AirPods Max",
        "price" : 250.00,
        "description" : "Over-ear headphones with industry-leading Active Noise Cancellation and transparency modes. Optimized comfort/ control with its mesh headband, ear cushion and digital crown. <br> (H1 chipset, 20 hours battery life) <br> 5 colorways: Space Grey, Silver, Green, Sky Blue, Pink",
        "image" : "AirPodsMax.jpeg"
    }, 
    // AirPod Product 4
    {
        "name" : "AirPods Pro Replacement Ear Tips",
        "price" : 8.00,
        "description" : "Two sets of replacement ear tips. Made by Apple.",
        "image" : "proear.jpeg"
    }, 
    // AirPod Product 5
    {
        "name" : "AirPods Max Ear Cushions",
        "price" : 70.00,
        "description" : "One set of replacement ear cushions. Made by Apple. <br> 5 colorways: Space Grey, Silver, Green, Sky Blue, Pink",
        "image" : "maxear.jpeg"
    } 
]
var external = [
    // External Product 1
    {
        "name" : "USB-C to USB Adapter",
        "price" : 19.00,
        "description" : "Thunderbolt 3 (USB-C) to USB-A adapter helps you connect any USB-A device to a USB-C port. <br> Made by Apple.",
        "image" : "adapter.jpeg"
    },
    // External Product 2
    {
        "name" : "USB-C Digital AV Multiport Adapter",
        "price" : 70.00,
        "description" : "Thunderbolt 3 (USB-C) to USB-A, HDMI display port (up to 3480x2160 resolution at 60Hz), and USB-C power passthrough. <br> Made by Apple.",
        "image" : "multiport.jpeg"
    },
    // External Product 3
    {
        "name" : "USB-C to SD Card Reader",
        "price" : 40.00,
        "description" : "Thunderbolt 3 (USB-C) to SD card reader transfers high-resolution photos/ videos at UHS-11 speeds. <br> Made by Apple.",
        "image" : "sdcard.jpeg"
    },
    // External Product 4
    {
        "name" : "USB-C Charging Cable (2m)",
        "price" : 19.00,
        "description" : "For fast, efficient charging or transferring data. Purchase as a spare, replacement, or an extra charger! <br> Made by Apple.",
        "image" : "charge.jpeg"
    },
    // External Product 5
    {
        "name" : "96W USB-C Power Adapter",
        "price" : 80.00,
        "description" : "Offers fast, efficient charging at home, office, or on the go. Compatible with any USB-C enabled device. Purchase as a spare, replacement, or an extra charger! <br> Made by Apple.",
        "image" : "96w.jpeg"
    },
]
products = [
// Product 1
{
    "name" : "MacBook Pro M1 Base Model",
    "price" : 1300.00,
    "description" : "Dedicated for both professional and casual use with an integrated TouchBar and fingerprint ID sensor! <br> (M1 chipset, 8 GB Unified Memory, 256 GB SSD)",
    "image" : "MacBookPro.jpeg"
},
// Product 2
{
    "name" : "MacBook Air M1 Upgraded Model",
    "price" : 1000.00,
    "description" : "Thinnest M1 MacBook with an integrated fingerprint ID sensor & silent fan design! <br> (M1 chipset, 8 GB Unified Memory, 256 GB SSD)",
    "image" : "MacBookAir.jpeg"
},
// Product 3
{
    "name" : "Mac mini M1 Base Model",
    "price" : 700.00,
    "description" : "Powerful, mini form-factor desktop ready to plug & use! <br> (M1 chipset, 8 GB Unified Memory, 256 GB SSD)",
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
var allProducts = {
    "laptop" : laptop,
    "desktop" : desktop,
    "airpods" : airpods,
    "external" : external
}
if (typeof module != 'undefined') {
    module.exports.products = products;
}