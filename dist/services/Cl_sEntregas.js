// Cl_sEntregas.ts
import Cl_sProyecto from "./Cl_sProyecto.js";
export default class Cl_sEntregas extends Cl_sProyecto {
    static async getEntregas() {
        return super.getTabla({ tabla: "aspirante" });
    }
}
