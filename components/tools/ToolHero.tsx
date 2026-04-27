type ToolHeroProps = {
  title: string;
  description: string;
  tags: string[];
};

export function ToolHero({ title, description, tags }: ToolHeroProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-10 sm:pt-14">
      <nav className="text-xs font-semibold text-slate-500">
        ホーム ＞ 家計・生活 ＞ {title}
      </nav>
      <h1 className="mt-5 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            className="rounded-md border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
