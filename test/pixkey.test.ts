import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { format, validate, normalize } from "../src";

describe("Pix Key Library", () => {
  it("Deve validar, normalizar e formatar CPF corretamente", () => {
    assert.deepEqual(validate("123.456.789-09"), ["cpf"]);
    assert.strictEqual(normalize("123.456.789-09"), "12345678909");
    assert.strictEqual(format("12345678909"), "123.456.789-09");
  });

  it("Deve validar, normalizar e formatar CNPJ corretamente", () => {
    assert.deepEqual(validate("77.145.180/0001-24"), ["cnpj"]);
    assert.strictEqual(format("77145180000124"), "77.145.180/0001-24");
    assert.strictEqual(normalize("77.145.180/0001-24"), "77145180000124");
  });

  it("Deve validar, normalizar e formatar email corretamente", () => {
    assert.deepEqual(validate("carlos.eduardo.ramos@estruturalbr.com.br"), [
      "email",
    ]);
    assert.strictEqual(
      normalize("carlos.eduardo.ramos@estruturalbr.com.br"),
      "carlos.eduardo.ramos@estruturalbr.com.br"
    );
    assert.strictEqual(
      format("carlos.eduardo.ramos@estruturalbr.com.br"),
      "carlos.eduardo.ramos@estruturalbr.com.br"
    );
  });

  it("Deve validar, normalizar e formatar telefone corretamente", () => {
    assert.deepEqual(validate("+55 (11) 99999-9999"), ["phone"]);
    assert.strictEqual(normalize("+55 (11) 99999-9999"), "+5511999999999");
    assert.strictEqual(format("+5511999999999"), "(11) 99999-9999");
  });

  it("Deve validar, normalizar e formatar UUID corretamente", () => {
    assert.deepEqual(validate("b630ac10-3ee1-495b-bba8-2be9b759fb2d"), [
      "random",
    ]);
    assert.strictEqual(
      normalize("b630ac10-3ee1-495b-bba8-2be9b759fb2d"),
      "b630ac10-3ee1-495b-bba8-2be9b759fb2d"
    );
    assert.strictEqual(
      format("b630ac10-3ee1-495b-bba8-2be9b759fb2d"),
      "b630ac10-3ee1-495b-bba8-2be9b759fb2d"
    );
  });
});
