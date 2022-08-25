const axios = require('axios')
const url = 'src/data/recipes.json'

/**
 * Get all recipes
 * @returns Array of recipe object
 */
const getRecipes = () => axios.get(url).then(res => res.data.recipes)

const searchRecipe = () => {
  const searchInput = document.getElementById('search')
  const input = searchInput.value
  const recipes = getRecipes()
  console.log(recipes.name)

  const result = recipes.filter(item => item.name.includes(input))
  // console.log(result)

  return result
}

module.exports = {
  getRecipes,
  searchRecipe
}
