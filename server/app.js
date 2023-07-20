require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnect } = require("./db");
const AWS = require("aws-sdk");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)  // Private key used to interact to the Stripe API

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const dogController = require("./controllers/dog-route");
const formController = require("./controllers/form-route");
const authController = require("./controllers/auth");

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/dog", dogController);
app.use("/form", formController);
app.use("/auth", authController);

// Create a Checkout Session
// Every time a customer initiates the checkout process 
// this endpoint will generate a unique session for the transaction
app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1NVKZhBdWFnJREXP270ocdUr",
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/payment-status?success=true",
            cancel_url: "http://localhost:5173/payment-status?canceled=true",
        })
        res.redirect(303, session.url)  // Redirect customer to the URL for the checkout
    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
    
})

app.listen(PORT, HOST, () => {
    dbConnect();
    console.log(`[server] listening on ${HOST} ${PORT}`);
});
