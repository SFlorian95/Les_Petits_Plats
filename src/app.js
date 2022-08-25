import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// eslint-disable-next-line no-unused-vars
import { Collapse } from 'bootstrap'
/* Inject css */
require('./scss/app.scss')

const api = require('./scripts/components/api')
const factoryRecipes = require('./scripts/factories/recipes')

const displayData = async recipes => {
  const section = document.getElementById('recette')

  recipes.forEach((recipe) => {
    const model = factoryRecipes.create(recipe)
    const recipeDom = model.getRecipeCardDom()

    section.appendChild(recipeDom)
  })
}

const init = async () => {
  const data = await api.getRecipes()
  document.getElementById('search').addEventListener('keyup', api.searchRecipe)
  displayData(data)
}

init()
