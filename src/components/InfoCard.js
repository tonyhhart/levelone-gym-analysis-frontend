import { Box, colors, styled, Typography } from "@mui/material";

const InfoCard = ({ colorId, icon, amount, title }) => {
  const CardStyle = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderRadius: theme.spacing(1.5),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.common.white,
    boxShadow: "0 14px 26px rgba(0, 0, 0, 0.04)",
    border: "1px solid #55555522",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
    },
  }));

  const AmountStyle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(0.5),
    fontSize: theme.spacing(3.5),
    color: colors.grey[900],
  }));

  const TitleStyle = styled(Typography)(({ theme }) => ({
    margin: 0,
    opacity: 0.75,
    color: colors.grey[900],
  }));

  return (
    <CardStyle>
      <AmountStyle variant="h6" component="h3">
        {amount}
      </AmountStyle>

      <TitleStyle variant="button" component="h5">
        {title}
      </TitleStyle>
    </CardStyle>
  );
};

export default InfoCard;
