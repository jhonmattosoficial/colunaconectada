# Skills instaladas para este projeto

Stack de **10 skills do Claude Code** que cobrem design intelligence, animações React, animações JS clássicas, scroll experiences, motion physics e padrões de componentes prontos. Todas estão instaladas globalmente em `~/.claude/skills/` e são **auto-ativadas** pelo Claude quando o pedido do usuário cruza com as keywords descritas em cada `SKILL.md`.

> Este documento é instrução para outra instância do Claude Code reproduzir exatamente o mesmo ambiente. Cada bloco de código abaixo pode ser copiado e executado verbatim.

---

## Skills instaladas

| # | Skill | Origem | Pra que serve |
|---|---|---|---|
| 1 | **ui-ux-pro-max** | npm `uipro-cli` | Reasoning engine de design (67 estilos, 96 paletas, 57 pares de fontes, 161 regras por indústria). Gera design system completo a partir de descrição do produto. |
| 2 | **motion-framer** | `freshtechbro/claudedesignskills` | Framer Motion 11 — componentes motion, variants, gestures, AnimatePresence, layout animations, spring physics, hooks (useAnimate, useSpring, useInView). |
| 3 | **gsap-scrolltrigger** | `freshtechbro/claudedesignskills` | GSAP + ScrollTrigger pra timelines avançadas, pin/scrub, parallax, scroll-driven animations em DOM/SVG/Canvas/Three.js. |
| 4 | **locomotive-scroll** | `freshtechbro/claudedesignskills` | Smooth scroll cinematic + parallax + viewport detection. Integra com GSAP ScrollTrigger. |
| 5 | **scroll-reveal-libraries** | `freshtechbro/claudedesignskills` | AOS (Animate On Scroll) — reveals fade/slide simples ao entrar na viewport. Alternativa leve ao GSAP pra LPs. |
| 6 | **lottie-animations** | `freshtechbro/claudedesignskills` | Lottie / dotLottie / bodymovin — renderização de JSON exportado do After Effects. Animações vetoriais interativas. |
| 7 | **react-spring-physics** | `freshtechbro/claudedesignskills` | React Spring + Popmotion — física de spring/inertia, gestures, animações compostas. Alternativa física ao motion-framer. |
| 8 | **animated-component-libraries** | `freshtechbro/claudedesignskills` | Magic UI (150+ componentes TS/Tailwind/Motion) + React Bits (90+ componentes). Padrões prontos pra landing/marketing. |
| 9 | **modern-web-design** | `freshtechbro/claudedesignskills` | Tendências e princípios 2024-2025 — micro-interactions, scrollytelling, glassmorphism, bento, accessibility, performance. |
| 10 | **lightweight-3d-effects** | `freshtechbro/claudedesignskills` | Zdog + Vanta.js + Vanilla-Tilt — 3D decorativo sem framework pesado. Hero backgrounds, parallax tilt, card 3D. |

---

## Pré-requisitos

```bash
node --version    # ≥ 18.x
npm --version     # ≥ 9.x
python --version  # ≥ 3.x  (necessário pro reasoning engine do ui-ux-pro-max)
git --version     # qualquer versão moderna
```

No Windows: instale Python via `winget install Python.Python.3.12` se não tiver.

---

## Instalação completa (one-shot)

Cole no terminal (Git Bash no Windows, ou bash/zsh no macOS/Linux):

```bash
# 1) ui-ux-pro-max via CLI oficial
npm install -g uipro-cli
cd ~ && uipro init --ai claude

# 2) As 9 skills do claudedesignskills via sparse-checkout
mkdir -p /tmp/cds-clone && cd /tmp/cds-clone
git init -q
git remote add origin https://github.com/freshtechbro/claudedesignskills.git
git sparse-checkout init --cone
git sparse-checkout set \
  .claude/skills/motion-framer \
  .claude/skills/gsap-scrolltrigger \
  .claude/skills/locomotive-scroll \
  .claude/skills/scroll-reveal-libraries \
  .claude/skills/lottie-animations \
  .claude/skills/react-spring-physics \
  .claude/skills/animated-component-libraries \
  .claude/skills/modern-web-design \
  .claude/skills/lightweight-3d-effects
git pull --depth=1 origin main

# 3) Copia tudo pra ~/.claude/skills/
for skill in motion-framer gsap-scrolltrigger locomotive-scroll scroll-reveal-libraries \
             lottie-animations react-spring-physics animated-component-libraries \
             modern-web-design lightweight-3d-effects; do
  cp -r "/tmp/cds-clone/.claude/skills/$skill" ~/.claude/skills/
done

# 4) Limpeza
rm -rf /tmp/cds-clone

# 5) Verificação
ls ~/.claude/skills/
```

