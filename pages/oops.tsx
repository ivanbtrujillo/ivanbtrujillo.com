import React from "react";
import { useRouter } from "next/router";

export default function Oops() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div>
      <h1>Oops</h1>
      <p>Ha ocurrido un error iniciando sesión!</p>
      <pre>{message || "Error desconocido"}</pre>
    </div>
  );
}
