import React from 'react'
import AdvisorsTable from './AdvisorsTable'

export default function AdvisorsView({ advisors, loaded }) {
  return (
    <div>
      <h3 className="font-light text-2xl mb-10">Advisors</h3>

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
