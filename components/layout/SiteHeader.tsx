import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-ivory">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-[22px] tracking-wide text-espresso">VELOURABEAUTY</Link>
        <Link href="/admin" className="font-body text-[13px] text-espresso-soft">Admin</Link>
      </div>
    </header>
  );
}
