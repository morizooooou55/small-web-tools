type InfoSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="mx-auto mt-12 max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-700">{children}</div>
    </section>
  );
}
