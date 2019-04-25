import React from 'react'
import AdvisorLine from './AdvisorLine'

export default function AdvisorsTable({ advisors }) {
  return (
    <div>
      <div className="flex mb-3 uppercase text-xs text-grey font-medium">
        <div className="w-1/4 text-center flex flex-col justify-center">
          Name and #ID
        </div>

        <div className="w-1/4 flex items-center justify-center">
          # of questions
        </div>

        <div className="w-1/4 flex items-center justify-center">Created at</div>

        <div className="w-1/4 flex items-center justify-center">&nbsp;</div>
      </div>

      {advisors.map(advisor => (
        <AdvisorLine advisor={advisor} key={advisor.id} />
      ))}
    </div>
  )
}
