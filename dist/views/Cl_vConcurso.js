// Cl_vConcurso.ts
export default class Cl_vConcurso {
    btVerEntregas;
    constructor() {
        this.btVerEntregas = document.getElementById("concurso_btVerEntregas");
    }
    // Botones para Ver las entregas del Evaluador
    onVerEntregas(callback) {
        this.btVerEntregas.onclick = callback;
    }
    deshabilitarBotones() {
        this.btVerEntregas.disabled = true;
    }
    habilitarBotones() {
        this.btVerEntregas.disabled = false;
    }
}
