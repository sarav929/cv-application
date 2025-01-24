// NEX FEATURES //

// 3. add a plus in education and professional to add more entries

// 4. Once saved there's the possibility to edit and re-submit the modified fields
// 5. Add a customise section with accent color, font, layout etc.
// 6. add option to print / download the cv

import * as Yup from 'yup'
import { useState } from 'react'
import Input from './Input'
import Form from './Form'

import personalIcon from '../assets/personal.png'
import educationIcon from '../assets/study.png'
import professionalIcon from '../assets/job.png'

export default function FormData({ formData, setFormData, savedData, setSavedData }) {

    // add state for errors in form validation

    const [errors, setErrors] = useState({})

    // add state for expanding/collapsing sections

    const [expandedSection, setExpandedSection] = useState({
        personal: false,
        education: false,
        professional: false
    })

    // add state for submitted form

    const [submittedForm, setSubmittedForm] = useState({
        personal: false,
        education: false,
        professional: false
    })

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
            studySubj: Yup.string()
                .required("Study subject is required"),
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
            console.log(newData)
            return newData
            
        })
    }

    // clear relevant section of formData
    const handleDelete = (section) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [section]: {}, 
        }));

        setSavedData((prevSavedData) => ({
            ...prevSavedData,
            [section]: {}, 
        }));

        setSubmittedForm((prevForm) => ({
            ...prevForm,
            [section]: false, // Set the clicked section as not submitted
        }))
    };

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
    const handleSave = async (section) => {

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

            setSubmittedForm((prevForm) => ({
                ...prevForm,
                [section]: true,
            }))

            // clear errors 
            setErrors({})
            expandSection(section)

        } catch (error) {
            const newErrors = {}
        
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message
            })
            setErrors(newErrors)
        }
    }

    const expandSection = (section) => {
        setExpandedSection((prevSection) => ({
            personal: section === "personal" ? !prevSection.personal : false,
            education: section === "education" ? !prevSection.education : false,
            professional: section === "professional" ? !prevSection.professional : false
        }))
    }

    const editSection = (section) => {
        setSubmittedForm((prevForm) => ({
            ...prevForm,
            [section]: false, // Set the clicked section as not submitted
        }))
    }

    return (
        <>
            {/* Personal Information Form */}
            <Form 
                id="personal-information-form"
                onSubmit={handleSave}
                onClick={expandSection}
                onEdit={editSection}
                onDelete={handleDelete}
                title="Personal Information"
                icon={personalIcon}
                formData={formData}
                errors={errors}
                isExpanded={expandedSection.personal}
                isSubmitted={submittedForm.personal}
                section="personal"
                inputs={[
                    <Input
                        key="firstName"
                        type="text"
                        label="First Name"
                        name="firstName"
                        section="personal"
                        value={formData.personal.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder=""
                    />,
                    <Input
                        key="lastName"
                        type="text"
                        label="Last Name"
                        name="lastName"
                        section="personal"
                        value={formData.personal.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        placeholder=""
                    />,
                    <Input
                        key="email"
                        type="email"
                        label="Email"
                        name="email"
                        section="personal"                        
                        value={formData.personal.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder=""
                    />,
                    <Input
                        key="phone"
                        type="text"
                        label="Phone"
                        name="phone"
                        section="personal"                        
                        value={formData.personal.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        placeholder=""
                    />,
                    <Input
                        key="website"
                        type="text"
                        label="Personal Website"
                        name="website"
                        section="personal"                        
                        value={formData.personal.website}
                        onChange={handleChange}
                        error={errors.website}
                        placeholder=""
                        optional="(optional)"
                        required={false}
                    /> 
                ]}
            />
            

            {/* Education Form */}
            <Form 
                id="education-information-form"
                onSubmit={handleSave}
                onClick={expandSection}
                onEdit={editSection}
                onDelete={handleDelete}
                title="Education"
                icon={educationIcon}
                formData={formData}
                errors={errors}
                isExpanded={expandedSection.education}
                isSubmitted={submittedForm.education}
                section="education"
                inputs={[
                    <Input
                        key="school"
                        type="text"
                        label="School"
                        name="school"
                        section="education"
                        value={formData.education.school}
                        onChange={handleChange}
                        error={errors.school}
                        placeholder=""
                    />,

                    <Input
                        key="schoolCity"
                        type="text"
                        label="City"
                        name="schoolCity"
                        section="education"                        
                        value={formData.education.schoolCity}
                        onChange={handleChange}
                        error={errors.schoolCity}
                        placeholder=""
                    />,

                    <Input
                        key="studyTitle"
                        type="text"
                        label="Title of Study"
                        name="studyTitle"
                        section="education"                        
                        value={formData.education.studyTitle}
                        onChange={handleChange}
                        error={errors.studyTitle}
                        placeholder=""
                    />,

                    <Input
                        key="studySubj"
                        type="text"
                        label="Subject"
                        name="studySubj"
                        section="education"                        
                        value={formData.education.studySubj}
                        onChange={handleChange}
                        error={errors.studySubj}
                        placeholder=""
                    />,

                    <Input
                        key="studyDescr"
                        label="Description"
                        name="studyDescr"
                        section="education"
                        className={'border border-black rounded-lg border-opacity-10 resize-none p-1 pl-2 pr-2'}
                        value={formData.education.studyDescr}
                        onChange={handleChange}
                        error={errors.studyDescr}
                        placeholder=""
                        as="textarea"
                        optional="(optional)"
                        required={false}
                        rows={4}
                        maxLength={300}
                    />,

                    <Input
                        key="studyStart"
                        type="date"
                        label="Start Date"
                        name="studyStart"
                        section="education"                        
                        value={formData.education.studyStart}
                        onChange={handleChange}
                        error={errors.studyStart}
                        placeholder=""
                    />,

                    <Input
                        key="studyOngoing"
                        type="checkbox"
                        label="Present"
                        section="education"
                        name="studyOngoing"
                        checked= {formData.education.studyEnd === 'Present'}                      
                        onChange={handleCheckChange}
                    />,

                    <Input
                        key="studyEnd"
                        type="date"
                        label="End Date"
                        name="studyEnd"
                        section="education"                        
                        value={formData.education.studyEnd}
                        onChange={handleChange}
                        error={errors.studyEnd}
                        placeholder=""
                        disabled={formData.education.isEndDatePresent}
                    />
                ]}
            />

            {/* Professional Experience Form */}

            <Form 
                className="professional"
                id="professional-information-form"
                onSubmit={handleSave}
                onClick={expandSection}
                onEdit={editSection}
                onDelete={handleDelete}
                title="Professional Experience"
                icon={professionalIcon}
                formData={formData}
                errors={errors}
                isExpanded={expandedSection.professional}
                isSubmitted={submittedForm.professional}
                section="professional"
                inputs={[
                    <Input
                        key="company"
                        type="text"
                        label="Company"
                        name="company"
                        section="professional"                        
                        value={formData.professional.company}
                        onChange={handleChange}
                        error={errors.company}
                        placeholder=""
                    />,
                    <Input
                        key="jobCity"
                        type="text"
                        label="City"
                        name="jobCity"
                        section="professional"                        
                        value={formData.professional.jobCity}
                        onChange={handleChange}
                        error={errors.jobCity}
                        placeholder=""
                    />,
                    <Input
                        key="jobTitle"
                        type="text"
                        label="Job title"
                        name="jobTitle"
                        section="professional"                        
                        value={formData.professional.jobTitle}
                        onChange={handleChange}
                        error={errors.jobTitle}
                        placeholder=""
                    />,
                    <Input
                        key="keyResponsibilities"
                        as="textarea"
                        rows={4}
                        maxLength={300}
                        label="Key Responsibilities"
                        name="keyResponsibilities"
                        section="professional"
                        className={'border border-black rounded-lg border-opacity-10 resize-none p-1 pl-2 pr-2'}
                        value={formData.professional.keyResponsibilities}
                        onChange={handleChange}
                        error={errors.keyResponsibilities}
                        placeholder=""
                    />,
                    <Input
                        key="jobStart"
                        type="date"
                        label="Start Date"
                        name="jobStart"
                        section="professional"                        
                        value={formData.professional.jobStart}
                        onChange={handleChange}
                        error={errors.jobStart}
                        placeholder=""
                    />,
                    <Input
                        key="jobOngoing"
                        type="checkbox"
                        label="Present"
                        name="jobOngoing"
                        section="professional"
                        checked={formData.professional.jobEnd === 'Present'}                        
                        onChange={handleCheckChange}
                    />,
                    <Input
                        key="jobEnd"
                        type="date"
                        label="End Date"
                        name="jobEnd"
                        section="professional"                        
                        value={formData.professional.jobEnd}
                        onChange={handleChange}
                        error={errors.jobEnd}
                        placeholder=""
                        disabled={formData.professional.isEndDatePresent}
                    />
                ]}
            />
        </>
    )
}
