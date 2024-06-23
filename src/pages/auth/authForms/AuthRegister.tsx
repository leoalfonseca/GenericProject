import { Box, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";
import { Stack } from "@mui/system";
import { registerType } from "types/auth/auth";
import CustomFormLabel from "components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "components/forms/theme-elements/CustomTextField";

const AuthRegister = ({ title, subtitle, subtext }: registerType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Box>
      <Stack mb={3}>
        <CustomFormLabel htmlFor="name">Nome</CustomFormLabel>
        <CustomTextField id="name" variant="outlined" fullWidth />
        <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
        <CustomTextField id="email" variant="outlined" fullWidth />
        <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
        <CustomTextField id="password" variant="outlined" fullWidth />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        href="/"
        type="submit"
        sx={{
          mx: 0.3,
          backgroundColor: "#004645",
          color: "white",
          "&:hover": {
            backgroundColor: `#002d2d`,
            color: "white",
          },
          "& .MuiButton-startIcon": {
            margin: "auto",
          },
        }}
      >
        Registrar
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthRegister;
