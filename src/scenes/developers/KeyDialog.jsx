import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { tokens } from "../../theme";

const KeyDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("");

  useEffect(() => {
    if (open) {
      // Simulate a backend call to get the key value
      setTimeout(() => {
        setKey("new-generated-api-key");
        setLoading(false);
      }, 2000); // Simulate a 2-second delay
    }
  }, [open]);

  const handleClose = () => {
    setLoading(true);
    setKey("");
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(key);
    alert("API key copied to clipboard");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New API Key</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <DialogContentText>
            Your new API key is:
            <TextField
              value={key}
              variant="outlined"
              fullWidth
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopy}>
                      <ContentCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 2,
                bgcolor: colors.primary[400],
                "& .Mui-disabled": {
                  color: colors.greenAccent[500],
                },
                color: colors.greenAccent[500],
              }}
            />
            <br />
            Make sure to store it in a safe place, as this is the only time you
            will be able to see its value.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            bgcolor: colors.gray[700],
            color: "#fcfcfc",
            transition: ".3s ease",
            ":hover": {
              bgcolor: colors.gray[800],
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KeyDialog;
