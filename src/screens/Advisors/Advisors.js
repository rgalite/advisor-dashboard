import React from 'react'
import { Link } from 'react-router-dom'
import AdvisorsTable from './AdvisorsTable'

export default function AdvisorsView({ advisors, loaded }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-light text-2xl">Advisors</h3>
        <Link
          to="/advisors/new"
          className="no-underline bg-blue text-white w-200 h-40 text-center flex items-center justify-center rounded hover:bg-blue-dark"
        >
          <span>
            <i className="fas fa-plus" />
            &nbsp; New advisor
          </span>
        </Link>
      </div>

      {loaded ? (
        advisors.length ? (
          <AdvisorsTable advisors={advisors} />
        ) : (
          <div>No advisors for now</div>
        )
      ) : null}
    </div>
  )
}
