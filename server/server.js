const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const secretKey = "sk_test_51QA1JN04GnkleiMSMJ7YtRIuEaTzBVTgiCl240P8xaYn2C8THVFoNKXOLIvKLOwjQBnEakPW99RPUWN3VwuGspqQ00niz02sTT"

if (!secretKey) {
  console.error("SECRET_KEY no configurada");
  process.exit(1);
}

const stripe = require("stripe")(secretKey);

app.post("/quotes", async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "El formato de los ítems es inválido" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "MX"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4100/success.html",
      cancel_url: "http://localhost:4100/cancel.html",
    });

    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(4100, () => console.log("API corriendo en el puerto 4242"));
