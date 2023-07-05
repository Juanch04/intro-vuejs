### Promise version

```js
loadProducts() {
  console.log("#1: Aquí inicia la llamada a la API");
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((result) => {
      this.products = result;
      console.log("#2: Aquí finaliza la llamada a la API");
    });
  console.log("#3: Aquí finaliza mi bloque de código");
},
```
