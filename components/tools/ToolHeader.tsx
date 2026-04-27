import Link from "next/link";

export function ToolHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link className="text-sm font-bold text-slate-950" href="/">
          小型Webツール集
        </Link>
        <nav className="flex gap-4 text-xs font-semibold text-slate-600 sm:text-sm">
          <Link className="hover:text-teal-700" href="/tools">
            ツール一覧
          </Link>
          <Link className="hover:text-teal-700" href="/categories/life-money">
            家計
          </Link>
          <Link className="hover:text-teal-700" href="/categories/productivity">
            仕事
          </Link>
        </nav>
      </div>
    </header>
  );
}
