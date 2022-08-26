const axios = require('axios')
const url = 'src/data/recipes.json'

/**
 * Get all recipes
 * @returns Array of recipe object
 */
const getRecipes = () => axios.get(url).then(res => res.data.recipes)

module.exports = {
  getRecipes
}
