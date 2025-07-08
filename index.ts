// index.ts
import { ModeracionController } from "./puertos/entrada/ModeracionController";
import readline from "readline";

const controller = new ModeracionController();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("🔤 Ingresa el texto a analizar: ", async (input) => {
  await controller.analizarDesdeConsola(input);
  rl.close();
});