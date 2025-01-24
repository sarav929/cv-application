import { useState } from 'react'
import './App.css'
import './style.css'
import FormData from './components/FormData'
import CVLayout from './components/CVLayout'

function App() {

  const [formData, setFormData] = useState({
    // personal //
    personal: {
      firstName: "",
      lastName: "",
      email: "", 
      phone: "",
      website: ""
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
      website: ""
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
    } 
  })

  return (
    <>
      <h1>CV Generator</h1>
      <div className="flex flex-row gap-5 w-full items-start m-7">
        <div className="flex flex-col gap-4 w-[40vw]">
          <FormData formData={formData} setFormData={setFormData} savedData={savedData} setSavedData={setSavedData} />
        </div>

        <div className="flex border border-black w-[60vw] h-[100vh] ">
          <CVLayout savedData={savedData} setSavedData={setSavedData} />
        </div>
      </div>
    </>
    
  )
}

export default App
