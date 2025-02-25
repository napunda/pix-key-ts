# Pix Key Ts

A **Pix Key Ts** é uma biblioteca para validação, normalização e formatação de chaves Pix no Brasil. Ela suporta CPF, CNPJ, e-mail, telefone e UUID, garantindo conformidade com os padrões do Banco Central. Esta é uma versão otimizada com tipagens typscript da biblioteca [pixkey](https://github.com/jesobreira/pixkey).

## Instalação

```sh
npm install @napunda/pix-key-ts
```

## Uso

Importe as funções principais da biblioteca:

```ts
import { validate, normalize, format } from "@napunda/pix-key-ts";
```

### Validação

A função `validate` verifica o tipo da chave Pix e retorna um array com os tipos identificados.

```ts
validate("123.456.789-09"); // ["cpf"]
validate("carlos@email.com"); // ["email"]
validate("+55 (11) 99999-9999"); // ["phone"]
```

### Normalização

A função `normalize` remove formatação da chave, deixando-a no formato padrão exigido pelo sistema bancário.

```ts
normalize("123.456.789-09"); // "12345678909"
normalize("+55 (11) 99999-9999"); // "+5511999999999"
```

### Formatação

A função `format` aplica a formatação padrão de exibição para cada tipo de chave Pix.

```ts
format("12345678909"); // "123.456.789-09"
format("+5511999999999"); // "(11) 99999-9999"
```

## Testes

A biblioteca inclui testes utilizando o `node:test`. Para executá-los, use:

```sh
npm test
```

## Licença

Esta biblioteca está licenciada sob a Licença MIT.

