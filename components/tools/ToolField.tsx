type ToolFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function ToolField({ label, error, children }: ToolFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm font-semibold text-rose-700">{error}</span> : null}
    </label>
  );
}
