export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const array = response.json();
  return array;
}

export async function getProductsFromCategoryAndQuery(category = '', query = '') {
  if (!query) {
    const response = await fetch(`https://api.mercadolibre.com/items?ids=${category}`);
    const response2 = response.json();
    return response2;
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${query}`);
  const response2 = response.json();
  return response2;
}
