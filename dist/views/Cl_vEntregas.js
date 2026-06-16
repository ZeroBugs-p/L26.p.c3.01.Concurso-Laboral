export default class Cl_vEntregas {
    ui;
    btRecargar;
    btVolver;
    tblRegistros;
    lblPorcentaje;
    lblMas25CO5;
    constructor() {
        this.ui = document.getElementById("entregas");
        this.tblRegistros = document.getElementById("entregas_tblRegistros");
        this.btRecargar = document.getElementById("entregas_btRecargar");
        this.btVolver = document.getElementById("entregas_btVolver");
        this.lblPorcentaje = document.getElementById("entregas_lblPorcentaje");
        this.lblMas25CO5 = document.getElementById("entregas_lblMas25CO5");
    }
    onRecargar(callback) {
        this.btRecargar.onclick = callback;
    }
    onVolver(callback) {
        this.btVolver.onclick = callback;
    }
    mostrarAspirantes(aspirantes) {
        this.tblRegistros.innerHTML = "";
        aspirantes.forEach((aspirante) => {
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
    mostrarPorcentaje(porcentaje) {
        this.lblPorcentaje.textContent = `Porcentaje de calificación: ${porcentaje.toFixed(2)} %`;
    }
    mostrarMas25CO5(nombres) {
        this.lblMas25CO5.textContent = `Aspirantes con más de 25 puntos en CO5: ${nombres}, `;
    }
    mostrar() {
        this.ui.removeAttribute("hidden");
    }
    ocultar() {
        this.ui.setAttribute("hidden", "true");
    }
}
