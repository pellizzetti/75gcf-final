"use strict";

const Product = use("App/Models/Product");

const { validateAll } = use("Validator");

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   */
  async index({ view }) {
    const products = await Product.all();

    return view.render("products.index", {
      products: products.toJSON()
    });
  }

  /**
   * Display a single product.
   * GET products/:id
   */
  async show({ params, view }) {
    try {
      const product = await Product.findOrFail(params.id);

      return view.render("products.detail", {
        product: product.toJSON()
      });
    } catch (err) {
      return view.render("error.index", {
        message: "Esse produto não existe! :(",
        back: "products",
        err
      });
    }
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   */
  async create({ view }) {
    return view.render("products.form", {
      editing: false
    });
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   */
  async edit({ params, view }) {
    try {
      const product = await Product.findOrFail(params.id);

      return view.render("products.form", {
        editing: true,
        product: product.toJSON()
      });
    } catch (err) {
      return view.render("error.index", {
        message: "Esse produto não existe! :(",
        back: "products",
        err
      });
    }
  }

  /**
   * Create/save a product.
   * POST/PUT products
   */
  async store({ request, session, response }) {
    const rules = {
      description: "required|min:3|max:25",
      manufacturer: "required|min:3|max:25"
    };

    const messages = {
      "description.required": "A descrição é obrigatória",
      "description.min": "A descrição deve ter no mínimo 3 caracteres",
      "description.max": "A descrição deve ter no máximo 25 caracteres",
      "manufacturer.required": "O fabricante é obrigatório",
      "manufacturer.min": "O fabricante deve ter no mínimo 3 caracteres",
      "manufacturer.max": "O fabricante deve ter no máximo 25 caracteres"
    };

    const productData = request.only(["id", "description", "manufacturer"]);

    const validation = await validateAll(productData, rules, messages);

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll();

      return response.redirect("back");
    }

    let product = null;
    if (productData.id !== "null") {
      product = await Product.find(productData.id);
    } else {
      product = new Product();
    }

    product.description = productData.description;
    product.manufacturer = productData.manufacturer;

    await product.save();

    return response.redirect("/products");
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   */
  async destroy({ params, response, view }) {
    try {
      const product = await Product.findOrFail(params.id);

      await product.delete();

      return response.redirect("/products");
    } catch (err) {
      return view.render("error.index", {
        message: "Esse produto não existe! :(",
        back: "products",
        err
      });
    }
  }
}

module.exports = ProductController;
