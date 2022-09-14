const productDOM = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = '<h4 class="product-loading">Loading...</h4>';
    // console.log(window.location.search); // returns the string beginning from the question mark `?`
    // use URLSearchParams to get the value of a parameter
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log(id);

    const response = await fetch(`${url}?id=${id}`);
    if (!response.ok) {
      throw new Error(`There was an error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    productDOM.innerHTML =
      '<p class="error">There was a problem loading the product</p>';
  }
};

const displayProduct = (product) => {
  const { company, colors, name: title, price, description } = product.fields;
  const { url: img } = product.fields.image[0];
  document.title = title.toUpperCase(); // update the title of the page
  const colorsList = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join('');
  const productHtml = `<div class="product-wrapper">
              <img src=${img} alt="" class="img" />
              <div class="product-info">
                  <h3>${title}</h3>
                  <h5>${company}</h5>
                  <span>$${price / 100}</span>
                  <div class="colors">
                  ${colorsList}
                  </div>
                  <p>${description}</p>
                  <button class="btn">add to cart</button>
              </div>
           </div>`;
  productDOM.innerHTML = productHtml;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
