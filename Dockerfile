# Etapa 1: Instalar dependencias de Node.js
FROM node:18 as node-build

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install --production

# Copiar el resto del código de la aplicación
COPY . .

# Etapa 2: Configurar submódulo Python
FROM python:3.9-slim as python-build

# Establecer el directorio de trabajo
WORKDIR /usr/src/app/child

# Copiar el submódulo Python
COPY --from=node-build /usr/src/app/child ./

# Crear e instalar virtualenv
RUN python -m venv venv && \
    ./venv/bin/pip install --upgrade pip && \
    ./venv/bin/pip install -r requirements.txt

# Etapa 3: Construir la imagen final
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar la aplicación Node.js desde la etapa anterior
COPY --from=node-build /usr/src/app ./

# Copiar el submódulo Python con virtualenv desde la etapa anterior
COPY --from=python-build /usr/src/app/child ./child

# Configurar variables de entorno
ENV PATH="/usr/src/app/child/venv/bin:$PATH"

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]