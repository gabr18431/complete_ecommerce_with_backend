import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

const IconSection = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{ mt: 3, bgcolor: theme.palette.mode === "dark" ? "#010101" : "#fff" }}
    >
      <Stack
        divider={
          useMediaQuery("(min-width:1120px)") ? (
            <Divider orientation="vertical" flexItem />
          ) : null
        }
        flexWrap="wrap"
        direction={"row"}
        alignItems={"center"}
        py={2}
      >
        <MyBox
          icon={<ElectricBoltIcon
          sx={{fontSize: useMediaQuery("(min-width:469px)") ? "19px" : "large"}}/>}
          title={"Fast Delivery"}
          subTitle={"Start from $10"}
        />
        <MyBox
          icon={<WorkspacePremiumOutlinedIcon 
            sx={{fontSize: useMediaQuery("(min-width:469px)") ? "19px" : "large"}}/>}
          title={"Money Guarantee"}
          subTitle={"7 Days Back"}
        />
        <MyBox
          icon={<AccessAlarmOutlinedIcon
            sx={{fontSize: useMediaQuery("(min-width:469px)") ? "19px" : "large"}}/>}
          title={"365 Days"}
          subTitle={"For free return"}
        />
        <MyBox
          icon={<CreditScoreOutlinedIcon
            sx={{fontSize: useMediaQuery("(min-width:469px)") ? "19px" : "large"}}/>}
          title={"Payment"}
          subTitle={"Secure system"}
        />
      </Stack>
    </Container>
  );
};

export default IconSection;

// eslint-disable-next-line react/prop-types
const MyBox = ({ icon, title, subTitle }) => {
  const theme = useTheme();
  return (
    <Box className="box-icon-section"
      sx={{
        width: useMediaQuery("(min-width:1120px)") ? 250 : "49%",
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        gap: 3,
        p: 1.6,
        justifyContent: useMediaQuery("(min-width:600px)") ? "center" : "left",
      }}
    >
      {icon}

      <Box>
        <Typography variant="body1"
        fontSize={useMediaQuery("(max-width:469px)") && "14px"}
        >{title}</Typography>
        <Typography
          sx={{ fontWeight: 300, color: theme.palette.text.secondary }}
          variant="body1"
          fontSize={useMediaQuery("(max-width:469px)") && "11px"}
        >
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
};
