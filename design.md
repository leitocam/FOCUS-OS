# FOCUS//OS — DESIGN.md
## Dirección visual, sistema de diseño y reglas de implementación

> **Propósito de este documento:** impedir que FOCUS//OS termine pareciendo una plantilla SaaS genérica, un dashboard de shadcn “con dark mode”, o una interfaz visualmente correcta pero sin identidad.
>
> Este archivo define **la esencia visual**, la gramática de composición, la textura, la densidad, el movimiento, las reglas de interacción y los anti-patrones del producto.

---

# 0. Manifiesto visual

FOCUS//OS debe sentirse como una mezcla entre:

- una consola de control;
- una pieza editorial digital;
- un sistema industrial preciso;
- una interfaz de infraestructura;
- una herramienta personal seria;
- un producto tecnológico con intención visual.

No debe sentirse como:

- una app de productividad infantil;
- un dashboard corporativo de 2023;
- una demo de Tailwind;
- una landing de IA genérica;
- una colección de cards flotantes;
- una copia de Linear;
- una copia de Notion;
- una copia de Raycast;
- una copia de cualquier referencia específica.

La dirección es:

> **Editorial industrial + cyber minimalism + system UI + brutal precision.**

La interfaz tiene que transmitir:

```text
CONTROL
CLARIDAD
RITMO
PRECISIÓN
TENSIÓN VISUAL
TECNOLOGÍA
FOCO
```

No debe transmitir:

```text
AMABILIDAD CORPORATIVA
SOFT SaaS
WELLNESS APP
GAMIFICACIÓN
“AI MAGIC”
```

---

# 1. La regla más importante

## Nunca diseñar “componentes bonitos” aislados.

Diseñar **composiciones**.

La mayoría de las interfaces generadas por IA caen en este patrón:

```text
CARD
CARD
CARD
CARD

CHART
CARD

BUTTON
```

FOCUS//OS debe pensar como una página editorial:

```text
┌─────────────────────────────────────────────────────────────┐
│ LABEL                                                       │
│                                                             │
│ Gran mensaje / decisión                                     │
│                                                             │
│                                  visual / sistema activo     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ metrics             metrics               metrics            │
├─────────────────────────────────────────────────────────────┤
│ timeline / data / system                                    │
└─────────────────────────────────────────────────────────────┘
```

La unidad de diseño no es la tarjeta.

La unidad es la **escena**.

---

# 2. Esencia capturada de las referencias

Las referencias comparten varias decisiones muy específicas.

## 2.1 Fondos negros reales

No usar:

```css
#111827
#0f172a
```

Eso parece Tailwind default.

Usar negros cercanos a negro real:

```css
--bg: #050505;
--bg-deep: #020202;
--panel: #090909;
--panel-raised: #0d0d0e;
```

La diferencia entre superficies debe ser pequeña.

El contraste visual viene más de:

- border;
- spacing;
- typography;
- texture;
- light;
- hierarchy;

que de usar 8 tonos distintos de gris.

---

# 3. La composición debe tener tensión

Las referencias no están perfectamente “centradas y equilibradas”.

Tienen:

- grandes espacios vacíos;
- bloques visuales desplazados;
- contenido que ocupa solo una parte;
- elementos duros;
- áreas negras que deliberadamente no contienen nada.

Eso crea carácter.

## Regla

No llenar cada hueco.

```text
MALO

┌────────┬────────┬────────┐
│ card   │ card   │ card   │
├────────┼────────┼────────┤
│ chart  │ chart  │ chart  │
└────────┴────────┴────────┘
```

```text
BIEN

┌───────────────────────────────────────────────┐
│                                               │
│  TODAY                                        │
│  You have 2h 14m.                            │
│                                               │
│                         ┌──────────────────┐  │
│                         │ active system    │  │
│                         └──────────────────┘  │
│                                               │
├────────────────────────────┬──────────────────┤
│ TIMELINE                   │ PRIORITY         │
│                            │                  │
└────────────────────────────┴──────────────────┘
```

---

# 4. El sistema visual tiene tres capas

```text
LAYER 1 — STRUCTURE
grid, borders, panels, coordinates

LAYER 2 — INFORMATION
typography, metrics, timeline, tasks

LAYER 3 — ATMOSPHERE
halftone, glow, noise, gradients, motion
```

La capa 3 nunca debe destruir la capa 2.

---

# 5. Color system

## 5.1 Base

```css
:root {
  --black-0: #000000;
  --black-1: #030303;
  --black-2: #050505;
  --black-3: #080808;
  --black-4: #0b0b0c;
  --black-5: #101011;

  --line-1: #171719;
  --line-2: #202023;
  --line-3: #2a2a2e;

  --white: #f4f4ef;
  --white-soft: #d7d7d2;
  --muted: #858589;
  --dim: #505055;

  --orange: #ff6a2f;
  --orange-hot: #ff7845;
  --orange-dim: #7f3018;

  --acid: #92ff36;
  --acid-dim: #3f6e1c;

  --danger: #ff4e4e;
  --warning: #ffb32c;
}
```

---

# 6. Color hierarchy

## Orange

Reservado para:

- acción actual;
- selección;
- información importante;
- progreso que necesita atención;
- circuitos;
- conectores;
- glows;
- CTAs primarios.

## Acid green

Reservado para:

