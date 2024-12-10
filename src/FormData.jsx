export default function FormData({formData, setFormData}) {

    const handleChange = (key, value) => {
        const newData = {...formData, [key]: value}
        console.log(newData)
        setFormData(newData)
    }

    return (
        <>
            <form id="personal-information-form" onSubmit={(e) => e.preventDefault()}>
                <div className="personal-information">
                <h2>Personal Information</h2>
                <label htmlFor="firstName">Name
                    <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                    <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="email">Email
                    <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="phone">Phone
                    <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label> 
                <button type="submit" className="save-info">Save</button>
                </div>
            </form>

            <form id="education-information-form" onSubmit={(e) => e.preventDefault()}>
                <div className="education">
                <h2>Education</h2>
                <label htmlFor="school">School
                    <input
                    type="text"
                    name="school"
                    placeholder="School"
                    id="school"
                    value={formData.school}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="studyTitle">Title of Study
                    <input
                    type="text"
                    name="studyTitle"
                    placeholder="Title of Study"
                    id="studyTitle"
                    value={formData.studyTitle}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="studyStart">Start Date
                    <input
                    type="date"
                    name="studyStart"
                    id="studyStart"
                    value={formData.studyStart}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label> 
                <label htmlFor="studyOngoing">Present
                    <input
                    type="checkbox"
                    name="studyOngoing"
                    id="studyOngoing"
                    // to implement: if checked end date = present //
                    />
                </label> 
                <label htmlFor="studyEnd">End Date
                    <input
                    type="date"
                    name="studyEnd"
                    id="studyEnd"
                    value={formData.studyEnd}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <button type="submit" className="save-info">Save</button>
                </div>
            </form>


            <form id="professional-information-form" onSubmit={(e) => e.preventDefault()}>
                <div className="professional-information">
                <h2>Professional Experience</h2>
                <label htmlFor="company">Company
                    <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="jobTitle">Job Title
                    <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="keyResponsibilities">Key Responsibilities
                    <textarea
                    maxLength={300}
                    placeholder="Key Responsibilities"
                    name="keyResponsibilities"
                    id="keyResponsibilities"
                    value={formData.keyResponsibilities}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="jobStart">Start Date
                    <input
                    type="date"
                    name="jobStart"
                    id="jobStart"
                    value={formData.jobStart}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <label htmlFor="jobOngoing">Present
                    <input
                    type="checkbox"
                    name="jobOngoing"
                    id="jobOngoing"
                    // to implement: if checked end date = present //
                    />
                </label>
                <label htmlFor="jobEnd">End Date
                    <input
                    type="date"
                    name="jobEnd"
                    id="jobEnd"
                    value={formData.jobEnd}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </label>
                <button type="submit" className="save-info">Save</button>
                </div>
            </form>
        </>
    )
} 