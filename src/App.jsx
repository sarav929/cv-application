import { useState } from 'react'
import './App.css'
import './style.css'
import FormData from './FormData'
import CVLayout from './CVLayout'

function App() {

  const [formData, setFormData] = useState({
    // personal //
    firstName: "",
    lastName: "",
    email: "", 
    phone: "",
    // education //
    school: "",
    studyTitle: "",
    studyStart: "", 
    studyEnd: "",
    // professional //
    company: "",
    jobTitle: "",
    keyResponsibilities: "",
    jobStart: "",
    jobEnd: ""
  })

  return (
    <>
      <h1>CV Generator</h1>
      <div className="app-container">
        <div className="form-container">
          <FormData formData={formData} setFormData={setFormData} />
        </div>

        <div className="cv-container">
          <CVLayout formData={formData} setFormData={setFormData}/>
        </div>
      </div>
    </>
    
  )
}

export default App
