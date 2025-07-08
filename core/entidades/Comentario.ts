// EvaluacionToxicidad.ts 1:59pm
export interface AnalisisResultado {
  [key: string]: {
    summaryScore: {
      value: number;
    };
  };
}