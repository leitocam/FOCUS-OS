# FOCUS//OS — Estado actual y guía de producción

Actualizado: `2026-08-15`.

## Estado por sprint

| Sprint | Estado | Alcance disponible |
|---|---|---|
| 1 — Visual System + Today | Completo | Sistema visual, Today responsive, Command Palette visual y horario canónico de muestra. |
| 2 — Core Backend | Completo | Supabase Auth/JWT, perfiles, tareas, sesiones de foco, RLS. |
| 3 — Internship | Completo tras aplicar la migración de pausa | Timer, pausa/reanudar, stop, registro manual, historial, metas y proyección. |
| 4 — Google Calendar | Implementado, pendiente de prueba integral | OAuth, refresh token, sync inicial/incremental, borrados remotos, eventos de día completo, reservas con conflicto e importación idempotente del semestre. |

## Migraciones requeridas

Ejecutar en orden en **Supabase → SQL Editor**:

1. `20260814_sprint_2_core.sql`
2. `20260814_internship_pause_state.sql`
3. `20260815_google_calendar.sql`
4. `20260815_semester_schedule_import.sql`
5. `20260818_calendar_connection_identity.sql`
6. `20260818_calendar_sync_hardening.sql`

## Variables de entorno

Solo las `NEXT_PUBLIC_*` pueden estar disponibles en el navegador. Nunca expongas secretos.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000

GOOGLE_CALENDAR_CLIENT_ID=
GOOGLE_CALENDAR_CLIENT_SECRET=
GOOGLE_CALENDAR_REDIRECT_URI=http://localhost:3000/api/integrations/google/callback

# Solo servidor. Necesaria para persistir tokens de Google fuera del navegador.
SUPABASE_SERVICE_ROLE_KEY=

# Solo producción; protege /api/cron/calendar-sync.
CRON_SECRET=
```

## Producción mínima

1. Crear un proyecto Vercel y conectar el repositorio.
2. Copiar las variables anteriores en **Vercel → Project Settings → Environment Variables**.
3. Establecer `NEXT_PUBLIC_SITE_URL=https://tu-dominio.com`.
4. En Supabase Auth, configurar la Site URL y el callback de autenticación de producción.
5. En Google Cloud OAuth, añadir `https://tu-dominio.com/api/integrations/google/callback` a los redirect URIs autorizados.
6. Ejecutar las migraciones en el proyecto Supabase de producción.
7. Configurar `CRON_SECRET` en Vercel. `vercel.json` ejecuta la sincronización cada 4 horas.
7. Probar: registro, confirmación de correo, login, RLS, pasantía, conexión Calendar, sync y creación de evento.

## Seguridad

- Supabase Auth emite JWT; las páginas protegidas validan sus claims.
- RLS limita tareas, sesiones y eventos al usuario autenticado.
- `calendar_connections` no entrega políticas RLS al navegador: access/refresh tokens solo los lee el servidor con `SUPABASE_SERVICE_ROLE_KEY`.
- Nunca usar `SUPABASE_SERVICE_ROLE_KEY` ni `GOOGLE_CALENDAR_CLIENT_SECRET` con prefijo `NEXT_PUBLIC_`.

## Límite de la versión actual

La sincronización inicial trae una ventana de 7 días pasados y 90 días futuros; las siguientes usan `syncToken`. Falta validar visualmente el flujo completo con una cuenta real, diseñar la escena de oportunidades libres y, si el volumen de usuarios crece, sustituir el cron global por webhooks de Google Calendar.
