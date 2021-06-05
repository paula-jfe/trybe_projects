const getToken = (user) => {
  try {
    const url = 'http://localhost:3001/login';
    return fetch(url, {
      method: 'POST',
      body: user,
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => json);
  } catch (error) {
    console.log(error.message);
  }
};

export default getToken;
