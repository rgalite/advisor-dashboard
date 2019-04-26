import React, { useCallback } from 'react'
import QuestionForm from './QuestionForm'
import QuestionItem from './QuestionItem'

export default function QuestionsList({
  questions,
  onAddQuestionClick,
  addingQuestion,
  onCancelQuestionClick,
  onQuestionSubmit,
  onEditQuestionClick,
  onDeleteQuestionClick,
  editingQuestionId,
}) {
  const handleAddClick = useCallback(
    e => {
      e.preventDefault()
      onAddQuestionClick()
    },
    [onAddQuestionClick]
  )

  return (
    <div className="bg-white px-8 py-12">
      <div className="pb-8 flex justify-between items-center">
        <span className="text-black-grey uppercase font-light text-sm">
          Questions
        </span>

        {questions.length > 0 && (
          <button
            onClick={handleAddClick}
            className="bg-blue-light text-white w-200 h-40 font-medium cursor-pointer rounded blue-transparent"
          >
            Add a new question
          </button>
        )}
      </div>

      <div>
        {questions.length > 0
          ? questions.map((question, index) =>
              question.id === editingQuestionId ? (
                <QuestionForm
                  key={question.id}
                  question={question}
                  sortOrder={question.sort_order}
                  onCancelClick={onCancelQuestionClick}
                  onSubmit={onQuestionSubmit}
                />
              ) : (
                <QuestionItem
                  key={question.id}
                  question={question}
                  sortOrder={index}
                  onEditClick={onEditQuestionClick}
                  onDeleteClick={onDeleteQuestionClick}
                  editable={!addingQuestion}
                />
              )
            )
          : !addingQuestion && (
              <div>
                No question has been added yet.{' '}
                <button
                  onClick={handleAddClick}
                  className="no-underline text-blue font-medium cursor-pointer"
                >
                  {' '}
                  Create a new one
                </button>
                .
              </div>
            )}
      </div>

      {addingQuestion && (
        <QuestionForm
          question={{}}
          onCancelClick={onCancelQuestionClick}
          onSubmit={onQuestionSubmit}
          sortOrder={questions.length + 1}
        />
      )}
    </div>
  )
}
