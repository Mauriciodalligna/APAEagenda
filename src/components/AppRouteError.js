"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const defaultTitle = "Algo deu errado";
const defaultDescription =
  "Não foi possível concluir esta ação. Tente novamente ou volte ao início.";

/**
 * @param {object} props
 * @param {Error & { digest?: string }} props.error
 * @param {() => void} props.reset
 * @param {string} [props.title]
 * @param {string} [props.description]
 */
export default function AppRouteError({ error, reset, title = defaultTitle, description = defaultDescription }) {
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      component="main"
      role="alert"
      sx={{
        p: 3,
        maxWidth: 560,
        mx: "auto",
        mt: { xs: 2, sm: 4 },
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
        {isDev && error?.message && (
          <Typography
            variant="body2"
            component="pre"
            sx={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {String(error.message)}
          </Typography>
        )}
        <Button type="button" variant="contained" color="primary" onClick={() => reset()}>
          Tentar novamente
        </Button>
      </Stack>
    </Box>
  );
}
