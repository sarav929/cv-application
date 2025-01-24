import { useState } from 'react'
import './App.css'
import './style.css'
import FormData from './components/FormData'
import CVLayout from './components/CVLayout'
import cvIcon from './assets/cv.png'
import printIcon from './assets/print.png'
import downloadIcon from './assets/download.png'

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {

  const downloadCV = () => {
    const cvElement = document.querySelector('.cv-layout'); 
    html2canvas(cvElement, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4');

      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('my-cv.pdf');
    });
  };

  const [formData, setFormData] = useState({
    // personal //
    personal: {
      firstName: "",
      lastName: "",
      email: "", 
      phone: "",
      website: "",
      about: ""
    },
    // education //
    education: {
      school: "",
      studyTitle: "",
      studySubj: "",
      schoolCity: "",
      studyStart: "", 
      studyEnd: "",
      studyDescr: "",
      isEndDatePresent: false
    },
    // professional //
    professional: {
      company: "",
      jobTitle: "",
      jobCity: "",
      keyResponsibilities: "",
      jobStart: "",
      jobEnd: "",
      isEndDatePresent: false
    },
    custom: {
      accent: "",
      text: "",
      font: ""
    }
  })

  // create savedData state to render in the CVLayout on submit 

  const [savedData, setSavedData] = useState({
    // personal //
    personal: {
      firstName: "",
      lastName: "",
      email: "", 
      phone: "",
      website: "",
      about: ""
    },
    // education //
    education: {
      school: "",
      studyTitle: "",
      studySubj: "",
      schoolCity: "",
      studyStart: "", 
      studyEnd: "",
      studyDescr: "",
      isEndDatePresent: false
    },
    // professional //
    professional: {
      company: "",
      jobTitle: "",
      jobCity: "",
      keyResponsibilities: "",
      jobStart: "",
      jobEnd: "",
      isEndDatePresent: false
    },
    custom: {
      accent: "",
      text: "",
      headerText: "",
      font: ""
    }
  })

  return (
    <>
      <header className="flex justify-between items-center p-5 w-full m-4 no-print">
        <div className="logo flex items-center">
          <img src={cvIcon} className='w-20 h-20 mr-5'/> <h1 className='text-4xl'>Create your CV</h1>
        </div>

        <div className="buttons flex no-print">
          <button className='p-1 m-4 bg-white w-32 h-12 self-center border border-gray-400 rounded shadow flex items-center justify-center'
          onClick={() => window.print()}>
            <img src={printIcon} className="w-5 h-5 mr-3"/>Print</button>
          <button 
          className='p-1 m-4 bg-white w-32 h-12 self-center border border-gray-400 rounded shadow flex items-center justify-center'
          onClick={downloadCV}
          >
            <img src={downloadIcon} className="w-5 h-5 mr-3"/>Download
          </button>
        </div>
      </header>

      <div className="flex flex-row gap-5 w-full items-start m-7">
        <div className="flex flex-col gap-4 w-[40vw] no-print">
          <FormData formData={formData} setFormData={setFormData} savedData={savedData} setSavedData={setSavedData} />
        </div>

        <div className="cv-layout flex rounded-lg w-[794px] h-[1123px] drop-shadow-md print:shadow-none print:drop-shadow-none bg-white">
          <CVLayout savedData={savedData} setSavedData={setSavedData} />
        </div>

      </div>
    </>
    
  )
}

export default App
