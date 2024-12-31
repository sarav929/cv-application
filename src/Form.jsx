const Form = ({
    className,
    id,
    onSubmit,
    noValidate = true,
    title,
    formData,
    errors,
    inputs
}) => {
    return (
        <>
            <form 
                className={className}
                id={id}
                onSubmit={(e) => { 
                    e.preventDefault()
                    onSubmit(className) 
                }}
                noValidate={noValidate}> 

                <div className={`${className}-information`}>
                    <h2>{title}</h2>
                    {inputs}
                </div>
                <button type="submit">Save</button>
            </form>
            
        </>
    )
}

export default Form