// NEX FEATURES //
// 1. Add form validation and feedback
// 1.1 Create optional fields
// 2. expand/collapse sections while filling in 
// 3. add a plus in education and professional to add more entries

// 4. Once saved there's the possibility to edit and re-submit the modified fields
// 5. Add a customise section with accent color, font, layout etc.
// 6. add option to print / download the cv

import * as Yup from 'yup'
import { useState } from 'react'

export default function FormData({ formData, setFormData, savedData, setSavedData }) {

    // add state for errors in form validation

    const [errors, setErrors] = useState({})

    // yup validation schema - nested yup objects for each section

    const validationSchema = {
        // personal // 
        personal: Yup.object({
            firstName: Yup.string()
                .matches(/^[a-zA-Z]+$/, "Enter a valid first name")
                .required("First name is required"),
            lastName: Yup.string()
                .matches(/^[a-zA-Z]+$/, "Enter a valid last name")
                .required("Last name is required"),
            email: Yup.string()
                .required("Email is required")
                .email("Invalid email format"),
            phone: Yup.string()
                .matches(/^\d{11}$/, "Phone number must be 11 digits")
                .required("Phone number is required"),
            website: Yup.string()
                .nullable()
        }),
        // education // 
        education: Yup.object({
            school: Yup.string()
                .required("School name is required"),
            studyTitle: Yup.string()
                .required("Study title is required"),
            schoolCity: Yup.string()
                .matches(/^[a-zA-Z]+$/, "Enter a valid city")
                .nullable(),
            studyStart: Yup.string()
                .required("Start date is required"),
            studyEnd: Yup.string()
                .required("End date is required")
                .test("Valid end date", "End date must be after the start date or 'Present'", function (value) {
                    // return true if 'present'
                    if (value === 'Present') {
                        return true
                    } 
                    const { studyStart } = this.parent
                    // check if it's a valid date
                    const isDateValid = !isNaN(Date.parse(value)) 
                    // check if it's after startDate
                    const isAfterStart = new Date(value) > new Date(studyStart) 
                    return isDateValid && isAfterStart;
                }),
            studyDescr: Yup.string()
                .nullable()
        }),
        // professional // 
        professional: Yup.object({
            company: Yup.string()
                .required("Company name is required"),
            jobTitle: Yup.string()
                .required("Job title is required"),
            jobCity: Yup.string()
                .matches(/^[a-zA-Z]+$/, "Enter a valid city")
                .nullable(),
            keyResponsibilities: Yup.string()
                .required("Job responsibilities are required"),
            jobStart: Yup.date()
                .required("Start date is required"),
            jobEnd: Yup.string()
                .required("End date is required")
                .test("Valid end date", "End date must be after the start date or 'Present'", function (value) {
                    // return true if 'present'
                    if (value === 'Present') {
                        return true
                    }
                    const { jobStart } = this.parent
                    // check if it's a valid date
                    const isDateValid = !isNaN(Date.parse(value)) 
                    // check if it's after startDate
                    const isAfterStart = new Date(value) > new Date(jobStart) 
                    return isDateValid && isAfterStart;
                })
        }),
    }
      
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

    // function to get value from checkbox in end date
    const handleCheckChange = (section, checked) => {
        setFormData((prevData) => {
            const keyPrefix = section === 'education' ? 'study' : 'job'
            const updatedSection = {
                ...prevData[section],
                [`${keyPrefix}End`]: checked ? 'Present' : '',
                isEndDatePresent: checked,
            }

            console.log(updatedSection)
      
            return {
                ...prevData,
                [section]: updatedSection,
            }
        })
    }

    // handle save section //
    const handleSave = async (e) => {

        e.preventDefault()
        const section = e.target.className

        // get updated data 
        const currentData = {
            ...formData[section],
        }


        try {
            await validationSchema[section].validate(currentData, {abortEarly: false})

            // Update the saved data state
            setSavedData((prevData) => ({
                ...prevData,
                [section]: currentData,
            }))

            // clear errors 
            setErrors({})

        } catch (error) {
            const newErrors = {}
        
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message
            })
            setErrors(newErrors)
        }
    }

    return (
        <>
            {/* Personal Information Form */}
            <form className="personal" id="personal-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)} noValidate>
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
                            required
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.firstName}</div>
                        <input
                            type="text"
                            name="lastName"
                            className="personal"
                            placeholder="Last Name"
                            value={formData.lastName}
                            required
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.lastName}</div>
                    </label>
                    
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            className="personal"
                            placeholder="Email address"
                            value={formData.email}
                            required
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.email}</div>
                    </label>
                    <label>
                        Phone
                        <input
                            type="text"
                            name="phone"
                            className="personal"
                            placeholder="Phone number"
                            value={formData.phone}
                            required
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.phone}</div>
                    </label>
                    <label>
                        Personal Website <span className="optional-field">(optional)</span>
                        <input
                            type="url"
                            name="website"
                            className="personal"
                            placeholder="Personal Website"
                            value={formData.website}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.website}</div>
                    </label>
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>

            {/* Education Form */}
            <form className="education" id="education-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)} noValidate>
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
                            required
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.school}</div>
                    </label>

                    <label>
                        City
                        <input
                            type="text"
                            className="education"
                            name="schoolCity"
                            placeholder="City"
                            value={formData.schoolCity}
                            required
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.schoolCity}</div>
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
                        <div className="error">{errors.studyTitle}</div>
                    </label>

                    <label>
                        Description <span className="optional-field">(optional)</span>
                        <textarea
                            maxLength={300}
                            className="education"
                            placeholder="Description"
                            name="studyDescr"
                            value={formData.studyDescr}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.studyDescr}</div>
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
                        <div className="error">{errors.studyStart}</div>
                    </label>
                    <label>
                        Present
                        <input
                            type="checkbox"
                            className="education"
                            name="studyOngoing"
                            onChange={(e) => handleCheckChange('education', e.target.checked)}

                        />     
                    </label>
                    
                    <label>
                        End Date
                        <input
                            type="date"
                            className="education"
                            name="studyEnd"
                            value={formData.studyEnd}
                            disabled={formData.education.isEndDatePresent}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.studyEnd}</div>
                    </label>
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>

            {/* Professional Experience Form */}
            <form className="professional" id="professional-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)} noValidate>
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
                        <div className="error">{errors.company}</div>
                    </label>
                    <label>
                        City
                        <input
                            type="text"
                            className="professional"
                            name="jobCity"
                            placeholder="City"
                            value={formData.jobCity}
                            required
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.jobCity}</div>
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
                        <div className="error">{errors.jobTitle}</div>
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
                        <div className="error">{errors.keyResponsibilities}</div>
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
                        <div className="error">{errors.jobStart}</div>
                    </label>
                    <label>
                        Present
                        <input
                            type="checkbox"
                            className="professional"
                            name="jobOngoing"
                            value="Present"
                            onChange={(e) => handleCheckChange('professional', e.target.checked)}
                        />
                    </label>
                    <label>
                        End Date
                        <input
                            type="date"
                            className="professional"
                            name="jobEnd"
                            value={formData.jobEnd}
                            disabled={formData.professional.isEndDatePresent}
                            onChange={(e) => handleChange(e.target.className, e.target.name, e.target.value)}
                        />
                        <div className="error">{errors.jobEnd}</div>
                    </label>
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}
