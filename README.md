# Catprinter Manager

Este repositorio gestiona el envío de imágenes a una impresora utilizando el submódulo `catprinter`. La aplicación permite cargar imágenes, añadirlas a una cola de impresión y enviarlas a la impresora.

## Requisitos

Asegúrate de tener los siguientes elementos instalados en tu sistema:

- **Node.js** (versión 14 o superior)
- **Python** (versión 3.6 o superior)
- **Dependencias de Python** requeridas por el submódulo `catprinter`

## Instalación

### 1. Clonar el repositorio

Primero, clona este repositorio y asegúrate de inicializar el submódulo de `catprinter`.

```bash
git clone --recurse-submodules https://github.com/tu_usuario/catprinter-manager.git
```
Si ya has clonado el repositorio sin el submódulo, puedes inicializarlo manualmente con:

```bash
git submodule init
git submodule update
```

### 2. Instalar dependencias de Node.js
Dirígete al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias de Node.js:

```bash
npm install
```
### 3. Instalar dependencias de Python
El submódulo catprinter requiere un entorno de Python para ejecutar scripts que interactúan con la impresora. Asegúrate de tener Python y las dependencias necesarias instaladas en tu máquina.

Navega al directorio child (submódulo catprinter):

```bash
cd child
```
Instala las dependencias de Python especificadas en el requirements.txt del submódulo:
```bash
pip install -r requirements.txt
```

### 4. Configuración del puerto de la impresora (si es necesario)
Asegúrate de tener la impresora conectada a tu sistema y configura el puerto que utilizará para la conexión Bluetooth, si es necesario. Esto puede hacerse modificando los parámetros en el código del submódulo o pasando configuraciones a través de variables de entorno.

### 5. Ejecutar la aplicación
Para ejecutar la aplicación, simplemente corre el siguiente comando:

```bash
npm start
```
Este comando ejecutará la aplicación Express en el puerto configurado (por defecto, será localhost:3000).

### 6. Subir una imagen
Para subir una imagen a la cola de impresión, realiza una solicitud POST al endpoint /print con una imagen en el cuerpo de la solicitud.

Ejemplo de uso con curl:

```bash
curl -X POST -F "image=@/ruta/a/tu/imagen.png" http://localhost:3000/print
```
## Detalles sobre el submódulo catprinter
El submódulo catprinter contiene los scripts de Python que interactúan directamente con la impresora. Estos scripts son responsables de manejar la conexión Bluetooth con la impresora y de aplicar efectos de dithering en las imágenes antes de enviarlas para impresión.


### Submódulo catprinter
El submódulo se encuentra en el directorio `/child`. Puedes acceder a su repositorio original en `https://github.com/rbaron/catprinter`. Asegúrate de mantenerlo actualizado y sincronizado con el resto del proyecto ejecutando el siguiente comando:

```bash
git submodule update --remote
```
Esto descargará cualquier cambio nuevo realizado en el submódulo desde su repositorio original.

## Estructura del Proyecto
```plaintext
Printer-Manager/
│
├── child/                # Submódulo `catprinter` con los scripts de Python
│   ├── catprinter/       # Archivos de `catprinter`
│   ├── media/            # Archivos multimedia
│   ├── temp/             # Archivos temporales de impresión
│   ├── print.py          # Script principal de impresión
│   ├── requirements.txt  # Dependencias de Python
│   ├── setup.cfg         # Configuración para el entorno de Python
│
├── routes/               # Archivos de rutas de la aplicación Express
│   ├── healthCheck.js    # Endpoint de verificación del servicio
│   ├── index.js          # Ruta principal
│   ├── print.js          # Ruta para manejar las solicitudes de impresión
│
├── services/             # Lógica de negocio
│   ├── printService.js   # Servicio de impresión
│
├── .env                  # Variables de entorno
├── .gitignore            # Archivos y carpetas ignoradas por Git
├── .gitmodules           # Configuración de submódulos de Git
├── package.json          # Dependencias de Node.js
├── package-lock.json     # Bloqueo de versiones de Node.js
├── server.js             # Configuración y arranque del servidor
└── README.md             # Este archivo
```
## Contribuir
Si deseas contribuir a este proyecto, por favor realiza un fork del repositorio, realiza los cambios deseados y crea un pull request. Asegúrate de seguir el flujo de trabajo de Git para mantener la integridad del código.

## Licencia
Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.