- conectado;
- completado;
- activo;
- healthy;
- running;
- success.

## White

Información primaria.

## Grey

Información secundaria.

---

# 7. Nunca colorear todo

Una pantalla puede ser 95% monocroma.

Ejemplo:

```text
WHITE  ████████████████████████████████████████████
GREY   ███████████
ORANGE ██
GREEN  █
```

Eso hace que el color tenga valor semántico.

---

# 8. Tipografía como protagonista

Las referencias funcionan porque la tipografía carga gran parte de la identidad.

## Familias

### Sans
Recomendado:

```text
Geist
```

Alternativas:

```text
Inter
Satoshi
Manrope
```

### Mono
Recomendado:

```text
Geist Mono
```

Alternativas:

```text
IBM Plex Mono
JetBrains Mono
```

---

# 9. Escala tipográfica

```css
--type-hero: clamp(3.5rem, 7vw, 8.5rem);
--type-display: clamp(2.8rem, 5vw, 5.8rem);
--type-h1: clamp(2rem, 3.5vw, 4rem);
--type-h2: clamp(1.4rem, 2.2vw, 2.4rem);

--type-body-lg: 1.125rem;
--type-body: 0.9375rem;
--type-small: 0.8125rem;
--type-label: 0.6875rem;
```

---

# 10. Labels de sistema

Los pequeños textos mono son fundamentales.

Ejemplos:

```text
● SYSTEM / ACTIVE
TODAY / THU 13 AUG
01 — NEXT
SYNC / GOOGLE
INTERNSHIP / LIVE
FOCUS SESSION / 02:18:34
```

Características:

```css
font-family: var(--font-mono);
font-size: 11px;
text-transform: uppercase;
letter-spacing: .04em;
```

No abusar de `letter-spacing: .2em`.

Eso parece plantilla.

---

# 11. Headlines

Los títulos deben tener respiración y ruptura editorial.

No:

```text
Stay productive with your personal workspace
```

Sí:

```text
Make the next
2 hours count.
```

o:

```text
You have time.
Use it well.
```

o:

```text
Nothing urgent.
That matters.
```

---

# 12. Copywriting visual

La interfaz debe hablar como un sistema sobrio.

No:

```text
✨ Great job!
You're crushing your goals!
Keep the streak alive!
```

Sí:

```text
AHEAD BY 3H 20M
```

```text
3 TASKS REMAIN
```

```text
NEXT COMMITMENT / 17:30
```

```text
LOAD / HEAVY
```

```text
NO CONFLICTS DETECTED
```

---

# 13. Grid estructural

El grid debe ser visible de manera sutil.

## Desktop

```text
max-width: 1440–1600px
12 columns
gutter: 16–24px
outer margin: 32–64px
```

Pero varios bloques pueden ignorar el gutter y tocar líneas estructurales.

Eso es importante.

---

# 14. Bordes

Los bordes son parte de la identidad.

```css
border: 1px solid var(--line-1);
```

No:

```css
box-shadow: 0 10px 40px ...
```

para separar cualquier cosa.

Usar shadow solo en overlays importantes.

---

# 15. Border intersections

En páginas grandes, las líneas deberían parecer una estructura técnica.

Ejemplo:

```text
      +
──────┼───────────────────────────────
      │
      │
      │
──────┼───────────────┬───────────────
      │               │
```

Pequeños cruces `+`, ticks o nodos pueden aparecer en las intersecciones.

Nunca en todas.

---

# 16. Border radius

FOCUS//OS no debe tener el “rounded-xl everywhere syndrome”.

## Sistema

```text
Structural panels:   0–4px
Cards de información: 6px
Interactive tiles:  8px
Modal:              8px
Floating overlay:   10px
```

Evitar:

```text
16px
20px
24px
```

como valor por defecto.

---

# 17. Paneles

Un panel no necesariamente tiene fondo.

Puede ser solo:

```css
border-left: 1px solid var(--line-1);
border-top: 1px solid var(--line-1);
```

Esto hace la composición más liviana.

---

# 18. Cards 3D

Las referencias usan objetos 3D / mockups dentro de áreas oscuras.

FOCUS//OS puede capturar esa sensación sin llenar todo de 3D.

Usarlo en lugares estratégicos:

- onboarding;
- landing;
- empty state premium;
- conexión de Google Calendar;
- representación abstracta de una semana;
- “system connected”.

No usar objetos 3D en cada tarjeta.

---

# 19. Halftone

El halftone es uno de los recursos visuales más importantes.

Debe sentirse:

```text
analógico
industrial
digital
imperfecto
```

No:

```text
cyberpunk gamer
```

---

# 20. Halftone CSS

Ejemplo base:

```css
.halftone {
  background-image:
    radial-gradient(
      circle,
      rgba(255, 106, 47, 0.75) 0 1px,
      transparent 1.6px
    );
  background-size: 7px 7px;
}
```

Aplicar máscaras:

```css
mask-image:
  radial-gradient(
    ellipse at center,
    black 0%,
    rgba(0,0,0,.75) 38%,
    transparent 75%
  );
```

---

# 21. Halftone orgánico

No hacer siempre un círculo perfecto.

Combinar varias máscaras:

```css
mask-image:
  radial-gradient(circle at 20% 40%, black, transparent 45%),
  radial-gradient(circle at 80% 70%, black, transparent 50%);
```

