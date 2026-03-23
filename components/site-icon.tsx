import { cn } from "@/lib/utils";

type SiteIconProps = {
  name:
    | "tailor"
    | "chat"
    | "shield"
    | "spark"
    | "heart"
    | "calendar"
    | "brief"
    | "mail"
    | "instagram"
    | "menu"
    | "close"
    | "whatsapp"
    | "arrow"
    | "check";
  className?: string;
};

export function SiteIcon({ name, className }: SiteIconProps) {
  const shared = "h-5 w-5";

  switch (name) {
    case "tailor":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M12 3 4 7l8 4 8-4-8-4Z" />
          <path d="M4 7v10l8 4 8-4V7" />
          <path d="m12 11 0 10" />
        </svg>
      );
    case "chat":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M7 18.5 3.5 20l1-3.5A8 8 0 1 1 20 12" />
          <path d="M8 10h8M8 14h5" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M12 3 5 6v5c0 5 2.8 7.9 7 10 4.2-2.1 7-5 7-10V6l-7-3Z" />
          <path d="m9.5 12 1.6 1.6 3.8-4.1" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
          <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M12 20s-6.5-4.2-8.3-8.3A5.2 5.2 0 0 1 12 6.1a5.2 5.2 0 0 1 8.3 5.6C18.5 15.8 12 20 12 20Z" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M7 3v3M17 3v3M4 9h16" />
          <rect x="4" y="5" width="16" height="15" rx="3" />
        </svg>
      );
    case "brief":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M20 11.8A8 8 0 0 1 7.2 18.5L4 20l1.3-3.1A8 8 0 1 1 20 11.8Z" />
          <path d="M9 8.8c0 3 3.1 6.2 6.1 6.2.3 0 .8-.2 1.2-1l.3-.7-1.7-.9-.6.7c-.2.2-.5.3-.8.2-1.1-.5-2.1-1.5-2.6-2.7-.1-.2 0-.5.2-.7l.6-.6-.9-1.8-.7.3c-.7.4-1.1.8-1.1 1.3Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cn(shared, className)}>
          <path d="m5 12 4.2 4.2L19 6.8" />
        </svg>
      );
    default:
      return null;
  }
}
