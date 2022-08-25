const axios = require('axios')
const url = 'src/data/recipes.json'

const getRecipes = () => axios.get(url).then(res => res.data.recipes)

module.exports = {
  getRecipes
}
