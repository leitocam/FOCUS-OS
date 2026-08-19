# SEMESTER_SCHEDULE_2-2026.md
## Horario académico canónico — UCB Cochabamba — Semestre 2/2026

> **Uso previsto:** este archivo es la fuente de verdad para FOCUS//OS al cargar, mostrar y programar las clases del semestre.
>
> **Regla de implementación:** las clases deben programarse con **fecha, día, hora y zona horaria exactos**. No se debe asumir que “todos los lunes/jueves hay clases” sin aplicar las excepciones académicas indicadas aquí.

---

# 1. Identificación del semestre

```yaml
institution: "Universidad Católica Boliviana San Pablo"
campus: "Cochabamba"
semester: "2/2026"
timezone: "America/La_Paz"
utc_offset: "UTC-04:00"
semester_classes_start: "2026-08-03"
semester_last_class_day: "2026-12-04"
regular_class_days:
  - MONDAY
  - TUESDAY
  - WEDNESDAY
  - THURSDAY
```

## Fechas verificadas

El **Calendario Académico 2026 de la UCB Sede Cochabamba** establece:

- **Inicio de clases 2/2026:** lunes **3 de agosto de 2026**.
- **Último día de clases 2/2026:** viernes **4 de diciembre de 2026**.
- El horario personal de esta captura no contiene clases regulares los viernes, por lo que la última sesión programada de este horario cae el **jueves 3 de diciembre de 2026**.

> Importante: `2026-12-04` sigue siendo el cierre oficial de clases del semestre aunque este horario particular no tenga una asignatura el viernes.

---

# 2. Excepciones oficiales que afectan este horario

Estas fechas **NO deben generar eventos de clase**:

| Fecha | Día | Motivo oficial | Impacto |
|---|---|---|---|
| `2026-08-06` | Jueves | Aniversario Patrio — Feriado Nacional | Cancela todas las clases del jueves |
| `2026-09-14` | Lunes | Feriado Departamental — Gesta Libertaria de Cochabamba | Cancela todas las clases del lunes |
| `2026-09-21` | Lunes | Día del Estudiante — suspensión de actividades académicas para estudiantes | Cancela todas las clases del lunes |
| `2026-11-02` | Lunes | Día de Difuntos — Feriado Nacional | Cancela todas las clases del lunes |

También aparecen en el calendario institucional otras suspensiones/feriados que **no afectan este horario personal** porque caen en días sin clases regulares:

| Fecha | Día | Evento |
|---|---|---|
| `2026-08-07` | Viernes | Feriado Nacional adicional |
| `2026-08-14` | Viernes | Feriado Departamental — Virgen de Urkupiña |
| `2026-10-03` | Sábado | Cato Holiday |

## Lista canónica para código

```yaml
no_class_dates:
  - date: "2026-08-06"
    reason: "Aniversario Patrio — Feriado Nacional"
  - date: "2026-09-14"
    reason: "Feriado Departamental — Gesta Libertaria de Cochabamba"
  - date: "2026-09-21"
    reason: "Día del Estudiante — suspensión de actividades académicas"
  - date: "2026-11-02"
    reason: "Día de Difuntos — Feriado Nacional"
```

---

# 3. Horario semanal oficial de la captura

