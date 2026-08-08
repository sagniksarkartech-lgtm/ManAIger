#!/usr/bin/env bash
# ==============================================================================
# MANAIGER — Production Build & Setup Script for Hackathon Evaluation
# Target Platforms: Linux / macOS / WSL / Git Bash (Windows)
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Colored Terminal Output Formatting
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}==============================================================================${NC}"
echo -e "${CYAN} 🚀  MANAIGER — Production Build & Setup Sequence                         ${NC}"
echo -e "${CYAN}==============================================================================${NC}"

# ------------------------------------------------------------------------------
# STEP 1: Environment & Prerequisites Check
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[STEP 1/5] Checking System Environment & Prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed or not in PATH.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ Error: npm is not installed or not in PATH.${NC}"
    exit 1
fi

NODE_VER=$(node -v)
NPM_VER=$(npm -v)
echo -e "${GREEN}  ✓ Node.js version: ${NODE_VER}${NC}"
echo -e "${GREEN}  ✓ NPM version:     ${NPM_VER}${NC}"

PYTHON_CMD=""
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo -e "${RED}❌ Error: Python 3 is not installed or not in PATH.${NC}"
    exit 1
fi

PY_VER=$($PYTHON_CMD --version)
echo -e "${GREEN}  ✓ Python version:  ${PY_VER}${NC}"

# ------------------------------------------------------------------------------
# STEP 2: Environment File Setup
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[STEP 2/5] Setting up Environment Configurations...${NC}"

if [ -f "backend/.env" ]; then
    echo -e "${GREEN}  ✓ Found backend/.env configuration file.${NC}"
elif [ -f "backend/.env.example" ]; then
    echo -e "${YELLOW}  ! backend/.env not found. Creating backend/.env from backend/.env.example...${NC}"
    cp backend/.env.example backend/.env
    echo -e "${GREEN}  ✓ Created backend/.env successfully.${NC}"
else
    echo -e "${YELLOW}  ! Warning: backend/.env template missing. Backend will run with default fallback environment.${NC}"
fi

# ------------------------------------------------------------------------------
# STEP 3: Frontend Build (React + TypeScript + Vite)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[STEP 3/5] Building Production React Frontend...${NC}"

echo -e "  📥 Installing Frontend NPM Dependencies..."
npm install --quiet

echo -e "  🔍 Running TypeScript Type Checker..."
npx tsc -b

echo -e "  ⚡ Compiling Production Assets with Vite..."
npm run build

echo -e "${GREEN}  ✓ Frontend build completed! Bundle generated in ./dist${NC}"

# ------------------------------------------------------------------------------
# STEP 4: Backend Setup (FastAPI Python Environment)
# ------------------------------------------------------------------------------
echo -e "\n${YELLOW}[STEP 4/5] Setting up Backend Python Dependencies...${NC}"

if [ -d "backend" ]; then
    cd backend
    
    # Create virtual environment if missing
    if [ ! -d "venv" ]; then
        echo -e "  🔨 Creating Python virtual environment (backend/venv)..."
        $PYTHON_CMD -m venv venv
    fi

    # Activate Virtualenv
    if [ -f "venv/bin/activate" ]; then
        source venv/bin/activate
    elif [ -f "venv/Scripts/activate" ]; then
        source venv/Scripts/activate
    fi

    echo -e "  📥 Installing Python backend dependencies from requirements.txt..."
    pip install --upgrade pip --quiet
    pip install -r requirements.txt --quiet

    cd ..
    echo -e "${GREEN}  ✓ Backend Python environment ready!${NC}"
else
    echo -e "${RED}❌ Directory ./backend not found! Skipping backend step.${NC}"
fi

# ------------------------------------------------------------------------------
# STEP 5: Verification & Launch Instructions for Judges
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}==============================================================================${NC}"
echo -e "${GREEN}  🎉  BUILD COMPLETED SUCCESSFULLY!                                      ${NC}"
echo -e "${CYAN}==============================================================================${NC}"
echo -e "  📌  Artifacts Location:"
echo -e "      • Frontend Production Bundle : ./dist"
echo -e "      • Backend Virtual Environment: ./backend/venv"
echo -e ""
echo -e "  🚀  How to Launch MANAIGER for Judging/Testing:"
echo -e "      1. Option A (Dual Server Launcher - Linux/macOS/WSL):"
echo -e "         $ chmod +x start.sh && ./start.sh"
echo -e ""
echo -e "      2. Option B (Docker One-Command Launch):"
echo -e "         $ docker compose up -d"
echo -e ""
echo -e "      3. Option C (Manual Launch):"
echo -e "         • Backend  : cd backend && uvicorn app.main:app --port 8000"
echo -e "         • Frontend : npm run preview"
echo -e ""
echo -e "  🌐 Access Points:"
echo -e "      • Frontend UI       : http://localhost:5173"
echo -e "      • FastAPI Docs (API): http://localhost:8000/docs"
echo -e "${CYAN}==============================================================================${NC}"
