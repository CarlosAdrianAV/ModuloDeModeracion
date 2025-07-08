import { PrismaComentarioRepositorio } from "../../infraestructura/adaptadores/repositorios/PrismaComentarioRepositorio";
import { ValidarContenido } from "../../aplicacion/casos_de_uso/ValidarContenido";

export class ModeracionController {
  private validador = new ValidarContenido();
  private repositorio = new PrismaComentarioRepositorio();

  async analizarDesdeApi(texto: string): Promise<string[]> {
    const resultado = await this.validador.ejecutar(texto);
    await this.repositorio.guardarComentario(texto, resultado);
    return resultado;
  }

  async analizarDesdeConsola(texto: string): Promise<void> {
    const resultado = await this.validador.ejecutar(texto);
    await this.repositorio.guardarComentario(texto, resultado);
    console.log(`\n📄 Texto: "${texto}"`);
    resultado.forEach((r: string) => console.log(`🔍 ${r}`));
  }
}
