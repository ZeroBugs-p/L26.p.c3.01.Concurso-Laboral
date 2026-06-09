# Flujo del Código — Concurso Laboral

Este documento explica cómo se comunican las distintas capas del sistema (Modelo-Vista-Controlador + Servicios).

---

## Arquitectura general

```
[HTML] ←→ [Vistas (views)] ←→ [Controladores (controllers)] ←→ [Modelos (models)]
                                                                       ↕
                                                                 [Servicios (services)]
                                                                       ↕
                                                                   [MockAPI]
```

| Capa | Responsabilidad |
|------|----------------|
| **HTML** | Estructura visual, inputs, botones, tablas |
| **Vistas (views)** | Lee/escribe el DOM. Expone getters, eventos y métodos `mostrar()`/`ocultar()` |
| **Controladores (controllers)** | Coordinan: escuchan eventos de la vista, crean/modifican modelos, llaman servicios |
| **Modelos (models)** | Lógica de negocio: datos, cálculos, validaciones |
| **Servicios (services)** | Comunicación con MockAPI (GET, POST, PUT, DELETE) |

---

## 1. Flujo del Evaluador (`indexEvaluador.html`)

```
indexEvaluador.html
  │
  ├── Importa Cl_vAspirante y Cl_cAspirante
  │
  └── new Cl_cAspirante(vistaAspirante)
        │
        └── btEnviarOnClick()
              │
              ├── 1. Crea Cl_mAspirante con datos básicos (nombre, cédula, 3 notas)
              │
              ├── 2. Lee los 28 inputs de preguntas desde la vista
              │      vista.puntajeCO5()  → preguntas 1-4
              │      vista.puntajeCO51() → preguntas 5-11
              │      vista.puntajeCO52() → preguntas 12-20
              │      vista.puntajeCO53() → preguntas 21-28
              │      Cada puntaje se agrega al modelo con aspirante.agregarPuntos("formatoCO5", pts)
              │
              ├── 3. Llama a sAspirante.agregar(aspirante)
              │      │
              │      ├── Valida: cédula obligatoria, numérica, nombre obligatorio, unicidad
              │      └── Llama a super.agregar(aspirante.toJSON())
              │            │
              │            └── Cl_sMockApi.agregar() → POST a MockAPI
              │                  URL: https://...mockapi.io/concurso/aspirantes
              │                  Body: { nombre, cedula, formatoCO5, formatoCO51, formatoCO52, formatoCO53, ... }
              │
              └── 4. Muestra alerta con el resultado
```

### ¿Qué guarda `toJSON()`?

```typescript
{
  tabla: "aspirante",
  nombre: "Mario",
  cedula: "12345678",
  formatoCO5: 20,    // ← SUMA de las 4 preguntas del CO5
  formatoCO51: 15,   // ← SUMA de las 7 preguntas del CO5.1
  formatoCO52: 10,   // ← SUMA de las 9 preguntas del CO5.2
  formatoCO53: 8,    // ← SUMA de las 8 preguntas del CO5.3
  totalObtenido: 53,
  calificacionFinal: 10.6
}
```

> **Importante:** No se guardan los 28 puntajes individuales, solo las sumas de cada formato.

---

## 2. Flujo del Administrador (`indexAdministrador.html`)

```
indexAdministrador.html
  │
  ├── Importa Cl_vConcurso y Cl_cConcurso
  │
  ├── new Cl_cConcurso({ vista: vConcurso })
  │     └── Escucha botón "Ver Entregas"
  │
  └── Al hacer clic en "Ver Entregas":
        │
        └── onVerEntregas()
              │
              ├── Crea Cl_vEntregas (vista de la tabla)
              ├── Crea Cl_mConcurso (modelo contenedor)
              └── new Cl_cEntregas({ modelo, vista, volverCallback })
                    │
                    ├── Muestra la vista (vista.mostrar())
                    └── btRecargarOnClick()
                          │
                          ├── 1. Cl_sEntregas.getEntregas()
                          │      └── GET a MockAPI → devuelve array de aspirantes
                          │
                          ├── 2. modelo.setAspirantes(resultado.tabla)
                          │      │
                          │      ├── Por cada item de MockAPI:
                          │      │   ├── Crea new Cl_mAspirante({ nombre, cedula, ... })
                          │      │   └── aspirante.cargarSumasGuardadas({ formatoCO5, ... })
                          │      │         ← RESTAURA las sumas en los arrays internos
                          │      │
                          │      └── Guarda el aspirante en modelo.aspirantes[]
                          │
                          └── 3. vista.mostrarAspirantes(modelo.getAspirantes())
                                 │
                                 └── Renderiza la tabla HTML con:
                                       nombre, cédula, sumaPtsCO5, sumaPtsCO51,
                                       sumaPtsCO52, sumaPtsCO53, totalObtenido, calificacionFinal
```

---

## 3. Jerarquía de Herencia de Servicios

```
Cl_sMockApi          ← Configuración base (fetch, GET, POST, PUT, DELETE)
  └── Cl_sProyecto   ← Define la URL de MockAPI
        ├── Cl_sAspirante  ← Métodos: existe(cedula), agregar(aspirante)
        └── Cl_sEntregas   ← Método:  getEntregas()
```

---

## 4. Interfaces (Contratos)

| Interfaz | Implementada por | Métodos que expone |
|----------|-----------------|-------------------|
| `I_vAspirante` | `Cl_vAspirante` | `nombre`, `cedula`, `notaExamenEscrito`, `notaExamenPractico`, `notaExamenAptitudes`, `puntajeCO5()`, `puntajeCO51()`, `puntajeCO52()`, `puntajeCO53()`, `onEnviar()`, `onCancelar()`, `mostrar()`, `ocultar()` |
| `I_vConcurso` | `Cl_vConcurso` | `onVerEntregas()`, `deshabilitarBotones()`, `habilitarBotones()` |
| `I_vEntregas` | `Cl_vEntregas` | `onRecargar()`, `onVolver()`, `mostrarAspirantes()`, `mostrar()`, `ocultar()` |

---

## 5. Resumen del flujo completo

```
EVALUADOR                              MOCKAPI                           ADMINISTRADOR
─────────                              ───────                           ─────────────
1. Llena formulario
   (nombre, cédula,
    3 notas, 28 preguntas)

2. Cl_cAspirante.btEnviarOnClick()
   ├── Crea Cl_mAspirante
   ├── Agrega puntajes a arrays
   └── sAspirante.agregar()
         │
         └── POST ──────────────►  Guarda en MockAPI
                                   { nombre, cedula,
                                     formatoCO5 (suma),
                                     formatoCO51 (suma),
                                     formatoCO52 (suma),
                                     formatoCO53 (suma) }
                                                          3. Cl_cEntregas.btRecargarOnClick()
                                                                  │
                                                           GET ◄───┘
                                                                  │
                                                          4. setAspirantes()
                                                             ├── Crea Cl_mAspirante
                                                             └── cargarSumasGuardadas()

                                                          5. mostrarAspirantes()
                                                             └── Renderiza tabla HTML