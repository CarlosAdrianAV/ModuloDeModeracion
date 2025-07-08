"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const ModeracionController_1 = require("./puertos/entrada/ModeracionController");
const readline_1 = __importDefault(require("readline"));
const controller = new ModeracionController_1.ModeracionController();
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("🔤 Ingresa el texto a analizar: ", async (input) => {
    await controller.analizarDesdeConsola(input);
    rl.close();
});
