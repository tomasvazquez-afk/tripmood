import Image from "next/image";

type BrandMarkProps = {
  light?: boolean;
  compact?: boolean;
};

export function BrandMark({ light = false }: BrandMarkProps) {
  return (
    <Image
      src={light ? "/logo-blanco.png" : "/logo-oscuro.png"}
      alt="TripMood"
      width={140}
      height={40}
      className="h-10 w-auto"
      priority
    />
  );
}
