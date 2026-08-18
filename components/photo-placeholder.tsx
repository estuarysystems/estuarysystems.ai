type PhotoPlaceholderProps = {
  label: string;
  className?: string;
};

export function PhotoPlaceholder({ label, className = "" }: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex min-h-64 items-center justify-center bg-slot px-6 py-10 text-center font-mono text-sm leading-relaxed text-slot-ink ${className}`}
    >
      {label}
    </div>
  );
}