Puede simular:

- onda;
- tejido;
- flujo;
- nube;
- superficie digital.

---

# 22. El glow

El glow debe parecer luz filtrándose.

No “neon”.

Malo:

```css
box-shadow: 0 0 50px #ff6600;
```

Mejor:

```css
filter: blur(28px);
opacity: .18;
```

en un elemento de fondo separado.

---

# 23. Textura noise

Una capa de noise muy pequeña ayuda a romper el aspecto “vector perfecto”.

Opacidad:

```text
1.5% – 3%
```

No más.

Puede estar implementada mediante:

- SVG filter;
- tiny data texture;
- pseudo-element;
- procedural CSS.

---

# 24. Scanlines opcionales

Solo en áreas específicas:

```css
background-image:
  repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    rgba(255,255,255,.015) 4px
  );
```

Nunca en toda la app.

---

# 25. Pattern industrial

Usar barras diagonales para separar zonas.

```css
background:
  repeating-linear-gradient(
    135deg,
    rgba(255,255,255,.05) 0 4px,
    transparent 4px 9px
  );
```

Ideal para:

- footer edge;
- “system zone”;
- división de secciones;
- áreas experimentales.

---

# 26. Hero de la aplicación

FOCUS//OS autenticado debería tener un “hero funcional”.

Ejemplo:

```text
┌──────────────────────────────────────────────────────────────┐
│ ● TODAY / THURSDAY                                          │
│                                                              │
│ You have                                                     │
│ 2h 14m free.                                                 │
│                                                              │
│ Next commitment / Algorithms / 17:30                        │
│                                                              │
│ [ START FOCUS ]                                              │
│                                                              │
│                                     SYSTEM STATUS            │
│                                     Calendar / synced        │
│                                     Internship / 61.8%       │
│                                     Load / normal            │
└──────────────────────────────────────────────────────────────┘
```

---

# 27. No usar “Welcome back”

Nunca:

```text
Welcome back, Lucas 👋
```

Eso es una de las señales más fuertes de dashboard genérico.

Usar información real:

```text
THURSDAY / AUG 13
```

```text
2H 14M AVAILABLE
```

---

# 28. Métricas

Las métricas no deben ser cards flotantes idénticas.

Mejor un strip estructural:

```text
┌────────────────────────────────────────────────────────────┐
│ 148H              │ 12H 43M           │ 3 / 6             │
│ INTERNSHIP        │ FOCUS / WEEK      │ TASKS / TODAY     │
└────────────────────────────────────────────────────────────┘
```

---

# 29. Metric anatomy

```text
148H
────
61.8% / INTERNSHIP
```

Orden:

1. dato;
2. significado;
3. comparación/contexto;
4. opcional micro-indicador.

---

# 30. Barra de progreso

No usar siempre el componente default redondeado.

Ejemplo técnico:

```text
███████████████████░░░░░░░░
```

Visual CSS:

```css
height: 8px;
border: 1px solid var(--line-2);
padding: 1px;
```

Interior con borde casi cuadrado.

---

# 31. Botones

## Primary

Inspiración industrial:

```text
┌────────────────────────────┐
│ START FOCUS             →  │
└────────────────────────────┘
```

Propiedades:

```text
height: 42–46px
radius: 3–5px
uppercase mono label
strong contrast
```

---

# 32. Button arrow cell

El botón puede tener una pequeña celda separada:

```text
┌──────────────────────┬─────┐
│ START FOCUS          │  →  │
└──────────────────────┴─────┘
```

Este detalle añade identidad.

---

# 33. Botón claro

En superficies negras, un botón casi blanco puede ser más agresivo y editorial que uno naranja.

Ejemplo:

```text
[ START SESSION → ]
```

fondo:

```css
#efefe9
```

texto:

```css
#090909
```

Usar el naranja como estado hover o pequeño detalle.

---

# 34. CTA naranja

Reservarlo para las acciones que realmente necesitan máximo peso:

- confirmar;
- empezar sesión;
- aceptar plan;
- conexión principal.

---

# 35. Hover de botones

No escalar:

```css
transform: scale(1.05);
```

Eso parece UI demo.

Usar:

```text
border brighten
arrow move 3px
text contrast
subtle background change
```

---

# 36. Iconografía

Preferir iconos:

- lineales;
- técnicos;
- 1.5px;
- sin relleno;
- pequeños.

No usar iconos gigantes de Lucide dentro de cuadrados de color para cada sección.

---

# 37. Iconos como señales

Ejemplo:

```text
○ queued
● active
✓ complete
× failed
→ next
```

Pequeñas primitivas visuales funcionan mejor que ilustraciones genéricas.

---

# 38. Navigation

La navegación debe parecer una barra de sistema.

```text
FOCUS//OS  /   TODAY   CALENDAR   FOCUS   INTERNSHIP   INSIGHTS
```

Tipografía:

```text
brand → display/mono
items → mono / 11–12px
```

---

# 39. Navegación activa

No usar:

```text
pill rounded-full
```

Usar:

- underline;
- small square;
- orange tick;
- brighter text.

Ejemplo:

```text
■ TODAY
```

---

# 40. Command palette

El command palette debe sentirse como una consola elegante.

