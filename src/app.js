import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// eslint-disable-next-line no-unused-vars
import { Collapse } from 'bootstrap'
/* Inject css */
require('./scss/app.scss')

const empty = el => {
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
}

const api = require('./scripts/components/api')
const factoryRecipes = require('./scripts/factories/recipes')

const ingredientsAccordion = document.getElementById('ingredients-accordion')
const applianceAccordion = document.getElementById('appliance-accordion')
const ustensilsAccordion = document.getElementById('ustensils-accordion')

const displayData = async recipes => {
  const divRecipes = document.getElementById('recette')

  empty(divRecipes)
  empty(ingredientsAccordion)
  empty(applianceAccordion)
  empty(ustensilsAccordion)

  if (recipes.length === 0) {
    divRecipes.append('la recherche ne correspond à aucune recettes')
  }

  recipes.forEach((recipe) => {
    const model = factoryRecipes.create(recipe)
    const recipeDom = model.getRecipeCardDom()

    const ingredientDropdown = model.getDropdownIngredient()
    const applianceDropdown = model.getDropdownAppliance()
    const ustensilDropdown = model.getDropdownUstensils()

    divRecipes.appendChild(recipeDom)
    ingredientsAccordion.appendChild(ingredientDropdown)
    applianceAccordion.appendChild(applianceDropdown)
    ustensilsAccordion.appendChild(ustensilDropdown)
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

    result.forEach((item) => {
      const model = factoryRecipes.create(item)
      const ingredientDropdown = model.getDropdownIngredient()
      const applianceDropdown = model.getDropdownAppliance()
      const ustensilDropdown = model.getDropdownUstensils()

      ingredientsAccordion.appendChild(ingredientDropdown)
      applianceAccordion.appendChild(applianceDropdown)
      ustensilsAccordion.appendChild(ustensilDropdown)
    })

    console.log(result)
    displayData(result)
  } else {
    displayData(recipes)
  }
}

const searchDropdown = async () => {
  const searchInput = document.querySelector('.dropdown-search')
  // const searchInput = document.querySelectorAll('.dropdown-search')
  const recipes = await api.getRecipes()

  const result = recipes.filter(item => item.appliance.toLowerCase().includes(searchInput.value.toLowerCase()) ||
  //  item.ustensils.map(item => item.toLowerCase().includes(searchInput.value.toLowerCase())) ||
    isFound(item.ingredients, searchInput.value))

  console.log(result)
  displayData(result)
}

const createBadge = async () => {
  const recipes = await api.getRecipes()

  recipes.forEach((recipe) => {
    const model = factoryRecipes.create(recipe)
    const btn = model.createBadgeDom()
    document.querySelector('.badges').appendChild(btn)
  })
}

const init = async () => {
  const data = await api.getRecipes()
  document.getElementById('search').addEventListener('input', searchRecipe)
  document.querySelector('.dropdown-search').addEventListener('input', searchDropdown)
  // document.querySelectorAll('.dropdown-search').forEach((btn) => btn.addEventListener('input', searchDropdown))
  document.querySelectorAll('li').addEventListener('click', createBadge)
  displayData(data)
}

init()
