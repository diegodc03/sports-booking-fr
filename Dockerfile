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
RUN npm run build -- --output-path=./dist

# --------------------
# STAGE 2: RUNTIME (Servidor Nginx)
# --------------------
# Usamos una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine AS production-stage

# 2. Copiamos la configuración personalizada de Nginx
# NECESITAS crear un archivo 'nginx.conf' al lado de este Dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. Copiamos los archivos estáticos compilados desde la etapa 'build'
# Ajusta el nombre de la subcarpeta dentro de 'dist' si es necesario
# Angular CLI moderno suele usar dist/<nombre-proyecto>/
COPY --from=build /usr/src/app/dist/country-app /usr/share/nginx/html

# Exponemos el puerto 80 (puerto estándar de Nginx)
EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
