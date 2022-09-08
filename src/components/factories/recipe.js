const dom = require('../dom')

module.exports = {
  createCard (data) {
    const { id, name, ingredients, time, description, appliance, ustensils } = data

    const getCardDOM = () => {
      const article = dom.createElement('article', null, [{ class: 'col' }])
      const divCard = dom.createElement('div', article, [{ class: 'card' }])
      dom.createElement('div', divCard, [{ class: 'background-grey' }])
      const divCardBody = dom.createElement('div', divCard, [{ class: 'card-body' }])

      const h5CardTitle = dom.createElement('h5', divCardBody, [{ class: 'card-title' }])
      dom.createElement('span', h5CardTitle, [{ class: 'title' }], name)
      const divTimer = dom.createElement('div', h5CardTitle, [{ class: 'timer' }])
      dom.createElement('i', divTimer, [{ class: 'bi-clock' }])
      dom.createElement('span', divTimer, [{ class: 'time' }], `${time} min`)

      const divContent = dom.createElement('div', divCardBody, [{ class: 'content' }])
      const divIngredients = dom.createElement('div', divContent, [{ class: 'ingredients' }])
      ingredients.forEach(item => {
        dom.createElement('span', divIngredients, undefined, `${item.ingredient}: ${item.quantity || item.quantite || ''} ${item.unit || ''}`)
      })
      dom.createElement('p', divContent, [{ class: 'card-text description' }], description)

      return { article }
    }

    return { id, name, appliance, ustensils, getCardDOM }
  },

  displayMessage () {
    const message = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.'

    return dom.createElement('div', null, [{ class: 'message-no-result' }], message)
  }
}
