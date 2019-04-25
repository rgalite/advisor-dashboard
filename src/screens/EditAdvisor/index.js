import React, { useEffect, useState, useCallback } from 'react'
import EditAdvisorView from './EditAdvisor'
import api from '../../services/api'

export default function EditAdvisorScreen({ match, history }) {
  const [data, setData] = useState({
    loaded: false,
    advisor: null,
    error: null,
  })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(
    advisorData => {
      ;(async () => {
        try {
          setSubmitting(true)

          await api.call(`/api/v1/advisors/${match.params.advisorId}`, {
            method: 'PUT',
            body: JSON.stringify({
              name: advisorData.name,
              algolia_app_id: advisorData.algoliaAppId,
              algolia_search_api_key: advisorData.algoliaSearchApiKey,
              algolia_index_name: advisorData.algoliaIndexName,
            }),
          })

          history.push(`/advisors`)
        } catch (e) {
          setError(e)
        } finally {
          setSubmitting(false)
        }
      })()
    },
    [history, match.params.advisorId]
  )

  useEffect(() => {
    ;(async () => {
      try {
        const { advisor } = await api.call(
          `/api/v1/advisors/${match.params.advisorId}`
        )
        setData({
          loaded: true,
          advisor,
        })
      } catch (e) {
        setData({
          loaded: true,
          error: e,
        })
        setError(e)
      }
    })()
  }, [match.params.advisorId])

  return (
    <EditAdvisorView
      loaded={data.loaded}
      advisor={data.advisor}
      error={error}
      onSubmit={handleSubmit}
      submitting={submitting}
    />
  )
}
