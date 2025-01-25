# Catprinter Manager

A comprehensive printer management application for sending images to a thermal printer using the `catprinter` submodule, with added keep-awake functionality.

## Key Features

- Image queue management
- Bluetooth printer interaction
- Automatic keep-awake mechanism to prevent printer sleep mode
- Flexible image processing

## System Requirements

- **Node.js** (v18+)
- **Python** (v3.11.0)
- `catprinter` **submodule dependencies**
- **Bluetooth enabled device**

## Installation

### 1. Clone Repository

```bash
git clone --recurse-submodules https://github.com/sofiaferro/catprinter-manager.git
cd catprinter-manager
```

### 2. Setup Dependencies

```bash
# Install Node.js dependencies
npm install

# Setup Python virtual environment
cd child
python3 -m venv venv
source venv/bin/activate  # Linux/MacOS
# venv\Scripts\activate.bat  # Windows

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Printer Configuration

Ensure Bluetooth is configured and the printer is connected.

#### Running the Application

```bash
npm start
```

The application runs on `localhost:8080` by default.

#### Keep-Awake Functionality

The manager includes an optional keep-awake mechanism to prevent printer sleep mode:

```bash
# Run with keep-awake enabled
node server.js --keep-awake
```

When enabled, the application sends periodic dummy commands to maintain printer activity.

### 4. Image Upload 

Upload images via POST request:

```bash
curl -X POST -F "image=@/path/to/image.png" http://localhost:8080/print
```


## Project Structure
```plaintext
catprinter-manager/
│
├── child/                # Catprinter submodule
├── routes/               # Express route handlers
├── services/             # Business logic
│   └── scheduleKeepAwake.js  # Keep-awake service
├── server.js             # Server configuration
└── README.md
```

## Contribuir
1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License