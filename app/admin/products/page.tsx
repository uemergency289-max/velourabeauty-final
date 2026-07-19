import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({ include: { images: true }, orderBy: { createdAt: "desc" } });
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-[24px] text-espresso">Your Products</h1>
        <Link href="/admin/products/new" className="px-4 py-2 bg-espresso text-ivory font-body text-[12px] uppercase">+ Add Product</Link>
      </div>
      {products.length === 0 && <p className="font-body text-espresso-soft">No products yet.</p>}
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-line p-3 rounded-sm">
            <span className="font-body text-[14px]">{p.name}</span>
            <span className="font-body text-[13px] text-espresso-soft">${p.price.toString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
