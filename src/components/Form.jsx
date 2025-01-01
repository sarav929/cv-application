import downIcon from '../assets/down.png'

const Form = ({
    className = "flex flex-col items-center gap-1 w-full",
    id,
    onSubmit,
    onClick,
    onEdit,
    noValidate = true,
    title,
    icon,
    formData,
    errors,
    section,
    isExpanded,
    isSubmitted,
    inputs
}) => {

    const handleEditClick = () => {
        onClick(section)
        onEdit(section)
    }

    return (
        <>  
            <div className="flex flex-col justify-center gap-1 bg-gray-50 border border-transparent rounded-lg p-8">
                <form 
                    className={className}
                    id={id}
                    onSubmit={(e) => { 
                        e.preventDefault()
                        onSubmit(section) 
                    }}
                    noValidate={noValidate}> 

                    <div className="flex flex-row items-center justify-between w-full">
                        <h2 className="flex font-bold text-2xl"><img src={icon} className="w-8 h-8 object-contain pr-3"/>{title}</h2>
                        <img src={downIcon} className="w-7" onClick={() => !isSubmitted && onClick(section)} 
                        style={{ cursor: isSubmitted ? 'default' : 'pointer' }}/>
                    </div>

                    {isExpanded && (
                        <div className={`${className}-section flex flex-col justify-center gap-3 w-full mt-6`}>
                            {inputs.map(input => input)} 
                            <button className="p-2 m-4 bg-white w-1/2 self-center" type="submit">Save</button> 
                        </div>
                    )}

                    {isSubmitted && !isExpanded && formData[section] && (
                        <button className="p-2 m-4 bg-white w-1/2 self-center" onClick={handleEditClick}>Edit</button>
                    )}
                    
                </form>
            </div>
        </>
    )
}

export default Form