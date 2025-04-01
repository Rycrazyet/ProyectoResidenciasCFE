const { jsPDF } = require("jspdf");

function generateReport(data) {
    const doc = new jsPDF();

    // Set the title of the report
    doc.setFontSize(22);
    doc.text("Report Title", 20, 20);

    // Add content to the report
    doc.setFontSize(12);
    let y = 30;
    data.forEach(item => {
        doc.text(item, 20, y);
        y += 10; // Move down for the next line
    });

    // Save the generated PDF
    doc.save("report.pdf");
}

// Example usage
// generateReport(["Item 1", "Item 2", "Item 3"]);