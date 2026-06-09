// Cl_cEntregas.ts

import I_vEntregas from "../interfaces/I_vEntregas.js";
import Cl_sEntregas from "../services/Cl_sEntregas.js";
import Cl_mConcurso from "../models/Cl_mConcurso.js";

export default class Cl_cEntregas {
    private modelo: Cl_mConcurso;
    private vista: I_vEntregas;
    private volverCallback: () => void;

    constructor({modelo, vista, volverCallback}
        :{  
            modelo: Cl_mConcurso;
            vista: I_vEntregas;
            volverCallback: () => void;
        }) {
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
