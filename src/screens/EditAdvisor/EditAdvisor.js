import React from 'react'
import { Link } from 'react-router-dom'
import AdvisorForm from './AdvisorForm'
import QuestionsList from './Questions'
import CustomTextForm from './CustomTextForm'

export default function EditAdvisorView({
  advisor,
  onSubmit,
  submitting,
  questions,
  addingQuestion,
  onAddQuestionClick,
  onDeleteQuestionClick,
  onEditQuestionClick,
  editingQuestionId,
  onCancelQuestionClick,
  onQuestionSubmit,
  onCustomTextSubmit,
}) {
  return (
    <div>
      <h3 className="font-light text-2xl mb-10">
        <Link
          to="/advisors"
          className="no-underline text-blue font-medium cursor-pointer"
        >
          Advisors
        </Link>
        <span>&nbsp;/&nbsp;</span>
        <span>{advisor && advisor.name}</span>
      </h3>

      {advisor && (
        <>
          <div className="mb-12">
            <AdvisorForm
              advisor={advisor}
              onSubmit={onSubmit}
              disabled={submitting}
            />
          </div>

          <div className="mb-12">
            <QuestionsList
              questions={questions}
              addingQuestion={addingQuestion}
              onAddQuestionClick={onAddQuestionClick}
              onDeleteQuestionClick={onDeleteQuestionClick}
              onEditQuestionClick={onEditQuestionClick}
              editingQuestionId={editingQuestionId}
              onCancelQuestionClick={onCancelQuestionClick}
              onQuestionSubmit={onQuestionSubmit}
              disabled={submitting}
            />
          </div>

          <CustomTextForm
            advisor={advisor}
            onSubmit={onCustomTextSubmit}
            disabled={submitting}
          />
        </>
      )}
    </div>
  )
}
