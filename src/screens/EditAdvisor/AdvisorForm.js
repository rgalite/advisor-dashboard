import React, { useCallback, useState } from 'react'

export default function AdvisorForm({ advisor, onSubmit, disabled }) {
  const [advisorData, setAdvisorData] = useState({
    name: advisor.name,
    algoliaAppId: advisor.algolia_app_id,
    algoliaSearchApiKey: advisor.algolia_search_api_key,
    algoliaIndexName: advisor.algolia_index_name,
    resultsPageUrl: advisor.results_page_url,
  })

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      onSubmit(advisorData)
    },
    [advisorData, onSubmit]
  )

  const handleNameChange = useCallback(
    ({ target }) =>
      setAdvisorData(advisorData => ({
        ...advisorData,
        name: target.value,
      })),
    []
  )

  const handleAlgoliaAppIdChange = useCallback(
    ({ target }) =>
      setAdvisorData(advisorData => ({
        ...advisorData,
        algoliaAppId: target.value,
      })),
    []
  )

  const handleAlgoliaSearchApiKeyChange = useCallback(
    ({ target }) =>
      setAdvisorData(advisorData => ({
        ...advisorData,
        algoliaSearchApiKey: target.value,
      })),
    []
  )

  const handleAlgoliaIndexNameChange = useCallback(
    ({ target }) =>
      setAdvisorData(advisorData => ({
        ...advisorData,
        algoliaIndexName: target.value,
      })),
    []
  )

  const handleResultsPageUrlChange = useCallback(
    ({ target }) =>
      setAdvisorData(
        advisorData => ({
          ...advisorData,
          resultsPageUrl: target.value,
        }),
        []
      ),
    []
  )

  return (
    <div className="bg-white px-8 py-12">
      <form onSubmit={handleSubmit}>
        <div className="pb-8">
          <span className="text-black-grey uppercase font-light text-sm">
            General
          </span>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Name
            </span>
            <input
              disabled={disabled}
              onChange={handleNameChange}
              value={advisorData.name || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Algolia App Id
            </span>
            <input
              disabled={disabled}
              onChange={handleAlgoliaAppIdChange}
              value={advisorData.algoliaAppId || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Algolia Search Api key
            </span>
            <input
              disabled={disabled}
              onChange={handleAlgoliaSearchApiKeyChange}
              value={advisorData.algoliaSearchApiKey || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Algolia Index Name
            </span>
            <input
              disabled={disabled}
              onChange={handleAlgoliaIndexNameChange}
              value={advisorData.algoliaIndexName || ''}
              className="bg-grey-light h-40 border border-blue-input py-3 px-4 w-400 rounded"
            />
          </label>
        </div>

        <div className="pb-8">
          <label className="">
            <span className="block uppercase text-black-grey font-medium pb-2 text-xs">
              Results page URL
            </span>
            <input
              disabled={disabled}
              onChange={handleResultsPageUrlChange}
              value={advisorData.resultsPageUrl || ''}
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
