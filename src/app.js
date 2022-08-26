import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// eslint-disable-next-line no-unused-vars
import { Collapse } from 'bootstrap'
/* Inject css */
require('./scss/app.scss')

require('./scripts/pages/index')

const empty = el => {
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

const api = require('./scripts/components/api')
const factoryRecipes = require('./scripts/factories/recipes')

const displayData = async recipes => {
  const section = document.getElementById('recette')
  empty(section)

  recipes.forEach((recipe) => {
    const model = factoryRecipes.create(recipe)
    const recipeDom = model.getRecipeCardDom()

    section.appendChild(recipeDom)
  })
}

const isFound = (ingredients, value) => ingredients.find(element => element.ingredient.toLowerCase().includes(value.toLowerCase()))

const searchRecipe = async () => {
  const searchInput = document.getElementById('search')
  const input = searchInput.value
  const recipes = await api.getRecipes()
  if (input.length >= 3) {
    const result = recipes.filter(item => item.name.toLowerCase().includes(input.toLowerCase()) ||
     item.description.toLowerCase().includes(input.toLowerCase()) || isFound(item.ingredients, input))
    console.log(result)
    displayData(result)
  } else {
    displayData(recipes)
  }
}

const init = async () => {
  const data = await api.getRecipes()
  document.getElementById('search').addEventListener('input', searchRecipe)
  displayData(data)
}

init()
