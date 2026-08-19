# FOCUS//OS

Personal Operating System para estudio, pasantía y foco. La aplicación reduce la pregunta diaria a una decisión clara: **qué hacer ahora**.

## Estado actual

Sprint 2 está en curso: autenticación por Supabase, protección de rutas y sesiones de foco persistentes están implementadas en el código.

Los datos académicos visibles provienen exclusivamente de [SEMESTER_SCHEDULE_2-2026.md](./SEMESTER_SCHEDULE_2-2026.md). No hay sincronización de Calendar ni IA.

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4 y componentes propios
- Server Components por defecto; Client Components solo para Command Palette y control de foco

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` (redirige a `/today`).

## Verificación

```bash
npm run typecheck
npm run lint
npm run build
```

## Estructura

```text
src/
├── app/                 # rutas y estilos globales
├── components/          # primitives y shell visual
└── modules/             # dominios; se amplían en Sprint 2+
    └── schedule/        # dataset temporal de la vista Today
```

## Próximo paso: Sprint 2

Para habilitar autenticación, perfiles, tareas y sesiones persistentes se requiere un proyecto Supabase. Cuando esté disponible, añade en `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

No compartas una `service_role` en el frontend. Con esas dos variables puedo continuar con Auth, RLS, migraciones y datos reales de Today.

Después de configurar las variables, ejecuta una vez [la migración base](./supabase/migrations/20260814_sprint_2_core.sql) en **Supabase Dashboard → SQL Editor**. Crea las tablas, el perfil automático y las políticas RLS necesarias para el login y el foco persistente.

## Principios de implementación

- La documentación raíz es la fuente de verdad.
- El naranja denota acción o atención; el verde ácido, estado saludable/activo.
- No se implementan clases por recurrencia semanal genérica: el horario canónico usa fechas explícitas y `America/La_Paz`.
- La unidad visual es la escena, no una grilla de tarjetas SaaS.
