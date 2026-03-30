export default function SectionEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex rounded-full bg-[#ecf7fd] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#2ca9df]">
      {children}
    </span>
  );
}
