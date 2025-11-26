## Frontend

`index.html`
Contiene la estructura principal de la pagina:
- Título y subtítulo
- Botones de navegación
- Formulario para agregar tareas (fecha, hora, descripción, prioridad)
- Secciones para tareas pendientes y completadas

 `styles.css`
Define el estilo visual:
- Fondo estrellado
- Tarjetas tipo agenda
- Botones estilizados (✔ para completar, ✏️ para editar, 🗑️ para eliminar)


 `script.js`
Controla la lógica:
- Carga tareas desde el backend al iniciar (`GET`)
- Envía nuevas tareas (`POST`)
- Actualiza tareas (`PUT`)
- Elimina tareas (`DELETE`)
- Renderiza cada tarea como una tarjeta visual
- Separa tareas pendientes y completadas dinámicamente

## Backend

`server.js`
Configura el servidor con Express:
- Usa `cors()` para permitir conexión desde el frontend
- Usa `bodyParser.json()` para leer datos JSON
- Monta las rutas en `/api/tareas`
- Corre en `http://localhost:3000`

`routes/tareas.js`
Define los endpoints de la API RESTful:

| Método | Ruta              | Función                    
 GET     `/api/tareas`        Devuelve todas las tareas 
 POST    `/api/tareas`        Crea una nueva tarea       
 PUT     `/api/tareas/:id`    Actualiza una tarea        
 DELETE  `/api/tareas/:id`    Elimina una tarea          

Utiliza SQLite para ejecutar consultas SQL y validar datos antes de insertarlos.

##  Base de Datos

`db/database.sqlite`
Base de datos SQLite local con una tabla `tareas`:

```sql
CREATE TABLE IF NOT EXISTS tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha TEXT,
  hora TEXT,
  prioridad TEXT,
  completada INTEGER DEFAULT 0
);