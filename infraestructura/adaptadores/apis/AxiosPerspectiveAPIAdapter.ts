// AxiosPerspectiveAPIAdapter.ts
import axios from "axios";
import * as dotenv from "dotenv";
import { AnalisisResultado } from "../../../core/entidades/EvaluacionToxicidad";
dotenv.config();

const API_KEY = process.env.PERSPECTIVE_API_KEY;
const API_URL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;

export class AxiosPerspectiveAPIAdapter {
  async analizarTexto(texto: string): Promise<AnalisisResultado> {
    const response = await axios.post(API_URL, {
      comment: { text: texto },
      languages: ["en"],
      requestedAttributes: {
        TOXICITY: {},
        INSULT: {},
        THREAT: {},
        PROFANITY: {}
      }
    });

    return response.data.attributeScores;
  }
}