// Cl_mConcurso.ts
import Cl_mAspirante from "./Cl_mAspirante.js";
export default class Cl_mConcurso {
    aspirantes = [];
    agregarAspirante(aspirante) {
        this.aspirantes.push(aspirante);
    }
    setAspirantes(aspirante) {
        this.aspirantes = [];
        aspirante.forEach((item) => {
            // 1. Crear aspirante con los 5 campos basicos del constructor
            const aspirante = new Cl_mAspirante({
                nombre: item.nombre,
                cedula: item.cedula,
                notaExamenEscrito: item.notaExamenEscrito,
                notaExamenPractico: item.notaExamenPractico,
                notaExamenAptitudes: item.notaExamenAptitudes,
            });
            // 2. Cargar las sumas guardadas de los formatos CO que vienen de MockAPI
            console.log("=== setAspirantes: datos crudos de MockAPI ===", item);
            console.log("  formatoCO5:", item.formatoCO5, " tipo:", typeof item.formatoCO5);
            console.log("  formatoCO51:", item.formatoCO51, " tipo:", typeof item.formatoCO51);
            console.log("  formatoCO52:", item.formatoCO52, " tipo:", typeof item.formatoCO52);
            console.log("  formatoCO53:", item.formatoCO53, " tipo:", typeof item.formatoCO53);
            aspirante.cargarSumasGuardadas({
                formatoCO5: Number(item.formatoCO5) || 0,
                formatoCO51: Number(item.formatoCO51) || 0,
                formatoCO52: Number(item.formatoCO52) || 0,
                formatoCO53: Number(item.formatoCO53) || 0,
            });
            console.log("  sumaPtsFormatoCO5():", aspirante.sumaPtsFormatoCO5());
            console.log("  sumaPtsFormatoCO51():", aspirante.sumaPtsFormatoCO51());
            console.log("  sumaPtsFormatoCO52():", aspirante.sumaPtsFormatoCO52());
            console.log("  sumaPtsFormatoCO53():", aspirante.sumaPtsFormatoCO53());
            console.log("  totalObtenido():", aspirante.totalObtenido());
            this.aspirantes.push(aspirante);
        });
    }
    getAspirantes() {
        return this.aspirantes;
    }
}
