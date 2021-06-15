import  PdfPrinter from "pdfmake"


export const createPDF = async (body) => {
  var fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };
  
  var printer = new PdfPrinter(fonts);
  
  var docDefinition = {
    content: [
      'First paragraph',
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ]
  };
  
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  // pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
  pdfDoc.end();
  return pdfDoc
}


