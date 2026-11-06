import { icons } from "../../lib/icons";

interface Props { name: string; size?: number; className?: string; fill?: boolean }

export default function Icon({ name, size = 20, className, fill }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {(icons[name] ?? []).map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
