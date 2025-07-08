#Imagen base
FROM node:20-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y código
COPY package*.json ./
RUN npm install --production

# Copiar código compilado
COPY dist ./dist

# Copiar cualquier otro archivo si necesitas (.env si lo usas local)
# COPY .env .env

# Exponer el puerto que usa Express
EXPOSE 8080

# Comando para ejecutar el servidor
CMD ["node", "dist/infraestructura/servidor/ExpressServer.js"]
