#!/bin/bash

# Script untuk deployment ke cPanel via SSH
# Cara menggunakan: ./deploy.sh

echo "🚀 Starting deployment to cPanel..."

# Konfigurasi - SESUAIKAN DENGAN SERVER ANDA
SERVER_USER="your-cpanel-username"
SERVER_HOST="yourdomain.com"
SERVER_PATH="~/public_html/pkbm"
SSH_KEY="~/.ssh/id_rsa"  # Optional: path ke SSH key

# Warna untuk output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📦 Building application locally...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Please fix errors before deploying.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

echo -e "${YELLOW}📤 Uploading files to server...${NC}"

# Sync files ke server (exclude node_modules, .git, dll)
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.next' \
    --exclude 'data/' \
    --exclude '.env' \
    --exclude '*.log' \
    -e "ssh -i $SSH_KEY" \
    ./ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Upload failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Files uploaded successfully!${NC}"

echo -e "${YELLOW}🔧 Installing dependencies on server...${NC}"

# SSH ke server dan jalankan commands
ssh -i $SSH_KEY $SERVER_USER@$SERVER_HOST << 'ENDSSH'
cd ~/public_html/pkbm

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Build Next.js
echo "Building Next.js..."
npm run build

# Create logs directory if not exists
mkdir -p logs

echo "✅ Server setup complete!"
ENDSSH

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Server setup failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment successful!${NC}"
echo -e "${YELLOW}⚠️  Don't forget to:${NC}"
echo "   1. Restart Node.js app di cPanel"
echo "   2. Check .env file di server"
echo "   3. Verify database connection"
echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