| Día | Inicio | Fin | Sigla | Asignatura | Paralelo | Aula / ubicación |
|---|---:|---:|---|---|---:|---|
| **Lunes** | 10:45 | 12:15 | FHC-202 | Cristología | 3 | `A4-7` |
| **Lunes** | 14:15 | 15:45 | MAT-361 | Análisis de Algoritmos | 1 | `LC/A1-7` |
| **Lunes** | 17:45 | 19:15 | SIS-325 | Ética y Seguridad de Sistemas | 1 | `LTEC/A1-1` |
| **Martes** | 09:00 | 10:30 | SIS-324 | Auditoría de Sistemas | 1 | `LTEC/A1-1` |
| **Martes** | 10:45 | 12:15 | SIS-313 | Taller de Desarrollo de Software | 1 | `LTEC/A1-1` |
| **Martes** | 14:15 | 15:45 | ICO-313 | Marketing Digital | 1 | `A/PB-5` |
| **Martes** | 19:30 | 21:00 | SIS-352 | Práctica Pre Profesional | 1 | `LTEC/A1-1` |
| **Miércoles** | 10:45 | 12:15 | FHC-202 | Cristología | 3 | `A4-7` |
| **Miércoles** | 14:15 | 15:45 | MAT-361 | Análisis de Algoritmos | 1 | `LC/A1-7` |
| **Miércoles** | 16:00 | 16:45 | MAT-361 | Análisis de Algoritmos | 1 | `LC/A1-7` |
| **Miércoles** | 17:45 | 19:15 | SIS-325 | Ética y Seguridad de Sistemas | 1 | `LSIS/A1-11` |
| **Miércoles** | 19:30 | 20:15 | SIS-325 | Ética y Seguridad de Sistemas | 1 | `LSIS/A1-11` |
| **Jueves** | 09:00 | 10:30 | SIS-324 | Auditoría de Sistemas | 1 | `LC/B2-1` |
| **Jueves** | 10:45 | 12:15 | SIS-313 | Taller de Desarrollo de Software | 1 | `LTEC/A1-1` |
| **Jueves** | 14:15 | 15:45 | ICO-313 | Marketing Digital | 1 | `A/PB-5` |
| **Jueves** | 19:30 | 21:00 | SIS-352 | Práctica Pre Profesional | 1 | `VI34` |

> `VI34` se conserva **exactamente como aparece en la captura del SIAAn**. No se infiere si corresponde a aula, modalidad virtual u otro código hasta tener confirmación oficial.

---

# 4. Vista semanal visual

```text
┌─────────────┬──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│ HORA        │ LUNES                │ MARTES               │ MIÉRCOLES            │ JUEVES               │
├─────────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ 09:00-10:30 │ —                    │ SIS-324              │ —                    │ SIS-324              │
│             │                      │ LTEC/A1-1            │                      │ LC/B2-1              │
├─────────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ 10:45-12:15 │ FHC-202              │ SIS-313              │ FHC-202              │ SIS-313              │
│             │ A4-7                 │ LTEC/A1-1            │ A4-7                 │ LTEC/A1-1            │
├─────────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ 14:15-15:45 │ MAT-361              │ ICO-313              │ MAT-361              │ ICO-313              │
│             │ LC/A1-7              │ A/PB-5               │ LC/A1-7              │ A/PB-5               │
├─────────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ 16:00-16:45 │ —                    │ —                    │ MAT-361              │ —                    │
│             │                      │                      │ LC/A1-7              │                      │
├─────────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ 17:45-19:15 │ SIS-325              │ —                    │ SIS-325              │ —                    │
│             │ LTEC/A1-1            │                      │ LSIS/A1-11           │                      │
├─────────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ 19:30-20:15 │ —                    │ SIS-352 continúa     │ SIS-325              │ SIS-352 continúa     │
│             │                      │ hasta 21:00          │ LSIS/A1-11           │ hasta 21:00          │
├─────────────┼──────────────────────┼──────────────────────┼──────────────────────┼──────────────────────┤
│ 20:15-21:00 │ —                    │ SIS-352              │ —                    │ SIS-352              │
│             │                      │ LTEC/A1-1            │                      │ VI34                 │
└─────────────┴──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

---

# 5. Asignaturas y docentes

| Sigla | Depto. | Paralelo | Asignatura | Docente |
|---|---|---:|---|---|
| SIS-325 | ING | 1 | Ética y Seguridad de Sistemas | **Fajardo Canaza Juan Alberto** |
| SIS-352 | ING | 1 | Práctica Pre Profesional | **Villalobos Velasco Carla Jimena** |
| SIS-313 | ING | 1 | Taller de Desarrollo de Software | **Antezana Rojas Israel Gilberto** |
| FHC-202 | FHC | 3 | Cristología | **Escobar Huarachi Guido** |
| SIS-324 | ING | 1 | Auditoría de Sistemas | **Galaburda Yanina Anatolievna** |
| MAT-361 | ING | 1 | Análisis de Algoritmos | **Rojas Stambuk Tiara Natalia** |
| ICO-313 | ICO | 1 | Marketing Digital | **Otondo Alquizalet Paola Marcela** |

---

# 6. Detalle por día

## Lunes

```text
10:45–12:15  FHC-202  Cristología
              Paralelo 3
              Aula A4-7

