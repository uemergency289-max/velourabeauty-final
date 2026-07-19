import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-[26px] text-espresso mb-4">Welcome, Shahid</h1>
      <Link href="/admin/products" className="inline-block px-5 py-2.5 bg-espresso text-ivory font-body text-[13px]">
        Manage Products
      </Link>
    </div>
  );
}
