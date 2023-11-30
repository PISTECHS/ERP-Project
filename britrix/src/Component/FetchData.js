function Fetchdata(method, url, body) {
    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
    }
  
      export default Fetchdata