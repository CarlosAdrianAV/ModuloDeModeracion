// EvaluacionToxicidad.ts
export interface AnalisisResultado {
  [key: string]: {
    summaryScore: {
      value: number;
    };
  };
}