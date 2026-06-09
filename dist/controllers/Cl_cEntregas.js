// Cl_cEntregas.ts
import Cl_sEntregas from "../services/Cl_sEntregas.js";
export default class Cl_cEntregas {
    modelo;
    vista;
    volverCallback;
    constructor({ modelo, vista, volverCallback }) {
        this.modelo = modelo;
        this.vista = vista;
        this.volverCallback = volverCallback;
        this.vista.onRecargar(() => this.btRecargarOnClick());
        this.vista.onVolver(() => this.onVolver());
        this.vista.mostrar();
        this.btRecargarOnClick();
    }
    onVolver() {
        this.vista.ocultar();
        this.volverCallback();
    }
    async btRecargarOnClick() {
        let resultado = await Cl_sEntregas.getEntregas();
        if (resultado.ok === false) {
            alert("Error: No se pudo conectar con el servidor");
            return;
        }
        this.modelo.setAspirantes(resultado.tabla);
        this.vista.mostrarAspirantes(this.modelo.getAspirantes());
    }
}
