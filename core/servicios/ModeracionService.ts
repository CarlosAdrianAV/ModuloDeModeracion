// ModeracionService.ts
import { AnalisisResultado } from "../entidades/EvaluacionToxicidad";

export class ModeracionService {
  procesarResultado(resultado: AnalisisResultado): string[] {
    const atributos: string[] = [];

    for (const atributo in resultado) {
      const score = resultado[atributo].summaryScore.value;
      if (score >= 0.30) atributos.push(`${atributo}: ${(score * 100).toFixed(2)}%`);
    }

    return atributos;
  }
}