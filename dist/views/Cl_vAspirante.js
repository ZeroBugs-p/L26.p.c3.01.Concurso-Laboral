// Cl_vAspirante.ts
export default class Cl_vAspirante {
    // Atributos de la Clase Menor
    inNombre;
    inCedula;
    inNotaExamenEscrito;
    inNotaExamenPractico;
    inNotaExamenAptitudes;
    // Botones de Enviar y Cancelar
    btnEnviar;
    btnCancelar;
    vista;
    constructor() {
        this.inNombre = document.getElementById("aspirante_inNombre");
        this.inCedula = document.getElementById("aspirante_inCedula");
        this.inNotaExamenEscrito = document.getElementById("aspirante_inNotaExamenEscrito");
        this.inNotaExamenPractico = document.getElementById("aspirante_inNotaExamenPractico");
        this.inNotaExamenAptitudes = document.getElementById("aspirante_inNotaExamenAptitudes");
        this.btnEnviar = document.getElementById("aspirante_btnEnviar");
        this.btnCancelar = document.getElementById("aspirante_btnCancelar");
        this.vista = document.getElementById("aspirante");
        //Metodo Para Validar Min and Max
        this.aplicarValidaciones();
    }
    // Getters de los Atributos
    get nombre() {
        return this.inNombre.value;
    }
    get cedula() {
        return this.inCedula.value;
    }
    get notaExamenEscrito() {
        return +this.inNotaExamenEscrito.value;
    }
    get notaExamenPractico() {
        return +this.inNotaExamenPractico.value;
    }
    get notaExamenAptitudes() {
        return +this.inNotaExamenAptitudes.value;
    }
    // Arrays para que lleguen los puntos a la clase menor
    puntajeCO5() {
        const puntajes = [];
        for (let b = 1; b < 5; b++) {
            const input = document.getElementById(`aspirante_inPregunta${b}`);
            if (input) {
                const valor = parseFloat(input.value);
                // Validar que no sea negativo
                if (valor < 0) {
                    alert(` El valor de la pregunta ${b} no puede ser negativo`);
                    return []; // Retorna array vacío si hay error
                }
                if (valor > 0) {
                    puntajes.push(valor);
                }
            }
        }
        return puntajes;
    }
    puntajeCO51() {
        const puntajes = [];
        for (let b = 5; b < 12; b++) {
            const input = document.getElementById(`aspirante_inPregunta${b}`);
            if (input) {
                const valor = parseFloat(input.value);
                // Validar que no sea negativo
                if (valor < 0) {
                    alert(` El valor de la pregunta ${b} no puede ser negativo`);
                    return []; // Retorna array vacío si hay error
                }
                if (valor > 0) {
                    puntajes.push(valor);
                }
            }
        }
        return puntajes;
    }
    puntajeCO52() {
        const puntajes = [];
        for (let b = 12; b < 21; b++) {
            const input = document.getElementById(`aspirante_inPregunta${b}`);
            if (input) {
                const valor = parseFloat(input.value);
                // Validar que no sea negativo
                if (valor < 0) {
                    alert(` El valor de la pregunta ${b} no puede ser negativo`);
                    return []; // Retorna array vacío si hay error
                }
                if (valor > 0) {
                    puntajes.push(valor);
                }
            }
        }
        return puntajes;
    }
    puntajeCO53() {
        const puntajes = [];
        for (let b = 21; b < 29; b++) {
            const input = document.getElementById(`aspirante_inPregunta${b}`);
            if (input) {
                const valor = parseFloat(input.value);
                // Validar que no sea negativo
                if (valor < 0) {
                    alert(` El valor de la pregunta ${b} no puede ser negativo`);
                    return []; // Retorna array vacío si hay error
                }
                if (valor > 0) {
                    puntajes.push(valor);
                }
            }
        }
        return puntajes;
    }
    // Metodos del Index
    onEnviar(callback) {
        this.btnEnviar.onclick = callback;
    }
    onCancelar(callback) {
        this.btnCancelar.onclick = callback;
    }
    mostrar() {
        if (this.vista === null)
            return;
        this.vista.hidden = false;
        this.inNombre.value = "";
        this.inCedula.value = "";
        this.inNotaExamenEscrito.value = "";
        this.inNotaExamenPractico.value = "";
        this.inNotaExamenAptitudes.value = "";
    }
    ocultar() {
        if (this.vista === null)
            return;
        this.vista.hidden = true;
    }
    // Metodo Para Procesar otro Aspirante
    mostrarConfirmacion() {
        if (this.vista === null)
            return;
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
    aplicarValidaciones() {
        for (let i = 1; i <= 28; i++) {
            const input = document.getElementById(`aspirante_inPregunta${i}`);
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
