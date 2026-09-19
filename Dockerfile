FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./