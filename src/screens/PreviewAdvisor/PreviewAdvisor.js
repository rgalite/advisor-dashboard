import React from 'react'
import { Link } from 'react-router-dom'
import Bot from './Bot'

export default function PreviewAdvisorView({
  advisor,
  questions,
  algoliaIndex,
}) {
  return (
    <div>
      <h3 className="font-light text-2xl mb-10">
        <Link
          to="/advisors"
          className="no-underline text-blue font-medium cursor-pointer"
        >
          Advisors
        </Link>

        {advisor && (
          <>
            <span>&nbsp;/&nbsp;</span>
            <Link
              to="/advisors"
              className="no-underline text-blue font-medium cursor-pointer"
            >
              {advisor && advisor.name}
            </Link>
            <span>&nbsp;/&nbsp;</span>
            <span>Preview</span>
          </>
        )}
      </h3>

      <Bot
        advisor={advisor}
        questions={questions}
        algoliaIndex={algoliaIndex}
      />
    </div>
  )
}
