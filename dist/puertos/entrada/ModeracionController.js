"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeracionController = void 0;
const PrismaComentarioRepositorio_1 = require("../../infraestructura/adaptadores/repositorios/PrismaComentarioRepositorio");
const ValidarContenido_1 = require("../../aplicacion/casos_de_uso/ValidarContenido");
class ModeracionController {
    constructor() {
        this.validador = new ValidarContenido_1.ValidarContenido();
        this.repositorio = new PrismaComentarioRepositorio_1.PrismaComentarioRepositorio();
    }
    async analizarDesdeApi(texto) {
        const resultado = await this.validador.ejecutar(texto);
        await this.repositorio.guardarComentario(texto, resultado);
        return resultado;
    }
    async analizarDesdeConsola(texto) {
        const resultado = await this.validador.ejecutar(texto);
        await this.repositorio.guardarComentario(texto, resultado);
        console.log(`\n📄 Texto: "${texto}"`);
        resultado.forEach((r) => console.log(`🔍 ${r}`));
    }
}
exports.ModeracionController = ModeracionController;
