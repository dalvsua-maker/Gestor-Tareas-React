import mysql from "mysql2/promise"

export type Tarea = {
  id: number
  titulo: string
  descripcion: string
}

export async function abrirConexion() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
}

export async function obtenerTareas() {
  const conexion = await abrirConexion()

  const [filas] = await conexion.execute(
    "SELECT id, titulo, descripcion FROM tareas ORDER BY id DESC",
  )

  await conexion.end()

  return filas as Tarea[]
}

export async function insertarTarea(titulo: string, descripcion: string) {
  const conexion = await abrirConexion()

  await conexion.execute(
    "INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)",
    [titulo, descripcion],
  )

  await conexion.end()
}
export async function eliminarTarea(id: number) {
  const conexion = await abrirConexion()

  await conexion.execute("DELETE FROM tareas WHERE id = ?", [id])

  await conexion.end()
}