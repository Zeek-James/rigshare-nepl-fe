import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const generateCertificate = async (
  certificateTemplate,
  data,
  staffName,
  companyName,
  eventName
) => {
  if (!data) throw new Error("Certificate data is required");

  const safeData = {
    company_name: companyName,
    lot_name: data?.lot_name,
    staff_name: staffName,
    event_name: eventName,
    reference: data?.reference,
  };

  const templateBytes = await fetch(certificateTemplate).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[0];

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const { width, height } = page.getSize();
  const centerX = width / 2;

  if (safeData.company_name) {
    page.drawText(safeData.company_name, {
      x:
        centerX -
        helveticaFont.widthOfTextAtSize(safeData.company_name, 28) / 2,
      y: height - 254,
      size: 32,
      font: helveticaFont,
      color: rgb(0, 0.39, 0),
    });
  }

  const winningText = `This certificate is given to ${safeData.staff_name} for winning`;
  page.drawText(winningText, {
    x: centerX - helveticaRegular.widthOfTextAtSize(winningText, 22) / 2,
    y: height - 300,
    size: 22,
    font: italicFont,
    color: rgb(0, 0, 0),
  });

  const lotText = `LOT - ${safeData.lot_name} of Auction Event - ${
    safeData.event_name || "Event"
  }`;
  page.drawText(lotText, {
    x: centerX - helveticaRegular.widthOfTextAtSize(lotText, 22) / 2,
    y: height - 330,
    size: 22,
    font: italicFont,
    color: rgb(0, 0, 0),
  });

  if (safeData.reference?.trim()) {
    page.drawText(safeData.reference, {
      x:
        centerX -
        helveticaRegular.widthOfTextAtSize(safeData.reference, 12) / 2,
      y: height - 240,
      size: 12,
      font: helveticaRegular,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