```text
┌────────────────────────────────────────────┐
│ > start                                    │
├────────────────────────────────────────────┤
│ START / FOCUS                              │
│ START / INTERNSHIP                         │
│ ADD / TASK                                 │
│ OPEN / CALENDAR                            │
└────────────────────────────────────────────┘
```

No como Spotlight genérico.

---

# 41. Inputs

Inputs negros, sin cajas enormes.

```css
background: #070707;
border: 1px solid var(--line-2);
```

Focus:

```css
border-color: var(--orange);
```

No glow azul.

---

# 42. Selects

Selects deben mostrar carácter de sistema:

```text
[ PRIORITY / HIGH ▾ ]
```

No grandes campos blancos/transparentes.

---

# 43. Empty states

Evitar ilustraciones vectoriales simpáticas.

Ejemplo:

```text
NO EVENTS FOUND

Your calendar is clear
between 14:00 and 17:30.

[ CREATE FOCUS BLOCK ]
```

---

# 44. Loading

No usar un spinner enorme.

Usar estados de sistema:

```text
SYNCING CALENDAR...

■■■■■■□□□□
```

o skeleton estructural.

---

# 45. Error

```text
SYNC / FAILED

Google Calendar did not respond.

Last successful sync
22:41:18

[ RETRY ]
```

Sin mensajes emocionales.

---

# 46. Status indicators

```text
● ONLINE
● SYNCED
● ACTIVE
○ IDLE
× FAILED
```

El status dot debe ser pequeño.

---

# 47. Timeline

La timeline es una pieza central.

```text
08:00 ─── Architecture
        │
10:00 ─── Algorithms
        │
12:00 ─── FREE / 01:30
        │
14:00 ─── Internship
        │
17:30 ─── Algorithms
```

La línea debe sentirse técnica, no decorativa.

---

# 48. Current time marker

```text
────────────── 14:37 ──────────────
```

Usar naranja para el tiempo actual.

---

# 49. Calendar

No copiar Google Calendar.

FOCUS//OS debe mostrar carga y oportunidad.

```text
             MON       TUE       WED       THU
08           CLASS     CLASS               CLASS
10                     ALGO      ALGO
12                               FREE
14           INTERN    INTERN    INTERN     INTERN
16
18           STUDY               PROJECT
```

---

# 50. Los “free slots” son visualmente protagonistas

No esconderlos.

Un hueco libre debe aparecer como espacio real.

Ejemplo:

```text
12:00

        AVAILABLE
        01H 32M

13:32
```

Eso refuerza el propósito del producto.

---

# 51. Focus Mode

Focus Mode debe cambiar de lenguaje.

Sin sidebar.

Sin cards.

Sin navegación compleja.

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

● FOCUS / ACTIVE

ALGORITHMS

Maximum Subarray


                    47:32


         ███████████████░░░░░


              [ PAUSE ]


NEXT / 19:30
Architecture

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

# 52. Focus Mode atmosphere

Puede usar:

- black puro;
- ligero glow naranja detrás del timer;
- scanline apenas perceptible;
- barra de progreso;
- ninguna distracción.

---

# 53. Internship

El módulo de pasantía debe parecer una mezcla de contador y sistema de progreso.

```text
● INTERNSHIP / ACTIVE

02:18:34

SESSION

PROJECT / AUTOMATION PLATFORM
START / 14:02

[ STOP SESSION ]
```

---

# 54. Internship progress

```text
148H 32M

OF 240 REQUIRED

██████████████████░░░░░░░░░

61.8%

PACE / +18H AHEAD
```

---

# 55. Insights

No diseñar dashboards llenos de pie charts.

Los insights deben priorizar texto y grandes números.

```text
12H 43M

DEEP WORK / WEEK

+18%
vs previous week
```

Luego una sparkline mínima.

---

# 56. Sparklines

Sin ejes.

Sin leyenda innecesaria.

```text
      ╭──╮
   ╭──╯  ╰╮
───╯       ╰──
```

---

# 57. AI Copilot

El copiloto no debe parecer un chatbot de atención al cliente.

No usar burbujas redondeadas gigantes.

Diseñarlo como **command layer**.

---

# 58. Copilot layout

```text
┌──────────────────────────────────────────┐
│ COPILOT / CONTEXTUAL                     │
├──────────────────────────────────────────┤
│                                          │
│ 2H 14M available before Algorithms.      │
│                                          │
│ RECOMMENDED                              │
│ Algorithms assignment / 90m              │
│                                          │
│ WHY                                      │
│ Due tomorrow                             │
│ High priority                            │
│ Fits available block                     │
│                                          │
├──────────────────────────────────────────┤
│ [ CREATE BLOCK ]                         │
└──────────────────────────────────────────┘
```

---

# 59. AI messages

La IA debería usar estructura:

```text
OBSERVATION
RECOMMENDATION
IMPACT
ACTION
```

No mensajes largos estilo ChatGPT dentro del dashboard.

---

# 60. AI confirmation

Mutaciones visualmente claras:

```text
PROPOSED ACTION / 03 ITEMS

+ Algorithms       16:00–17:30
+ Internship       19:00–21:00
+ Project          Friday / 90m

[ CANCEL ]                     [ CONFIRM ]
```

---

# 61. AI audit

El historial de IA puede verse como un log:

```text
19:43:02  CREATE_BLOCK   SUCCESS
19:41:54  READ_WEEK      SUCCESS
19:40:12  FREE_SLOTS     03 FOUND
```

