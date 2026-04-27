type AdPlaceholderProps = {
  label?: string;
};

export function AdPlaceholder({ label = "広告枠" }: AdPlaceholderProps) {
  return (
    <aside
      aria-label={label}
      className="mx-auto mt-10 max-w-5xl px-4"
    >
      <div className="flex min-h-24 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white text-xs font-semibold text-slate-400">
        {label}
      </div>
    </aside>
  );
}
