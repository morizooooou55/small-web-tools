import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "小型Webツール集のプライバシーポリシーです。入力内容の扱い、アクセス解析、広告について説明します。",
};

export default function PrivacyPolicyPage() {
  return (
    <ToolPageLayout>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-950">プライバシーポリシー</h1>
        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-950">入力内容について</h2>
            <p className="mt-2">
              本サイトの各ツールは、ログイン不要・DB不要で動作します。入力された内容は、原則としてブラウザ上で処理され、当サイトのサーバーへ保存しません。
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">個人情報について</h2>
            <p className="mt-2">
              本サイトでは、ツール利用のために氏名、メールアドレス、住所などの個人情報の登録を求めません。機密情報や個人情報を入力する場合は、ご自身の責任で取り扱いに注意してください。
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">広告・アクセス解析について</h2>
            <p className="mt-2">
              現時点では広告スクリプトやアクセス解析スクリプトは設置していません。将来導入する場合は、このページで利用目的と内容を追記します。
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">免責</h2>
            <p className="mt-2">
              本サイトの計算結果や生成テンプレートは目安です。実際の契約内容、提出先のルール、業務上の判断は利用者自身で確認してください。
            </p>
          </section>
        </div>
      </main>
    </ToolPageLayout>
  );
}
