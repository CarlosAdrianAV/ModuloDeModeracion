// aplicacion/casos_de_uso/ValidarContenido.ts
import { AxiosPerspectiveAPIAdapter } from "../../infraestructura/adaptadores/apis/AxiosPerspectiveAPIAdapter";
import { ModeracionService } from "../../core/servicios/ModeracionService";

export class ValidarContenido {
  private api = new AxiosPerspectiveAPIAdapter();
  private servicio = new ModeracionService();

  async ejecutar(texto: string): Promise<string[]> {
    const resultado = await this.api.analizarTexto(texto);
    return this.servicio.procesarResultado(resultado);
  }
}