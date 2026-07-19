import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-[24px] text-espresso mb-1">Add a Product</h1>
      <p className="font-body text-[13px] text-espresso-soft mb-6">Fill in your real product — it goes live immediately.</p>
      <ProductForm />
    </div>
  );
}
