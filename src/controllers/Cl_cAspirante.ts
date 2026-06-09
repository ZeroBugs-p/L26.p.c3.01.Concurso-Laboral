// Cl_cAspirante.ts

import { I_vAspirante } from "../interfaces/I_vAspirante.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";
import sAspirante from "../services/Cl_sAspirante.js";

export default class Cl_cAspirante {
    private vista: I_vAspirante;

    constructor(vista: I_vAspirante) {
        this.vista = vista;
        this.vista.onEnviar(() => this.btEnviarOnClick());
    }

    // ✅ MÉTODO DELGADO: Solo coordina (Es decir, solo agrupa los atributos.)
    async btEnviarOnClick() {

        // 1. Crear aspirante con TODOS los datos básicos (5 campos)

        const aspirante = new Cl_mAspirante({
            nombre: this.vista.nombre,
            cedula: this.vista.cedula,
            notaExamenEscrito: this.vista.notaExamenEscrito,
            notaExamenPractico: this.vista.notaExamenPractico,
            notaExamenAptitudes: this.vista.notaExamenAptitudes

        });

        // 2. Agregar puntajes de las 4 secciones de preguntas.

        const ptsCO5 = this.vista.puntajeCO5();
            ptsCO5.forEach(puntos => aspirante.agregarPuntos("formatoCO5", puntos));

        const ptsCO51 = this.vista.puntajeCO51();
            ptsCO51.forEach(puntos => aspirante.agregarPuntos("formatoCO51", puntos));

        const ptsCO52 = this.vista.puntajeCO52();
            ptsCO52.forEach(puntos => aspirante.agregarPuntos("formatoCO52", puntos));

        const ptsCO53 = this.vista.puntajeCO53();
            ptsCO53.forEach(puntos => aspirante.agregarPuntos("formatoCO53", puntos));

        // 3. Guardar en MockAPI
            const resultado = await sAspirante.agregar(aspirante);
                alert(resultado.mensaje);

            if (resultado.ok) {
                this.vista.mostrarConfirmacion();
            }
        }
}