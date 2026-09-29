import Image from "next/image";
import { cn } from "@/lib/utils";

const SOURCES = {
  default: "/ppobo/ppobo-state-default.webp",
  happy: "/ppobo/ppobo-state-happy.webp",
  focus: "/ppobo/ppobo-state-focus.webp",
  done: "/ppobo/ppobo-state-done.webp",
  cheer: "/ppobo/ppobo-state-cheer.png",
} as const;

/** 쌤씀 캐릭터 뽀뽀. 원본 에셋만 사용하며 장식이므로 기본적으로 스크린리더에서 숨긴다. */
export function Ppobo({
  state = "default",
  size = 96,
  className,
  alt = "",
  float = false,
}: {
  state?: keyof typeof SOURCES;
  size?: number;
  className?: string;
  alt?: string;
  float?: boolean;
}) {
  return (
    <Image
      src={SOURCES[state]}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn("pointer-events-none select-none", float && "motion-safe:animate-[ppobo-float_4s_ease-in-out_infinite]", className)}
    />
  );
}