14:15–15:45  MAT-361  Análisis de Algoritmos
              Paralelo 1
              Aula LC/A1-7

17:45–19:15  SIS-325  Ética y Seguridad de Sistemas
              Paralelo 1
              Aula LTEC/A1-1
```

**Carga regular del lunes:** `4 h 30 min`.

## Martes

```text
09:00–10:30  SIS-324  Auditoría de Sistemas
              Paralelo 1
              Aula LTEC/A1-1

10:45–12:15  SIS-313  Taller de Desarrollo de Software
              Paralelo 1
              Aula LTEC/A1-1

14:15–15:45  ICO-313  Marketing Digital
              Paralelo 1
              Aula A/PB-5

19:30–21:00  SIS-352  Práctica Pre Profesional
              Paralelo 1
              Aula LTEC/A1-1
```

**Carga regular del martes:** `6 h`.

## Miércoles

```text
10:45–12:15  FHC-202  Cristología
              Paralelo 3
              Aula A4-7

14:15–15:45  MAT-361  Análisis de Algoritmos
              Paralelo 1
              Aula LC/A1-7

16:00–16:45  MAT-361  Análisis de Algoritmos
              Paralelo 1
              Aula LC/A1-7

17:45–19:15  SIS-325  Ética y Seguridad de Sistemas
              Paralelo 1
              Aula LSIS/A1-11

19:30–20:15  SIS-325  Ética y Seguridad de Sistemas
              Paralelo 1
              Aula LSIS/A1-11
```

**Carga regular del miércoles:** `6 h`.

> MAT-361 y SIS-325 tienen bloques separados por recesos de 15 minutos. **No fusionar estos bloques al programarlos** si se quiere reproducir fielmente el SIAAn.

## Jueves

```text
09:00–10:30  SIS-324  Auditoría de Sistemas
              Paralelo 1
              Aula LC/B2-1

10:45–12:15  SIS-313  Taller de Desarrollo de Software
              Paralelo 1
              Aula LTEC/A1-1

14:15–15:45  ICO-313  Marketing Digital
              Paralelo 1
              Aula A/PB-5

19:30–21:00  SIS-352  Práctica Pre Profesional
              Paralelo 1
              Ubicación VI34
