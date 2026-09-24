type SectionEyebrowProps = {
  index?: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
};

export function SectionEyebrow({ index, children, light = false, className = "" }: SectionEyebrowProps) {
  return (
    <div className={`section-eyebrow ${light ? "is-light" : ""} ${className}`}>
      {index ? <span>{index}</span> : null}
      <span>{children}</span>
    </div>
  );
}
