export class ModerarComentario {
  async ejecutar(texto: string) {
    return { aprobado: true, scores: {} };
  }
}