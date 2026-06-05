import { revalidatePath } from "next/cache"
import { insertarTarea, obtenerTareas,eliminarTarea } from "@/lib/db"

export default async function Page() {
  const tareas = await obtenerTareas()

  async function crearTarea(formData: FormData) {
    "use server"

    const titulo = formData.get("titulo")
    const descripcion = formData.get("descripcion")

    if (typeof titulo !== "string" || typeof descripcion !== "string") {
      return
    }

    if (titulo.trim() === "" || descripcion.trim() === "") {
      return
    }

    await insertarTarea(titulo.trim(), descripcion.trim())

    revalidatePath("/gestor-tareas")
  }
  async function borrarTarea(formData: FormData) {
    "use server"

    const id = formData.get("id")

    if (typeof id !== "string") {
      return
    }

    await eliminarTarea(parseInt(id))

    revalidatePath("/gestor-tareas")
  }

  return (
    <main style={{ padding: "1rem" ,backgroundColor: "burlywood", display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1>Gestor de tareas</h1>

      <form action={crearTarea}>
        <label>
          Título
          <input name="titulo" style={{ display: "block",border: "1px solid black" }} />
        </label>

        <label>
          Descripción
          <textarea name="descripcion" style={{ display: "block",border: "1px solid black" }} />
        </label>

        <button type="submit">Guardar tarea</button>
      </form>

      <section style={{ margin: "4rem" ,border: "1px solid black"}}>
        <h2>Tareas guardadas</h2>

        {tareas.length === 0 ? (
          <p>Todavía no hay tareas.</p>
        ) : (
         <form action={borrarTarea}>
          <ul style={{ padding: "1rem" ,border: "1px solid black"}}>
            {tareas.map((tarea) => (
                
              <li key={tarea.id} style={{ padding: "1rem" ,border: "1px dotted black"}}>
                <strong>{tarea.titulo}</strong>
                <p>{tarea.descripcion}</p>
              <button type="submit">Eliminar tarea</button>
              </li>
            ))}
          </ul>
          </form>
        )}
      </section>
    </main>
  )
}