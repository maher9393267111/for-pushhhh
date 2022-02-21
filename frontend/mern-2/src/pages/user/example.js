import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

// import {
//     Table,
//     TableHeader,
//     TableCell,
//     TableBody,
//     DataTableCell,
//   } from "@david.kucsai/react-pdf-table";



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

// import DownloadLink from "./download-link";

export default function StringDocument() {
  const pdfString =
    ""

  const downloadPdf = () => {
    console.log("invoke download...");
    console.log(pdfString.slice(0, 30));
    download(pdfString);
    console.log("... download finished");
  };

  const download = pdfString => {
    const filename = generateFilename();
    const downloadString = `data:application/pdf;base64,${pdfString}`;

    const downloadLink = document.createElement("a");

    downloadLink.setAttribute("href", downloadString);
    downloadLink.setAttribute("download", filename);

    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  const generateFilename = () => {
    return "output_sample.pdf";
  };

  return (
    <div className="border-sm">
      <Document file={`data:application/pdf;base64,${pdfString}`}>
        <Page pageNumber={1} />
      </Document>
      <hr />
      <button className="btn-primary align-left" onClick={downloadPdf}>
        Download PDF
      </button>
    </div>
  );
}
