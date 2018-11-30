"use strict";

const Order = use("App/Models/Order");
const Customer = use("App/Models/Customer");
const Product = use("App/Models/Product");

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   */
  async index({ view }) {
    const orders = await Order.query()
      .with("customer")
      .fetch();

    return view.render("orders.index", {
      orders: orders.toJSON()
    });
  }

  /**
   * Display a single order.
   * GET orders/:id
   */
  async show({ params, view }) {
    try {
      const order = await Order.findOrFail(params.id);

      await order.load("customer");

      return view.render("orders.detail", {
        order: order.toJSON()
      });
    } catch (err) {
      return view.render("error.index", {
        message: "Esse pedido não existe! :(",
        back: "orders",
        err
      });
    }
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   */
  async create({ view }) {
    const customers = await Customer.all();
    const products = await Product.all();

    return view.render("orders.form", {
      editing: false,
      customers: customers.toJSON(),
      products: products.toJSON()
    });
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   */
  async edit({ params, view }) {
    try {
      const order = await Order.findOrFail(params.id);

      return view.render("orders.form", {
        editing: true,
        order: order.toJSON()
      });
    } catch (err) {
      return view.render("error.index", {
        message: "Esse pedido não existe! :(",
        back: "orders",
        err
      });
    }
  }

  /**
   * Return info about an existing order.
   * GET orders/:id/info
   */
  async info({ params }) {
    const customers = await Customer.all();

    console.log(customers);

    return { customers, params };
  }

  /**
   * Create/save a order.
   * POST/PUT orders
   */
  async store({ request, session, response }) {
    const orderData = request.only(["id", "customer", "products"]);

    let order = null;
    if (orderData.id !== "null") {
      order = await Order.find(orderData.id);
    } else {
      order = new Order();
    }

    order.customer_id = parseInt(orderData.customer);

    const productIds = orderData.products.map(p => parseInt(p.id));

    try {
      await order.products().attach(productIds, row => {
        console.log(row);
        for (const product of orderData.products) {
          if (row.produtct_id === product.id) {
            row.quantity = product.quantity;
            row.price = product.price;
            row.discount = product.discount;
          }
        }
      });
    } catch (err) {
      console.log("aaa", err);
    }

    await order.save();

    return { redirect: true };
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   */
  async destroy({ params, response, view }) {
    try {
      const order = await Order.findOrFail(params.id);

      await order.delete();

      return response.redirect("/orders");
    } catch (err) {
      return view.render("error.index", {
        message: "Esse pedido não existe! :(",
        back: "orders",
        err
      });
    }
  }
}

module.exports = OrderController;
