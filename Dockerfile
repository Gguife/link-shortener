# Usando a imagem do Node.js versão 14 Alpine como base
FROM node:16-alpine

# Definindo o diretório de trabalho dentro do contêiner
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copiando o arquivo package.json e yarn.lock para diretório de trabalho
COPY package.json .
COPY yarn.lock .

# Instalando as depedências do projeto
RUN yarn install

# Copiando o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Definindo o comando padrão para executar o aplicativo em modo de desenvolvimento
CMD ["yarn", "dev"]