const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos

// Ruta para generar el turno
app.post('/generar-turno', (req, res) => {
    const { tipoTurno } = req.body;
    
    // Lógica para generar un número de turno
    const turno = Math.floor(Math.random() * 1000); // Genera un número de turno aleatorio

    res.json({ turno });
});

// Ruta para ver el turno
app.get('/ver-turno', (req, res) => {
    const { turno, tipoTurno } = req.query;
    res.send(`<h1>Turno: ${turno}</h1><p>Tipo de turno: ${tipoTurno}</p>`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
