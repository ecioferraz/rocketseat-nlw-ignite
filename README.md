
# Spacetime

![Rocketseat wallpaper](/web/src/assets/wallpaper.png)

Este foi um projeto desenvolvido para o programa NLW (Next Level Week), da Rocketseat, na trilha Ignite.

Trata-se de uma aplicação Full Stack, desenvolvida para Web e Mobile, que funciona como uma cápsula do tempo, onde o usuário pode adicionar à uma timeline textos e fotos de acontecimentos marcantes da sua vida, organizados por mês e ano.
## Stack e ferramentas utilizadas

**Front-end:**
#### ***Web:***
- Typescript
- React
- Tailwind
- Next.js
- Axios
- JWT
- Js Cookie
- Lucide
- Day.js
- Eslint
- Prettier

#### ***Mobile:***
- Typescript
- React Native
- Tailwind
- Nativewind
- Expo
- Day.js
- Eslint
- Prettier

**Back-end:**
- Typescript
- Prisma
- Fastify
- Axios
- Zod
- Eslint
- Prettier

## Variáveis de Ambiente

Para rodar o projeto localmente, você vai precisar de uma conta no GitHub e criar duas chaves de acesso e uma secret para cada chave, [siga a documentação do GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

Após receber a chave de acesso, as adicione às seguintes variáveis de ambiente nos respectivos arquivos .env.

#### Front-end Web (.env)
```
  NEXT_PUBLIC_GITHUB_CLIENT_ID=
```

#### Back-end (.env.local)
##### Github (Web)
```
  GITHUB_CLIENT_ID=""
  GITHUB_CLIENT_SECRET=""
```

##### Github (Mobile)
```
  GITHUB_CLIENT_ID=""
  GITHUB_CLIENT_SECRET=""
```

***Importante:*** No back-end, utilize apenas as variáveis de ambiente para a aplicação que estiver rodando no momento. Ou seja, ao rodar a aplicação web comente as variáveis de ambiente para mobile, e vice versa. Reinicie o servidor ao alternar as variáveis.
## Rodando localmente


Clone o projeto

```bash
  git clone git@github.com:ecioferraz/rocketseat-nlw-ignite.git
```

Entre no diretório do projeto

```bash
  cd rocketseat-nlw-ignite
```
###
#### Back-end

Entre no diretório do servidor

```bash
  cd server
```

Instale as dependências

```bash
  npm install
```

Execute o projeto
```bash
  npm run dev
```
###
#### Front-end

Entre no diretório da web

```bash
  cd web
```

Instale as dependências

```bash
  npm install
```

Execute o projeto
```bash
  npm run dev
```

Acesse a aplicação através da url http://localhost:3000/

###
#### Mobile

Entre no diretório mobile

```bash
  cd mobile
```

Instale as dependências

```bash
  npm install
```

Execute o projeto
```bash
  npm start
```

Acesse a aplicação através da opção de sua preferência apresentada no terminal pelo Expo.
## Documentação da API

#### Realiza a autenticação e o cadastro do usuário a partir do GitHub, e retorna um token.

```http
  POST /register
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `code` | `string` | **Obrigatório**. Código retornado pelo GitHub |

#### Retorna uma lista de memórias salvas no banco de dados.

```http
  GET /memories
```

| Auth   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `string` | **Obrigatório**. O token fornecido no login |

#### Retorna uma memória.

```http
  GET /memories/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da memória que você quer |

| Auth   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `string` | **Obrigatório**. O token fornecido no login |

#### Registra uma nova memória

```http
  POST /memories
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `content`      | `string` | **Obrigatório**. A descrição da memória |
| `coverUrl`      | `string` | **Obrigatório**. O link para a imagem da memória |
| `isPublic`      | `boolean` | **Obrigatório**. Status se a memória é pública ou privada |

| Auth   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `string` | **Obrigatório**. O token fornecido no login |

#### Atualiza uma memória

```http
  UPDATE /memories/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da memória que você quer |

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `content`      | `string` | A descrição da memória |
| `coverUrl`      | `string` | O link para a imagem da memória |
| `isPublic`      | `boolean` | Status se a memória é pública ou privada |

| Auth   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `string` | **Obrigatório**. O token fornecido no login |

#### Deleta uma memória

```http
  DELETE /memories/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da memória que você quer |

| Auth   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `string` | **Obrigatório**. O token fornecido no login |

#### Registra uma nova mídia

```http
  POST /upload
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O arquivo que deseja salvar |

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `file`      | `multipart/form-data` | **Obrigatório**. O arquivo que deseja salvar |

| Auth   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `string` | **Obrigatório**. O token fornecido no login |

#### Deleta uma mídia

```http
  DELETE /upload/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `fileName`      | `string` | **Obrigatório**. O nome do arquivo que você quer |

| Auth   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Bearer Token` | `string` | **Obrigatório**. O token fornecido no login |
