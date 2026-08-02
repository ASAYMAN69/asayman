interface ChipProps {
  children: string;
}

/** Small bordered pill for stack tags. */
export function Chip({ children }: ChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
      {children}
    </span>
  );
}
