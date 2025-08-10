// src/constants/kidsCollection.js

const kidsProducts = {
    "All": [],
    "Clothing": [{
            id: 1,
            name: "Cartoon Print T-Shirt",
            price: 599,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1520974735194-6c0a1a67b3d8?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 2,
            name: "Denim Overalls",
            price: 1199,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1520975918318-8e9730b8da49?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 3,
            name: "Hooded Sweatshirt",
            price: 899,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1592878904946-b9e26e35fba9?auto=format&fit=crop&w=800&q=80",
        },
    ],
    "Footwear": [{
            id: 4,
            name: "Velcro Sneakers",
            price: 1499,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 5,
            name: "Kids Sandals",
            price: 799,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 6,
            name: "Winter Boots",
            price: 1799,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1603398938378-bf9e76b7c1c7?auto=format&fit=crop&w=800&q=80",
        },
    ],
    "Toys": [{
            id: 7,
            name: "Stuffed Teddy Bear",
            price: 499,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1606813902973-8d040cd6c3a4?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 8,
            name: "Wooden Puzzle Set",
            price: 699,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1587402092301-725e39d2d04e?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 9,
            name: "Building Blocks",
            price: 999,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
        },
    ],
    "Accessories": [{
            id: 10,
            name: "Baseball Cap",
            price: 399,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1601233742116-1538b0c17716?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 11,
            name: "School Backpack",
            price: 1299,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1565688243759-42b21d1d9b0b?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: 12,
            name: "Colorful Umbrella",
            price: 599,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b9?auto=format&fit=crop&w=800&q=80",
        },
    ],
};

// Build "All" category by merging others
kidsProducts.All = [
    ...kidsProducts.Clothing,
    ...kidsProducts.Footwear,
    ...kidsProducts.Toys,
    ...kidsProducts.Accessories,
];

export default kidsProducts;