// infraestructura/servidor/ExpressServer.ts
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { ModeracionController } from "../../puertos/entrada/ModeracionController";
import { PrismaComentarioRepositorio } from "../adaptadores/repositorios/PrismaComentarioRepositorio";
import { AxiosPerspectiveAPIAdapter } from "../adaptadores/apis/AxiosPerspectiveAPIAdapter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const controller = new ModeracionController();
const perspective = new AxiosPerspectiveAPIAdapter();

app.use(express.json());

// --- ENDPOINTS ---
app.post("/moderar", async (req, res) => {
  const { texto } = req.body;

  if (!texto) return res.status(400).json({ error: "Falta el campo 'texto'" });

  try {
    const resultado = await controller.analizarDesdeApi(texto);
    res.json({ texto, resultado });
  } catch (err) {
    res.status(500).json({ error: "Error al analizar texto" });
  }
});

app.get("/historial", async (req, res) => {
  try {
    const historial = await new PrismaComentarioRepositorio().obtenerHistorial();
    res.json(historial);
  } catch (err) {
    console.error("❌ Error al obtener historial:", err);
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

// --- FUNCIONES PARA MODERACIÓN AUTOMÁTICA ---

// Convierte los scores que devuelve Perspective a % legibles y ejecutables
function convertirScoresAPorcentaje(attributeScores: any): Record<string, number> {
  const porcentajes: Record<string, number> = {};
  for (const atributo in attributeScores) {
    const score = attributeScores[atributo]?.summaryScore?.value;
    if (score !== undefined) {
      porcentajes[atributo] = parseFloat((score * 100).toFixed(2));
    }
  }
  return porcentajes;
}

async function revisarComentariosYEliminar() {
  try {
    const resp = await axios.get(
      "http://54.196.247.195:8081/comments/total_comentarios?ordenado_fecha=true&cantidad=15"
    );
    const comentarios = Array.isArray(resp.data) ? resp.data : resp.data.comentarios;

    if (!Array.isArray(comentarios)) {
      console.error("❌ Los comentarios no son un arreglo:", comentarios);
      return;
    }

    for (const comentario of comentarios) {
      const texto = comentario.cuerpo;
      const resultado = await perspective.analizarTexto(texto);
      const porcentajes = convertirScoresAPorcentaje(resultado);

      const esToxico = ["TOXICITY", "INSULT", "THREAT", "PROFANITY"].some(
        clave => porcentajes[clave] !== undefined && porcentajes[clave] > 25
      );

      if (esToxico) {
        await axios.post(`http://54.196.247.195:8081/comments/eliminar_comentario?id_comentario=${comentario.id}`);
        console.log(`🗑️ Comentario eliminado (ID: ${comentario.id}) por: "${texto}"`);
      } else {
        console.log(`✅ Comentario permitido (ID: ${comentario.id})`);
      }
    }
  } catch (error) {
    console.error("❌ Error moderando comentarios:", (error as Error).message);
  }
}

// Ejecutar cada minuto
setInterval(revisarComentariosYEliminar, 60_000);

// --- INICIO DEL SERVIDOR ---
app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});



