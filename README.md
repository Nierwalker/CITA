# CITA — Site em React (Vite + Tailwind)

## Como abrir no VSCode e rodar

1. Extraia o zip e abra a pasta `cita-react` no VSCode (**Arquivo → Abrir Pasta...**).
2. Abra o terminal integrado (**Terminal → Novo Terminal**, ou `Ctrl+\``).
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Rode o projeto:

   ```bash
   npm run dev
   ```

5. O terminal vai mostrar um endereço como `http://localhost:5173` — abra no navegador
   (ou `Ctrl+clique` no link direto no terminal do VSCode).

## Estrutura

```
cita-react/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx        # ponto de entrada
    ├── App.jsx         # só renderiza <CitaSite />
    ├── CitaSite.jsx    # o site inteiro (componente único)
    └── index.css       # diretivas do Tailwind
```

## Build de produção

```bash
npm run build      # gera a pasta dist/
npm run preview    # serve a build de produção localmente
```

## Requisitos

- Node.js 18 ou superior (`node -v` para checar). Baixe em https://nodejs.org
  se não tiver instalado.
