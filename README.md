# HaruTravel

Home comercial premium para HaruTravel construida con Next.js App Router, TypeScript, Tailwind CSS y Supabase.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Cal.com embebido
- Webhook desacoplado para Google Sheets

## Desarrollo

1. Copia `.env.example` como `.env.local`.
2. Completa las variables de entorno.
3. Instala dependencias con `npm install`.
4. Levanta el proyecto con `npm run dev`.

## Variables de entorno

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CAL_LINK`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (recomendado para inserts desde API routes)
- `SHEETS_WEBHOOK_URL`
- `RESEND_API_KEY` para enviar avisos automáticos de nuevos leads
- `LEAD_NOTIFICATION_FROM` remitente verificado para los avisos de leads
- `LEAD_NOTIFICATION_TO` destino de los avisos de leads
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` opcional
- `NEXT_PUBLIC_META_PIXEL_ID` opcional

## Supabase

El SQL inicial está en [supabase/schema.sql](./supabase/schema.sql).

## Integraciones

- `app/api/leads/route.ts` guarda leads en Supabase, envía un aviso automático por email e intenta sincronizar el payload a Google Sheets por webhook sin bloquear la UX.
- `app/api/events/route.ts` persiste eventos de conversión y deja preparada la persistencia de bookings cuando Cal.com envía metadata suficiente.
- `lib/analytics.ts` deja lista la arquitectura para GA4, GTM vía `dataLayer` y Meta Pixel.
