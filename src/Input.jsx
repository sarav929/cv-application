const Input = ({ 
    label, 
    name, 
    type, 
    value, 
    onChange, 
    className, 
    error, 
    placeholder, 
    optional='', 
    as = 'input', 
    rows,
    maxLength,
    disabled = false,
    required = true
}) => {

    const Component = as // input, unless specified otherwise

    return (
      <div className="input-group">

        {label && <label htmlFor={name}>{label}<span className='optional-field'>{optional}</span></label>}

        <Component
          id={name}
          name={name}
          type={type}
          value={value}
          className={className}
          onChange={type === "checkbox" ? (e) => { onChange(className, e.target.checked)} 
            : (e) => { onChange(className, e.target.name, e.target.value) }}
          placeholder={placeholder}
          // only apply rows for textarea
          rows={as === "textarea" ? rows : undefined} 
          maxLength={as === "textarea" ? maxLength : undefined}
          disabled = {disabled}
          required = {required}
        />

        {error && <span className="error">{error}</span>}

      </div>
    )
  }

  export default Input