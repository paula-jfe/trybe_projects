const apiMLB = 'https://api.mercadolibre.com/sites/MLB/';

export async function getCategories() {
  try {
    const requestCategories = await (await fetch(`${apiMLB}categories`)).json();
    return requestCategories;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endPoint = `${apiMLB}search?category=${categoryId}&q=${query}`;
  try {
    const requestCategoryAndQuery = await (await fetch(endPoint)).json();
    return requestCategoryAndQuery;
  } catch (error) {
    return error;
  }
}

export async function getReviews(productId) {
  const reviewsEndPoint = `https://api.mercadolibre.com/reviews/item/${productId}`;
  try {
    const requestReviews = await (await fetch(reviewsEndPoint)).json();
    return requestReviews;
  } catch (error) {
    return error;
  }
}
