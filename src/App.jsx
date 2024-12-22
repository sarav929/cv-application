import { useState } from 'react'
import './App.css'
import './style.css'
import FormData from './FormData'
import CVLayout from './CVLayout'

function App() {

  const [formData, setFormData] = useState({
    // personal //
    personal: {
      firstName: "",
      lastName: "",
      email: "", 
      phone: ""
    },
    // education //
    education: {
      school: "",
      studyTitle: "",
      studyStart: "", 
      studyEnd: ""
    },
    // professional //
    professional: {
      company: "",
      jobTitle: "",
      keyResponsibilities: "",
      jobStart: "",
      jobEnd: ""
    } 
  })

  // create savedData state to render in the CVLayout on submit 

  const [savedData, setSavedData] = useState({
    // personal //
    personal: {
      firstName: "",
      lastName: "",
      email: "", 
      phone: ""
    },
    // education //
    education: {
      school: "",
      studyTitle: "",
      studyStart: "", 
      studyEnd: ""
    },
    // professional //
    professional: {
      company: "",
      jobTitle: "",
      keyResponsibilities: "",
      jobStart: "",
      jobEnd: ""
    } 
  })

  return (
    <>
      <h1>CV Generator</h1>
      <div className="app-container">
        <div className="form-container">
          <FormData formData={formData} setFormData={setFormData} savedData={savedData} setSavedData={setSavedData} />
        </div>

        <div className="cv-container">
          <CVLayout savedData={savedData} setSavedData={setSavedData} />
        </div>
      </div>
    </>
    
  )
}

export default App
