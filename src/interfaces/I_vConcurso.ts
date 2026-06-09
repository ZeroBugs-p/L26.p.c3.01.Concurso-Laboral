// I_vConcurso.ts

export default interface I_vConcurso {

    // Botones para Ver las entregas del Evaluador
        onVerEntregas(callback: () => void): void;

        deshabilitarBotones(): void;
        habilitarBotones(): void;
}
