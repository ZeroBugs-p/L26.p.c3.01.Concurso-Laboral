# Lógica de las Clases Modelo — Concurso Laboral

Este documento explica en detalle la lógica de negocio de las clases modelo y cómo se calcula la puntuación final del aspirante.

---

## Visión general del proceso de evaluación

El concurso evalúa a cada aspirante en **tres grandes bloques** que se combinan para obtener la **nota definitiva**:

```
NOTA DEFINITIVA (sobre 20 pts)
    │
    ├── 10% → Tabla CO7  ─── Credenciales de Mérito (formularios CO5)
    │                          └── Máximo 100 pts, convertidos a escala de 10%
    │
    ├── 60% → Tabla CO8  ─── Exámenes Escrito + Práctico
    │                          └── Promedio de los dos exámenes, al 60%
    │
    └── 30% → Tabla CO9  ─── Examen de Aptitudes
                               └── Nota directa, al 30%
```

---

## `Cl_mAspirante` — El corazón del sistema

### Atributos principales

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| `_nombre` | `string` | Nombre del aspirante |
| `_cedula` | `string` | Cédula de identidad |
| `_notaExamenEscrito` | `number` | Nota del examen escrito (0-20) |
| `_notaExamenPractico` | `number` | Nota del examen práctico (0-20) |
| `_notaExamenAptitudes` | `number` | Nota del examen de aptitudes (0-20) |

### Arrays de puntajes por formato

| Array | Formato | Preguntas | Tope máximo |
|-------|---------|-----------|-------------|
| `ptsFormatoCO5` | Postgrado | 1-4 | 35 pts |
| `ptsFormatoCO51` | Pregrado | 5-11 | 30 pts |
| `ptsFormatoCO52` | Producción Científica | 12-20 | 15 pts |
| `ptsFormatoCO53` | Méritos y Experiencia | 21-28 | 20 pts |
| **Total máximo** | | | **100 pts** |

---

### Métodos de suma con topes

Cada formato tiene su propio método de suma que aplica un **tope máximo**:

#### `sumaPtsFormatoCO5()` — Tope 35 pts
```typescript
// Suma todas las preguntas del array ptsFormatoCO5
// Si la suma supera 35, devuelve 35
// Si no, devuelve la suma real
```
**Preguntas:** 1-4 (Estudios de postgrado, otros postgrados, cursos, méritos de tesis)

#### `sumaPtsFormatoCO51()` — Tope 30 pts
```typescript
// Suma todas las preguntas del array ptsFormatoCO51
// Si la suma supera 30, devuelve 30
```
**Preguntas:** 5-11 (Título universitario, preparadurías, diplomas, reconocimientos)

#### `sumaPtsFormatoCO52()` — Tope 15 pts
```typescript
// Suma con reduce, limita a 15 con Math.min()
```
**Preguntas:** 12-20 (Libros, artículos científicos, ponencias, patentes)

#### `sumaPtsFormatoCO53()` — Tope 20 pts
```typescript
// Suma con reduce, limita a 20 con Math.min()
```
**Preguntas:** 21-28 (Docencia, premios, experiencia profesional, pasantías)

---

### Cálculos derivados

#### `totalObtenido()` — Suma total sobre 100 pts
```typescript
totalObtenido(): number {
    return this.sumaPtsFormatoCO5()    // máx 35
         + this.sumaPtsFormatoCO51()   // máx 30
         + this.sumaPtsFormatoCO52()   // máx 15
         + this.sumaPtsFormatoCO53();  // máx 20
    // TOTAL MÁXIMO = 100 pts
}
```

#### `calificacionFinal()` — Escala a 20 pts
```typescript
calificacionFinal(): number {
    return this.totalObtenido() / 5;
    // Si totalObtenido = 100 → calificación = 20
    // Si totalObtenido = 50  → calificación = 10
}
```

---

## Sistema de ponderaciones (Tablas CO7, CO8, CO9)

### Tabla CO7 — Credenciales de Mérito (10%)

```typescript
calificacion10Porciento(): number {
    return (this.totalObtenido() * 10) / 100;
}
```
**Ejemplo:** Si `totalObtenido()` = 80 → `calificacion10Porciento()` = **8.0**

| totalObtenido | × 10% | Resultado |
|---------------|-------|-----------|
| 100 | 10% | 10.0 |
| 75 | 10% | 7.5 |
| 50 | 10% | 5.0 |
| 0 | 10% | 0.0 |

---

### Tabla CO8 — Exámenes Escrito y Práctico (60%)

```typescript
calificacionCO8(): number {
    return (this.notaExamenEscrito + this.notaExamenPractico) / 2;
}

calificacion60PorcientoCO8(): number {
    return (this.calificacionCO8() * 60) / 100;
}
```
**Ejemplo:** Escrito = 18, Práctico = 14 → Promedio = 16 → × 60% = **9.6**

