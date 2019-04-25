import React from 'react'
import { Link } from 'react-router-dom'

export default function AdvisorLine({ advisor }) {
  return (
    <div className="bg-white flex mb-3" style={{ height: 75 }}>
      <div className="w-1/4 text-center flex flex-col justify-center">
        <div className="font-medium">{advisor.name}</div>
        <div className="color-grey font-normal">#{advisor.id}</div>
      </div>

      <div className="w-1/4 flex items-center justify-center">
        {advisor.questions_count} questions
      </div>
      <div className="w-1/4 flex items-center justify-center">
        {renderDate(advisor.created_at)}
      </div>
      <div className="w-1/4 flex items-center justify-center">
        <Link
          to={`/advisor/${advisor.id}/edit`}
          className="font-medium no-underline"
        >
          Manage
        </Link>
      </div>
    </div>
  )
}

const renderDate = dateString => {
  return new Date(dateString).toLocaleString()
}
