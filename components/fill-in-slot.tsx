type FillInSlotProps = {
  label: string;
  className?: string;
};

export function FillInSlot({ label, className = "" }: FillInSlotProps) {
  return (
    <div
      className={`border border-dashed border-line bg-slot px-5 py-6 font-mono text-sm text-slot-ink ${className}`}
    >
      {label}
    </div>
  );
}
