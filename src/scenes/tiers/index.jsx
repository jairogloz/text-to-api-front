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

const tiersData = [
  {
    title: "FREE",
    price: "$0",
    description: "Basic access to the platform with limited features.",
    buttonText: "Get Started",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    title: "BASIC",
    price: "$10",
    description: "Access to all basic features with some limitations.",
    buttonText: "Upgrade Now",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  },
  {
    title: "PRO",
    price: "$30",
    description:
      "Full access to all features, unlimited usage and latest models.",
    buttonText: "Go Pro",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  },
];

const Tiers = () => {
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