import React from 'react'
import AdvisorForm from './AdvisorForm'

export default function EditAdvisorView({ advisor, onSubmit, submitting }) {
  return (
    <div>
      <h3 className="font-light text-2xl mb-10">
        Advisor {advisor && advisor.name}
      </h3>

      {advisor && (
        <AdvisorForm
          advisor={advisor}
          onSubmit={onSubmit}
          disabled={submitting}
        />
      )}
    </div>
  )
}
