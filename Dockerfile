# --- STAGE 1: Build & Install Dependencies ---
FROM node:24-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building if needed)
RUN npm ci

# Copy the rest of the application source code
COPY . .