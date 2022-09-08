const dom = require('../dom')
const state = require('../state')
const domLinker = require('../domLinker')

module.exports = cb => {
  const createFilter = data => {
    const getFilterDOM = (filterResult, category) => {
      data.forEach(item => {
        const span = dom.createElement('span', filterResult, undefined, item)
        const tag = {}
        tag[category] = item
        const tagDOM = createTag(tag).getTagDOM()

        span.addEventListener('click', () => {
          // check if tags already exist
          if (!state.tags[category].find(element => element === item)) {
            domLinker.sectionTags.appendChild(tagDOM.div)
            state.tags[category].push(item)
          }
          cb()
        })
      })
    }

    return { getFilterDOM }
  }

  const createTag = data => {
    const key = Object.keys(data)
    const value = data[key]

    const getTagDOM = () => {
      const div = dom.createElement('div', null, [{ class: 'd-flex badges' }])
      const button = dom.createElement('button', div, [{ class: `btn ${key}` }])
      dom.createElement('span', button, undefined, value)
      dom.createElement('i', button, [{ class: 'bi-x-circle' }])

      // Create event click to delete tag
      div.addEventListener('click', () => {
        div.parentNode.removeChild(div)
        state.tags[key] = state.tags[key].filter(item => item !== data[key])
        cb()
      })

      return { div }
    }

    return { getTagDOM }
  }

  return {
    createFilter,
    createTag
  }
}
