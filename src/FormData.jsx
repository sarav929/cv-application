export default function FormData({ formData, setFormData, savedData, setSavedData }) {

    // on change update relevant section of formData
    const handleChange = (section, key, value) => {
        setFormData((prevData) => {
            const newData = {
                ...prevData,
                [section]: {
                    ...prevData[section],
                    [key]: value,
                },
            }
            return newData
        })
    }

    const handleSave = (e, data, section) => {
        // extract section from formData
        e.preventDefault()
        const dataSection = data[section]

        // copy into savedData section
        setSavedData((prevSavedData) => {
            const newSavedData = {
                ...prevSavedData,
                [section]: dataSection
            }
            return newSavedData
        })
    }

    return (
        <>
            {/* Personal Information Form */}
            <form className="personal" id="personal-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)}>
                <div className="personal-information">
                    <h2>Personal Information</h2>
                    <label>
                        Name
                        <input
                            type="text"
                            className="personal"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <input
                            type="text"
                            name="lastName"
                            className="personal"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            className="personal"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Phone
                        <input
                            type="text"
                            name="phone"
                            className="personal"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>

            {/* Education Form */}
            <form className="education" id="education-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)}>
                <div className="education">
                    <h2>Education</h2>
                    <label>
                        School
                        <input
                            type="text"
                            className="education"
                            name="school"
                            placeholder="School"
                            value={formData.school}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Title of Study
                        <input
                            type="text"
                            className="education"
                            name="studyTitle"
                            placeholder="Title of Study"
                            value={formData.studyTitle}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Start Date
                        <input
                            type="date"
                            className="education"
                            name="studyStart"
                            value={formData.studyStart}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Present
                        <input
                            type="checkbox"
                            className="education"
                            name="studyOngoing"
                            onChange={(e) => handleChangeCheckBox(e.target.className, e.target.name, e.target.value)}

                        />
                            
                    </label>
                    <label>
                        End Date
                        <input
                            type="date"
                            className="education"
                            name="studyEnd"
                            value={formData.studyEnd}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>

            {/* Professional Experience Form */}
            <form className="professional" id="professional-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)}>
                <div className="professional-information">
                    <h2>Professional Experience</h2>
                    <label>
                        Company
                        <input
                            type="text"
                            className="professional"
                            name="company"
                            placeholder="Company"
                            value={formData.company}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Job Title
                        <input
                            type="text"
                            className="professional"
                            name="jobTitle"
                            placeholder="Job Title"
                            value={formData.jobTitle}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Key Responsibilities
                        <textarea
                            maxLength={300}
                            className="professional"
                            placeholder="Key Responsibilities"
                            name="keyResponsibilities"
                            value={formData.keyResponsibilities}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <label>
                        Start Date
                        <input
                            type="date"
                            className="professional"
                            name="jobStart"
                            value={formData.jobStart}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}                            
                        />
                    </label>
                    <label>
                        Present
                        <input
                            type="checkbox"
                            className="professional"
                            name="jobOngoing"
                            onChange={(e) => handleChange(e.target.className, e.target.name, 'Present', e.target.checked)}
                        />
                    </label>
                    <label>
                        End Date
                        <input
                            type="date"
                            className="professional"
                            name="jobEnd"
                            value={formData.jobEnd}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                    </label>
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}