```

**Carga regular del jueves:** `6 h`.

---

# 7. Carga semanal regular

```text
Lunes       4 h 30 min
Martes      6 h 00 min
Miércoles   6 h 00 min
Jueves      6 h 00 min
──────────────────────
TOTAL      22 h 30 min / semana regular
```

---

# 8. Fechas exactas de ocurrencia por día

> Estas listas ya tienen eliminadas las fechas oficiales sin clases que afectan el horario.

### Lunes — 15 fechas efectivas

```text
2026-08-03
2026-08-10
2026-08-17
2026-08-24
2026-08-31
2026-09-07
2026-09-28
2026-10-05
2026-10-12
2026-10-19
2026-10-26
2026-11-09
2026-11-16
2026-11-23
2026-11-30
```
### Martes — 18 fechas efectivas

```text
2026-08-04
2026-08-11
2026-08-18
2026-08-25
2026-09-01
2026-09-08
2026-09-15
2026-09-22
2026-09-29
2026-10-06
2026-10-13
2026-10-20
2026-10-27
2026-11-03
2026-11-10
2026-11-17
2026-11-24
2026-12-01
```
### Miércoles — 18 fechas efectivas

```text
2026-08-05
2026-08-12
2026-08-19
2026-08-26
2026-09-02
2026-09-09
2026-09-16
2026-09-23
2026-09-30
2026-10-07
2026-10-14
2026-10-21
2026-10-28
2026-11-04
2026-11-11
2026-11-18
2026-11-25
2026-12-02
```
### Jueves — 17 fechas efectivas

```text
2026-08-13
2026-08-20
2026-08-27
2026-09-03
2026-09-10
2026-09-17
2026-09-24
2026-10-01
2026-10-08
2026-10-15
2026-10-22
2026-10-29
2026-11-05
2026-11-12
2026-11-19
2026-11-26
2026-12-03
```

---

# 9. Primera y última sesión efectiva por día

| Día | Primera fecha válida | Última fecha válida | Cantidad de días de clase |
|---|---|---|---:|
| Lunes | `2026-08-03` | `2026-11-30` | 15 |
| Martes | `2026-08-04` | `2026-12-01` | 18 |
| Miércoles | `2026-08-05` | `2026-12-02` | 18 |
| Jueves | `2026-08-13` | `2026-12-03` | 17 |

> El primer jueves regular habría sido `2026-08-06`, pero es **Feriado Nacional**, por lo que la primera sesión efectiva de jueves es `2026-08-13`.

---

# 10. Plantillas canónicas para FOCUS//OS

```yaml
semester:
  id: "ucb-cba-2-2026"
  institution: "Universidad Católica Boliviana San Pablo"
  campus: "Cochabamba"
  timezone: "America/La_Paz"
  start_date: "2026-08-03"
  last_class_date: "2026-12-04"

