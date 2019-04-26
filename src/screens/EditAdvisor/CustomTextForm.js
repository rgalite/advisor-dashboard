import React, { useCallback, useState } from 'react'

export default function CustomTextForm({ advisor, onSubmit, disabled }) {
  const [data, setData] = useState({
    greetingText: advisor.greeting_text,
    resultsText: advisor.results_text,
    continueText: advisor.continue_text,
    resultsPageText: advisor.results_page_text,
    startOverText: advisor.start_over_text,
  })

  const handleGreetingTextChange = useCallback(({ target }) => {
    setData(data => ({
      ...data,
      greetingText: target.value,
    }))
  }, [])

  const handleResultsTextChange = useCallback(({ target }) => {
    setData(data => ({
      ...data,
      resultsText: target.value,
    }))
  }, [])

  const handleContinueTextChange = useCallback(({ target }) => {
    setData(data => ({
      ...data,
      continueText: target.value,
    }))
  }, [])

  const handleResultsPageTextChange = useCallback(({ target }) => {
    setData(data => ({
      ...data,
      resultsPageText: target.value,
    }))
  }, [])

  const handleStartoverTextChange = useCallback(({ target }) => {
    setData(data => ({
      ...data,
      startOverText: target.value,
    }))
  }, [])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      onSubmit(data)
    },
    [data, onSubmit]
  )

  return (
    <div className="bg-white px-8 py-12">
      <form onSubmit={handleSubmit}>
        <div className="pb-8">
          <span className="text-black-grey uppercase font-light text-sm">
            Custom text
          </span>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Greeting text
            </span>
            <input
              disabled={disabled}
              onChange={handleGreetingTextChange}
              value={data.greetingText || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Results text
            </span>
            <input
              disabled={disabled}
              onChange={handleResultsTextChange}
              value={data.resultsText || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Continue text
            </span>
            <input
              disabled={disabled}
              onChange={handleContinueTextChange}
              value={data.continueText || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Results page text
            </span>
            <input
              disabled={disabled}
              onChange={handleResultsPageTextChange}
              value={data.resultsPageText || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Start Over text
            </span>
            <input
              disabled={disabled}
              onChange={handleStartoverTextChange}
              value={data.startOverText || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div>
          <button
            type="Submit"
            className="bg-blue text-white h-40 w-200 rounded hover:bg-blue-dark"
            disabled={disabled}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  )
}
