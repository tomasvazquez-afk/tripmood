import Image from "next/image";

type BrandMarkProps = {
  light?: boolean;
  compact?: boolean;
};

export function BrandMark({ light = false }: BrandMarkProps) {
  return (
    <Image
      src={light ? "/Logo%20Clarito%20I.png" : "/Logo%20Oscuro%20II.png"}
      alt="HaruTravel"
      width={140}
      height={40}
      className="h-10 w-auto"
      priority
    />
  );
}
