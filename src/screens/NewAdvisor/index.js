import React, { useState, useCallback } from 'react'
import NewAdvisorView from './NewAdvisor'
import api from '../../services/api'

export default function NewAdvisorScreen({ history }) {
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(
    advisorData => {
      ;(async () => {
        try {
          setSubmitting(true)

          await api.call(`/api/v1/advisors/`, {
            method: 'POST',
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
    [history]
  )

  return (
    <NewAdvisorView
      advisor={{}}
      error={error}
      onSubmit={handleSubmit}
      submitting={submitting}
    />
  )
}
