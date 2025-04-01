document.addEventListener('DOMContentLoaded', () => {
    const equipmentTable = document.getElementById('equipment-table');

    // Simulación de datos desde la base de datos
    const equipmentData = [
        { id: 1, name: 'Multímetro', description: 'Equipo para medir voltaje, corriente y resistencia.', lastCalibration: '2025-03-15', usedBy: 'Juan Pérez' },
        { id: 2, name: 'Osciloscopio', description: 'Equipo para analizar señales eléctricas.', lastCalibration: '2025-02-10', usedBy: 'María López' },
        { id: 3, name: 'Calibrador de presión', description: 'Equipo para calibrar sensores de presión.', lastCalibration: '2025-01-20', usedBy: 'Carlos García' }
    ];

    // Cargar datos en la tabla
    equipmentData.forEach(equipment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${equipment.id}</td>
            <td>${equipment.name}</td>
            <td>${equipment.description}</td>
            <td><button class="info-btn" data-id="${equipment.id}">Ver Información</button></td>
        `;
        equipmentTable.appendChild(row);
    });

    // Manejar clics en los botones de información
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const equipmentId = event.target.getAttribute('data-id');
            const equipment = equipmentData.find(e => e.id == equipmentId);

            if (equipment) {
                // Abrir una nueva ventana con la información del equipo
                const newWindow = window.open('', '_blank', 'width=600,height=400');
                newWindow.document.write(`
                    <html>
                        <head>
                            <title>Información del Equipo</title>
                        </head>
                        <body>
                            <h1>Información del Equipo</h1>
                            <p><strong>ID:</strong> ${equipment.id}</p>
                            <p><strong>Nombre:</strong> ${equipment.name}</p>
                            <p><strong>Descripción:</strong> ${equipment.description}</p>
                            <p><strong>Última Calibración:</strong> ${equipment.lastCalibration}</p>
                            <p><strong>Utilizado por:</strong> ${equipment.usedBy}</p>
                            <button id="generate-pdf">Generar Reporte PDF</button>
                        </body>
                    </html>
                `);

                // Agregar funcionalidad para generar el PDF
                newWindow.document.getElementById('generate-pdf').addEventListener('click', () => {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF();

                    // Agregar el logo de la empresa
                    const logoUrl = '../images/logo.png'; // Ruta del logo
                    const imgWidth = 50; // Ancho del logo
                    const imgHeight = 20; // Alto del logo
                    const marginTop = 10;

                    doc.addImage(logoUrl, 'PNG', 10, marginTop, imgWidth, imgHeight);

                    // Título del reporte
                    doc.setFontSize(16);
                    doc.text('Reporte de Equipo de Calibración', 70, marginTop + 10);

                    // Información detallada
                    doc.setFontSize(12);
                    doc.text(`ID del Equipo: ${equipment.id}`, 10, marginTop + 40);
                    doc.text(`Nombre: ${equipment.name}`, 10, marginTop + 50);
                    doc.text(`Descripción: ${equipment.description}`, 10, marginTop + 60);
                    doc.text(`Última Calibración: ${equipment.lastCalibration}`, 10, marginTop + 70);
                    doc.text(`Utilizado por: ${equipment.usedBy}`, 10, marginTop + 80);

                    // Resumen
                    doc.setFontSize(14);
                    doc.text('Resumen:', 10, marginTop + 100);
                    doc.setFontSize(12);
                    doc.text(
                        `El equipo "${equipment.name}" fue calibrado por última vez el ${equipment.lastCalibration} y ha sido utilizado por ${equipment.usedBy}.`,
                        10,
                        marginTop + 110,
                        { maxWidth: 180 }
                    );

                    // Guardar el PDF
                    doc.save(`Reporte_Equipo_${equipment.id}.pdf`);
                });
            } else {
                alert('Equipo no encontrado.');
            }
        });
    });
});