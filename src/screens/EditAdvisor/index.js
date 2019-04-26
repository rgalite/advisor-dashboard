import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import EditAdvisorView from './EditAdvisor'
import api from '../../services/api'

export default function EditAdvisorScreen({ match, history }) {
  const [data, setData] = useState({
    loaded: false,
    advisor: null,
    questions: [],
    error: null,
  })
  const [addingQuestion, setAddingQuestion] = useState(false)
  const [editingQuestionId, setEditingQuestionId] = useState(null)

  const handleSubmit = useCallback(
    advisorData => {
      ;(async () => {
        const toastId = toast('Updating...', { autoClose: false })

        try {
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

          toast.update(toastId, {
            type: toast.TYPE.SUCCESS,
            render: 'Advisor successfully updated!',
            autoClose: true,
          })
        } catch (error) {
          console.error(error)
          toast.update(toastId, {
            type: toast.TYPE.ERROR,
            render: 'Oops an error occured!',
            autoClose: true,
          })
        }
      })()
    },
    [match.params.advisorId]
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
        console.error(e)
        toast.error('Oops an error occured')
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
        } catch (error) {
          console.error(error)
          toast.error('Oops an error occured')
        }
      })()
    },
    [data.questions, match.params.advisorId]
  )

  const handleCustomTextSubmit = useCallback(
    customTextData => {
      ;(async () => {
        const toastId = toast('Updating...', { autoClose: false })

        try {
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

          toast.update(toastId, {
            type: toast.TYPE.SUCCESS,
            render: 'Custom text successfully updated!',
            autoClose: true,
          })
        } catch (error) {
          console.error(error)
          toast.update(toastId, {
            type: toast.TYPE.ERROR,
            render: 'Oops an error occured',
            autoClose: true,
          })
        }
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
        })
        toast.error('Oops an error occured')
      }
    })()
  }, [match.params.advisorId])

  return (
    <EditAdvisorView
      loaded={data.loaded}
      advisor={data.advisor}
      onSubmit={handleSubmit}
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
