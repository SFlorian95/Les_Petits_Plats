module.exports = {
  create (data) {
    const { name, ingredients, appliance, ustensils } = data

    const getRecipeCardDom = () => {
      const col = document.createElement('div')
      const card = document.createElement('div')

      const bgGrey = document.createElement('div')
      bgGrey.classList.add('background-grey')

      const cardBody = document.createElement('div')
      cardBody.classList.add('card-body')

      const cardTitle = document.createElement('h5')
      cardTitle.classList.add('card-title')
      cardTitle.textContent = name

      const cardText = document.createElement('p')
      cardText.classList.add('card-text')
      cardText.textContent = ingredients.map(item => item.ingredient)

      col.appendChild(card)
      card.appendChild(bgGrey)
      card.appendChild(cardBody)
      cardBody.appendChild(cardTitle)
      cardBody.appendChild(cardText)

      return (col)
    }

    const getDropdownIngredient = () => {
      const ul = document.createElement('ul')
      ul.classList.add('list-group')

      const ingredientsLi = document.createElement('li')

      ingredients.forEach((item) => {
        ingredientsLi.classList.add('list-group-item')
        ingredientsLi.textContent = item.ingredient
      })

      ul.appendChild(ingredientsLi)

      return (ul)
    }

    const getDropdownAppliance = () => {
      const ul = document.createElement('ul')
      ul.classList.add('list-group')

      const applianceLi = document.createElement('li')

      applianceLi.classList.add('list-group-item')
      applianceLi.textContent = appliance

      ul.appendChild(applianceLi)

      return (ul)
    }

    const getDropdownUstensils = () => {
      const ul = document.createElement('ul')
      ul.classList.add('list-group')

      const ustensilsLi = document.createElement('li')

      ustensils.forEach((item) => {
        ustensilsLi.classList.add('list-group-item')
        ustensilsLi.textContent = item
      })

      ul.appendChild(ustensilsLi)

      return (ul)
    }

    const createBadgeDom = () => {
      const btn = document.createElement('button')
      btn.classList.add('btn btn-primary')

      return (btn)
    }

    return { getRecipeCardDom, getDropdownIngredient, getDropdownAppliance, getDropdownUstensils, createBadgeDom }
  }
}
