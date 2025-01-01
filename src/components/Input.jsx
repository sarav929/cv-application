const Input = ({ 
    label, 
    name, 
    type, 
    value, 
    onChange, 
    section,
    className = 'border border-black rounded-lg border-opacity-10 p-2 pl-3 pr-3', 
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

    // custom input styling //
    const flexDir = type === 'checkbox' ? 'flex-row' : 'flex-col' 
    const inputClass = `${className} ${as === "textarea" ? "resize-none" : ""}`

    return (
      <div className={`flex ${flexDir} gap-2 w-full`}>

        {label && <label className="flex gap-2 items-center" htmlFor={name}>{label}<span className="text-xs opacity-60">{optional}</span></label>}

        <Component
          id={name}
          name={name}
          type={type}
          value={value}
          className={inputClass}
          onChange={type === "checkbox" ? (e) => { onChange(section, e.target.checked)} 
            : (e) => { onChange(section, e.target.name, e.target.value) }}
          placeholder={placeholder}
          // only apply rows for textarea
          rows={as === "textarea" ? rows : undefined} 
          maxLength={as === "textarea" ? maxLength : undefined}
          disabled = {disabled}
          required = {required}
        />

        {error && <span className="text-sm text-red-400">{error}</span>}

      </div>
    )
  }

  export default Input