const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para poder leer `req.body`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); // Asegúrate de que 'public' es el directorio donde guardas tus archivos estáticos

app.get('/turno', (req, res) => {
  const { mensaje, tipo } = req.query;
  res.redirect(`/turno.html?mensaje=${encodeURIComponent(mensaje)}&tipo=${encodeURIComponent(tipo)}`);
});

// Variables para mantener el estado del último número de turno generado para cada tipo
let ultimoNumeroCredito = 0;
let ultimoNumeroAsesoria = 0;
let ultimoNumeroCaja = 0;

// Ruta para generar el turno
app.post('/generar-turno', (req, res) => {
    const { tipoTurno } = req.body;
    let letraTipoTurno;
    let turno;

    // Determinar la letra correspondiente al tipo de turno y generar el turno adecuado
    switch (tipoTurno) {
        case 'credito':
            letraTipoTurno = 'C';
            ultimoNumeroCredito++;
            turno = `${letraTipoTurno}${ultimoNumeroCredito}`;
            break;
        case 'asesoria':
            letraTipoTurno = 'A';
            ultimoNumeroAsesoria++;
            turno = `${letraTipoTurno}${ultimoNumeroAsesoria}`;
            break;
        case 'caja':
            letraTipoTurno = 'K';
            ultimoNumeroCaja++;
            turno = `${letraTipoTurno}${ultimoNumeroCaja}`;
            break;
        default:
            return res.status(400).json({ error: 'Tipo de turno no válido' });
    }

    res.json({ turno });
});

// Ruta para ver el turno
app.get('/ver-turno', (req, res) => {
    const { turno, tipoTurno } = req.query;
    res.send(`<h1>Turno: ${turno}</h1><p>Tipo de turno: ${tipoTurno}</p>`);
});

// Inicializar el servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
