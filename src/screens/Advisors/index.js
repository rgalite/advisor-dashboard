import React, { useEffect, useState } from 'react'
import AdvisorsView from './Advisors'
import Api from '../../services/api'

export default function AdvisorsScreen() {
  const [data, setData] = useState({
    loaded: false,
    advisors: [],
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { advisors } = await Api.call('/api/v1/advisors')
        setData({
          loaded: true,
          advisors,
        })
      } catch (e) {
        setError(e)
      }
    })()
  }, [])

  return (
    <AdvisorsView advisors={data.advisors} loaded={data.loaded} error={error} />
  )
}
