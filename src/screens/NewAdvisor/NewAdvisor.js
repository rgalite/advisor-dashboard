import React from 'react'
import { Link } from 'react-router-dom'
import AdvisorForm from '../EditAdvisor/AdvisorForm'

export default function NewAdvisorView({ advisor, onSubmit, submitting }) {
  return (
    <div>
      <h3 className="font-light text-2xl mb-10">
        <Link
          to="/advisors"
          className="no-underline text-blue font-medium cursor-pointer"
        >
          Advisors
        </Link>
        <span>&nbsp;/&nbsp;</span>
        <span>New Advisor</span>
      </h3>

      <AdvisorForm
        advisor={advisor}
        onSubmit={onSubmit}
        disabled={submitting}
      />
    </div>
  )
}
