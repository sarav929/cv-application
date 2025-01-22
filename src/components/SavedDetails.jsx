import editIcon from '../assets/edit.png'

const SavedDetails = ({ className, id, onEdit, formData, section }) => {
    return (
        <div className={className} id={id}>
            <div className="flex items-center justify-between">
                <div className="saved-content">
                    {Object.entries(formData[section] || {}).map(([key, value]) => (
                        <p>{value || ""}</p>
                    ))}
                </div>
                <img src={editIcon} onClick={() => onEdit(section)} className="edit-button w-5 h-5 object-contain cursor-pointer"/>
            </div>
        </div>
    );
};

export default SavedDetails;
