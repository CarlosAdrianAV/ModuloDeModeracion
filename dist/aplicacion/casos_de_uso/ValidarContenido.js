"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarContenido = void 0;
// aplicacion/casos_de_uso/ValidarContenido.ts
const AxiosPerspectiveAPIAdapter_1 = require("../../infraestructura/adaptadores/apis/AxiosPerspectiveAPIAdapter");
const ModeracionService_1 = require("../../core/servicios/ModeracionService");
class ValidarContenido {
    constructor() {
        this.api = new AxiosPerspectiveAPIAdapter_1.AxiosPerspectiveAPIAdapter();
        this.servicio = new ModeracionService_1.ModeracionService();
    }
    async ejecutar(texto) {
        const resultado = await this.api.analizarTexto(texto);
        return this.servicio.procesarResultado(resultado);
    }
}
exports.ValidarContenido = ValidarContenido;
