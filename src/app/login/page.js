"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import PageContainer from "@/components/PageContainer";

// Validação de email
const validateEmail = (email) => {
  if (!email) {
    return "E-mail é obrigatório";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Por favor, insira um e-mail válido";
  }
  if (email.length > 255) {
    return "E-mail muito longo (máximo 255 caracteres)";
  }
  return null;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Validação em tempo real
    if (value && emailError) {
      const validationError = validateEmail(value);
      setEmailError(validationError || "");
    }
  };

  const handleEmailBlur = () => {
    const validationError = validateEmail(email);
    setEmailError(validationError || "");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setEmailError("");

    // Validação de email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    // Validação básica
    if (!senha) {
      setError("Senha é obrigatória.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error || "Falha no login");
        setLoading(false);
        return;
      }
      try {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      } catch {}
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user?.must_change_password) {
        router.push("/auth/change-password");
        return;
      }
      router.push("/dashboard");
    } catch (e) {
      setError("Erro inesperado. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <PageContainer
      maxWidth={960}
      innerSx={{
        display: "grid",
        gap: { xs: 3, md: 5 },
        gridTemplateColumns: { md: "repeat(2, minmax(0, 1fr))" },
        alignItems: "stretch",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[3],
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: { xs: 3, md: 5 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Chip
          label="Agenda inteligente"
          variant="outlined"
          sx={{
            alignSelf: "flex-start",
            borderColor: "primary.contrastText",
            color: "primary.contrastText",
            fontWeight: 600,
            px: 1,
          }}
        />
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "primary.contrastText",
                color: "primary.main",
                display: "grid",
                placeItems: "center",
              }}
            >
              <SchoolIcon />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, lineHeight: 1.15 }}>
              APAE Agenda
            </Typography>
          </Stack>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Centralize os atendimentos, fortaleça o vínculo com as famílias e garanta uma rotina eficiente para toda a
            equipe pedagógica.
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mt: "auto" }}>
          {[
            { icon: <AccessTimeIcon fontSize="small" />, text: "Horários organizados" },
            { icon: <PeopleAltIcon fontSize="small" />, text: "Equipe alinhada" },
            { icon: <EventAvailableIcon fontSize="small" />, text: "Agenda compartilhada" },
          ].map((item) => (
            <Grid item xs={12} sm={4} key={item.text}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: "primary.contrastText",
                    color: "primary.main",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.text}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Paper
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          boxShadow: (theme) => theme.shadows[3],
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Acesse sua conta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Utilize seu e-mail institucional e acompanhe os atendimentos agendados.
          </Typography>
        </Stack>
        {error ? (
          <Alert severity="error" variant="outlined">
            {error}
          </Alert>
        ) : null}
        <Stack spacing={2}>
          <FormInput
            type="email"
            label="E-mail"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            error={!!emailError}
            helperText={emailError}
            required
            disabled={loading}
            autoComplete="email"
            autoFocus
          />
          <FormInput
            type={showPassword ? "text" : "password"}
            label="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            disabled={loading}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack spacing={2}>
          <CustomButton 
            type="submit" 
            variant="contained" 
            size="large" 
            disabled={loading || !!emailError || !email.trim() || !senha.trim()}
          >
            {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Entrar"}
          </CustomButton>
          <Stack direction="row" justifyContent="flex-end">
            <Typography variant="body2" component={NextLink} href="/auth/forgot" sx={{ color: "primary.main" }}>
              Esqueci minha senha
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ color: "text.secondary", fontSize: "0.875rem", mt: "auto" }}
        >
          <ArrowForwardIcon fontSize="small" />
          <Typography variant="body2">
            Dica: personalize a agenda da sua turma para compartilhar com as famílias.
          </Typography>
        </Stack>
      </Paper>
    </PageContainer>
  );
}


