# --------------------
# STAGE 1: BUILD
# --------------------
# Usamos una imagen de Node.js para compilar la aplicación
FROM node:20-alpine AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Ejecutamos el build de producción de Angular
# Esto creará la carpeta 'dist' (o 'dist/mi-proyecto-fr')
RUN npm run build --prod

RUN ls -alt

# --------------------
# STAGE 2: RUNTIME (Servidor Nginx)
# --------------------
FROM nginx:1.24-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/country-app/browser /usr/share/nginx/html
EXPOSE 80