Saída esperada de `ls ~/.claude/skills/`:
```
animated-component-libraries
gsap-scrolltrigger
lightweight-3d-effects
locomotive-scroll
lottie-animations
modern-web-design
motion-framer
react-spring-physics
scroll-reveal-libraries
ui-ux-pro-max
```

**Reinicie o Claude Code** depois de instalar pra que as skills sejam carregadas.

---

## Instalação individual (passo a passo)

### 1) ui-ux-pro-max

```bash
npm install -g uipro-cli
cd ~
uipro init --ai claude
```

> Truque: rodar a partir de `~` faz o CLI criar a skill em `~/.claude/skills/ui-ux-pro-max/` (global). O CLI atual (v2.2.3) não tem flag `--global` direto.

Verificação:
```bash
ls ~/.claude/skills/ui-ux-pro-max/
# Esperado: SKILL.md  data/  scripts/

# Smoke test do reasoning engine
python "$HOME/.claude/skills/ui-ux-pro-max/scripts/search.py" "saas dashboard" --domain style | head -10
```

### 2-10) Skills do claudedesignskills

Sparse-checkout pega apenas as 9 pastas que precisamos (sem baixar o repo inteiro de ~150MB):

```bash
mkdir -p /tmp/cds && cd /tmp/cds
git init -q
git remote add origin https://github.com/freshtechbro/claudedesignskills.git
git sparse-checkout init --cone
git sparse-checkout set \
  .claude/skills/motion-framer \
  .claude/skills/gsap-scrolltrigger \
  .claude/skills/locomotive-scroll \
  .claude/skills/scroll-reveal-libraries \
  .claude/skills/lottie-animations \
  .claude/skills/react-spring-physics \
  .claude/skills/animated-component-libraries \
  .claude/skills/modern-web-design \
  .claude/skills/lightweight-3d-effects
git pull --depth=1 origin main
```

Depois copie cada uma:
```bash
for s in motion-framer gsap-scrolltrigger locomotive-scroll scroll-reveal-libraries \
         lottie-animations react-spring-physics animated-component-libraries \
         modern-web-design lightweight-3d-effects; do
  cp -r "/tmp/cds/.claude/skills/$s" ~/.claude/skills/
done
rm -rf /tmp/cds
```

---

## Skills do mesmo repo que **NÃO** foram instaladas (e por quê)

O repo `freshtechbro/claudedesignskills` tem 23 skills. As 14 abaixo foram excluídas de propósito por **não trazerem ROI** pra LPs/sites marketing (são 3D pesado ou redundantes com o que já temos):

| Skill | Por que ficou de fora |
|---|---|
| `aframe-webxr` | VR/AR — fora do escopo |
| `babylonjs-engine` | 3D engine pesada |
| `barba-js` | Page transitions em multi-page (LPs são single page) |
| `blender-web-pipeline` | Pipeline 3D profissional |
| `playcanvas-engine` | Game engine |
| `react-three-fiber` | R3F é heavy + lightweight-3d-effects cobre o caso comum |
| `rive-interactive` | Editor proprietário, curva de aprendizado alta |
| `spline-interactive` | Editor proprietário |
| `substance-3d-texturing` | Texturing 3D |
| `threejs-webgl` | Three.js puro — pesado pra LPs |
| `pixijs-2d` | Canvas 2D engine — overkill pra LPs |
| `web3d-integration-patterns` | Patterns 3D — fora de escopo |
| `animejs` | Sobreposição com Framer Motion |
| `skill-creator` | Meta-tool de criação |

