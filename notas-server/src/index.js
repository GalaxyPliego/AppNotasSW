const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // Cargar variables de entorno desde .env


//Crear constante routes note
const noteRoutes = require('./routes/note')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', noteRoutes)


//Ruta de home con la respuesta
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

//Conección con mongoose
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a la base de datos Atlas'))
    .catch((error) => console.error(error))

//Inicializar el servidor
app.listen(PORT, () => {
    console.log(` Servidor escuchando en el puerto ${PORT}`)
})