import getMonthYear from "../helper"
import mailIcon from "../assets/mail.png"
import callIcon from "../assets/call.png"
import webIcon from "../assets/web.png"

function RenderPersonal({ savedData }) {
    // don't render if the personal section has not been saved yet
    if (savedData.personal && Object.values(savedData.personal).every(value => !value)) {
        return null
    }

    return (
        <>
            
            <div className="w-full bg-cyan-500 p-5">
                <div className="text-center"> 
                    <h1 className="text-4xl font-bold mb-5 uppercase">{`${savedData.personal.firstName} ${savedData.personal.lastName}`}</h1>
                    <p className="flex items-center justify-center mt-4">
                        <img src={mailIcon} className="w-5 h-5 object-contain mr-2"/> {savedData.personal.email} 
                        <img src={callIcon} className="w-5 h-5 object-contain mr-2 ml-2"/> {savedData.personal.phone}
                    </p>

                    {savedData.personal.website && (
                        <p className="flex items-center justify-center mt-4">
                            <img src={webIcon} className="w-5 h-5 object-contain mr-2"/> {savedData.personal.website}
                        </p>
                    )}
                </div>
            </div>

            <div className="about m-4 border-b-4 border-indigo-500">
                <h2 className="text-xl font-bold uppercase mb-4 text-center">About</h2>
                <p className="pb-5">{savedData.personal.about}</p>
            </div>
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
            <div className="education m-4 border-b-4 border-indigo-500"> 
                <h2 className="text-xl font-bold uppercase mb-4 text-center">Education</h2>

                <p className="">{`${savedData.education.studyTitle} in ${savedData.education.studySubj}`} | {`${getMonthYear(savedData.education.studyStart)} - 
                ${savedData.education.studyEnd != 'Present' ? getMonthYear(savedData.education.studyEnd) : savedData.education.studyEnd}`}</p>

                <p className="">{`${savedData.education.school} (${savedData.education.schoolCity})`}</p>

                <p className="mt-3 mb-5">{savedData.education.studyDescr}</p>
            </div>
            
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
            <div className="professional m-4 border-b-4 border-indigo-500"> 
                <h2 className="text-xl font-bold uppercase mb-4 text-center">Professional Experience</h2>

                <p className="">{savedData.professional.jobTitle} | {`${getMonthYear(savedData.professional.jobStart)} - 
                ${savedData.professional.jobEnd != 'Present' ? getMonthYear(savedData.professional.jobEnd) : savedData.professional.jobEnd}`}</p>

                <p className="">{`${savedData.professional.company} (${savedData.professional.jobCity})`}</p>

                <p className="mt-3 mb-5">{savedData.professional.keyResponsibilities}</p>
            </div>
        
        </>
    )    
}

export default function CVLayout({ savedData }) {

    return (
        <>
            <div className="flex flex-col w-full">
                <RenderPersonal savedData={savedData}/>                 
                

                <div>
                    <RenderEducation savedData={savedData}/>
                </div>

                <div>
                    <RenderProfessional savedData={savedData}/>
                </div>
            </div>
        </>
    )
}