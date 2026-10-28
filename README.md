# EoSamKkkj — Portfólio (Motion Designer)

Site de portfólio construído em Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Como rodar localmente

Pré-requisito: Node.js 18.18 ou mais recente.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Publicar (Vercel)

1. Suba esta pasta para um repositório no GitHub (ou GitLab/Bitbucket).
2. Em https://vercel.com, clique em "New Project" e importe o repositório.
3. Não é preciso configurar nada — a Vercel detecta o Next.js automaticamente.
4. Clique em "Deploy".

## Como o site é organizado agora

O site é uma página única com rolagem: em vez de quatro páginas separadas, existe uma página central (`app/page.tsx`) que empilha as quatro seções — Início, Projetos, Sobre mim e Preços — uma embaixo da outra. A pessoa pode simplesmente rolar para baixo e ver cada uma aparecer com uma transição suave, ou usar o menu no topo para pular direto para qualquer seção (a rolagem é suave e o item ativo no menu se atualiza sozinho conforme a rolagem passa por cada seção).

Links antigos como `/projetos`, `/sobre` e `/precos` continuam funcionando — eles redirecionam automaticamente para a seção correspondente na página única, então nenhum link que você já tenha compartilhado quebra.

## O que editar

Praticamente tudo que muda com frequência fica em `config/` e `data/` — não é necessário mexer nos componentes.

### `config/site.ts`
- WhatsApp oficial (`phone` e `display`).
- Links do Instagram, TikTok e YouTube — já preenchidos com as suas contas. Se algum ficar vazio (`""`), o ícone correspondente some do rodapé automaticamente.
- Nome, título e descrição usados no `<title>` e no SEO.
- `nav`: os itens do menu — cada um aponta para o `id` da seção correspondente (`#inicio`, `#projetos`, `#sobre`, `#precos`). Só mude aqui se quiser renomear um item do menu.

### Painel (`/admin`) — vídeos, seções, preços e perguntas

Tudo que muda com frequência é editado pelo painel, sem mexer em código:
abra `https://SEU-SITE/admin`, entre com a senha e use as abas:

- **Vídeos:** adicionar vídeo (colando link do Vimeo/YouTube ou enviando o
  arquivo MP4/MOV/WEBM direto), escolher a seção, categoria, duração e se
  aparece no início; criar, renomear, reordenar e apagar seções do
  portfólio (Básico, Intermediário, ou qualquer nova).
- **Preços:** criar, duplicar, editar, reordenar e apagar pacotes; destacar
  um pacote e colocar selo ("Mais escolhido", "Novo"...). Se a mensagem do
  WhatsApp ficar vazia, ela é gerada com o nome e o preço do pacote.
- **Perguntas:** o FAQ da seção Preços.

Clique em **Publicar** e o site atualiza na hora (sem novo deploy).

O conteúdo publicado fica no **Vercel Blob** (pasta `site-content/`, com as
10 últimas versões como histórico) e os vídeos enviados em `portfolio/`. O
conteúdo inicial, usado antes da primeira publicação, está em
`lib/content-defaults.ts`.

**Configuração (uma vez só, no Vercel → projeto):**
1. **Storage → Create Database → Blob** e conectar ao projeto (isso cria a
   variável `BLOB_READ_WRITE_TOKEN` sozinho).
2. **Settings → Environment Variables:** criar `ADMIN_PASSWORD` com a senha do
   painel. (Opcional: `ADMIN_SESSION_SECRET` com um texto aleatório longo.)
3. Fazer um novo deploy (Deployments → ⋯ → Redeploy).

Para testar o painel no computador, crie um arquivo `.env.local` com
`ADMIN_PASSWORD=uma-senha-de-teste` (ele não vai para o GitHub).

### `data/prices.ts`
Só as opções do configurador "Monte seu projeto" (duração, nível, narração,
efeitos). Pacotes e FAQ agora ficam no painel.

### `data/tools.ts`
As três ferramentas exibidas em "Sobre mim" (Figma, After Effects, Premiere Pro) e as cinco etapas do processo.

## Assets que faltam

O site já funciona sem eles (com placeholders elegantes), mas fica mais completo quando você adicionar:

- **Foto do Sam:** salve em `public/images/sam.webp`. A seção "Sobre mim" detecta automaticamente se o arquivo existe; enquanto não existir, mostra a sua logo em destaque no lugar da foto.
- **Logo em vetor (opcional):** hoje `public/logo/logo.png` e `public/logo/logo-white.png` são PNGs extraídos da arte que você enviou. Se um dia tiver os arquivos `.svg` originais, é só substituir os PNGs pelos SVGs com o mesmo nome — nenhum componente precisa mudar.

## Estrutura

```
app/
  layout.tsx           Fontes, metadata/SEO, header/footer/fundo animado globais
  page.tsx              Página única — empilha as 4 seções abaixo
  projetos/page.tsx     Redireciona /projetos → /#projetos (links antigos continuam ativos)
  sobre/page.tsx        Redireciona /sobre → /#sobre
  precos/page.tsx       Redireciona /precos → /#precos

sections/              As 4 seções da página única (Início, Projetos, Sobre, Preços)
components/            Todos os blocos de UI reutilizáveis
data/                  Conteúdo editável (portfólio, preços, ferramentas)
config/site.ts         WhatsApp, redes sociais, itens do menu
lib/                   Helpers (link de WhatsApp, embed do Vimeo, menu ativo por rolagem)
public/
  logo/                 Logo oficial (png)
  images/               Foto do Sam (adicionar sam.webp)
  portfolio/            Reservado para uso futuro
```