meeting_templates:
  - id: fhc202-mon-1045
    course_code: FHC-202
    title: "Cristología"
    parallel: 3
    weekday: MONDAY
    start_time: "10:45"
    end_time: "12:15"
    location: "A4-7"
    date_set: MONDAY
  - id: mat361-mon-1415
    course_code: MAT-361
    title: "Análisis de Algoritmos"
    parallel: 1
    weekday: MONDAY
    start_time: "14:15"
    end_time: "15:45"
    location: "LC/A1-7"
    date_set: MONDAY
  - id: sis325-mon-1745
    course_code: SIS-325
    title: "Ética y Seguridad de Sistemas"
    parallel: 1
    weekday: MONDAY
    start_time: "17:45"
    end_time: "19:15"
    location: "LTEC/A1-1"
    date_set: MONDAY
  - id: sis324-tue-0900
    course_code: SIS-324
    title: "Auditoría de Sistemas"
    parallel: 1
    weekday: TUESDAY
    start_time: "09:00"
    end_time: "10:30"
    location: "LTEC/A1-1"
    date_set: TUESDAY
  - id: sis313-tue-1045
    course_code: SIS-313
    title: "Taller de Desarrollo de Software"
    parallel: 1
    weekday: TUESDAY
    start_time: "10:45"
    end_time: "12:15"
    location: "LTEC/A1-1"
    date_set: TUESDAY
  - id: ico313-tue-1415
    course_code: ICO-313
    title: "Marketing Digital"
    parallel: 1
    weekday: TUESDAY
    start_time: "14:15"
    end_time: "15:45"
    location: "A/PB-5"
    date_set: TUESDAY
  - id: sis352-tue-1930
    course_code: SIS-352
    title: "Práctica Pre Profesional"
    parallel: 1
    weekday: TUESDAY
    start_time: "19:30"
    end_time: "21:00"
    location: "LTEC/A1-1"
    date_set: TUESDAY
  - id: fhc202-wed-1045
    course_code: FHC-202
    title: "Cristología"
    parallel: 3
    weekday: WEDNESDAY
    start_time: "10:45"
    end_time: "12:15"
    location: "A4-7"
    date_set: WEDNESDAY
  - id: mat361-wed-1415
    course_code: MAT-361
    title: "Análisis de Algoritmos"
    parallel: 1
    weekday: WEDNESDAY
    start_time: "14:15"
    end_time: "15:45"
    location: "LC/A1-7"
    date_set: WEDNESDAY
  - id: mat361-wed-1600
    course_code: MAT-361
    title: "Análisis de Algoritmos"
    parallel: 1
    weekday: WEDNESDAY
    start_time: "16:00"
    end_time: "16:45"
    location: "LC/A1-7"
    date_set: WEDNESDAY
  - id: sis325-wed-1745
    course_code: SIS-325
    title: "Ética y Seguridad de Sistemas"
    parallel: 1
    weekday: WEDNESDAY
    start_time: "17:45"
    end_time: "19:15"
    location: "LSIS/A1-11"
    date_set: WEDNESDAY
  - id: sis325-wed-1930
    course_code: SIS-325
    title: "Ética y Seguridad de Sistemas"
    parallel: 1
    weekday: WEDNESDAY
    start_time: "19:30"
    end_time: "20:15"
    location: "LSIS/A1-11"
    date_set: WEDNESDAY
  - id: sis324-thu-0900
    course_code: SIS-324
    title: "Auditoría de Sistemas"
    parallel: 1
    weekday: THURSDAY
    start_time: "09:00"
    end_time: "10:30"
    location: "LC/B2-1"
    date_set: THURSDAY
  - id: sis313-thu-1045
    course_code: SIS-313
    title: "Taller de Desarrollo de Software"
    parallel: 1
    weekday: THURSDAY
    start_time: "10:45"
    end_time: "12:15"
    location: "LTEC/A1-1"
    date_set: THURSDAY
  - id: ico313-thu-1415
    course_code: ICO-313
    title: "Marketing Digital"
    parallel: 1
    weekday: THURSDAY
    start_time: "14:15"
    end_time: "15:45"
    location: "A/PB-5"
    date_set: THURSDAY
  - id: sis352-thu-1930
    course_code: SIS-352
    title: "Práctica Pre Profesional"
    parallel: 1
    weekday: THURSDAY
    start_time: "19:30"
    end_time: "21:00"
    location: "VI34"
    date_set: THURSDAY
```

---

# 11. Regla exacta para generar los eventos

La aplicación debe seguir esta lógica:

```ts
for (const meeting of meetingTemplates) {
  const dates = DATE_SETS[meeting.date_set];

  for (const localDate of dates) {
    createClassEvent({
      date: localDate,
      startTime: meeting.start_time,
      endTime: meeting.end_time,
      timezone: "America/La_Paz",
      courseCode: meeting.course_code,
      title: meeting.title,
      location: meeting.location,
      parallel: meeting.parallel,
    });
  }
}
```

## NO implementar así

```ts
// ❌ Insuficiente: generaría clases en feriados/suspensiones.
repeatEveryWeekUntil("2026-12-04");
```

## Sí implementar así

```text
1. Tomar el rango oficial 2026-08-03 → 2026-12-04.
2. Resolver el día de semana de cada plantilla.
3. Usar America/La_Paz.
4. Excluir no_class_dates.
5. Mantener cada bloque del SIAAn como evento independiente.
6. No mover automáticamente una clase cancelada a otro día.
7. No generar clases después del último día oficial.
8. No generar eventos de viernes/sábado/domingo porque este horario no los contiene.
```

---

# 12. Reglas de recurrencia

```yaml
recurrence_policy:
  timezone: "America/La_Paz"
  recurrence: "WEEKLY"
  semester_range_inclusive:
    start: "2026-08-03"
    end: "2026-12-04"
  generate_only_defined_weekdays: true
  use_explicit_date_sets: true
  apply_no_class_dates: true
  merge_split_blocks: false
  auto_reschedule_cancelled_classes: false
