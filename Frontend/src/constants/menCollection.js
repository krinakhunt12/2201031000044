// src/data/menCollection.js

const menProducts = {
    "T-Shirts": [{
            id: 1,
            name: "Premium Black Tee",
            price: 1299,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
            colors: ["#000000", "#334155", "#1e3a8a"],
            rating: 4.5,
            sizes: ["S", "M", "L", "XL"],
            description: "100% cotton, premium quality black t-shirt"
        },
        {
            id: 2,
            name: "Classic White Tee",
            price: 999,
            image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
            colors: ["#ffffff", "#f5f5dc"],
            rating: 4.2,
            sizes: ["S", "M", "L"],
            description: "Soft cotton white t-shirt with crew neck"
        },
        {
            id: 9,
            name: "Graphic Streetwear Tee",
            price: 1499,
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
            colors: ["#ff0000", "#000000"],
            rating: 4.6,
            sizes: ["M", "L"],
            description: "Trendy graphic t-shirt for casual outfits"
        },
        {
            id: 10,
            name: "Sport Dry-Fit Tee",
            price: 1399,
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
            colors: ["#00ff00", "#0000ff"],
            rating: 4.4,
            sizes: ["S", "M", "L", "XL"],
            description: "Breathable dry-fit t-shirt for active days"
        }
    ],
    "Shirts": [{
            id: 3,
            name: "Slim Fit Oxford Shirt",
            price: 1799,
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
            colors: ["#1e40af", "#ffffff", "#f472b6"],
            rating: 4.7,
            sizes: ["M", "L", "XL"],
            description: "Formal slim fit shirt with premium fabric"
        },
        {
            id: 4,
            name: "Denim Casual Shirt",
            price: 1999,
            image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
            colors: ["#60a5fa", "#1e3a8a"],
            rating: 4.3,
            sizes: ["S", "M", "L"],
            description: "Stylish denim shirt for casual occasions"
        },
        {
            id: 11,
            name: "Plaid Flannel Shirt",
            price: 1699,
            image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&w=800&q=80",
            colors: ["#ff0000", "#000000"],
            rating: 4.8,
            sizes: ["M", "L", "XL"],
            description: "Warm flannel shirt for everyday wear"
        },
        {
            id: 12,
            name: "Linen Summer Shirt",
            price: 1899,
            image: "https://images.unsplash.com/photo-1603252109303-482fa8a51c8c?auto=format&fit=crop&w=800&q=80",
            colors: ["#f5f5dc", "#ffffff"],
            rating: 4.5,
            sizes: ["S", "M", "L", "XL"],
            description: "Lightweight linen shirt perfect for summer"
        }
    ],
    "Jeans": [{
            id: 5,
            name: "Slim Fit Blue Jeans",
            price: 2299,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            colors: ["#93c5fd", "#1e40af"],
            rating: 4.6,
            sizes: ["28", "30", "32", "34"],
            description: "Comfortable slim fit jeans with stretch fabric"
        },
        {
            id: 6,
            name: "Black Skinny Jeans",
            price: 2499,
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
            colors: ["#000000", "#1f2937"],
            rating: 4.8,
            sizes: ["28", "30", "32"],
            description: "Premium black skinny jeans with high elasticity"
        },
        {
            id: 13,
            name: "Distressed Ripped Jeans",
            price: 2599,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            colors: ["#1e40af", "#374151"],
            rating: 4.3,
            sizes: ["30", "32", "34"],
            description: "Trendy ripped jeans for street style"
        },
        {
            id: 14,
            name: "Regular Fit Blue Jeans",
            price: 2199,
            image: "https://images.unsplash.com/photo-1583002212557-cfbf86b6a54a?auto=format&fit=crop&w=800&q=80",
            colors: ["#3b82f6", "#1e40af"],
            rating: 4.1,
            sizes: ["28", "30", "32", "34"],
            description: "Classic regular fit denim for daily comfort"
        }
    ],
    "Shoes": [{
            id: 7,
            name: "Running Sneakers",
            price: 2999,
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=800&q=80",
            colors: ["#ffffff", "#000000", "#dc2626"],
            rating: 4.9,
            sizes: ["8", "9", "10", "11"],
            description: "Lightweight running shoes with cushioned soles"
        },
        {
            id: 8,
            name: "Casual Leather Loafers",
            price: 1999,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
            colors: ["#78350f", "#000000"],
            rating: 4.4,
            sizes: ["8", "9", "10"],
            description: "Premium leather loafers for formal occasions"
        },
        {
            id: 15,
            name: "High Top Sneakers",
            price: 2799,
            image: "https://images.unsplash.com/photo-1519744346364-8a0b9d3d5cfe?auto=format&fit=crop&w=800&q=80",
            colors: ["#000000", "#ffffff"],
            rating: 4.7,
            sizes: ["8", "9", "10", "11"],
            description: "Stylish high top sneakers for streetwear looks"
        },
        {
            id: 16,
            name: "White Canvas Shoes",
            price: 1599,
            image: "https://images.unsplash.com/photo-1617814769400-8d6d1f1f1a07?auto=format&fit=crop&w=800&q=80",
            colors: ["#ffffff", "#cccccc"],
            rating: 4.5,
            sizes: ["7", "8", "9", "10"],
            description: "Classic white canvas sneakers for casual wear"
        }
    ],
};

export default menProducts;