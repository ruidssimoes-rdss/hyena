interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#9CA3AF]">
        {children}
      </span>
    </div>
  );
}
