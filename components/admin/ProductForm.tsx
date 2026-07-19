"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues, CATEGORY_OPTIONS } from "@/lib/validations/product";
import { toast } from "sonner";

export default function ProductForm() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorBox, setErrorBox] = useState<string[]>([]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { isPublished: true, isBestseller: false, brand: "Velourabeauty" },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64 }),
        });
        const json = await res.json();
        if (json.url) {
          setImages((prev) => {
            const next = [...prev, json.url];
            setValue("images", next);
            return next;
          });
        } else {
          toast.error(json.error || "Upload failed");
        }
      }
    } finally {
      setUploading(false);
    }
  };

  const onInvalid = (formErrors: any) => {
    const messages = Object.entries(formErrors).map(([field, err]: any) => `${field}: ${err?.message || "invalid"}`);
    setErrorBox(messages.length ? messages : ["Please check all fields."]);
  };

  const onSubmit = async (values: ProductFormValues) => {
    setErrorBox([]);
    setSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, images }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorBox([json.error?.formErrors?.[0] || json.error || "Something went wrong"]);
        return;
      }
      toast.success("Product added!");
      router.push("/admin/products");
      router.refresh();
    } catch {
      setErrorBox(["Network error — could not reach the server."]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="max-w-xl space-y-5">
      {errorBox.length > 0 && (
        <div className="p-4 bg-blush border border-deeprose rounded-sm">
          <p className="font-body text-[13px] font-semibold text-deeprose mb-1">Please fix:</p>
          <ul className="list-disc list-inside">
            {errorBox.map((m, i) => <li key={i} className="font-body text-[12.5px] text-deeprose">{m}</li>)}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-[13px] font-body font-semibold mb-2">Product Images</label>
        <div className="flex flex-wrap gap-3">
          {images.map((url) => (
            <img key={url} src={url} alt="" className="w-20 h-20 object-cover rounded-sm border border-line" />
          ))}
          <label className="w-20 h-20 border border-dashed border-line flex items-center justify-center cursor-pointer text-[11px] text-espresso-soft">
            {uploading ? "..." : "+ Add"}
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-body font-semibold mb-1">Product Name</label>
          <input {...register("name")} className="input" placeholder="e.g. Rose Glow Serum" />
        </div>
        <div>
          <label className="block text-[13px] font-body font-semibold mb-1">SKU</label>
          <input {...register("sku")} className="input" placeholder="e.g. VB-001" />
        </div>
        <div>
          <label className="block text-[13px] font-body font-semibold mb-1">Category</label>
          <select {...register("category")} className="input">
            {CATEGORY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[13px] font-body font-semibold mb-1">Price ($)</label>
          <input type="number" step="0.01" {...register("price")} className="input" placeholder="45.00" />
        </div>
        <div>
          <label className="block text-[13px] font-body font-semibold mb-1">Stock</label>
          <input type="number" {...register("stock")} className="input" placeholder="20" />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-body font-semibold mb-1">Description</label>
        <textarea {...register("description")} rows={4} className="input" />
      </div>
      <div>
        <label className="block text-[13px] font-body font-semibold mb-1">Benefits (one per line)</label>
        <textarea {...register("benefits")} rows={3} className="input" />
      </div>
      <div>
        <label className="block text-[13px] font-body font-semibold mb-1">Ingredients (one per line)</label>
        <textarea {...register("ingredients")} rows={3} className="input" />
      </div>
      <div>
        <label className="block text-[13px] font-body font-semibold mb-1">How to Use (one per line)</label>
        <textarea {...register("usage")} rows={3} className="input" />
      </div>

      <button type="submit" disabled={submitting} className="px-8 py-3 bg-espresso text-ivory font-body text-[13px] uppercase tracking-wide">
        {submitting ? "Saving..." : "Add Product to Store"}
      </button>

      <style jsx global>{`
        .input { width: 100%; padding: 10px 14px; font-size: 14px; background: #fff; border: 1px solid #E4D9CE; border-radius: 2px; color: #2A211D; }
        .input:focus { outline: none; border-color: #B76E79; }
      `}</style>
    </form>
  );
}
