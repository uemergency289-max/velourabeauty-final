export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#C9A66B" />
            <stop offset="100%" stopColor="#B76E79" />
          </linearGradient>
        </defs>
        <path
          d="M6 6 C10 22 16 30 24 42 C32 30 38 22 42 6 C34 18 28 24 24 34 C20 24 14 18 6 6Z"
          fill="url(#logoGradient)"
        />
        <circle cx="24" cy="10" r="2.4" fill={dark ? "#F1DFDA" : "#8C4550"} />
      </svg>
      <div>
        <div
          className="font-display tracking-[0.14em]"
          style={{ fontSize: "18px", color: dark ? "#FAF7F2" : "#2A211D" }}
        >
          VELOURABEAUTY
        </div>
        <div
          className="font-body tracking-[0.35em]"
          style={{ fontSize: "8px", color: "#B76E79", marginTop: "-2px" }}
        >
          LUXURY BEAUTY
        </div>
      </div>
    </div>
  );
}
