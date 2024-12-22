import getMonthYear from "./helper"

function RenderPersonal({ formData }) {
        return (
            <>
                <h1>{formData.firstName} {formData.lastName}</h1>
                <p>Email: {formData.email}</p>
                <p>Phone: {formData.phone}</p>
            </>
        )
}

function RenderEducation({ formData }) {
        return (
            <>
                <h2>Education</h2>
                <h3>{formData.school}</h3>
                <h4>Study title: {formData.studyTitle}</h4>
                <p className="cv-dates">{getMonthYear(formData.studyStart)} - {getMonthYear(formData.studyEnd)}</p>
            </>
        )
}

function RenderProfessional({ formData }) { 
    return (
        <>
            <h2>Professional Experience</h2>
            <h3>{formData.jobTitle} at {formData.company}</h3>
            <p className="cv-dates">
                {getMonthYear(formData.jobStart)} - {getMonthYear(formData.jobEnd)}
            </p>
            <div className="cv-responsibilities">
                {formData.keyResponsibilities}
            </div>
        </>
    )
}

export default function CVLayout({ formData }) {

    return (
        <>
            <div className="cv-header">
               <RenderPersonal formData={formData}/>                 
            </div>

            <div className="cv-education-info">
                <RenderEducation formData={formData}/>
            </div>

            <div className="cv-education-info">
                <RenderProfessional formData={formData}/>
            </div>
        </>
    )
}