const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos

// Variable para mantener el estado del último número de turno generado
let ultimoNumeroTurno = 0;

// Ruta para generar el turno
app.post('/generar-turno', (req, res) => {
    const { tipoTurno } = req.body;
    let letraTipoTurno;

    // Determinar la letra correspondiente al tipo de turno
    switch (tipoTurno) {
        case 'credito':
            letraTipoTurno = 'C';
            break;
        case 'asesoria':
            letraTipoTurno = 'A';
            break;
        case 'caja':
            letraTipoTurno = 'K';
            break;
        default:
            return res.status(400).json({ error: 'Tipo de turno no válido' });
    }

    // Generar un número de turno consecutivo
    ultimoNumeroTurno++;
    const turno = `${letraTipoTurno}${ultimoNumeroTurno}`;

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
