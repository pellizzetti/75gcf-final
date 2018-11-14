"use strict";

const Product = use("App/Models/Product");
const { test, trait } = use("Test/Suite")("Unit -> Product.show");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("Should inform if product does not exist", async ({ assert, client }) => {
  const id = 1;
  const response = await client.get(`/products/${id}`).end();

  response.assertStatus(200);
  assert.include(response.text, "Esse produto não existe! :(");
});

test("Should show data of the registered product", async ({
  assert,
  client
}) => {
  const product = await Product.create({
    name: "XPS 13",
    manufacturer: "Dell"
  });

  const response = await client.get(`/products/${product.id}`).end();

  response.assertStatus(200);
  assert.include(response.text, "XPS 13");
});
