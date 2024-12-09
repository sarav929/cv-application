import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style.css'

function App() {


  return (
    <>
      <form>
        <h1>CV Generator</h1>

        <div className="personal-information">
          <h2>Personal Information</h2>
          <label htmlFor="firstName">Name
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              id="firstName"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              id="lastName"
            />
          </label>
          <label htmlFor="email">Email
            <input
              type="email"
              name="email"
              placeholder="Email address"
              id="email"
            />
          </label>
          <label htmlFor="phone">Phone
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              id="phone"
            />
          </label> 
        </div>

        <div className="education">
          <h2>Education</h2>
          <label htmlFor="school">School
            <input
              type="text"
              name="school"
              placeholder="School"
              id="school"
            />
          </label>
          <label htmlFor="studyTitle">Title of Study
            <input
              type="text"
              name="studyTitle"
              placeholder="Title of Study"
              id="studyTitle"
            />
          </label>
          <label htmlFor="studyStartDate">Start Date
            <input
              type="date"
              name="studyStartDate"
              id="studyStartDate"
            />
          </label> 
          <label htmlFor="studyOngoing">Present
            <input
              type="checkbox"
              name="studyOngoing"
              id="studyOngoing"
            />
          </label> 
          <label htmlFor="studyEndDate">End Date
            <input
              type="date"
              name="studyEndDate"
              id="studyEndDate"
            />
          </label>
        </div>

        <div className="professional-information">
          <h2>Professional Experience</h2>
          <label htmlFor="company">Company
            <input
              type="text"
              name="company"
              placeholder="Company"
              id="company"
            />
          </label>
          <label htmlFor="jobTitle">Job Title
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              id="jobTitle"
            />
          </label>
          <label htmlFor="keyResponsibilities">Key Responsibilities
            <textarea
              maxLength={300}
              placeholder="Key Responsibilities"
              name="keyResponsibilities"
              id="keyResponsibilities"
            />
          </label>
          <label htmlFor="jobStartDate">Start Date
            <input
              type="date"
              name="jobStartDate"
              id="jobStartDate"
            />
          </label>
          <label htmlFor="jobOngoing">Present
            <input
              type="checkbox"
              name="jobOngoing"
              id="jobOngoing"
            />
          </label>
          <label htmlFor="jobEndDate">End Date
            <input
              type="date"
              name="jobEndDate"
              id="jobEndDate"
            />
          </label>
        </div>

        <button type="submit">Generate CV</button>
      </form>
    </>
  )
}

export default App
