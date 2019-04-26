import React, { useCallback } from 'react'

export default function QuestionItem({
  question,
  sortOrder,
  onEditClick,
  onDeleteClick,
  editable,
}) {
  const handleEditClick = useCallback(
    e => {
      e.preventDefault()
      onEditClick(question.id)
    },
    [onEditClick, question.id]
  )

  const handleDeleteClick = useCallback(
    e => {
      e.preventDefault()
      window.confirm('Are you sure you wish to delete this question?') &&
        onDeleteClick(question.id)
    },
    [onDeleteClick, question.id]
  )

  return (
    <div className="bg-white flex mb-3" style={{ height: 80 }}>
      <div className="w-1/5 text-center flex flex-col justify-center">
        <div className="color-grey font-normal">#{sortOrder + 1}</div>
      </div>

      <div className="w-2/5 flex items-center justify-center">
        {question.content}
      </div>

      <div className="w-1/5 flex items-center justify-center">
        {question.algolia_facet_name}
      </div>

      <div className="w-1/5 flex items-center justify-center">
        {editable && (
          <>
            <button
              className="font-medium no-underline text-blue cursor mx-4"
              onClick={handleEditClick}
            >
              Edit
            </button>

            <button
              className="font-medium no-underline text-red cursor mx-4"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}
