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

# --- STAGE 2: Production Runtime ---
FROM node:22-alpine AS runner

# Set environment to production
ENV NODE_ENV=production

WORKDIR /app

# Copy only the compiled code/source and production dependencies from the builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app . 

# Clean up devDependencies to keep the image slim
RUN npm prune --production

# Expose the port your app runs on
EXPOSE 3000

# Run the app directly with node instead of npm for better signal handling
CMD ["node", "src/index.js"]