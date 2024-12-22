import getMonthYear from "./helper"

function RenderPersonal({ savedData }) {
    // don't render if the personal section has not been saved yet
    if (savedData.personal && Object.values(savedData.personal).every(value => !value)) {
        return null
    }

    return (
        <>
            <h1>{savedData.personal.firstName} {savedData.personal.lastName}</h1>
            <p>{savedData.personal.email}</p>
            <p>{savedData.personal.phone}</p>
        </>
    )
        
}

function RenderEducation({ savedData }) {
    
    // don't render if the education section has not been saved yet
    if (savedData.education && Object.values(savedData.education).every(value => !value)) {
        return null
    }

    return (
        <>
        <h2>Education</h2>
        <h3>{savedData.education.school}</h3>
        <h4>{savedData.education.studyTitle}</h4>
        <p className="cv-dates">{getMonthYear(savedData.education.studyStart)} - {getMonthYear(savedData.education.studyEnd)}</p>
    </>
    )        
}

function RenderProfessional({ savedData }) { 
    // don't render if the education section has not been saved yet
    if (savedData.professional && Object.values(savedData.professional).every(value => !value)) {
        return null
    }
    return (
        <>
            <h2>Professional Experience</h2>
            <h3>{savedData.professional.jobTitle} at {savedData.professional.company}</h3>
            <p className="cv-dates">
                {getMonthYear(savedData.professional.jobStart)} - {getMonthYear(savedData.professional.jobEnd)}
            </p>
            <div className="cv-responsibilities">
                {savedData.professional.keyResponsibilities}
            </div>
        </>
    )    
}

export default function CVLayout({ savedData }) {

    return (
        <>
            <div className="cv-header">
               <RenderPersonal savedData={savedData}/>                 
            </div>

            <div className="cv-education-info">
                <RenderEducation savedData={savedData}/>
            </div>

            <div className="cv-education-info">
                <RenderProfessional savedData={savedData}/>
            </div>
        </>
    )
}