import FormData from "./FormData";

export default function CVLayout({ formData }) {

    return (
        <>
        <div className="cv-header">
            <h1>{formData.firstName} {formData.lastName}</h1>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
        </div>

        <div className="cv-education-info">
            <h2>Education</h2>
            <h3>{formData.school}</h3>
            <h4>Study title: {formData.studyTitle}</h4>
            <p className="cv-dates">{formData.studyStart} - {formData.studyEnd}</p>
        </div>

        <div className="cv-education-info">
            <h2>Professional Experience</h2>
            <h3>{formData.jobTitle} at {formData.company}</h3>
            <p className="cv-dates">
                {formData.jobStart} - {formData.jobEnd}
            </p>
            <div className="cv-responsibilities">
                {formData.keyResponsibilities}
            </div>
        </div>
        </>
    )
}