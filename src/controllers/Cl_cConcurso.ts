// Cl_cConConcurso.ts

import vConcurso from "../interfaces/I_vConcurso.js";
import Cl_mConcurso from "../models/Cl_mConcurso.js";
import Cl_vEntregas from "../views/Cl_vEntregas.js";
import Cl_cEntregas from "./Cl_cEntregas.js";

export default class Cl_cConcurso {
  private vista: vConcurso;

  constructor({  vista }: { vista: vConcurso }) {
    this.vista = vista;
    this.vista.onVerEntregas(() => this.onVerEntregas());
  }
  onVerEntregas() {
    this.vista.deshabilitarBotones();
    const vEntregas = new Cl_vEntregas();
    const mConcurso = new Cl_mConcurso();
    new Cl_cEntregas({
      modelo: mConcurso,
      vista: vEntregas,
      volverCallback: () => this.vista.habilitarBotones(),
    });
  }

}


/* 
    🏢 1. ConConcurso Laboral

        APP evaluador
        - Cargar evaluaciones de Concursos
        - Grabarlas en mockapi
        - Permitir carga asíncrona (no todas las evaluaciones a la vez)

        Ej:
            + Permite que hoy se cargue los resultados del Form-CO5
            + Mañana los demás Forms
            + Sin tener que volver a cargar todo cada vez
            
        APP Empresa
        - Reportar los resultados de los Forms de cálculo
        - Ej: Form-CO6, Form-CO7, Form-CO8
        
 */