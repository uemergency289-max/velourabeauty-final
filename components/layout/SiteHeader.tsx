import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-ivory">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/"><Logo /></Link>
        <Link href="/admin" className="font-body text-[13px] text-espresso-soft">Admin</Link>
      </div>
    </header>
  );
}
