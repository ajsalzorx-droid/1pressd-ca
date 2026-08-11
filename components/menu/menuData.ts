export type MenuItem = {
  name: string;
  category: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
  image: string;
  tags: string[];
};

export const menuCategories = ["All", "Breakfast", "Salads", "Protein", "Mains", "Smoothies", "Coffee", "Desserts"];

export const menuItems: MenuItem[] = [
  { name:"Avocado Sunrise", category:"Breakfast", description:"Sourdough, avocado, poached eggs, herbs", price:48, calories:490, protein:24, tags:["Vegetarian"], image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1400&q=84" },
  { name:"Lean Chicken Salad", category:"Salads", description:"Herb chicken, feta, crisp leaves, citrus dressing", price:54, calories:470, protein:36, tags:["Gluten Free"], image:"https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1400&q=84" },
  { name:"Power Protein Bowl", category:"Protein", description:"Chicken, quinoa, avocado, seasonal greens", price:59, calories:610, protein:42, tags:["High Protein","Gluten Free"], image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=84" },
  { name:"Green Energy Bowl", category:"Mains", description:"Edamame, grains, greens, sesame tahini", price:52, calories:520, protein:21, tags:["Vegan"], image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=84" },
  { name:"Berry Protein Blend", category:"Smoothies", description:"Berries, banana, almond milk, whey", price:34, calories:310, protein:28, tags:["Gluten Free"], image:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1400&q=84" },
  { name:"Spanish Iced Latte", category:"Coffee", description:"Double espresso, milk, subtle sweetness", price:29, calories:180, protein:7, tags:["Signature"], image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1400&q=84" },
  { name:"Cacao Date Slice", category:"Desserts", description:"Cacao, dates, almonds, sea salt", price:32, calories:290, protein:8, tags:["Vegan"], image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=84" },
  { name:"Protein Shakshuka", category:"Breakfast", description:"Eggs, tomato, peppers, feta, sourdough", price:55, calories:540, protein:31, tags:["Vegetarian","High Protein"], image:"https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1400&q=84" }
];
