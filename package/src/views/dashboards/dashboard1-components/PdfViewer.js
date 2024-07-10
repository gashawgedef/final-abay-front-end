import React from 'react';

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div style={{ height: '2vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     <a href={pdfUrl} target="_blank" rel="noopener noreferrer">DownloadUserGuid</a>
    </div>
  );
};
export default PdfViewer;
