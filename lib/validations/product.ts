import { z } from "zod";

export const CATEGORY_OPTIONS = [
  { value: "SKINCARE", label: "Skincare" },
  { value: "MAKEUP", label: "Makeup" },
  { value: "HAIRCARE", label: "Haircare" },
  { value: "BODY_CARE", label: "Body Care" },
  { value: "FRAGRANCE", label: "Fragrance" },
  { value: "BEAUTY_TOOLS", label: "Beauty Tools" },
] as const;

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  brand: z.string().min(1).default("Velourabeauty"),
  category: z.enum(["SKINCARE", "MAKEUP", "HAIRCARE", "BODY_CARE", "FRAGRANCE", "BEAUTY_TOOLS"]),
  subcategory: z.string().optional(),
  sku: z.string().min(2, "SKU is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  oldPrice: z.coerce.number().positive().optional().or(z.literal("")),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  description: z.string().min(10, "Please add a short description"),
  benefits: z.string().optional(),
  ingredients: z.string().optional(),
  usage: z.string().optional(),
  images: z.array(z.string().min(1)).min(1, "Upload at least one product image"),
  isPublished: z.boolean().default(true),
  isBestseller: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof productSchema>;
