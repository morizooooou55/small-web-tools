type ResultItemProps = {
  label: string;
  value: string;
};

export function ResultItem({ label, value }: ResultItemProps) {
  return (
    <div className="rounded-md border border-slate-200 p-4">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-lg font-bold text-slate-950">{value}</dd>
    </div>
  );
}
