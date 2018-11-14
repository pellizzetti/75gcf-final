"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("home");

Route.get("/products", "ProductController.index");
Route.get("/products/add", "ProductController.create");
Route.get("/products/:id", "ProductController.show");
Route.get("/products/:id/edit", "ProductController.edit");

Route.post("/products", "ProductController.store");
Route.put("/products/:id/edit", "ProductController.store");
Route.delete("/products/:id", "ProductController.destroy");
