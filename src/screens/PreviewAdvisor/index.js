import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch'
import Api from '../../services/api'
import PreviewAdvisorView from './PreviewAdvisor'

export default function PreviewAdvisor({ match }) {
  const [data, setData] = useState({
    advisor: null,
    questions: [],
    looaded: false,
    algoliaIndex: null,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const { advisor } = await Api.call(
          `/api/v1/advisors/${match.params.advisorId}`
        )
        const { questions } = await Api.call(
          `/api/v1/advisors/${match.params.advisorId}/questions`
        )
        const client = algoliasearch(
          advisor.algolia_app_id,
          advisor.algolia_search_api_key
        )
        const index = client.initIndex(advisor.algolia_index_name)

        setData({
          advisor,
          questions,
          loaded: true,
          algoliaIndex: index,
        })
      } catch (e) {
        setData({
          loaded: false,
          error: e,
        })
      }
    })()
  }, [match.params.advisorId])

  useEffect(() => {}, [match.params.advisorId])

  return (
    <PreviewAdvisorView
      advisor={data.advisor}
      questions={data.questions}
      algoliaIndex={data.algoliaIndex}
    />
  )
}
