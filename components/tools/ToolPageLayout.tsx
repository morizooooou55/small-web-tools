import Link from "next/link";
import { ToolHeader } from "./ToolHeader";

type ToolPageLayoutProps = {
  children: React.ReactNode;
};

export function ToolPageLayout({ children }: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <ToolHeader />
      {children}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>ログイン不要で使える小型Webツールを追加中です。</p>
          <nav className="flex flex-wrap gap-4">
            <Link className="hover:text-teal-700" href="/privacy-policy">
              プライバシーポリシー
            </Link>
            <Link className="hover:text-teal-700" href="/usage-notes">
              利用上の注意
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
