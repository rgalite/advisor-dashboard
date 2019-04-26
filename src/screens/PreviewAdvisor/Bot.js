import React, { useEffect, useRef, useCallback } from 'react'
import BotUI from 'botui'

import './Bot.css'
import 'botui/build/botui.min.css'
import 'botui/build/botui-theme-default.css'

export default function Bot({ advisor, questions, algoliaIndex }) {
  const botUi = useRef(null)

  const startQuestionnaire = useCallback(
    botui => {
      ;(async () => {
        const facets = []

        await questions.reduce(async (prev, question) => {
          // Make sure previous question has been asked and replied
          await prev

          // Load the facet values for this question
          const facetHits = await botui.message
            .add({
              loading: true,
              delay: 1000,
              cssClass: 'bot-msg',
            })
            .then(async index => {
              const { facetHits } = await algoliaIndex.searchForFacetValues({
                facetName: question.algolia_facet_name,
                facetQuery: '',
                facetFilters: facets.map(facetFilter => facetFilter.join(':')),
              })

              await botui.message.update(index, {
                loading: false,
                content: question.content,
              })

              return facetHits.slice(0, 10).map(facetHit => facetHit.value)
            })

          await botui.action
            .button({
              cssClass: 'bot-btns',
              action: facetHits
                .map(facetHit => ({
                  text: facetHit,
                  value: facetHit,
                }))
                .concat([
                  {
                    text: question.skip_text,
                    value: '',
                  },
                ]),
            })
            .then(({ value }) => {
              if (value) {
                facets.push([question.algolia_facet_name, value])
              }
            })
        }, Promise.resolve())

        const results = await botui.message
          .add({
            loading: true,
            cssClass: 'bot-msg',
          })
          .then(async index => {
            await botui.message.update(index, {
              loading: false,
              content: advisor.results_text,
            })

            return algoliaIndex.search({
              query: '',
              facetFilters: facets.map(facetFilter => facetFilter.join(':')),
              hitsPerPage: 5,
            })
          })

        await results.hits.reduce(async (prev, hit) => {
          await prev

          return botui.message.add({
            type: 'html',
            cssClass: 'bot-msg',
            content: `
              <div style="max-width: 300px;" class="text-center">
                <img src="${hit.image}" alt="${hit.name}" /><br />
                ${hit.name}
              </div>
            `,
          })
        }, Promise.resolve())

        await botui.message.add({
          cssClass: 'bot-msg',
          content: advisor.continue_text,
          delay: 5000,
        })

        await botui.action
          .button({
            cssClass: 'bot-btns',
            action: [
              {
                text: advisor.results_page_text,
                value: 'resultsPage',
              },
              {
                text: advisor.start_over_text,
                value: 'startOver',
              },
            ],
          })
          .then(({ value }) => {
            if (value === 'startOver') {
              botui.message.removeAll()
              return startQuestionnaire(botui)
            }

            if (value === 'resultsPage') {
              window.location.href = [
                advisor.results_page_url,
                results.params,
              ].join('?')
            }
          })
      })()
    },
    [advisor, algoliaIndex, questions]
  )

  useEffect(() => {
    ;(async () => {
      if (!questions.length) {
        return
      }

      botUi.current = new BotUI('bot-ui')

      await botUi.current.message.add({
        content: advisor.greeting_text,
        cssClass: 'bot-msg',
      })

      startQuestionnaire(botUi.current)
    })()
  }, [advisor, algoliaIndex, questions, startQuestionnaire])

  return (
    <div id="bot-ui" className="h-full overflow-y-auto">
      <bot-ui />
    </div>
  )
}
