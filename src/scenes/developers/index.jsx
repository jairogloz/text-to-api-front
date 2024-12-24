import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Key } from "@mui/icons-material";
import { Header } from "../../components";
import { tokens } from "../../theme";
import KeyDialog from "./KeyDialog";

function Developers() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  const keyWasGenerated = true;

  const [openGenerateNewKey, setOpenGenerateNewKey] = useState(false);
  const [openKeyDialog, setOpenKeyDialog] = useState(false);

  const handleGenerateNewKey = () => {
    setOpenGenerateNewKey(true);
  };

  const handleClose = () => {
    setOpenGenerateNewKey(false);
  };

  const handleAccept = () => {
    console.log("Generate new key");
    setOpenGenerateNewKey(false);
    setOpenKeyDialog(true);
  };

  const handleCloseKeyDialog = () => {
    setOpenKeyDialog(false);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="DEVELOPERS" subtitle="" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn={
            isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"
          }
          gridRow="span 2"
          bgcolor={colors.primary[400]}
        >
          <Box
            mt="25px"
            px="30px"
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.greenAccent[500]}
              >
                API Keys
              </Typography>
              <Typography color={colors.gray[100]}>
                You'll need these keys to authenticate requests against our API.
              </Typography>
            </Box>
          </Box>

          <Box mt="25px" px="30px">
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.greenAccent[500]}
              >
                Live
              </Typography>
              <Typography color={colors.gray[100]}>
                {keyWasGenerated ? "Key was generated on Dec 21st 2024" : ""}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.blueAccent[700],
                  color: "#fcfcfc",
                  fontSize: isMdDevices ? "14px" : "10px",
                  fontWeight: "bold",
                  p: "10px 20px",
                  mt: "18px",
                  transition: ".3s ease",
                  ":hover": {
                    bgcolor: colors.blueAccent[800],
                  },
                }}
                startIcon={<Key />}
                onClick={handleGenerateNewKey}
              >
                GENERATE NEW KEY
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog open={openGenerateNewKey} onClose={handleClose}>
        <DialogTitle>Generate New Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A new API Key will be generated. The previous key will be revoked.
            Are you sure you want to proceed?
          </DialogContentText>
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
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            sx={{
              bgcolor: colors.blueAccent[700],
              color: "#fcfcfc",
              transition: ".3s ease",
              ":hover": {
                bgcolor: colors.blueAccent[800],
              },
            }}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <KeyDialog open={openKeyDialog} onClose={handleCloseKeyDialog} />
    </Box>
  );
}

export default Developers;
