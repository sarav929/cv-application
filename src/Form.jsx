const Form = ({
    className,
    id,
    onSubmit,
    noValidate = true,
    inputs
}) => {
    return (
        <>
            <form 
                className={className}
                id={id}
                onSubmit={(e) => { onSubmit(formData, className) }}
                noValidate={noValidate}> 

                <div className={`${className}-information`}>
                    {inputs}
                </div>

                <button type="submit">Save</button>
            </form>
            
        </>
    )
}