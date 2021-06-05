const UNAUTHORIZED = 401;

const getProducts = (token) => {
  try {
    const url = 'http://localhost:3001/products';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
    })
      .then((response) => {
        if (response.status === UNAUTHORIZED) {
          throw new Error();
        } else {
          return response.json().then((json) => json);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};

export default getProducts;
