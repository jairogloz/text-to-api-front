import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LDsoMD1j0rGe96vgL0XmOYzLIpf1k9DpWWHFUFogORKwxyR1PhcRwT6QCyzn4y299M8bQCQe7sUtfS777KivFoH00o3rqAVAm"
); // Stripe public key

const tiersData = [
  {
    title: "FREE",
    price: "$0",
    description: "Basic access to the platform with limited features.",
    buttonText: "Get Started",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    priceId: null,
  },
  {
    title: "BASIC",
    price: "$10",
    description: "Access to all basic features with some limitations.",
    buttonText: "Upgrade Now",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    priceId: "price_1QEvsYD1j0rGe96vFvgLk639",
  },
  {
    title: "PRO",
    price: "$30",
    description:
      "Full access to all features, unlimited usage and latest models.",
    buttonText: "Go Pro",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    priceId: "price_67890",
  },
];

const Tiers = () => {
  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session
    const response = await fetch("http://localhost:8083/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price_id: priceId }),
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    if (session.id) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) console.error("Stripe checkout error:", error);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h2" align="center" gutterBottom>
        Pricing Tiers
      </Typography>
      <Box display="flex" justifyContent="space-between">
        {tiersData.map((tier, index) => (
          <Box
            key={index}
            p={2}
            border={1}
            borderRadius="8px"
            width="30%"
            textAlign="center"
          >
            <Typography variant="h4" gutterBottom>
              {tier.title}
            </Typography>
            <Typography variant="body1" align="left" gutterBottom>
              {tier.description}
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ color: "white", mb: 2 }}
              onClick={() => {
                if (tier.priceId) {
                  handleCheckout(tier.priceId);
                } else {
                  alert("Free tier selected");
                }
              }}
            >
              {tier.buttonText}
            </Button>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="baseline"
              mb={2}
            >
              <Typography
                variant="h1"
                color="white"
                sx={{ fontWeight: "bold" }}
              >
                {tier.price}
              </Typography>
              <Typography variant="body2" color="gray" sx={{ ml: 1 }}>
                / month
              </Typography>
            </Box>
            <List>
              {tier.features.map((feature, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <CheckCircleOutline sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tiers;
