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
import Input from './Input'

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
                    <Input
                        type="text"
                        label="First Name"
                        name="firstName"
                        className={'personal'}
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder=""
                    />
                    <Input
                        type="text"
                        label="Last Name"
                        name="lastName"
                        className={'personal'}
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder=""
                    />
                    
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        className={'personal'}
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder=""
                    />
                    <Input
                        type="text"
                        label="Phone"
                        name="phone"
                        className={'personal'}
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        placeholder=""
                    />
                    <Input
                        type="text"
                        label="Personal Website"
                        name="website"
                        className={'personal'}
                        value={formData.website}
                        onChange={handleChange}
                        error={errors.website}
                        placeholder=""
                        optional="(optional)"
                        required={false}
                    />
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>

            {/* Education Form */}
            <form className="education" id="education-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)} noValidate>
                <div className="education">
                    <h2>Education</h2>
                    <Input
                        type="text"
                        label="School"
                        name="school"
                        className={'education'}
                        value={formData.school}
                        onChange={handleChange}
                        error={errors.school}
                        placeholder=""
                    />

                    <Input
                        type="text"
                        label="City"
                        name="schoolCity"
                        className={'education'}
                        value={formData.schoolCity}
                        onChange={handleChange}
                        error={errors.schoolCity}
                        placeholder=""
                    />

                    <Input
                        type="text"
                        label="Title of Study"
                        name="studyTitle"
                        className={'education'}
                        value={formData.studyTitle}
                        onChange={handleChange}
                        error={errors.studyTitle}
                        placeholder=""
                    />

                    <Input
                        type="text"
                        label="Title of Study"
                        name="studyTitle"
                        className={'education'}
                        value={formData.studyTitle}
                        onChange={handleChange}
                        error={errors.studyTitle}
                        placeholder=""
                    />

                    <Input
                        label="Description"
                        name="studyDescr"
                        className={'education'}
                        value={formData.studyDescr}
                        onChange={handleChange}
                        error={errors.studyDescr}
                        placeholder=""
                        as="textarea"
                        optional="(optional)"
                        required={false}
                        rows={4}
                        maxLength={300}
                    />

                    <Input
                        type="date"
                        label="Start Date"
                        name="studyStart"
                        className={'education'}
                        value={formData.studyStart}
                        onChange={handleChange}
                        error={errors.studyStart}
                        placeholder=""
                    />

                    <Input
                        type="checkbox"
                        label="Present"
                        name="studyOngoing"
                        className={'education'}
                        onChange={handleCheckChange}
                    />

                    <Input
                        type="date"
                        label="End Date"
                        name="studyEnd"
                        className={'education'}
                        value={formData.studyEnd}
                        onChange={handleChange}
                        error={errors.studyEnd}
                        placeholder=""
                        disabled={formData.education.isEndDatePresent}
                    />
                
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>

            {/* Professional Experience Form */}
            <form className="professional" id="professional-information-form" onSubmit={(e) => handleSave(e, formData, e.target.className)} noValidate>
                <div className="professional-information">
                    <h2>Professional Experience</h2>
                    <Input
                        type="text"
                        label="Company"
                        name="Company"
                        className={'professional'}
                        value={formData.company}
                        onChange={handleChange}
                        error={errors.company}
                        placeholder=""
                    />
                    <Input
                        type="text"
                        label="City"
                        name="jobCity"
                        className={'professional'}
                        value={formData.jobCity}
                        onChange={handleChange}
                        error={errors.jobCity}
                        placeholder=""
                    />
                    <Input
                        type="text"
                        label="Job title"
                        name="jobTitle"
                        className={'professional'}
                        value={formData.jobTitle}
                        onChange={handleChange}
                        error={errors.jobTitle}
                        placeholder=""
                    />
                    <Input
                        as="textarea"
                        rows={4}
                        maxLength={300}
                        label="Key Responsibilities"
                        name="keyResponsibilities"
                        className={'professional'}
                        value={formData.keyResponsibilities}
                        onChange={handleChange}
                        error={errors.keyResponsibilities}
                        placeholder=""
                    />
                    <Input
                        type="date"
                        label="Start Date"
                        name="jobStart"
                        className={'professional'}
                        value={formData.jobStart}
                        onChange={handleChange}
                        error={errors.jobStart}
                        placeholder=""
                    />

                    <Input
                        type="checkbox"
                        label="Present"
                        name="jobOngoing"
                        className={'professional'}
                        onChange={handleCheckChange}
                    />

                    <Input
                        type="date"
                        label="End Date"
                        name="jobEnd"
                        className={'professional'}
                        value={formData.jobEnd}
                        onChange={handleChange}
                        error={errors.jobEnd}
                        placeholder=""
                        disabled={formData.professional.isEndDatePresent}
                    />
                    <button type="submit" className="save-info">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}