| Escrito | Práctico | Promedio | × 60% |
|---------|----------|----------|-------|
| 20 | 20 | 20.0 | 12.0 |
| 18 | 16 | 17.0 | 10.2 |
| 14 | 12 | 13.0 | 7.8 |

---

### Tabla CO9 — Examen de Aptitudes (30%)

```typescript
calificacion30PorcientoAptitudes(): number {
    return (this.notaExamenAptitudes * 30) / 100;
}
```
**Ejemplo:** Aptitudes = 17 → × 30% = **5.1**

| Aptitudes | × 30% |
|-----------|-------|
| 20 | 6.0 |
| 17 | 5.1 |
| 10 | 3.0 |

---

## La Nota Definitiva (`notaDefinitiva()`)

Combina las tres tablas para obtener la calificación final sobre 20 puntos:

```typescript
notaDefinitiva(): number {
    const c10Porcent = this.calificacion10Porciento();     // CO7
    const c60Porcent = this.calificacion60PorcientoCO8();  // CO8
    const c30Porcent = this.calificacion30PorcientoAptitudes(); // CO9

    return c10Porcent + c60Porcent + c30Porcent;
}
```

### Ejemplo completo

| Concepto | Valor bruto | Ponderación | Aporte |
|----------|------------|-------------|--------|
| Credenciales (CO5) | 80/100 pts | 10% | **8.0** |
| Examen Escrito | 18/20 | ──┐ | |
| Examen Práctico | 16/20 | ──┤ Promedio 17.0 × 60% | **10.2** |
| Examen Aptitudes | 17/20 | 30% | **5.1** |
| **NOTA DEFINITIVA** | | | **23.3 → 20** (se trunca a 20) |

---

## `Cl_mConcurso` — Contenedor de aspirantes

```typescript
class Cl_mConcurso {
    public aspirantes: Cl_mAspirante[] = [];

    agregarAspirante(aspirante): void   // Añade uno manualmente
    setAspirantes(aspirante[]): void    // Reemplaza toda la lista desde MockAPI
    getAspirantes(): Cl_mAspirante[]    // Devuelve la lista completa
}
```

### `setAspirantes()` — Reconstrucción desde MockAPI

Este es el método que **reconstruye** los objetos desde los datos planos de MockAPI:

1. Vacía la lista actual
2. Por cada registro plano (`item`):
   - Crea un `Cl_mAspirante` con los 5 campos básicos
   - Llama a `cargarSumasGuardadas()` para restaurar las sumas de los formatos CO
   - Lo agrega a la lista

**¿Por qué es necesario `cargarSumasGuardadas()`?**

Porque `toJSON()` guarda las **sumas** (ej. `formatoCO5: 20`), no los 28 puntajes individuales. Al recuperar los datos, el constructor del modelo no sabe qué hacer con esos campos extra. El método `cargarSumasGuardadas()` inyecta cada suma como un único elemento en el array correspondiente para que los métodos de suma funcionen correctamente.

```typescript
// toJSON() guarda esto:
{ formatoCO5: 20, formatoCO51: 15, formatoCO52: 10, formatoCO53: 8 }

// cargarSumasGuardadas() hace esto:
this.ptsFormatoCO5.push(20);   // ← ahora sumaPtsFormatoCO5() devuelve 20
this.ptsFormatoCO51.push(15);  // ← ahora sumaPtsFormatoCO51() devuelve 15
this.ptsFormatoCO52.push(10);  // ← ahora sumaPtsFormatoCO52() devuelve 10
this.ptsFormatoCO53.push(8);   // ← ahora sumaPtsFormatoCO53() devuelve 8
```

---

## Resumen del flujo de datos del modelo

```
1. Evaluador llena 28 preguntas
      │
      ▼
2. agregaPuntos("formatoCO5", 5)  ─►  ptsFormatoCO5.push(5)
   agregaPuntos("formatoCO5", 10) ─►  ptsFormatoCO5.push(10)
   agregaPuntos("formatoCO51", 7) ─►  ptsFormatoCO51.push(7)
   ...
      │
      ▼
3. toJSON() calcula sumas:
   formatoCO5: sumaPtsFormatoCO5() = 15
   formatoCO51: sumaPtsFormatoCO51() = 7
   ...
      │
      ▼
4. MockAPI guarda las sumas
      │
      ▼
5. Administrador recupera datos
      │
      ▼
6. setAspirantes() reconstruye:
   ├── new Cl_mAspirante({ nombre, cedula, ... })
   └── cargarSumasGuardadas({ formatoCO5: 15, ... })
         └── ptsFormatoCO5.push(15)  ← RESTAURADO
      │
      ▼
7. mostrarAspirantes() llama a:
   sumaPtsFormatoCO5() = 15 ✅
   sumaPtsFormatoCO51() = 7  ✅
   totalObtenido() = 22      ✅
   calificacionFinal() = 4.4 ✅