Muy coherente con el lenguaje visual.

---

# 62. Página Weekly Review

Debe sentirse editorial.

```text
WEEK / 33

You worked
less than planned.

12H 43M / focus
16H 12M / internship
18 / 22 / tasks

────────────────────────────────────

SYSTEM NOTE

Programming tasks were underestimated
by an average of 35%.

Thursday had the highest load.

Recommendation /
move deep work before 18:00.
```

---

# 63. Densidad

La densidad debe variar.

## Hero
baja densidad.

## Timeline
media.

## Logs
alta.

## Focus
muy baja.

Esto genera ritmo.

---

# 64. Ritmo vertical

No usar siempre:

```text
padding: 24px
gap: 24px
```

Crear escalas:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 72px;
--space-9: 112px;
```

---

# 65. Grand scene

Cada pantalla importante necesita **un momento visual memorable**.

Ejemplos:

## Today
gran número de tiempo disponible.

## Internship
contador activo.

## Focus
timer gigante.

## Calendar
bloques + free slots.

## Insights
gran dato semanal.

## Growth
roadmap lineal.

Sin ese momento, la pantalla se sentirá genérica.

---

# 66. Today — escena principal

```text
TODAY / THURSDAY

02H 14M

AVAILABLE BEFORE
YOUR NEXT COMMITMENT

Algorithms / 17:30

[ START FOCUS → ]
```

El `02H 14M` puede ocupar 30–40% de la altura visible.

---

# 67. Internship — escena principal

```text
148H

/ 240

61.8%

PACE / AHEAD 18H
```

Con halftone de fondo progresando horizontalmente.

---

# 68. Focus — escena principal

```text
47:32
```

Nada debe competir con el timer.

---

# 69. Calendar — escena principal

La semana completa debe verse como un “sistema de carga”.

No como un calendario tradicional.

---

# 70. Landing / onboarding

La landing puede adoptar más directamente la estética de las referencias:

- gran split screen;
- texto enorme a izquierda;
- visual de sistema a derecha;
- halftone naranja;
- strip de métricas;
- líneas de borde;
- barra industrial inferior.

---

# 71. Landing hero

```text
┌─────────────────────────────────────────────────────────────┐
│ FOCUS//OS /                                                │
├────────────────────────────┬────────────────────────────────┤
│                            │                                │
│ YOUR TIME                  │     abstract calendar          │
│ IS ALREADY                 │     / halftone / system        │
│ ALLOCATED.                 │                                │
│                            │        NEXT / 17:30            │
│ USE WHAT'S LEFT.           │        FREE / 02:14            │
│                            │                                │
│ [ ENTER SYSTEM → ]         │                                │
├────────────────────────────┴────────────────────────────────┤
│ 12H FOCUS        148H INTERNSHIP        03 DEADLINES       │
└─────────────────────────────────────────────────────────────┘
```

---

# 72. Background hero

Ejemplo CSS conceptual:

```css
.hero-art {
  background:
    radial-gradient(
      circle at 78% 44%,
      rgba(255,106,47,.25),
      transparent 20%
    ),
    radial-gradient(
      circle at 68% 72%,
      rgba(255,106,47,.12),
      transparent 32%
    ),
    #050505;
}
```

Agregar halftone encima mediante pseudo-element.

---

# 73. Visual object language

FOCUS//OS puede tener objetos gráficos propios:

- stacked cards;
- calendar slices;
- floating timeline panes;
- data plates;
- hour blocks;
- mini system diagrams.

Todos con perspectiva mínima y casi monocromos.

---

# 74. Perspective

Si se usa 3D:

```text
perspective: 800–1200px
rotateX: 4–8deg
rotateY: 4–12deg
```

No exagerar.

Nada de cards girando 25 grados.

---

# 75. Componentes con profundidad

La profundidad debe salir de:

```text
overlap
perspective
subtle shadow
light
```

No de glassmorphism.

---

# 76. Glassmorphism prohibido

Evitar:

```css
backdrop-filter: blur(30px);
background: rgba(255,255,255,.08);
border: 1px solid rgba(255,255,255,.2);
```

como lenguaje global.

Puede usarse una vez en un overlay.

---

# 77. Gradientes

No usar gradient text.

No:

```text
AI-powered productivity
```

con violeta → azul.

Gradientes permitidos:

- backgrounds;
- light falloff;
- masks;
- halftone intensity;
- atmospheric glow.

---

# 78. Pills

Pills solo para:

- status;
- pequeños filters;
- system tags.

Ejemplo:

```text
[ ACTIVE ]
[ TODAY ]
```

No convertir:

- nav;
- botones;
- cards;
- metrics;

en pills.

---

# 79. Avatares

No mostrar avatar grande del usuario.

Si existe:

```text
● LC
```

o pequeño circle de 24–28px.

La plataforma debe tratar el tiempo como protagonista, no al perfil.

---

# 80. Personalización visual

No pedir al usuario escoger 20 colores.

La identidad debe ser fuerte.

Configuración posible:

```text
Accent:
ORANGE
ACID
MONO
```

Pero incluso eso puede esperar.

---

# 81. Motion philosophy

Movimiento:

> **informar, confirmar o dar continuidad.**

Nunca solo decorar.

---

# 82. Motion timings

```text
micro:       90–140ms
standard:   160–220ms
panel:      220–300ms
page:       240–340ms
```

Nada de transiciones de 600ms para UI normal.

---

# 83. Page entry

```text
opacity 0 → 1
translateY 6px → 0
```

No:

```text
scale
rotate
blur 30px
```

para cada página.

---

# 84. Panel animation

Copilot:

```text
translateX(16px) → 0
opacity .6 → 1
```

---

# 85. Counters

Los números pueden animarse al cambiar, pero:

- una sola vez;
- duración corta;
- sin “slot machine” exagerada.

---

# 86. Timeline transition

Cuando cambia el estado actual:

```text
current marker slides smoothly
active row contrast increases
previous row dims
```

---

# 87. Hover cards

No levantar 10px.

Usar:

```text
border: line-1 → line-3
background: black-3 → black-4
```

Tal vez:

```text
translateY(-1px)
```

máximo.

---

# 88. Cursor

En zonas especiales se puede usar cursor contextual:

```text
START
OPEN
DRAG
```

pero esto es polish, no MVP.

---

# 89. Mobile essence

Mobile no debe convertirse en una app iOS genérica.

Mantener:

- bordes rectos;
- labels mono;
- high contrast;
- métricas grandes;
- naranja limitado;
- bottom nav si hace falta, pero sin floating pill.

---

# 90. Mobile Today

```text
THU / AUG 13

