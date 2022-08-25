module.exports = {
  create (data) {
    const { name } = data

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

      col.appendChild(card)
      card.appendChild(bgGrey)
      card.appendChild(cardBody)
      cardBody.appendChild(cardTitle)
      cardBody.appendChild(cardText)

      return (col)
    }
    return { getRecipeCardDom }
  }
}
