import getMonthYear from "../helper"
import mailIcon from "../assets/icons/mail.png"
import callIcon from "../assets/icons/call.png"
import webIcon from "../assets/icons/web.png"

function RenderPersonal({ savedData }) {
    // don't render if the personal section has not been saved yet
    if (savedData.personal && Object.values(savedData.personal).every(value => !value)) {
        return null
    }

    return (
        <>
            
            <div className="w-full bg-blue-100/50 p-5 rounded-t-lg">
                <div className="text-center"> 
                    <h1 className="text-4xl mb-5 uppercase tracking-wider">{`${savedData.personal.firstName} ${savedData.personal.lastName}`}</h1>
                    <p className="flex items-center justify-center mt-4">
                        <img src={mailIcon} className="w-5 h-5 object-contain mr-2"/> {savedData.personal.email} 
                        <img src={callIcon} className="w-4 h-4 object-contain mr-2 ml-2"/> {savedData.personal.phone}
                    </p>

                    {savedData.personal.website && (
                        <p className="flex items-center justify-center mt-4">
                            <img src={webIcon} className="w-5 h-5 object-contain mr-2"/> {savedData.personal.website}
                        </p>
                    )}
                </div>
            </div>

            <div className="about m-4 border-b-2 border-blue-100/50">
                <h2 className="text-xl font-bold uppercase mb-4 text-center tracking-wider">About</h2>
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
            <div className="education m-4 border-b-2 border-blue-100/50"> 
                <h2 className="text-xl font-bold uppercase mb-4 text-center tracking-wider">Education</h2>

                <div className="flex">
                    <h3 className="font-bold mr-1 text-lg">{`${savedData.education.studyTitle} in ${savedData.education.studySubj}`} | </h3><h3 className="italic text-lg">{`${getMonthYear(savedData.education.studyStart)} - 
                    ${savedData.education.studyEnd != 'Present' ? getMonthYear(savedData.education.studyEnd) : savedData.education.studyEnd}`}</h3>
                </div>
                <p className="italic text-sm">{`${savedData.education.school} (${savedData.education.schoolCity})`}</p>

                <p className="mt-4 mb-5">{savedData.education.studyDescr}</p>
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
            <div className="professional m-4 border-b-2 border-blue-100/50"> 
                <h2 className="text-xl font-bold uppercase mb-4 text-center tracking-wider">Professional Experience</h2>

                <div className="flex">
                    <h3 className="font-bold mr-1 text-lg">{`${savedData.professional.jobTitle} at ${savedData.professional.company}`} | </h3>
                    <h3 className="italic text-lg">{`${getMonthYear(savedData.professional.jobStart)} - 
                    ${savedData.professional.jobEnd != 'Present' ? getMonthYear(savedData.professional.jobEnd) : savedData.professional.jobEnd}`}</h3>
                </div>
                <p className="text-sm italic">{savedData.professional.jobCity}</p>

                <p className="mt-4 mb-5">{savedData.professional.keyResponsibilities}</p>
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