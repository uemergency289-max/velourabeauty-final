export type ProductCategory = "Skincare" | "Makeup" | "Haircare" | "Body Care" | "Fragrance" | "Beauty Tools";

export interface ProductVariant {
  id: string;
  label: string;
  priceModifier: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  oldPrice?: number;
  currency: string;
  stock: number;
  rating?: number;
  reviewCount?: number;
  images: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string[];
  variants: ProductVariant[];
  tags: string[];
  isBestseller: boolean;
  isNew: boolean;
  createdAt: string;
}
