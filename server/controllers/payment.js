require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Dog = require("../models/Dog");




// Create a Checkout Session
// Every time a customer initiates the checkout process
// this endpoint will generate a unique session for the transaction
router.post('/create-checkout-session', async (req, res) => {
    try {
        const { fee } = req.body; // Get the selected fee from the request body
        const feeInCents = fee * 100; // Convert the fee to cents for Stripe

        const { dogId } = req.body;

        // Create the checkout session with the selected fee
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Adoption Fee: $${fee.toFixed(2)}`,
                        },
                        unit_amount: feeInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/payment-status?success=true&dogId=${dogId}`,
            cancel_url: 'http://localhost:5173/payment-status?canceled=true',
            metadata: {
                dogId: dogId, // Include dogId as metadata in the session for webhook processing
            },
        });

        res.json({ url: session.url }); // Return the checkout session URL to the frontend
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/update-dog-status", async (req, res) => {
    const { dogId, isSponsorship } = req.body;

    try {
        if (isSponsorship) {
            // If it's a sponsorship payment, update the sponsorshipStatus to true
            await Dog.findByIdAndUpdate(dogId, { sponsorshipStatus: true });
            console.log('Sponsorship successful! Sponsorship status updated.');
        } else {
            // If it's an adoption fee payment, update the isFeePaid to true
            await Dog.findByIdAndUpdate(dogId, { isFeePaid: true });
            console.log('Payment successful! Dog status updated.');
        }
        res.status(200).json({
            message: "Dog status updated successfully."
        });
    } catch (err) {
        console.error('Error updating dog status:', err);
        res.status(500).json({ error: 'An error occurred while updating the dog status.' });
    }
});

module.exports = router;