## Detalhes técnicos

- Vídeos: o preview ao passar o mouse usa o modo "background" do próprio player do Vimeo (sem áudio, sem controles); só um vídeo toca por vez e ele para assim que o mouse sai do card. No celular, o toque abre direto o modal com o player completo.
- Cursor customizado e efeito magnético nos botões: só aparecem em telas com mouse (`hover: hover`) e são desativados automaticamente se o usuário tiver "reduzir movimento" ativado no sistema.
- Transição entre seções: cada seção (Início, Projetos, Sobre, Preços) surge com um leve efeito de "salto" suave (mola/bounce) — sobe e assenta com uma leve elasticidade enquanto ganha nitidez e opacidade — conforme entra na tela ao rolar; é o `components/SectionReveal.tsx` e `components/RevealText.tsx`. Clicar em um item do menu (no topo ou no menu mobile) dispara uma transição em tela cheia — uma camada verde cobre a tela, troca a posição de rolagem por baixo, e revela a seção de destino — dando a sensação de "troca de tela" mesmo sendo uma página única; é o `goToSection` dentro de `components/Header.tsx`.
- Menu: no celular, abre em tela cheia com uma transição em círculo a partir do próprio botão, os itens entram com leve atraso entre um e outro, e o ícone de menu se transforma suavemente em "X". O item ativo do menu (embaixo, no cabeçalho) é atualizado automaticamente conforme a seção visível na tela — é o `lib/useActiveSection.ts`.
- Fundo animado: em toda a página, algumas formas verdes bem suaves (opacidade baixíssima, bastante desfocadas) se movem devagar em loop atrás do conteúdo — é o `components/AmbientBackground.tsx`. Para mudar a velocidade, o tamanho ou a intensidade, edite os valores de `duration` e `opacity-[...]` nesse arquivo.
- GIFs de fundo: as seções Início, Sobre e Preços também têm um GIF seu tocando em loop bem discreto atrás do conteúdo (opacidade baixa, com um filtro de cor que puxa pro verde da marca) — é o `components/BackgroundLoop.tsx`, e os arquivos ficam em `public/backgrounds/`. Para trocar qual GIF aparece em cada seção, basta substituir o arquivo correspondente (`bg-inicio.gif`, `bg-sobre.gif`, `bg-precos.gif`) mantendo o mesmo nome, ou apontar para outro arquivo no `src` do `<BackgroundLoop />` dentro de cada seção em `sections/`. Deixei de fora a seção Projetos de propósito, já que ela já é bem cheia visualmente (vídeos, thumbnails, filtros). Um detalhe técnico: como é um GIF (não CSS), a configuração "reduzir movimento" do sistema não consegue pausá-lo — se isso for uma preocupação, a alternativa é converter para vídeo (`.webm`/`.mp4`) mudo, que já respeitaria essa preferência.
- Destaque "premium": os dados mais importantes de cada pacote (duração, prazo e a descrição do que o diferencia) e a narração usam a classe `.shine`, definida em `app/globals.css` — um texto em degradê verde com um brilho suave e contínuo. Para ajustar a velocidade do brilho, mude a duração da animação `shine` nesse arquivo.
- Acessibilidade: navegação por teclado, foco visível, `aria-label`s nos botões de ícone, ESC fecha o modal de vídeo e o menu mobile, e todo o site respeita `prefers-reduced-motion` (inclusive as transições de seção, o menu e o brilho premium são simplificados automaticamente nesse caso).
- Tipografia: a fonte principal é a SF Pro — o navegador usa a do próprio aparelho (iPhone, iPad, Mac, ou computador onde ela estiver instalada), já que a licença da Apple não permite hospedar o arquivo. Onde ela não existe, entra a Inter (carregada via Google Fonts em `app/layout.tsx`), a alternativa mais parecida. A JetBrains Mono fica nos rótulos técnicos, tipo os "timecodes".
- Interações: rastro de keyframes (losangos do After Effects) seguindo o mouse/dedo e explosão a cada clique (`components/PointerFx.tsx`), cards de vídeo e preço que inclinam em 3D (`components/Tilt.tsx`), palavra do título trocando com animação (`components/RotatingWord.tsx`), timeline estilo After Effects com playhead e timecode (`components/TimelineStrip.tsx`), ícones das ferramentas e etapas do processo que reagem ao clique, barra de progresso de rolagem no topo, e fundos em movimento em todas as seções (`components/MovingBackdrop.tsx`). Tudo respeita "reduzir movimento".
- Paleta e fontes seguem exatamente o briefing: verde `#00A651` como cor de destaque (~15% da interface), preto/cinza para contraste (~10%) e o restante em branco/off-white — com pequenas variações de tom entre as seções (Projetos, por exemplo, ganhou um fundo levemente acinzentado) para reforçar a sensação de "nova seção" ao rolar.
