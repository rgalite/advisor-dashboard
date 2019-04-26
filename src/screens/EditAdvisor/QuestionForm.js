import React, { useCallback, useState } from 'react'

export default function QuestionForm({
  question,
  sortOrder,
  onSubmit,
  onCancelClick,
}) {
  const [questionData, setQuestionData] = useState({
    content: question.content,
    facetName: question.algolia_facet_name,
  })

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      onSubmit({
        ...questionData,
        id: question.id,
      })
    },
    [onSubmit, question.id, questionData]
  )

  const handleCancelClick = useCallback(
    e => {
      e.preventDefault()
      onCancelClick()
    },
    [onCancelClick]
  )

  const handleContentChange = useCallback(({ target }) => {
    setQuestionData(questionData => ({
      ...questionData,
      content: target.value,
    }))
  }, [])

  const handleFacetNameChange = useCallback(({ target }) => {
    setQuestionData(questionData => ({
      ...questionData,
      facetName: target.value,
    }))
  }, [])

  return (
    <form>
      <div className="bg-white flex mb-3" style={{ height: 75 }}>
        <div className="w-1/5 text-center flex flex-col justify-center px-4">
          <div className="color-grey font-normal">#{sortOrder}</div>
        </div>

        <div className="w-2/5 flex items-center justify-center px-4">
          <input
            type="text"
            value={questionData.content || ''}
            onChange={handleContentChange}
            className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-full rounded"
          />
        </div>

        <div className="w-1/5 flex items-center justify-center px-4">
          <input
            type="text"
            value={questionData.facetName || ''}
            onChange={handleFacetNameChange}
            className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-full rounded"
          />
        </div>

        <div className="w-1/5 flex items-center justify-center px-4">
          <button
            type="submit"
            className="bg-blue text-white w-200 h-40 font-medium cursor-pointer rounded "
            onClick={handleSubmit}
          >
            Save
          </button>

          <button
            className="font-medium no-underline text-blue cursor mx-4"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
