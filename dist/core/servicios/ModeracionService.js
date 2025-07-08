"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeracionService = void 0;
class ModeracionService {
    procesarResultado(resultado) {
        const atributos = [];
        for (const atributo in resultado) {
            const score = resultado[atributo].summaryScore.value;
            if (score >= 0.30)
                atributos.push(`${atributo}: ${(score * 100).toFixed(2)}%`);
        }
        return atributos;
    }
}
exports.ModeracionService = ModeracionService;
