import React, { useEffect, useState, useCallback } from 'react'
import EditAdvisorView from './EditAdvisor'
import api from '../../services/api'

export default function EditAdvisorScreen({ match, history }) {
  const [data, setData] = useState({
    loaded: false,
    advisor: null,
    questions: [],
    error: null,
  })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [addingQuestion, setAddingQuestion] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState(null)

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
              results_page_url: advisorData.resultsPageUrl,
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

  const handleAddQuestionClick = useCallback(() => {
    setAddingQuestion(true)
  }, [])

  const handleEditQuestionClick = useCallback(questionId => {
    setEditingQuestionId(questionId)
  }, [])

  const handleDeleteQuestionClick = useCallback(questionId => {
    ;(async () => {
      try {
        await api.call(`/api/v1/questions/${questionId}`, {
          method: 'DELETE',
        })

        setData(data => ({
          ...data,
          questions: data.questions.filter(
            question => question.id !== questionId
          ),
        }))
      } catch (e) {
        setError(e)
        console.error(e)
      }
    })()
  }, [])

  const handleCancelQuestionClick = useCallback(() => {
    setAddingQuestion(false)
    setEditingQuestionId(null)
  }, [])

  const handleQuestionSubmit = useCallback(
    questionData => {
      ;(async () => {
        try {
          if (questionData.id) {
            // Updating
            const { question } = await api.call(
              `/api/v1/questions/${questionData.id}`,
              {
                method: 'PUT',
                body: JSON.stringify({
                  question: {
                    content: questionData.content,
                    algolia_facet_name: questionData.facetName,
                  },
                }),
              }
            )

            const index = data.questions.findIndex(
              question => question.id === questionData.id
            )

            setData(data => ({
              ...data,
              questions: [
                ...data.questions.slice(0, index),
                question,
                ...data.questions.slice(index + 1),
              ],
            }))
          } else {
            // Creating
            const { question } = await api.call(
              `/api/v1/advisors/${match.params.advisorId}/questions`,
              {
                method: 'POST',
                body: JSON.stringify({
                  question: {
                    content: questionData.content,
                    algolia_facet_name: questionData.facetName,
                  },
                }),
              }
            )

            setData(data => ({
              ...data,
              questions: [...data.questions, question],
            }))
          }

          setEditingQuestionId(null)
          setAddingQuestion(false)
        } catch (e) {
          setError(e)
        }
      })()
    },
    [data.questions, match.params.advisorId]
  )

  const handleCustomTextSubmit = useCallback(
    customTextData => {
      ;(async () => {
        await api.call(`/api/v1/advisors/${match.params.advisorId}`, {
          method: 'PUT',
          body: JSON.stringify({
            greeting_text: customTextData.greetingText,
            results_text: customTextData.resultsText,
            continue_text: customTextData.continueText,
            results_page_text: customTextData.resultsPageText,
            start_over_text: customTextData.startOverText,
          }),
        })
      })()
    },
    [match.params.advisorId]
  )

  useEffect(() => {
    ;(async () => {
      try {
        const { advisor } = await api.call(
          `/api/v1/advisors/${match.params.advisorId}`
        )
        const { questions } = await api.call(
          `/api/v1/advisors/${match.params.advisorId}/questions`
        )

        setData({
          loaded: true,
          advisor,
          questions,
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
      questions={data.questions}
      addingQuestion={addingQuestion}
      onAddQuestionClick={handleAddQuestionClick}
      onEditQuestionClick={handleEditQuestionClick}
      onDeleteQuestionClick={handleDeleteQuestionClick}
      onCancelQuestionClick={handleCancelQuestionClick}
      editingQuestionId={editingQuestionId}
      onQuestionSubmit={handleQuestionSubmit}
      onCustomTextSubmit={handleCustomTextSubmit}
    />
  )
}