```

---

# 13. Eventos que deben permanecer separados

## MAT-361 — miércoles

```text
14:15–15:45
15 min de intervalo
16:00–16:45
```

No convertir en:

```text
14:15–16:45  ❌
```

## SIS-325 — miércoles

```text
17:45–19:15
15 min de intervalo
19:30–20:15
```

No convertir en:

```text
17:45–20:15  ❌
```

Esto es importante para que los **free slots**, recomendaciones de FOCUS//OS y detección de espacios disponibles sean exactos.

---

# 14. Duración acumulada programada por asignatura

Estas cifras se calculan usando las fechas efectivas de este archivo y excluyendo las suspensiones oficiales anteriores.

| Sigla | Asignatura | Tiempo programado 2/2026 |
|---|---|---:|
| FHC-202 | Cristología | 49 h 30 min |
| MAT-361 | Análisis de Algoritmos | 63 h |
| SIS-325 | Ética y Seguridad de Sistemas | 63 h |
| SIS-324 | Auditoría de Sistemas | 52 h 30 min |
| SIS-313 | Taller de Desarrollo de Software | 52 h 30 min |
| ICO-313 | Marketing Digital | 52 h 30 min |
| SIS-352 | Práctica Pre Profesional | 52 h 30 min |
| **TOTAL** | **Clases programadas del horario** | **385 h 30 min** |

> Este total representa tiempo horario programado según la captura + calendario institucional. No implica horas académicas/créditos oficiales ni contempla futuras reprogramaciones extraordinarias que la universidad pudiera anunciar después.

---

# 15. IDs estables recomendados

Cada bloque tiene un ID determinista:

```text
fhc202-mon-1045
mat361-mon-1415
sis325-mon-1745

sis324-tue-0900
sis313-tue-1045
ico313-tue-1415
sis352-tue-1930

fhc202-wed-1045
mat361-wed-1415
mat361-wed-1600
sis325-wed-1745
sis325-wed-1930

sis324-thu-0900
sis313-thu-1045
ico313-thu-1415
sis352-thu-1930
```

Un evento concreto puede tener ID:

```text
{meeting_template_id}::{YYYY-MM-DD}
```

Ejemplos:

```text
mat361-wed-1415::2026-08-12
sis352-thu-1930::2026-10-22
sis325-mon-1745::2026-11-30
```

Esto ayuda con:

- sincronización;
- deduplicación;
- cambios de aula;
- cancelaciones;
- tracking;
- link con Google Calendar.

---

# 16. Formato recomendado para un evento de clase

```json
{
  "id": "mat361-wed-1415::2026-08-12",
  "type": "CLASS",
  "semesterId": "ucb-cba-2-2026",
  "courseCode": "MAT-361",
  "courseName": "Análisis de Algoritmos",
  "parallel": 1,
  "localDate": "2026-08-12",
  "startTime": "14:15",
  "endTime": "15:45",
  "timezone": "America/La_Paz",
  "location": "LC/A1-7",
  "status": "SCHEDULED"
}
```

---

# 17. Estado y posibles cambios posteriores

Este archivo debe considerarse:

```yaml
schedule_source: "Captura SIAAn proporcionada por el usuario"
calendar_source: "Calendario Académico UCB Sede Cochabamba 2026"
schedule_status: "CANONICAL_BASELINE"
```

Si posteriormente la UCB anuncia:

- recuperación de clases;
- cambio de aula;
- suspensión extraordinaria;
- cambio docente;
- cambio de horario;

**no modificar la plantilla semanal histórica silenciosamente**.

Registrar una excepción:

```yaml
schedule_overrides:
  - date: "YYYY-MM-DD"
    meeting_id: "..."
    action: "CANCEL | MOVE | CHANGE_LOCATION | CHANGE_TIME"
    reason: "..."
