/**
 * Document to resource helper
 * @param {any} doc Document to convert or object
 * @returns document converted to object
 */
export const docToResource = (doc) => {
  return typeof doc?.data === 'function' ? { ...doc.data(), id: doc.id } : doc
}

/**
 * Filter array helpers
 * @param {Array} arr Array to search in
 * @returns filtered elements */
export const filterIn = (arr) => ({
  /**
   * Filter array by key and value
   * @param {String} key Key to search by
   * @param {any} value Value to search by
   * @returns Filtered elements
   */
  where: (key, value) => arr.filter(item => item[key] === value),
})

/**
 * Find in array helpers
 * @param {Array<{ id: any }>} arr Array to search in
 * @returns element
 */
export const findIn = (arr) => ({
  /**
   * Find element by id
   * @param {any} id Id to search by
   * @returns Element
   */
  byId: (id) => arr?.find(item => item.id === id),
})

/**
 * Find index in array helpers
 * @param {Array<{ id: any }>} arr Array to search in
 * @returns element index
 */
export const findIndexIn = (arr) => ({
  /**
   * Find index of element by id
   * @param {any} id Id to search by
   * @returns Element
   */
  byId: (id) => arr.findIndex(item => item.id === id),
})

/**
 * Upsert resource in array
 * @param {Array<{ id: any }>} resources Array to search in
 * @param {{ id: any }} resource Resource to upsert
 */
export const upsert = (resources, resource) => {
  const index = findIndexIn(resources).byId(resource.id)

  if (resource.id && index !== -1) {
    resources[index] = resource
  } else {
    resources.push(resource)
  }
}
