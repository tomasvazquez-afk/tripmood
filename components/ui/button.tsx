import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "button-primary"
      : variant === "secondary"
        ? "button-secondary"
        : "button-tertiary";

  return <button type="button" className={cn(variantClass, className)} {...props} />;
}
