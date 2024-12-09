const express = require('express');
const app = express();
const { sequelize } = require('./models');


const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
// Middleware
app.use(express.json());

// Ruta raíz que devuelve "Hola Mundo"
app.get('/', (req, res) => {
    res.send('Hola Jorge Arze');
});

// Rutas de la API
app.use('/api', userRoutes);
app.use('/api/tasks', taskRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}).catch(err => console.error('Error al sincronizar la base de datos:', err));
