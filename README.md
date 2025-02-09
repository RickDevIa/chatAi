# Gemini Chat App

Este é um aplicativo web simples que usa a API Gemini para criar uma interface de chat.

## Funcionalidades

* Envia mensagens do usuário para a API Gemini através de um backend Node.js.
* Exibe as respostas da API Gemini na interface web.

## Tecnologias Utilizadas

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express, `@google/generative-ai`
* Carregamento de Variáveis de Ambiente: `dotenv`

## Como Executar

1. **Instale as dependências do Node.js:**
   \`\`\`bash
   npm install
   \`\`\`
2. **Configure as variáveis de ambiente:**
   Crie um arquivo \`.env\` na raiz do projeto e adicione sua chave de API do Google:
   \`\`\`
   GOOGLE_API_KEY=SUA_CHAVE_DE_API
   \`\`\`
   *(Substitua \`SUA_CHAVE_DE_API\` pela sua chave de API real do Google Cloud Console.)*
3. **Execute o servidor:**
   \`\`\`bash
   node index.js
   \`\`\`
4. **Abra o arquivo \`index.html\` em um navegador.**

## Solução para o Erro 500

O aplicativo inicialmente apresentou um erro 500 Internal Server Error ao enviar mensagens de chat. Isso ocorreu porque a variável de ambiente \`GOOGLE_API_KEY\` não estava sendo carregada corretamente.

**Causa:** O projeto estava faltando a biblioteca \`dotenv\` e sua configuração. \`dotenv\` é essencial para carregar variáveis de ambiente do arquivo \`.env\` em projetos Node.js.

**Solução:**
1. **Instale o \`dotenv\`:**
   \`\`\`bash
   npm install dotenv
   \`\`\`
2. **Configure o \`dotenv\`:**
   Adicione a seguinte linha no início do arquivo \`index.js\` para carregar as variáveis de ambiente:
   \`\`\`javascript
   require('dotenv').config();
   \`\`\`

Após aplicar estes passos, a \`GOOGLE_API_KEY\` é carregada corretamente, e o aplicativo de chat funciona sem o erro 500.