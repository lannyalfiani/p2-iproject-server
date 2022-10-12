PDFDocument = require('pdfkit');



function buildPDF(dataCallback, endCallback) {
    // console.log(req.user);

    const doc = new PDFDocument();

    doc.on(`data`, dataCallback)
    doc.on(`end`, endCallback)
    // doc.fontSize(25).text(`Thank you for your purchase!!!!`)
    // doc.moveDown();
    // doc.moveDown();
    // doc.fontSize(12).text(`Lifetime subscription for XPense (tracker)`)
    // doc.moveDown();
    doc.fontSize(25).text('Thank you for your purchase', 100, 80);

    doc
        .text('This is your order detail...', 100, 300)
        .font('Times-Roman', 13)
        .moveDown()

    doc
        .text('Item: XPense premium account')
        .text('Amount: IDR 50,000')
        .text('Expiration time: Til death')
    doc.end()



}


module.exports = { buildPDF }
