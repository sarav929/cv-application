import downIcon from './assets/down.png'

const Form = ({
    className,
    id,
    onSubmit,
    noValidate = true,
    title,
    icon,
    formData,
    errors,
    inputs
}) => {
    return (
        <>  
            <div className="form-wrapper">
                <form 
                    className={className}
                    id={id}
                    onSubmit={(e) => { 
                        e.preventDefault()
                        onSubmit(className) 
                    }}
                    noValidate={noValidate}> 

                    <div className="section-title">
                        <h2><img src={icon} className="section-icon"/>{title}</h2>
                        <img src={downIcon} className="section-expand"/>
                    </div>

                    <div className={`${className}-section`}>
                        {inputs} 
                        <button type="submit">Save</button>  
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default Form