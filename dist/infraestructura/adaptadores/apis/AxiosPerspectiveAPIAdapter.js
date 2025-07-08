"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosPerspectiveAPIAdapter = void 0;
// AxiosPerspectiveAPIAdapter.ts
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const API_KEY = process.env.PERSPECTIVE_API_KEY;
const API_URL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;
class AxiosPerspectiveAPIAdapter {
    async analizarTexto(texto) {
        const response = await axios_1.default.post(API_URL, {
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
exports.AxiosPerspectiveAPIAdapter = AxiosPerspectiveAPIAdapter;
