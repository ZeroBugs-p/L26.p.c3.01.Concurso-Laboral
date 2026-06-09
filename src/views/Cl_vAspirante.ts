// Cl_vAspirante.ts

import { I_vAspirante } from "../interfaces/I_vAspirante.js";

export default class Cl_vAspirante implements I_vAspirante {

    // Atributos de la Clase Menor
        private inNombre: HTMLInputElement;
        private inCedula: HTMLInputElement
        private inNotaExamenEscrito: HTMLInputElement;
        private inNotaExamenPractico: HTMLInputElement;
        private inNotaExamenAptitudes: HTMLInputElement;

    // Botones de Enviar y Cancelar
        private btnEnviar: HTMLButtonElement;
        private btnCancelar: HTMLButtonElement;
        private vista: HTMLElement | null;


    constructor() {

        this.inNombre = document.getElementById("aspirante_inNombre") as HTMLInputElement;
        this.inCedula = document.getElementById("aspirante_inCedula") as HTMLInputElement;
        this.inNotaExamenEscrito = document.getElementById("aspirante_inNotaExamenEscrito") as HTMLInputElement;
        this.inNotaExamenPractico = document.getElementById("aspirante_inNotaExamenPractico") as HTMLInputElement;
        this.inNotaExamenAptitudes = document.getElementById("aspirante_inNotaExamenAptitudes") as HTMLInputElement;

        this.btnEnviar = document.getElementById("aspirante_btnEnviar") as HTMLButtonElement;
        this.btnCancelar = document.getElementById("aspirante_btnCancelar") as HTMLButtonElement;
        this.vista = document.getElementById("aspirante");

        //Metodo Para Validar Min and Max
            this.aplicarValidaciones();

    }

    // Getters de los Atributos
        get nombre(): string {
            return this.inNombre.value;     }

        get cedula(): string {
            return this.inCedula.value;     }

        get notaExamenEscrito(): number {
            return +this.inNotaExamenEscrito.value;    }

        get notaExamenPractico(): number {
            return +this.inNotaExamenPractico.value;   }

        get notaExamenAptitudes(): number {
            return +this.inNotaExamenAptitudes.value;  }

    // Arrays para que lleguen los puntos a la clase menor
        puntajeCO5(): number[] {
            const puntajes: number[] = [];
            
            for (let b = 1; b < 5; b++) {
                const input = document.getElementById(`aspirante_inPregunta${b}`) as HTMLInputElement;
                
                if (input) {
                    const valor = parseFloat(input.value);
                    
                    // Validar que no sea negativo
                    if (valor < 0) {
                        alert(` El valor de la pregunta ${b} no puede ser negativo`);
                            return [];  // Retorna array vacío si hay error
                    }
                    
                    if (valor > 0) {
                        puntajes.push(valor);
                    }
                }
            }
            
            return puntajes;
        }

        puntajeCO51(): number[] {
            const puntajes: number[] = [];
            
            for (let b = 5; b < 12; b++) {
                const input = document.getElementById(`aspirante_inPregunta${b}`) as HTMLInputElement;
                
                if (input) {
                    const valor = parseFloat(input.value);
                    
                    // Validar que no sea negativo
                    if (valor < 0) {
                        alert(` El valor de la pregunta ${b} no puede ser negativo`);
                            return [];  // Retorna array vacío si hay error
                    }
                    
                    if (valor > 0) {
                        puntajes.push(valor);
                    }
                }
            }
            
            return puntajes;
        }

        puntajeCO52(): number[] {
            const puntajes: number[] = [];
            
            for (let b = 12; b < 21; b++) {
                const input = document.getElementById(`aspirante_inPregunta${b}`) as HTMLInputElement;
                
                if (input) {
                    const valor = parseFloat(input.value);
                    
                    // Validar que no sea negativo
                    if (valor < 0) {
                        alert(` El valor de la pregunta ${b} no puede ser negativo`);
                            return [];  // Retorna array vacío si hay error
                    }
                    
                    if (valor > 0) {
                        puntajes.push(valor);
                    }
                }
            }
            
            return puntajes;
        }

        puntajeCO53(): number[] {
            const puntajes: number[] = [];
            
            for (let b = 21; b < 29; b++) {
                const input = document.getElementById(`aspirante_inPregunta${b}`) as HTMLInputElement;
                
                if (input) {
                    const valor = parseFloat(input.value);
                    
                    // Validar que no sea negativo
                    if (valor < 0) {
                        alert(` El valor de la pregunta ${b} no puede ser negativo`);
                            return [];  // Retorna array vacío si hay error
                    }
                    
                    if (valor > 0) {
                        puntajes.push(valor);
                    }
                }
            }
            
            return puntajes;
        }

    // Metodos del Index
        onEnviar(callback: () => void): void {
            this.btnEnviar.onclick = callback;   }

        onCancelar(callback: () => void): void {
            this.btnCancelar.onclick = callback;  }

        mostrar(): void {
            if (this.vista === null ) return;
                this.vista.hidden = false;
                this.inNombre.value = "";
                this.inCedula.value = "";
                this.inNotaExamenEscrito.value = "";
                this.inNotaExamenPractico.value = "";
                this.inNotaExamenAptitudes.value = "";
            }

        ocultar(): void {
            if (this.vista === null) return;
                this.vista.hidden = true;
        }

    // Metodo Para Procesar otro Aspirante
        mostrarConfirmacion(): void {
            if (this.vista === null) return;

            // Oculta el formulario y muestra un mensaje de éxito
                this.vista.innerHTML = `
                    <div style="text-align:center; padding:40px;">

                        <h2 style="color:green;">¡Aspirante procesado correctamente!</h2>

                        <p>Aquí puede registrar otro aspirante.</p>

                        <button onclick="location.href='indexEvaluador.html'" style="padding:10px 20px; font-size:16px;">
                            Procesar otro aspirante
                        </button>
                    </div>`;
        }

    // Metodo para Validar el valor máximo y mínimo que se puede agregar a la pregunta
        private aplicarValidaciones(): void {
            for (let i = 1; i <= 28; i++) {
                const input = document.getElementById(`aspirante_inPregunta${i}`) as HTMLInputElement;
                
                if (input) {
                    const max = parseInt(input.max);
                    const min = parseInt(input.min);
                    
                    input.addEventListener("input", () => {
                        let valor = parseInt(input.value);
                        
                        if (isNaN(valor)) {
                            input.value = "";
                            return;
                        }
                        
                        if (valor > max) {
                            input.value = max.toString();
                            alert(`El valor máximo es ${max}`);
                        }
                        
                        if (valor < min) {
                            input.value = min.toString();
                            alert(`El valor mínimo es ${min}`);
                        }
                    });
                }
            }
        }

}