02H 14M
AVAILABLE

NEXT
Algorithms
17:30

[ START FOCUS → ]

────────────

TODAY

14:00  Internship
17:30  Algorithms
19:30  Architecture

────────────

INTERNSHIP
148H / 240H
```

---

# 91. Mobile focus action

La acción principal debe quedar visible sin scroll.

---

# 92. Desktop shell

Layout recomendado:

```text
┌───────────────────────────────────────────────┐
│ TOP SYSTEM NAV                                │
├───────────────────────────────────────────────┤
│                                               │
│ PAGE                                          │
│                                               │
│                                               │
│                                               │
└───────────────────────────────────────────────┘
```

Evitar sidebar permanente gigante en desktop si no es necesaria.

La referencia visual funciona mejor con navegación superior.

---

# 93. Sidebar

Si alguna sección necesita sidebar:

- ancho 220–240px;
- border right;
- fondo igual al canvas;
- sin card alrededor.

---

# 94. Breakpoints

```text
mobile      < 640
tablet      640–1023
desktop     1024–1439
wide        ≥ 1440
```

---

# 95. Wide layouts

En 1440+ aprovechar espacios vacíos.

No estirar texto a todo el ancho.

---

# 96. Max line length

Texto de lectura:

```text
55–70 caracteres
```

Los titulares pueden ser más cortos.

---

# 97. Layering

Z-index conceptual:

```text
0  canvas
1  texture
2  structure
3  content
4  nav
5  panels
6  modal
7  command palette
```

---

# 98. Accessibility

La estética no justifica perder legibilidad.

Requisitos:

- contraste WCAG razonable;
- focus visible;
- navegación teclado;
- `prefers-reduced-motion`;
- tamaños mínimos;
- no depender solo de color;
- status con texto/icono.

---

# 99. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

# 100. Performance visual

La estética nunca debe depender de:

- videos full screen de 30MB;
- canvas continuo;
- partículas WebGL;
- 10 filtros blur;
- sombras gigantes;
- 3D pesado.

El producto debe verse sofisticado usando:

```text
CSS
SVG
typography
layout
small assets
```

---

# 101. Design tokens

```css
:root {
  /* color */
  --c-bg: #050505;
  --c-bg-deep: #020202;
  --c-panel: #090909;
  --c-panel-2: #0d0d0e;

  --c-line: #18181a;
  --c-line-2: #242427;

  --c-text: #f2f2ed;
  --c-muted: #858589;
  --c-dim: #4e4e53;

  --c-accent: #ff6a2f;
  --c-success: #92ff36;
  --c-danger: #ff4e4e;

  /* radius */
  --r-xs: 2px;
  --r-sm: 4px;
  --r-md: 6px;
  --r-lg: 9px;

  /* space */
  --s-1: 4px;
  --s-2: 8px;
  --s-3: 12px;
  --s-4: 16px;
  --s-5: 24px;
  --s-6: 32px;
  --s-7: 48px;
  --s-8: 72px;
  --s-9: 112px;

  /* motion */
  --t-fast: 120ms;
  --t-ui: 180ms;
  --t-panel: 260ms;
}
```

---

# 102. Componente: SystemLabel

```text
● INTERNSHIP / ACTIVE
```

Anatomía:

```text
dot
label
/
state
```

---

# 103. Componente: MetricStrip

```text
148H             12H 43M             03
INTERNSHIP       FOCUS / WEEK        DEADLINES
```

Sin rounded card individual.

---

# 104. Componente: DataPlate

```text
┌──────────────────────────────┐
│ LOAD / TODAY                 │
│                              │
│ 11H                          │
│                              │
│ HEAVY                        │
└──────────────────────────────┘
```

---

# 105. Componente: SystemButton

```text
┌───────────────────────┬─────┐
│ START FOCUS           │ →   │
└───────────────────────┴─────┘
```

---

# 106. Componente: TimeBlock

```text
14:00
────────────
INTERNSHIP
03H 00M
```

---

# 107. Componente: StatusLog

```text
19:43:02    CALENDAR_SYNC    OK
19:41:54    FOCUS_END        01H32M
19:40:12    TASK_COMPLETE    01
```

---

# 108. Componente: Recommendation

```text
BEST NEXT ACTION

