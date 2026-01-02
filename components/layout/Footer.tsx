export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} UI Foundry</p>
        <p style={{ color: "var(--muted)" }}>Ads + subscription coming later.</p>
      </div>
    </footer>
  );
}
