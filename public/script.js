document.querySelectorAll('.turnoButton').forEach(button => {
    button.addEventListener('click', async (e) => {
        const tipoTurno = e.target.dataset.tipo;

        // Simulación de generación de turno
        const turno = Math.floor(Math.random() * 1000);

        // Mostrar el número de turno
        document.getElementById('turnoInfo').innerHTML = `<p>Tu número de turno es: ${turno}</p>`;

        // Mensaje directo para el QR
        const mensajeQR = `Tu turno es: ${turno} - Tipo: ${tipoTurno}`;

        // Generar el código QR con el mensaje
        QRCode.toDataURL(mensajeQR, { errorCorrectionLevel: 'H' }, (err, url) => {
            if (err) {
                console.error('Error generating QR code:', err);
                return;
            }

            // Mostrar el código QR en una imagen
            const qrImage = document.createElement('img');
            qrImage.src = url;
            qrImage.alt = 'Código QR';
            qrImage.style.display = 'block';
            qrImage.style.margin = '20px auto';
            qrImage.style.maxWidth = '100%';

            // Limpiar el contenedor y añadir la imagen del QR
            const qrCodeContainer = document.getElementById('qrCode');
            qrCodeContainer.innerHTML = '';
            qrCodeContainer.appendChild(qrImage);

            console.log('Código QR generado!');
        });
    });
});
