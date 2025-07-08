"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaComentarioRepositorio = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaComentarioRepositorio {
    async guardarComentario(texto, resultado) {
        await prisma.comentario.create({
            data: {
                texto,
                resultado: resultado.join(", ")
            }
        });
    }
    async obtenerHistorial() {
        return prisma.comentario.findMany({
            orderBy: { fecha: "desc" }
        });
    }
}
exports.PrismaComentarioRepositorio = PrismaComentarioRepositorio;
