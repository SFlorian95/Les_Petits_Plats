/**
 * Determines whether an array (value1 in lower case) includes a certain value (value2 in lower case) among its entries,
 * returning true or false as appropriate.
 * @param {String} value1
 * @param {String} value2
 * @returns Boolean
 */
const isLowerCaseIncluded = (value1, value2) => value1.toLowerCase().includes(value2.toLowerCase())

const isLowerCaseIncludedBis = (value1, value2) => value1.toLowerCase().indexOf(value2.toLowerCase()) > -1

/**
 * returns the first element in the provided array that satisfies the provided testing function (isIncluded function).
 * If no values satisfy the testing function, undefined is returned.
 * @param {Array} array - Array of object (recipes)
 * @param {String} property - Object property by example: 'description' or 'name'
 * @param {String} value - String to search
 * @returns Object || undefined
 */
const isFound = (array, property, value) => array.find(item => isLowerCaseIncluded(item[property], value))

/**
 * Get recipes in function of value includes in at least one of followings properties:
 * name or description or ingredients
 * @param {Array} recipes - recipes (array of object)
 * @param {String} value - String to search
 * @returns Array of object of recipes
 */
const filterMainSearchBar = (recipes, value) => recipes.filter(item =>
  isLowerCaseIncluded(item.description, value) ||
  isLowerCaseIncluded(item.name, value) ||
  isFound(item.ingredients, 'ingredient', value))

const isRecipeIncludesEveryTagIngredient = (recipe, tags) => tags.ingredients.every(ingredient => recipe.ingredients.map(elem => elem.ingredient).includes(ingredient))
const isRecipeIncludesEveryTagAppliance = (recipe, tags) => tags.appliances.every(appliance => recipe.appliance.includes(appliance))
const isRecipeIncludesEveryTagUstensil = (recipe, tags) => tags.ustensils.every(ustensil => recipe.ustensils.includes(ustensil))

/**
 * Get recipes which include every tag in param
 * @param {Array} recipes - Array of object (recipes)
 * @param {Object} tags - tags to search
 * @returns Array of object of recipes
 */
const filterByTags = (recipes, tags) => recipes.filter(recipe =>
  isRecipeIncludesEveryTagIngredient(recipe, tags) &&
  isRecipeIncludesEveryTagAppliance(recipe, tags) &&
  isRecipeIncludesEveryTagUstensil(recipe, tags))

const isFoundBis = (array, property, value) => {
  for (const item of array) {
    if (isLowerCaseIncludedBis(item[property], value)) {
      return true
    }
  }
  return false
}

/**
 * Get recipes in function of value includes in name or description or ingredients
 * using native loop
 * @param {Array} recipes
 * @param {String} value
 * @returns Array of object of recipes
 */
const filterMainSearchBarBis = (recipes, value) => {
  const result = []
  // 1st step: Loop on each recipes
  for (const recipe of recipes) {
    // 2nd step: Compare value with each properties (name, description, ingredients)
    if (isLowerCaseIncludedBis(recipe.description, value) ||
      isLowerCaseIncludedBis(recipe.name, value) ||
      isFoundBis(recipe.ingredients, 'ingredient', value)) {
      // 3rd step: add recipe to a result array
      result.push(recipe)
    }
  }
  return result
}

module.exports = {
  isLowerCaseIncluded,
  filterMainSearchBar,
  filterByTags,
  filterMainSearchBarBis
}
