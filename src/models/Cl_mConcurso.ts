// Cl_mConcurso.ts

import Cl_mAspirante from "./Cl_mAspirante.js";

export default class Cl_mConcurso {
    public aspirantes: Cl_mAspirante[] = [];
    private mayor: number = 0;
    private auxNombreMas25CO5: string = "";

    public agregarAspirante(aspirante: Cl_mAspirante): void {
        this.aspirantes.push(aspirante);
    }

    porcentajeCalificacion(): number {
        const cantidadAspirantes = this.aspirantes.length;
        if (cantidadAspirantes === 0) {
            return 0;
        }

        const sumaTotal = this.aspirantes.reduce((suma, aspirante) => suma + aspirante.totalObtenido(), 0);
        const totalPosible = cantidadAspirantes * 100;

        return Number(((sumaTotal / totalPosible) * 100).toFixed(2));
    }

    mas25CO5(): string[] {
        const nombreMas25CO5: string[] = [];
        for(let i = 0; i < this.aspirantes.length; i++) {
            if(this.aspirantes[i].sumaPtsFormatoCO5() >= 25) {
                nombreMas25CO5.push(this.aspirantes[i].nombre);
                console.log("=== mas25CO5: Aspirante con más de 25 puntos en CO5 ===", this.aspirantes[i].nombre);
            }
        }
        return nombreMas25CO5;
    }
    
    setAspirantes(aspirante: any[]) {
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
    
    getAspirantes(): Cl_mAspirante[] {
        return this.aspirantes;
    }
}