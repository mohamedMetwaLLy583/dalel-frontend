#!/bin/bash
# ============================================
# Dalel Full Stack - Docker Setup Script
# ============================================

set -e

echo "========================================"
echo "  Dalel Full Stack - Docker Setup"
echo "========================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo -e "${RED}Docker Compose is not available. Please install it.${NC}"
    exit 1
fi

echo -e "${GREEN}Docker and Docker Compose found.${NC}"

# Step 1: Clone repositories if not exists
echo ""
echo -e "${YELLOW}Step 1: Checking repositories...${NC}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PARENT_DIR="$(dirname "$PROJECT_DIR")"

if [ ! -d "$PARENT_DIR/dalelgwaa-backend" ]; then
    echo "Cloning backend repository..."
    git clone https://github.com/mohamedMetwaLLy583/dalelgwaa-backend.git "$PARENT_DIR/dalelgwaa-backend"
else
    echo -e "${GREEN}Backend repository found.${NC}"
fi

if [ ! -d "$PARENT_DIR/dalel-dashboard" ]; then
    echo "Cloning dashboard repository..."
    git clone https://github.com/mohamedMetwaLLy583/dalel-dashboard.git "$PARENT_DIR/dalel-dashboard"
else
    echo -e "${GREEN}Dashboard repository found.${NC}"
fi

# Step 2: Copy Docker files to backend
echo ""
echo -e "${YELLOW}Step 2: Setting up Docker files...${NC}"

mkdir -p "$PARENT_DIR/dalelgwaa-backend/docker"
cp "$SCRIPT_DIR/backend/Dockerfile" "$PARENT_DIR/dalelgwaa-backend/docker/Dockerfile"
cp "$SCRIPT_DIR/backend/nginx.conf" "$PARENT_DIR/dalelgwaa-backend/docker/nginx.conf"
cp "$SCRIPT_DIR/backend/supervisord.conf" "$PARENT_DIR/dalelgwaa-backend/docker/supervisord.conf"

mkdir -p "$PARENT_DIR/dalel-dashboard/docker"
cp "$SCRIPT_DIR/dashboard/Dockerfile" "$PARENT_DIR/dalel-dashboard/docker/Dockerfile"

echo -e "${GREEN}Docker files copied.${NC}"

# Step 3: Setup .env file
echo ""
echo -e "${YELLOW}Step 3: Setting up environment...${NC}"

if [ ! -f "$PROJECT_DIR/.env" ]; then
    cp "$PROJECT_DIR/.env.docker" "$PROJECT_DIR/.env"
    echo -e "${GREEN}.env file created from .env.docker${NC}"
    echo -e "${YELLOW}Please edit .env file with your passwords before continuing.${NC}"
else
    echo -e "${GREEN}.env file already exists.${NC}"
fi

# Step 4: Build and start
echo ""
echo -e "${YELLOW}Step 4: Building and starting containers...${NC}"
echo "This may take several minutes on first run..."

cd "$PROJECT_DIR"
docker compose up -d --build

# Step 5: Wait for MySQL to be ready
echo ""
echo -e "${YELLOW}Step 5: Waiting for MySQL to be ready...${NC}"
sleep 10

# Step 6: Run Laravel migrations
echo ""
echo -e "${YELLOW}Step 6: Running database migrations...${NC}"
docker exec dalel-backend php artisan migrate --force
docker exec dalel-backend php artisan storage:link

# Step 7: Generate app key if needed
echo ""
echo -e "${YELLOW}Step 7: Generating Laravel app key...${NC}"
docker exec dalel-backend php artisan key:generate --force

echo ""
echo "========================================"
echo -e "${GREEN}  Setup Complete!${NC}"
echo "========================================"
echo ""
echo "  Frontend:    http://localhost:3000"
echo "  Dashboard:   http://localhost:3001"
echo "  Backend:     http://localhost:8000"
echo "  phpMyAdmin:  http://localhost:8080"
echo ""
echo "  Database: dalel_user / (check .env)"
echo ""
echo "========================================"
