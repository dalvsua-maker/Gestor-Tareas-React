"use client";

import { useState } from "react";

/**
 * Propiedades requeridas por el componente FormularioTarea.
 */
interface FormularioTareaProps {
  /** Función callback que se ejecuta al enviar un título de tarea válido. */
  onAnadirTarea: (titulo: string) => void;
}

/**
 * Componente que renderiza un formulario controlado para capturar e insertar nuevas tareas.
 * * @component
 * @param {FormularioTareaProps} props - Propiedades del componente.
 */
export default function FormularioTarea({ onAnadirTarea }: FormularioTareaProps) {
  const [nuevoTitulo, setNuevoTitulo] = useState("");

  /**
   * Maneja el evento de envío del formulario, valida la entrada y despacha el callback.
   * * @param {React.FormEvent} e - Evento de formulario de React.
   */
  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    onAnadirTarea(nuevoTitulo);
    setNuevoTitulo("");
  };

  return (
    <form onSubmit={manejarEnvio} style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
      <input
        type="text"
        placeholder="Escribe una nueva tarea..."
        value={nuevoTitulo}
        onChange={(e) => setNuevoTitulo(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          outline: "none",
          color: "#333333"
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        Añadir
      </button>
    </form>
  );
}