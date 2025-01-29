import editIcon from '../assets/icons/edit.png';
import deleteIcon from '../assets/icons/delete.png';
import getMonthYear from "../helper"

const SavedDetails = ({ className, id, onEdit, onDelete, formData, section }) => {

    const renderSectionData = (section, data) => {
        switch (section) {
            case "personal":
                return (
                    <>
                        <p>{`${data.firstName || ""} ${data.lastName || ""}`}</p>
                        <p>{data.email || ""}</p>
                        <p>{data.phone || ""}</p>
                        <p>{data.website || ""}</p>
                        <p>{data.about || ""}</p>
                    </>
                );

            case "education":
                return (
                    <>
                        <p>{`${data.studyTitle || ""} in ${data.studySubj || ""}`}</p>
                        <p>{`${data.school || ""} (${data.schoolCity || ""})`}</p>
                        <p>{`${getMonthYear(data.studyStart) || ""} - ${data.studyEnd != 'Present' ? getMonthYear(data.studyEnd) : data.studyEnd || ""}`}</p>
                        <p>{data.studyDescr || ""}</p>
                    </>
                );

            case "professional":
                return (
                    <>
                        <p>{`${data.jobTitle || ""} at ${data.company || ""}`}</p>
                        <p>{data.jobCity || ""}</p>
                        <p>{`${getMonthYear(data.jobStart) || ""} - ${data.jobEnd != 'Present' ? getMonthYear(data.jobEnd) : data.jobEnd || ""}`}</p>
                        <p>{data.keyResponsibilities || ""}</p>
                    </>
                );
            }
        }
    

    return (
        <div className={className} id={id}>
            <div className="flex items-center justify-between">
                <div className="saved-data">
                    {renderSectionData(section, formData[section] || {})}
                </div>
                <div className="flex text-center">
                    <img 
                        src={editIcon} 
                        onClick={() => onEdit(section)} 
                        className="edit-button w-5 h-5 object-contain cursor-pointer" 
                    />
                    <img 
                        src={deleteIcon} 
                        onClick={() => onDelete(section)} 
                        className="edit-button w-5 h-5 ml-3 object-contain cursor-pointer" 
                    />
                </div>
            </div>
        </div>
    );
};

export default SavedDetails;
