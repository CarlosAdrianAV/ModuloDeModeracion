import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export class PrismaComentarioRepositorio {
  async guardarComentario(texto: string, resultado: string[]): Promise<void> {
    await prisma.comentario.create({
      data: {
        texto,
        resultado: resultado.join(", ")
      }
    });
  }

  async obtenerHistorial(): Promise<{ texto: string; resultado: string; fecha: Date }[]> {
    return prisma.comentario.findMany({
      orderBy: { fecha: "desc" }
    });
  }
}