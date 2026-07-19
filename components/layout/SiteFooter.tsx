export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ivory-deep mt-20">
      <div className="max-w-6xl mx-auto px-5 py-8 text-center">
        <p className="font-body text-[12px] text-espresso-soft">© {new Date().getFullYear()} Velourabeauty. All rights reserved.</p>
      </div>
    </footer>
  );
}
