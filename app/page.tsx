import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  let products: any[] = [];
  let dbConnected = true;
  try {
    products = await prisma.product.findMany({ where: { isPublished: true }, include: { images: true }, orderBy: { createdAt: "desc" } });
  } catch {
    dbConnected = false;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-16">
      <h1 className="font-display text-[40px] text-espresso mb-2">Velourabeauty</h1>
      <p className="font-body text-espresso-soft mb-10">Luxury beauty, undiluted.</p>

      {!dbConnected && <p className="font-body text-deeprose">Database not connected — check DATABASE_URL.</p>}

      {dbConnected && products.length === 0 && (
        <div className="border border-dashed border-line rounded-sm p-16 text-center">
          <p className="font-display text-[22px] mb-2">Your store is ready</p>
          <p className="font-body text-espresso-soft mb-4">Add your first product to get started.</p>
          <Link href="/admin/products/new" className="inline-block px-6 py-3 bg-espresso text-ivory font-body text-[13px] uppercase tracking-wide">Add a Product</Link>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border border-line rounded-sm overflow-hidden">
              {p.images[0] && <img src={p.images[0].url} alt={p.name} className="w-full aspect-square object-cover" />}
              <div className="p-3">
                <p className="font-display text-[15px]">{p.name}</p>
                <p className="font-body text-[13px] text-espresso-soft">${p.price.toString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
