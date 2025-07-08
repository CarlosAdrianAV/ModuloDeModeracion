export interface PerspectiveAPIGateway {
  analizarTexto(texto: string): Promise<Record<string, number>>;
}