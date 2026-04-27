type InputCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function InputCard({ title = "入力", description, action, children }: InputCardProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
