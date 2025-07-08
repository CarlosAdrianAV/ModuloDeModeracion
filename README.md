El Módulo de Moderación es un componente diseñado para detectar y gestionar comentarios inapropiados o tóxicos en UNRANKING. Está basado en una arquitectura hexagonal (puertos y adaptadores), lo que permite desacoplar la lógica de negocio del sistema de entrada/salida (como bases de datos o interfaces de usuario), facilitando su mantenimiento, pruebas e integración con otros sistemas.

🎯 Propósito del módulo Detectar comentarios tóxicos automáticamente.

Permitir que usuarios reporten contenido ofensivo.

Aplicar filtros y reglas de moderación.

Proporcionar una API clara para integración con otros sistemas (por ejemplo, redes sociales, foros, etc.).

Registrar eventos de moderación para trazabilidad.

🛠️ Tecnologías usadas

TypeScript
Node.js
Arquitectura Hexagonal
Express (si usas una API)
Modelos de detección de toxicidad (Perspective API).
