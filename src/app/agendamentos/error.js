"use client";

import AppRouteError from "@/components/AppRouteError";

export default function AgendamentosError(props) {
  return (
    <AppRouteError
      {...props}
      title="Erro ao carregar a agenda"
      description="Não foi possível exibir os agendamentos. Tente novamente em instantes."
    />
  );
}
