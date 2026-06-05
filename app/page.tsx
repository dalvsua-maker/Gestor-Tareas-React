"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from 'react';
import FilaTarea from "./components/FilaTarea";
import FormularioTarea from "./components/FormularioTarea";
import Paginacion from "./components/Paginacion";

/**
 * Representa la estructura de una tarea dentro del sistema.
 */
interface Tarea {
  /** Identificador único de la tarea (timestamp). */
  id: number;
  /** Título o descripción de la actividad. */
  titulo: string;
  /** Estado de finalización de la tarea. */
  completada: boolean;
}

/**
 * Componente contenedor principal que gestiona el estado global de la lista de tareas,
 * la lógica de mutación de datos y la sincronización de la paginación con la URL.
 * * @component
 */
function ContenidoPrincipal() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, titulo: "Configurar el proyecto base", completada: true },
    { id: 2, titulo: "Aprender a usar el método .map()", completada: false },
    { id: 3, titulo: "Ajustar estilos del input", completada: true },
    { id: 4, titulo: "Separar componentes con Props", completada: false },
    { id: 5, titulo: "Implementar rutas y paginación", completada: false },
  ]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const paginaActual = Number(searchParams.get("page")) || 1;
  const TAREAS_POR_PAGINA = 3;

  const indiceInicio = (paginaActual - 1) * TAREAS_POR_PAGINA;
  const indiceFin = indiceInicio + TAREAS_POR_PAGINA;
  const tareasPaginadas = tareas.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(tareas.length / TAREAS_POR_PAGINA);

  /**
   * Actualiza los parámetros de búsqueda en la URL para navegar a otra página.
   * * @param {number} nuevaPagina - El número de la página de destino.
   */
  const cambiarPagina = (nuevaPagina: number) => {
    router.push(`/?page=${nuevaPagina}`);
  };

  /**
   * Crea una nueva tarea y la añade al estado de la lista.
   * * @param {string} titulo - El título de la nueva tarea.
   */
  const anadirTarea = (titulo: string) => {
    const nuevaTarea: Tarea = { id: Date.now(), titulo, completada: false };
    setTareas([...tareas, nuevaTarea]);
  };

  /**
   * Conmuta el estado de completado de una tarea específica invirtiendo su valor booleano.
   * * @param {number} id - Identificador único de la tarea a modificar.
   */
  const conmutarTarea = (id: number) => {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)));
  };

  /**
   * Elimina una tarea de la lista filtrando el estado por su identificador.
   * * @param {number} id - Identificador único de la tarea a remover.
   */
  const borrarTarea = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div style={{
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "20px"
    }}>
      <main style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "450px"
      }}>
        <h1 style={{ fontSize: "24px", color: "#1a1a1a", marginBottom: "5px", textAlign: "center" }}>
          Mi Gestor de Tareas
        </h1>
        <p style={{ fontSize: "14px", color: "#666", textAlign: "center", marginBottom: "25px" }}>
          Hecho con React • Next.js
        </p>

        <FormularioTarea onAnadirTarea={anadirTarea} />

        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", color: "#333", marginBottom: "15px" }}>
            Tareas actuales (Página {paginaActual} de {totalPaginas || 1})
          </h2>
          
          {tareas.length === 0 ? (
            <p style={{ color: "#888", fontStyle: "italic" }}>No tienes tareas pendientes.</p>
          ) : (
            <>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {tareasPaginadas.map((tarea) => (
                  <FilaTarea 
                    key={tarea.id}
                    tarea={tarea}
                    onConmutar={conmutarTarea}
                    onBorrar={borrarTarea}
                  />
                ))}
              </ul>

              <Paginacion 
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={cambiarPagina}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
export default function Page() {
  return (
    <main>
     
      
      {/* Envuélvelo justo aquí al llamarlo */}
      <Suspense fallback={<div>Cargando filtros...</div>}>
        <ContenidoPrincipal />
      </Suspense>
    </main>
  );
}