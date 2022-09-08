import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// eslint-disable-next-line no-unused-vars
import { Collapse } from 'bootstrap'

/* Inject css */
require('./scss/app.scss')
const api = require('./components/api')
const state = require('./components/state')
const factoryRecipe = require('./components/factories/recipe')
const domLinker = require('./components/domLinker')
const dom = require('./components/dom')

const applyMainSearchBarFilter = async () => {
  const recipes = await api.getRecipes(domLinker.inputSearchBar.value, state.tags)
  console.log(domLinker.inputSearchBar.value)
  console.log('tags:', state.tags)
  displayRecipes(recipes)
  // hide all categories dropdown
  categories.forEach(category => displayDropdown(category, false))
}

const factoryFilter = require('./components/factories/filter')(applyMainSearchBarFilter)
const categories = [
  { name: 'Ingredient', get: api.getIngredients(), fr: 'Ingrédients' },
  { name: 'Appliance', get: api.getDevices(), fr: 'Appareils' },
  { name: 'Ustensil', get: api.getUstensils(), fr: 'Ustensils' }
]

const displayRecipes = data => {
  // delete parent element
  dom.empty(domLinker.rowRecipesCards)

  data.forEach(recipe => {
    const recipeModel = factoryRecipe.createCard(recipe)
    const cardDOM = recipeModel.getCardDOM()
    domLinker.rowRecipesCards.appendChild(cardDOM.article)
  })

  if (data.length === 0) domLinker.rowRecipesCards.appendChild(factoryRecipe.displayMessage())
}

const displayCategory = (category, data) => {
  // delete parent element
  dom.empty(domLinker[`searchResult${category}`])
  const categoryModel = factoryFilter.createFilter(data)
  categoryModel.getFilterDOM(domLinker[`searchResult${category}`], `${category}s`.toLowerCase())
  console.log(data)
}

const init = async () => {
  const recipes = await api.getRecipes()
  console.log(recipes)

  displayRecipes(recipes)
  // diplay each category
  for (const category of categories) {
    displayCategory(category.name, await category.get)
  }
}

const applyCategorySearch = async category => {
  // get data from api in function of category
  let data
  if (category.name === 'Ingredient') {
    data = await api.getIngredients(domLinker.inputSearchBar.value, state.tags, domLinker.inputSearchBarIngredient.value)
  }
  if (category.name === 'Appliance') {
    data = await api.getDevices(domLinker.inputSearchBar.value, state.tags, domLinker.inputSearchBarAppliance.value)
  }
  if (category.name === 'Ustensil') {
    data = await api.getUstensils(domLinker.inputSearchBar.value, state.tags, domLinker.inputSearchBarUstensil.value)
  }

  const { value } = domLinker[`inputSearchBar${category.name}`]
  console.log('applyCategorySearch', value)
  displayCategory(category.name, data)
}

const displayDropdown = (category, bool = true) => {
  domLinker[`dropdown${category.name}`].setAttribute('src', `/src/assets/images/arrow_${bool ? 'up' : 'down'}.png`)
  console.log(domLinker[`dropdown${category.name}`].getAttribute('src'), bool)
  domLinker[`inputSearchBar${category.name}`].value = bool ? '' : category.fr
  domLinker[`searchResult${category.name}`].classList[bool ? 'add' : 'remove']('active')
  domLinker[`dropdown${category.name}`].parentNode.parentNode.classList[bool ? 'add' : 'remove']('active')
  domLinker[`inputSearchBar${category.name}`].classList[bool ? 'add' : 'remove']('active')
}

const dropDownByCategory = category => {
  const bool = domLinker[`dropdown${category.name}`].getAttribute('src').includes('down')
  // first of all hide all other categories
  categories.forEach(item => displayDropdown(item, item.name !== category.name ? false : bool))
  if (bool) applyCategorySearch(category)
}

domLinker.inputSearchBar.addEventListener('input', applyMainSearchBarFilter)

domLinker.formMainSearchBar.addEventListener('submit', event => event.preventDefault())

// Add event listener for each category
categories.forEach(category => {
  domLinker[`inputSearchBar${category.name}`].addEventListener('focus', () => {
    // first of all hide all categories
    categories.forEach(category => displayDropdown(category, false))
    displayDropdown(category)
    applyCategorySearch(category)
  })
  domLinker[`dropdown${category.name}`].addEventListener('click', () => dropDownByCategory(category))
  domLinker[`inputSearchBar${category.name}`].addEventListener('input', e => applyCategorySearch(category))
})

init()
