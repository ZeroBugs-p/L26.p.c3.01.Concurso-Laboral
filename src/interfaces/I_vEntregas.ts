// I_vEntregas.ts

import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default interface I_vEntregas {

    mostrarAspirantes(aspirante: Cl_mAspirante[]): void;
    mostrarPorcentaje(porcentaje: number): void;
    mostrarMas25CO5(nombres: string[]): void;

    onRecargar(callback: () => void): void;
    onVolver(callback: () => void): void;
    
    mostrar(): void;
    ocultar(): void;

}