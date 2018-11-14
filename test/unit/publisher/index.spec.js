"use strict";

const Product = use("App/Models/Product");
const { test, trait } = use("Test/Suite")("Unit -> Product.index");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("Should inform if no product exists", async ({ assert, client }) => {
  const response = await client.get("/products").end();

  response.assertStatus(200);
  assert.include(response.text, "Nenhum produto cadastrado...");
});

test("Should list data of the registered products", async ({
  assert,
  client
}) => {
  await Promise.all([
    Product.create({ name: "XPS 13", manufacturer: "Dell" }),
    Product.create({ name: "ZenBook Flip S UX370", manufacturer: "Azus" })
  ]);

  const response = await client.get("/products").end();

  response.assertStatus(200);
  assert.include(response.text, "XPS 13");
  assert.include(response.text, "ZenBook Flip S UX370");
});
