"use client";

interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

/**
 * Propiedades requeridas por el componente FilaTarea.
 */
interface FilaTareaProps {
  /** Objeto de la tarea que contiene los datos a renderizar. */
  tarea: Tarea;
  /** Función callback para conmutar el estado de completado mediante el ID. */
  onConmutar: (id: number) => void;
  /** Función callback para solicitar la eliminación de la tarea mediante el ID. */
  onBorrar: (id: number) => void;
}

/**
 * Componente visual que representa un elemento individual de la lista de tareas,
 * aplicando estilos dinámicos condicionados por su estado interno.
 * * @component
 * @param {FilaTareaProps} props - Propiedades del componente.
 */
export default function FilaTarea({ tarea, onConmutar, onBorrar }: FilaTareaProps) {
  return (
    <li 
      style={{ 
        padding: "12px 15px",
        backgroundColor: tarea.completada ? "#f9f9f9" : "#f0f7ff",
        borderRadius: "8px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: tarea.completada ? "#a0a0a0" : "#1e293b",
        border: tarea.completada ? "1px solid #e2e8f0" : "1px solid #bfdbfe",
        fontSize: "15px"
      }}
    >
      <div 
        onClick={() => onConmutar(tarea.id)} 
        style={{ display: "flex", alignItems: "center", flex: 1, cursor: "pointer" }}
      >
        <span style={{ marginRight: "10px", color: tarea.completada ? "#10b981" : "#3b82f6", fontWeight: "bold" }}>
          {tarea.completada ? "✓" : "○"}
        </span>
        <span style={{ textDecoration: tarea.completada ? "line-through" : "none" }}>
          {tarea.titulo}
        </span>
      </div>

      <button
        onClick={() => onBorrar(tarea.id)}
        style={{
          backgroundColor: "transparent",
          color: "#ef4444",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          padding: "0 5px",
          fontWeight: "bold"
        }}
      >
        ✕
      </button>
    </li>
  );
}