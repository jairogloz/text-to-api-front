import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Key } from "@mui/icons-material";
import { Header } from "../../components";
import { tokens } from "../../theme";

function Developers() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  const keyWasGenerated = true;
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
            <Box dsiplay="flex" flexDirection="column" alignItems="center">
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
              >
                GENERATE NEW KEY
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Developers;
