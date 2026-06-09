// I_vEntregas.ts

import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default interface I_vEntregas {

    mostrarAspirantes(aspirante: Cl_mAspirante[]): void;

    onRecargar(callback: () => void): void;
    onVolver(callback: () => void): void;
    
    mostrar(): void;
    ocultar(): void;

}