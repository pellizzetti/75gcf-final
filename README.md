# StoreJS

## Requerimentos

Esse projeto tem como requerimento de sistema: `Node.js`, `npm`.

Certifique-se de que suas versões dessas ferramentas correspondam aos seguintes critérios:

- Node.js >= 8.0.0
- npm >= 3.0.0

DICA: Você pode usar ferramentas como o [nvm](https://github.com/creationix/nvm) para ajudar a gerenciar várias versões do Node.js e npm ao mesmo tempo.

## Adonis CLI

Para desfrutar da parte de migrations e seeds é preciso ter instalado o `CLI` do framework `AdonisJs`.

Ele pode ser instalado através do npm usando o seguinte comando:
```sh
npm i -g @adonisjs/cli
```

## Instalando

Antes de prosseguir, ler a documentação do framework [AdonisJs](https://adonisjs.com/docs/4.1/about)
com certeza torna o processo muito mais suave.

- **Passo 1**

  Clone este repositório:
  ```sh
  git clone https://github.com/pellizzetti/75gcf-final.git
  ```

- **Passo 2**

  Instale as dependências do projeto:
  ```sh
  npm i
  ```

- **Passo 3**

  Crie seu `.env` usando o `.env.example` como exemplo e preeche de acordo com seu uso:
  ```sh
  cp .env.example .env
  vim .env
  ```

- **Passo 4**

  Gere uma `key`:
  ```
  adonis key:generate
  ```

- **Passo 5**

  Rode as migrations do projeto:
  ```
  adonis migration:run
  ```

- **(Opcional) Passo 6**

  Caso queria rodar seeds do projeto:
  ```
  adonis seed
  ```
    
Pronto, projeto instalado com sucesso!

## Servindo a aplicação

Quando o processo de instalação estiver concluído, você poderá executar o seguinte comando para iniciar o servidor HTTP:
```sh
adonis serve
```
Este comando inicia o servidor na porta definida dentro do arquivo `.env`.

## Rodando testes

Para executar os testes use esse comando:

```
adonis test
```
