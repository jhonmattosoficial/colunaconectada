#!/usr/bin/env bash
# Re-deploy do site pra Hostinger.
#
# Como funciona:
# 1. Build estático do Next (web/out)
# 2. Subtree split do web/out → branch 'deploy'
# 3. Push da branch deploy --force pro GitHub
# 4. Você clica "Reimplantar" no painel da Hostinger
#    (ou se ativar Auto Deploy, ela faz sozinha em segundos)
#
# Pré-requisitos:
# - Estar na branch main (ou outra que tenha as últimas mudanças mergeadas)
# - npm install já rodado em web/
#
# Uso:
#   ./deploy.sh

set -e

# Cores pro output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ROOT_DIR=$(cd "$(dirname "$0")" && pwd)
cd "$ROOT_DIR"

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}  Deploy → Hostinger (via branch deploy)${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# 1) Confere se está em main (avisa se não)
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${YELLOW}⚠ Aviso: você está na branch '$CURRENT_BRANCH', não em 'main'.${NC}"
  read -p "Continuar mesmo assim? (s/N) " -n 1 -r
  echo
  [[ ! $REPLY =~ ^[Ss]$ ]] && exit 1
fi

# 2) Confere se há mudanças não commitadas em web/
if ! git diff --quiet web/src web/public web/next.config.mjs web/tailwind.config.ts 2>/dev/null; then
  echo -e "${RED}✗ Existem mudanças não commitadas em web/. Commite primeiro.${NC}"
  git status --short web/ | head -10
  exit 1
fi

# 3) Build do Next
echo -e "\n${GREEN}▶ Build estático (npm run build)...${NC}"
cd web
npm run build
cd "$ROOT_DIR"

# 4) Verifica se /out foi gerado
if [ ! -d "web/out" ]; then
  echo -e "${RED}✗ Build não gerou web/out. Algo deu errado.${NC}"
  exit 1
fi

OUT_SIZE=$(du -sh web/out | cut -f1)
echo -e "${GREEN}✓ Build OK — web/out = $OUT_SIZE${NC}"

# 5) Adiciona /out no commit (caso .gitignore tenha bloqueado)
echo -e "\n${GREEN}▶ Garantindo que /out está no main...${NC}"
git add -f web/out
if ! git diff --cached --quiet 2>/dev/null; then
  git commit -m "build: regenera web/out pra deploy"
  git push origin main
  echo -e "${GREEN}✓ Main atualizado com novo build${NC}"
else
  echo -e "${GREEN}✓ /out já está no main, sem mudanças${NC}"
fi

# 6) Subtree split + push pra branch deploy
echo -e "\n${GREEN}▶ Atualizando branch 'deploy' (subtree split)...${NC}"
git branch -D deploy 2>/dev/null || true
git subtree split --prefix=web/out -b deploy
git push origin deploy --force

# 7) Limpa
git checkout main

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ✓ Deploy pronto.${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo
echo -e "${YELLOW}Próximo passo:${NC}"
echo "  1. Vai no hPanel da Hostinger → Painel do site → Git"
echo "  2. Click 'Reimplantar' (a branch já está apontando pra 'deploy')"
echo "  3. Aguarda 30s → site no ar em https://colunaconectada.com.br"
echo
