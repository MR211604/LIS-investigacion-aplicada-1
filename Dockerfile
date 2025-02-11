# Usa una imagen base oficial de Node.js con Alpine
FROM node:20-alpine
# Define el directorio dentro del contenedor
WORKDIR /app
# Copia todos los archivos del proyecto
COPY . .
# Instala pnpm globalmente
RUN npm install -g pnpm
# Instala todas las dependencias del proyecto
RUN pnpm install --prod
# Expone el puerto
EXPOSE 4000
# Define el comando para iniciar la app
CMD ["pnpm", "dev"]