Algorithms HW
90 MIN

Due tomorrow
Fits current free slot

[ START → ]
```

---

# 109. Componente: ActiveSession

```text
● ACTIVE

02:18:34

INTERNSHIP / API AUTOMATION
```

---

# 110. Anti-AI Design Rules

Esta sección es obligatoria para toda implementación.

## PROHIBIDO: dashboard de 4 cards iguales

```text
[ card ][ card ][ card ][ card ]
```

---

## PROHIBIDO: icono en círculo pastel por sección

```text
🟣 calendar
🟢 tasks
🔵 focus
```

---

## PROHIBIDO: gradiente violeta/azul “AI”

---

## PROHIBIDO: fondo dark navy

---

## PROHIBIDO: `rounded-2xl` como default

---

## PROHIBIDO: glassmorphism como tema completo

---

## PROHIBIDO: headings tipo

```text
Unlock your productivity potential
```

---

## PROHIBIDO: emojis para reforzar estados

---

## PROHIBIDO: cards que flotan sin estructura

---

## PROHIBIDO: sombras para separar cada superficie

---

## PROHIBIDO: 10 colores para categorías

---

## PROHIBIDO: charts solo para llenar espacio

---

## PROHIBIDO: animación constante

---

## PROHIBIDO: “AI Assistant” con esfera brillante

---

## PROHIBIDO: bot avatar

---

## PROHIBIDO: demasiadas pills

---

## PROHIBIDO: diseño “perfectamente simétrico” en todas las pantallas

---

# 111. Indicadores de que la interfaz está quedando genérica

Si aparecen 3 o más de estos síntomas, rediseñar:

```text
[ ] Todas las cards tienen mismo tamaño.
[ ] Todos los corners son 16px.
[ ] Todas las secciones tienen icono + title + subtitle.
[ ] Hay más de 4 colores visibles.
[ ] La página empieza con "Welcome back".
[ ] Cada card tiene shadow.
[ ] Todos los botones son pills.
[ ] Hay un gráfico doughnut.
[ ] El layout es completamente simétrico.
[ ] No hay ningún gran momento tipográfico.
[ ] No hay espacio negativo.
[ ] La IA aparece como chatbot flotante.
[ ] La interfaz podría pertenecer a cualquier SaaS.
```

---

# 112. Checklist de identidad

Una pantalla terminada debería cumplir:

```text
[ ] Tiene una escena dominante.
[ ] Tiene al menos un gran dato o titular.
[ ] Usa espacio negativo intencional.
[ ] El color tiene función semántica.
[ ] Los bordes estructuran la composición.
[ ] Existe al menos un pequeño detalle industrial.
[ ] La tipografía crea jerarquía.
[ ] No depende de sombras.
[ ] No parece una colección de componentes.
[ ] Tiene una acción principal inequívoca.
[ ] Se puede reconocer como FOCUS//OS sin logo.
```

---

# 113. Ejemplo de Today completo

```text
┌────────────────────────────────────────────────────────────────┐
│ FOCUS//OS / TODAY / CALENDAR / FOCUS / INTERNSHIP        ⌘ K │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ ● TODAY / THURSDAY                                             │
│                                                                │
│ 02H 14M                                                        │
│                                                                │
│ AVAILABLE BEFORE                                               │
│ YOUR NEXT COMMITMENT                                           │
│                                                                │
│ Algorithms / 17:30                                             │
│                                                                │
│ [ START FOCUS                                      → ]         │
│                                                                │
│                                           ┌──────────────────┐ │
│                                           │ SYSTEM / ONLINE  │ │
│                                           │                  │ │
│                                           │ Calendar  SYNCED │ │
│                                           │ Load      NORMAL │ │
│                                           │ Focus     02H14M │ │
│                                           └──────────────────┘ │
├──────────────────────┬───────────────────────┬─────────────────┤
│ 148H                 │ 12H 43M               │ 03 / 06         │
│ INTERNSHIP           │ FOCUS / WEEK          │ TASKS / TODAY   │
├──────────────────────┴───────────────────────┼─────────────────┤
│ TIMELINE                                     │ NEXT ACTION     │
│                                              │                 │
│ 08:00  Architecture                         │ Algorithms HW   │
│ 10:00  Algorithms                           │ 90 MIN          │
│ 12:00  ── AVAILABLE / 01H30                 │                 │
│ 14:00  Internship                           │ DUE TOMORROW    │
│ 17:30  Algorithms                           │                 │
│                                              │ [ START → ]     │
└──────────────────────────────────────────────┴─────────────────┘
```

---

# 114. Ejemplo Internship completo

```text
┌───────────────────────────────────────────────────────────────┐
│ INTERNSHIP /                                                 │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│ ● ACTIVE                                                      │
│                                                               │
│ 02:18:34                                                      │
│                                                               │
│ API AUTOMATION                                                │
│ START / 14:02                                                 │
│                                                               │
│ [ STOP SESSION → ]                                            │
│                                                               │
├─────────────────────────────────────┬─────────────────────────┤
│ 148H 32M                            │ PACE                    │
│                                     │                         │
│ OF 240 REQUIRED                     │ +18H                    │
│                                     │ AHEAD                   │
│ ██████████████████░░░░░░░░░         │                         │
│                                     │ ETA / SEP 27            │
│ 61.8%                               │                         │
├─────────────────────────────────────┴─────────────────────────┤
│ WEEK                                                          │
│                                                               │
│ MON   ███████          03H20                                  │
│ TUE   ██████████       05H10                                  │
│ WED   ████             02H14                                  │
│ THU   ████████         03H37                                  │
└───────────────────────────────────────────────────────────────┘
```

---

# 115. Ejemplo Focus completo

```text
┌───────────────────────────────────────────────────────────────┐
│ ● FOCUS / ACTIVE                                              │
│                                                               │
│ ALGORITHMS                                                    │
│ Maximum Subarray                                              │
│                                                               │
│                                                               │
│                          47:32                                │
│                                                               │
│                                                               │
│                 ███████████████░░░░░░                         │
│                                                               │
│                      [ PAUSE ]                                │
│                                                               │
│                                                               │
│ NEXT / 19:30                                                  │
│ Architecture                                                  │
└───────────────────────────────────────────────────────────────┘
```

---

# 116. Ejemplo Copilot completo

```text
┌────────────────────────────────────────────┐
│ COPILOT / 22:42                            │
├────────────────────────────────────────────┤
│                                            │
│ OBSERVATION                                │
│                                            │
│ You have 02H14M available before           │
│ Algorithms.                                │
│                                            │
│ RECOMMENDATION                             │
│                                            │
│ Algorithms HW / 90 MIN                     │
│                                            │
│ WHY                                        │
│                                            │
│ Due tomorrow                               │
│ Priority / high                            │
│ Fits current free slot                     │
│                                            │
├────────────────────────────────────────────┤
│ CREATE CALENDAR BLOCK?                     │
│                                            │
│ [ CANCEL ]              [ CONFIRM → ]      │
└────────────────────────────────────────────┘
```

---

# 117. Landing atmospheric scene

Concepto:

```text
black void
+
orange halftone wave
+
floating system panel
+
large headline
+
thin technical borders
+
metric strip
```

Debe sentirse más como una pieza de dirección de arte que como una landing de template.

---

# 118. Principio de asimetría

Por pantalla, permitir que un lado domine.

Ejemplo:

```text
65% editorial / 35% system panel
```

o:

```text
40% controls / 60% visualization
```

No 50/50 siempre.

---

# 119. Elementos repetibles de marca

Para que FOCUS//OS tenga identidad incluso sin logo, repetir con consistencia:

```text
1. labels mono con slash
2. línea estructural fina
3. naranja como impulso
4. halftone
5. gran numeración
6. arrow-cell buttons
7. pequeños nodos en intersecciones
8. industrial stripe
9. logs de sistema
10. grandes superficies negras
```

---

# 120. Logo / wordmark

Dirección:

```text
FOCUS//OS
```

o:

```text
FOCUS OS /
```

Evitar símbolo abstracto futurista típico.

El propio wordmark puede ser suficiente.

---

# 121. Branding detail

El doble slash `//` puede convertirse en elemento semántico.

