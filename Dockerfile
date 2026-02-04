# Estágio de desenvolvimento/execução
FROM node:20-slim

# Define o diretório de trabalho
WORKDIR /app

# Instala o pnpm (vimos que você usa ele)
RUN npm install -g pnpm

# Copia os arquivos de dependências
COPY package.json pnpm-lock.yaml* ./

# Instala as dependências
RUN pnpm install --dangerously-allow-all-builds

# Copia o restante do código
COPY . .

# Expõe as portas: 8080 (Vue) e 3000 (json-server)
EXPOSE 8080 3000

# Comando para rodar ambos (usaremos um truque no compose)
CMD ["pnpm", "run", "serve"]