import Cl_mAspirante from "../models/Cl_mAspirante.js";
import Cl_sProyecto from "./Cl_sProyecto.js";

export default class Cl_sAspirante extends Cl_sProyecto {
  /**
   * Verifica si existe un Aspirante con la cédula indicada
   */
  static async existe(
    aspiranteId: string,  // ← string para que coincida con el modelo
  ): Promise<{ ok: boolean; existe: boolean }> {
    return super.existeId({
      tabla: "aspirante",
      tablaId: parseInt(aspiranteId), // ← convertimos string → number
      tablaIdName: "cedula",
    });
  }

  /**
   * Agrega un nuevo Aspirante con validaciones completas
   * @param nuevoAspirante - Objeto Cl_mAspirante a guardar
   * @returns Promise con resultado de la operación
   */
  static async agregar(
    nuevoAspirante: Cl_mAspirante,
  ): Promise<{ ok: boolean; mensaje: string }> {
    // ✅ VALIDACIÓN 1: Cédula obligatoria
    if (!nuevoAspirante.cedula || nuevoAspirante.cedula.trim() === "") {
      return {
        ok: false,
        mensaje: "La cédula es obligatoria",
      };
    }

    // ✅ VALIDACIÓN 2: Cédula debe ser numérica
    if (isNaN(parseInt(nuevoAspirante.cedula))) {
      return {
        ok: false,
        mensaje: "La cédula debe ser un número válido",
      };
    }

    // ✅ VALIDACIÓN 3: Nombre obligatorio
    if (!nuevoAspirante.nombre || nuevoAspirante.nombre.trim() === "") {
      return {
        ok: false,
        mensaje: "El nombre es obligatorio",
      };
    }

    // ✅ VALIDACIÓN 4: Verificar unicidad de cédula
    const chkExiste = await super.existeId({
      tabla: "aspirante",                 // ← ¡minúscula!
      tablaId: parseInt(nuevoAspirante.cedula), // ← convertimos string → number
      tablaIdName: "cedula",
    });

    if (!chkExiste.ok) {
      return {
        ok: false,
        mensaje: "Error: No se pudo conectar con el servidor",
      };
    }

    if (chkExiste.existe) {
      return {
        ok: false,
        mensaje: "Ya existe un aspirante registrado con esa cédula",
      };
    }

    // ✅ VALIDACIÓN 5: Guardar en MockAPI
    return super.agregar(nuevoAspirante.toJSON());
  }
}