Se um projeto futuro precisar de 3D real (Three.js, R3F, Babylon), use o mesmo padrão de sparse-checkout pra adicionar.

---

## Como as skills funcionam no Claude Code

Todas estas skills são **auto-ativadas**: você não precisa chamar com `/nome-da-skill`. O Claude detecta keywords no pedido do usuário e carrega o conteúdo do `SKILL.md` no contexto automaticamente.

Exemplos de pedidos que ativam cada uma:

| Pedido do usuário | Skill que ativa |
|---|---|
| "crie um design system pra clínica médica" | ui-ux-pro-max |
| "anime esses cards com Framer Motion" | motion-framer |
| "faça um scroll horizontal com pin" | gsap-scrolltrigger |
| "implemente smooth scroll cinematográfico" | locomotive-scroll |
| "fade nos elementos ao entrar na viewport" | scroll-reveal-libraries |
| "adicione uma animação Lottie no hero" | lottie-animations |
| "use física de spring pra esse drag" | react-spring-physics |
| "preciso de um marquee infinito + cards animados" | animated-component-libraries |
| "qual o melhor estilo pra essa SaaS em 2025?" | modern-web-design |
| "card com tilt 3D e fundo Vanta" | lightweight-3d-effects |

Para confirmar se uma skill está ativa numa sessão, o Claude pode rodar:
```bash
ls ~/.claude/skills/<nome-da-skill>/SKILL.md
head -3 ~/.claude/skills/<nome-da-skill>/SKILL.md
```

---

## Comandos úteis pós-instalação

### Atualizar todas as skills

Re-rode o sparse-checkout pra puxar as últimas versões:
```bash
mkdir -p /tmp/cds-update && cd /tmp/cds-update
git init -q
git remote add origin https://github.com/freshtechbro/claudedesignskills.git
git sparse-checkout init --cone
git sparse-checkout set $(ls ~/.claude/skills/ | grep -v ui-ux-pro-max | sed 's|^|.claude/skills/|')
git pull --depth=1 origin main
# Substitui as instaladas
for s in $(ls /tmp/cds-update/.claude/skills/); do
  rm -rf "$HOME/.claude/skills/$s"
  cp -r "/tmp/cds-update/.claude/skills/$s" "$HOME/.claude/skills/"
done
rm -rf /tmp/cds-update
```

Pra ui-ux-pro-max:
```bash
npm install -g uipro-cli@latest
cd ~ && uipro update
```

### Remover uma skill

```bash
rm -rf ~/.claude/skills/<nome-da-skill>
```

### Listar tamanho ocupado

```bash
du -sh ~/.claude/skills/*
```

---

## Troubleshooting

### `uipro init` falha no Windows
O CLI tenta baixar binários auxiliares que às vezes não estão disponíveis. Reinstale forçando rede limpa:
```bash
npm cache clean --force
npm install -g uipro-cli --no-optional
```

### Skill não aparece após instalação
**Reinicie o Claude Code**. Skills são lidas no startup.

### Python não encontrado
O reasoning engine do ui-ux-pro-max precisa de Python 3.x. Instale:
- Windows: `winget install Python.Python.3.12`
- macOS: `brew install python3`
- Linux: `sudo apt install python3`

### Sparse-checkout não funciona
Pode estar em versão antiga do Git (< 2.25). Atualize:
- Windows: baixe o instalador em https://git-scm.com
- macOS: `brew upgrade git`
- Linux: `sudo apt update && sudo apt install git`

---

## Localização dos arquivos de configuração

| Arquivo | Conteúdo |
|---|---|
| `~/.claude/skills/` | Diretório global de skills (todas as 10 ficam aqui) |
| `~/.claude.json` | Config geral do Claude Code (MCP servers, permissions, projetos) |
| `~/.claude/settings.json` | Settings opcionais (theme, hooks) |
| Project `.claude/skills/` | Override por projeto (não usado aqui — tudo global) |
