// Cl_sEntregas.ts

import Cl_sProyecto from "./Cl_sProyecto.js";
import Cl_mAspirante from "../models/Cl_mAspirante.js";

export default class Cl_sEntregas extends Cl_sProyecto {
  static async getEntregas(): Promise<{
    ok: boolean;
    tabla: Cl_mAspirante[];
  }> {
    return super.getTabla({ tabla: "aspirante" });
  }
}