```

---

# 18. Regla de prioridad de datos

Si FOCUS//OS detecta discrepancias, utilizar este orden:

```text
1. Override manual confirmado para una fecha específica
2. Cambio oficial sincronizado desde Calendar/SIAAn
3. Excepción del calendario académico
4. Plantilla semanal de este archivo
```

---

# 19. Resumen para el motor de planificación

```yaml
student_semester:
  semester: "2/2026"
  class_hours_regular_week: "22:30"
  first_class_date: "2026-08-03"
  final_personal_scheduled_class_date: "2026-12-03"
  official_last_class_day: "2026-12-04"
  timezone: "America/La_Paz"

  weekday_load:
    MONDAY: "04:30"
    TUESDAY: "06:00"
    WEDNESDAY: "06:00"
    THURSDAY: "06:00"
    FRIDAY: "00:00"

  effective_teaching_days:
    MONDAY: 15
    TUESDAY: 18
    WEDNESDAY: 18
    THURSDAY: 17
```

---

# 20. Regla para Free Slots

Para calcular tiempo libre:

```text
occupied = clases exactas de la fecha
         + eventos personales
         + pasantía
         + focus blocks

free_slots = availability_window - occupied
```

No se debe reservar como ocupado un bloque de clase en una fecha incluida en `no_class_dates`.

Ejemplo:

```text
Jueves 2026-08-06

SIS-324 09:00–10:30  → NO GENERAR
SIS-313 10:45–12:15  → NO GENERAR
ICO-313 14:15–15:45  → NO GENERAR
SIS-352 19:30–21:00  → NO GENERAR
```

---

# 21. Regla para “Next Class”

`Next Class` debe buscar el siguiente evento real expandido, no el siguiente template semanal.

Ejemplo:

```text
Wednesday 2026-08-05 21:00

template says:
Thursday → classes

but:
2026-08-06 = holiday

therefore:
next class = Monday 2026-08-10 10:45 / FHC-202
```

Esto evita recomendaciones incorrectas del sistema.

---

# 22. Validaciones automáticas recomendadas

Al iniciar la aplicación:

```text
[ ] Ningún evento está fuera de 2026-08-03 ... 2026-12-04.
[ ] Ningún evento cae en no_class_dates.
[ ] Todos los eventos usan America/La_Paz.
[ ] No hay clases viernes/sábado/domingo.
[ ] No existen eventos duplicados por meeting_id + date.
[ ] MAT-361 miércoles permanece en dos bloques.
[ ] SIS-325 miércoles permanece en dos bloques.
[ ] VI34 no se reinterpreta automáticamente.
[ ] Las horas se almacenan como hora local + timezone, no como strings UTC ambiguos.
```

---

# 23. Fuente de verdad resumida

```text
UCB COCHABAMBA / 2-2026
────────────────────────────────────────

START
03 AUG 2026

OFFICIAL LAST CLASS DAY
04 DEC 2026

LAST CLASS IN THIS PERSONAL SCHEDULE
03 DEC 2026

REGULAR LOAD
22H 30M / WEEK

TIMEZONE
AMERICA/LA_PAZ

NO-CLASS DATES AFFECTING THIS SCHEDULE
06 AUG
14 SEP
21 SEP
02 NOV
```

---

# 24. Nota final para desarrollo

Este documento no debe utilizarse únicamente como referencia visual.

Debe actuar como **dataset canónico de semestre**.

La implementación correcta es:

```text
SEMESTER CONFIG
      +
MEETING TEMPLATES
      +
EXPLICIT VALID DATES
      +
EXCEPTIONS
      ↓
EXPANDED CLASS EVENTS
      ↓
TODAY / CALENDAR / FREE SLOTS / AI PLANNER
```

De esta manera FOCUS//OS no “supone” el horario: **lo conoce fecha por fecha**.
