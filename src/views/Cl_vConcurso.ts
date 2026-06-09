// Cl_vConcurso.ts

import I_vConcurso from "../interfaces/I_vConcurso.js";

export default class Cl_vConcurso implements I_vConcurso {

    private btVerEntregas: HTMLButtonElement;

    constructor() {

        this.btVerEntregas = document.getElementById("concurso_btVerEntregas") as HTMLButtonElement;   }

    // Botones para Ver las entregas del Evaluador
        onVerEntregas(callback: () => void): void {
            this.btVerEntregas.onclick = callback;    }

        deshabilitarBotones() {
            this.btVerEntregas.disabled = true;   }

        habilitarBotones() {
            this.btVerEntregas.disabled = false;  }

}