import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HaruTravel",
    short_name: "HaruTravel",
    description:
      "Agencia de viajes en Argentina especializada en viajes a medida y viajes personalizados con atención cercana.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F9FC",
    theme_color: "#4E1F30",
    lang: "es-AR",
    icons: [
      {
        src: "/favicon.png?v=2",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/favicon.png?v=2",
        sizes: "192x192",
        type: "image/png"
      }
    ]
  };
}