Ejemplos:

```text
TODAY // ACTIVE
FOCUS // 47:32
CALENDAR // SYNCED
```

No usarlo en cada línea.

---

# 122. Section markers

Pequeño patrón:

```text
:::: TODAY
```

o:

```text
■■ WHAT'S NEXT
```

Debe elegirse uno y mantenerse.

---

# 123. Recomendación

Para FOCUS//OS usar:

```text
● LABEL / STATE
```

como lenguaje principal.

Y `//` en branding.

---

# 124. Cómo traducir las referencias sin copiarlas

Capturar:

```text
darkness
halftone
editorial hierarchy
technical borders
system panels
minimal color
industrial motion
visual tension
```

No copiar:

```text
exact typography
exact card layout
exact CTA
exact artwork
exact navigation
exact brand treatment
```

---

# 125. Design review questions

Antes de aceptar una pantalla:

### Identity

```text
¿Podría esta pantalla ser de otra app?
```

Si sí, falta carácter.

### Hierarchy

```text
¿Qué veo primero?
```

Debe haber una respuesta inequívoca.

### Action

```text
¿Qué puedo hacer ahora?
```

Debe estar claro.

### Atmosphere

```text
¿Existe una escena, o solo componentes?
```

### Restraint

```text
¿Puedo eliminar algo y mejorarla?
```

---

# 126. Final visual target

FOCUS//OS debe parecer:

> **una herramienta que alguien diseñó obsesivamente para sí mismo, no un producto armado con un kit de componentes.**

Debe sentirse:

```text
quiet
sharp
purposeful
dark
fast
precise
technical
editorial
```

---

# 127. Frase guía de diseño

> **Black space is not empty. It is focus.**

---

# 128. Regla final

Cuando exista una decisión entre:

```text
“más bonito”
```

y:

```text
“más claro, más fuerte y más propio”
```

elegir siempre lo segundo.

FOCUS//OS no necesita parecer espectacular en cada píxel.

Necesita tener **una identidad tan coherente que ninguna captura de pantalla pueda confundirse con una interfaz generada automáticamente.**
