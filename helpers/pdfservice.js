PDFDocument = require('pdfkit');



function buildPDF(dataCallback, endCallback) {

    const doc = new PDFDocument();

    doc.on(`data`, dataCallback)
    doc.on(`end`, endCallback)
    doc.fontSize(25).text(`Thank you for your purchase!`)
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(12).text(`Lifetime subscription for XPense (tracker)`)
    doc.moveDown();
    doc.end()



}


module.exports = { buildPDF }
