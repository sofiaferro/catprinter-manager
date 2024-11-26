# Base image with Node.js 18
FROM node:18

# Install Python and required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    bluetooth \
    bluez \
    # OpenCV dependencies
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package files for Node.js
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the Node.js application
COPY . .

# Set up Python virtual environment and install dependencies
WORKDIR /usr/src/app/child
RUN python3 -m venv venv && \
    . venv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

# Return to app root
WORKDIR /usr/src/app

# Set Python path to use the virtual environment
ENV VIRTUAL_ENV=/usr/src/app/child/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PYTHONPATH=/usr/src/app/child

# Expose the port your app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]