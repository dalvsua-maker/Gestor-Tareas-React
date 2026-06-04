"use client";

/**
 * Propiedades requeridas por el componente Paginacion.
 */
interface PaginacionProps {
  /** Índice numérico de la página en la que se encuentra el usuario actualmente. */
  paginaActual: number;
  /** Cantidad máxima total de páginas calculadas. */
  totalPaginas: number;
  /** Función callback que se activa al solicitar un cambio de índice de página. */
  onCambiarPagina: (nuevaPagina: number) => void;
}

/**
 * Componente que renderiza la interfaz de navegación por páginas, controlando
 * los límites de paginación y emitiendo los eventos correspondientes.
 * * @component
 * @param {PaginacionProps} props - Propiedades del componente.
 */
export default function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }: PaginacionProps) {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      marginTop: "20px",
      paddingTop: "15px",
      borderTop: "1px solid #eee" 
    }}>
      <button
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual <= 1}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: paginaActual <= 1 ? "#f0f0f0" : "white",
          color: paginaActual <= 1 ? "#aaa" : "#333",
          cursor: paginaActual <= 1 ? "not-allowed" : "pointer",
          fontSize: "14px"
        }}
      >
        ← Anterior
      </button>

      <span style={{ fontSize: "14px", color: "#666", fontWeight: "500" }}>
        {paginaActual} / {totalPaginas || 1}
      </span>

      <button
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual >= totalPaginas}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: paginaActual >= totalPaginas ? "#f0f0f0" : "white",
          color: paginaActual >= totalPaginas ? "#aaa" : "#333",
          cursor: paginaActual >= totalPaginas ? "not-allowed" : "pointer",
          fontSize: "14px"
        }}
      >
        Siguiente →
      </button>
    </div>
  );
}