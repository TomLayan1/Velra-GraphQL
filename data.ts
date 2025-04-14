import { profile } from "console";

// Sample data
export let products = [
  {
    id: "1",
    name: "Stackable Chair",
    product_image: "http://localhost:5000/images/products/product1.jpg",
    price: 87.00,
    category: { id: "1", name: "Chair" },
    details: "A sleek and modern stackable chair perfect for both indoor and outdoor settings. Lightweight yet sturdy, ideal for compact storage.",
    quantity: 5
  },
  {
    id: "2",
    name: "Lamp Tool",
    product_image: "http://localhost:5000/images/products/product2.jpg",
    price: 35.00,
    category: { id: "1", name: "Lamp" },
    details: "A compact and multifunctional lamp with adjustable brightness. Great for workspaces, reading corners, or nightstands.",
    quantity: 5
  },
  {
    id: "3",
    name: "Dining Chair",
    product_image: "http://localhost:5000/images/products/product3.jpg",
    price: 55.00,
    category: { id: "1", name: "Chair" },
    details: "Comfortable dining chair with a cushioned seat and a sturdy wooden frame. Blends well with any dining room style.",
    quantity: 5
  },
  {
    id: "4",
    name: "Hand Base Lamp",
    product_image: "http://localhost:5000/images/products/product4.jpg",
    price: 35.00,
    category: { id: "1", name: "Lamp" },
    details: "A unique lamp with a sculpted hand-shaped base and a soft, warm glow. Adds a creative touch to any room.",
    quantity: 5
  },
  {
    id: "5",
    name: "Stylish Chair",
    product_image: "http://localhost:5000/images/products/product5.jpg",
    price: 45.00,
    category: { id: "1", name: "Chair" },
    details: "Ergonomically designed stylish chair with a minimalist design. Ideal for offices, home desks, or lounges.",
    quantity: 5
  },
  {
    id: "6",
    name: "Vintage Chair",
    product_image: "http://localhost:5000/images/products/product6.jpg",
    price: 65.00,
    category: { id: "1", name: "Furniture" },
    details: "A timeless vintage chair featuring a high-back design and classic finish. Perfect for adding character to your living space.",
    quantity: 5
  },
];

// Sample data for users
export let users = [
  {
    user_id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    location: "Lagos",
    password: "12345678",
    profile_pic: "",
    cart: {
      id: "cart-1",
      items: [
        {
          id: "2",
          name: "Lamp Tool",
          product_image: "http://localhost:5000/images/products/product2.jpg",
          price: 35.0,
          category: "Lamp",
          details: "A compact and multifunctional lamp with adjustable brightness. Great for workspaces, reading corners, or nightstands.",
          cart_item_quantity: 2,
        },
        {
          id: "5",
          name: "Stylish Chair",
          product_image: "http://localhost:5000/images/products/product5.jpg",
          price: 45.0,
          category: "Chair",
          details: "Ergonomically designed stylish chair with a minimalist design. Ideal for offices, home desks, or lounges.",
          cart_item_quantity: 1,
        },
      ],
      total: 115.0,
    },
  },
];

// Sample Data for orders
export const orders = [
  {
    user_id: "1",
    items: [
      {
        products: {
          id: "2",
          name: "Lamp Tool",
          product_image: "http://localhost:5000/images/products/product2.jpg",
          price: 35.0,
          category: { id: "1", name: "Lamp" },
          details: "A compact and multifunctional lamp with adjustable brightness. Great for workspaces, reading corners, or nightstands.",
        },
        cart_item_quantity: 2,
      },
      {
        products: {
          id: "5",
          name: "Stylish Chair",
          product_image: "http://localhost:5000/images/products/product5.jpg",
          price: 45.0,
          category: { id: "1", name: "Chair" },
          details: "Ergonomically designed stylish chair with a minimalist design. Ideal for offices, home desks, or lounges.",
        },
        cart_item_quantity: 1,
      },
    ],
    total: 115.0,
  }
]