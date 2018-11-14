"use strict";

const Product = use("App/Models/Product");
const { test, trait } = use("Test/Suite")("Unit -> Product.delete");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("Should inform if product does not exist", async ({ assert, client }) => {
  const id = 1;
  const response = await client.delete(`/products/${id}`).end();

  response.assertStatus(200);
  assert.include(response.text, "Esse produto não existe! :(");
});

test("Should delete product", async ({ assert, client }) => {
  await Product.create({ name: "XPS 13", manufacturer: "Dell" });

  const product = await Product.create({
    name: "ZenBook Flip S UX370",
    manufacturer: "Azus"
  });

  const response = await client.delete(`/products/${product.id}`).end();

  response.assertStatus(200);
  assert.include(response.text, "XPS 13");
  assert.notInclude(response.text, "ZenBook Flip S UX370");
});
