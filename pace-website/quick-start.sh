#!/bin/bash

echo "🚀 Pace - AI Track & Field Coach - Quick Start"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "📋 Installing dependencies..."
pnpm install

echo "🔧 Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Environment file created (.env)"
fi

echo ""
echo "🎉 Setup complete! To start the application:"
echo ""
echo "   pnpm run dev"
echo ""
echo "Then open your browser to: http://localhost:5173"
echo ""
echo "📖 For detailed instructions, see LOCAL_SETUP_GUIDE.md"
