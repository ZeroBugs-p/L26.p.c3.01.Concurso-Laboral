import I_vEntregas from "../interfaces/I_vEntregas.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default class Cl_vEntregas implements I_vEntregas {
    private ui: HTMLDivElement;
    private btRecargar: HTMLButtonElement;
    private btVolver: HTMLButtonElement;
    private tblRegistros: HTMLTableElement;
    private lblPorcentaje: HTMLElement;
    private lblMas25CO5: HTMLElement;

    constructor() {
        this.ui = document.getElementById("entregas") as HTMLDivElement;
        this.tblRegistros = document.getElementById("entregas_tblRegistros") as HTMLTableElement;
        this.btRecargar = document.getElementById("entregas_btRecargar") as HTMLButtonElement;
        this.btVolver = document.getElementById("entregas_btVolver") as HTMLButtonElement;
        this.lblPorcentaje = document.getElementById("entregas_lblPorcentaje") as HTMLElement;
        this.lblMas25CO5 = document.getElementById("entregas_lblMas25CO5") as HTMLElement;
    }
  
    onRecargar(callback: () => void): void {
        this.btRecargar.onclick = callback;     }

    onVolver(callback: () => void): void {
        this.btVolver.onclick = callback;   }

    mostrarAspirantes(aspirantes: Cl_mAspirante[]): void {
        this.tblRegistros.innerHTML = "";
            aspirantes.forEach((aspirante: Cl_mAspirante) => {
                this.tblRegistros.innerHTML += `<tr>
                    <td>${aspirante.nombre}</td>
                    <td>${aspirante.cedula}</td>
                    <td>${aspirante.sumaPtsFormatoCO5()}</td>
                    <td>${aspirante.sumaPtsFormatoCO51()}</td>
                    <td>${aspirante.sumaPtsFormatoCO52()}</td>
                    <td>${aspirante.sumaPtsFormatoCO53()}</td>
                    <td>${aspirante.totalObtenido()}</td>
                    <td>${aspirante.calificacionFinal()}</td>
            </tr>`;
        });
    }

    mostrarPorcentaje(porcentaje: number): void {
        this.lblPorcentaje.textContent = `Porcentaje de calificación: ${porcentaje.toFixed(2)} %`;
    }

    mostrarMas25CO5(nombres: string[]): void {
        this.lblMas25CO5.textContent = `Aspirantes con más de 25 puntos en CO5: ${nombres}, `;
    }

    mostrar() {
        this.ui.removeAttribute("hidden");      }

  ocultar() {
    this.ui.setAttribute("hidden", "true");     }
}
