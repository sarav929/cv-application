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
            <div className="text-center"> 
                <h1 className="text-4xl font-bold mb-5 uppercase">{`${savedData.personal.firstName} ${savedData.personal.lastName}`}</h1>
                <p className="flex items-center justify-center mt-4">
                    <img src={mailIcon} className="w-5 h-5 object-contain mr-2"/> {savedData.personal.email} 
                    <img src={callIcon} className="w-5 h-5 object-contain mr-2 ml-2"/> {savedData.personal.phone}
                </p>

                <p className="flex items-center justify-center mt-4">
                    <img src={webIcon} className="w-5 h-5 object-contain mr-2"/> {savedData.personal.website}
                </p>
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
        
        </>
    )    
}

export default function CVLayout({ savedData }) {

    return (
        <>
            <div className="flex flex-col w-full items-center">
                <div className="w-full bg-cyan-500 p-5">
                <RenderPersonal savedData={savedData}/>                 
                </div>

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