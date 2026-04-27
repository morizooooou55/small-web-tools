type ResultCardProps = {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function ResultCard({ title = "結果", action, children }: ResultCardProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
