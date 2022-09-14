const productsDOM = document.querySelector('.products-center');
const url = 'https://course-api.com/javascript-store-products';
// if url is invalid, catch block will catch the error
// fetch products
const fetchProducts = async () => {
  productsDOM.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `There was an error fetching the products ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    productsDOM.innerHTML = `<p class='error'>${err}</p>`;
  }
};

// display products
const displayProducts = (productsArr) => {
  productsArr = productsArr
    .map((product) => {
      // id, img url, name: title, price
      const { id } = product;
      const { price, name: title } = product.fields;
      const { url: imgUrl } = product.fields.image[0];
      return `
    <a class="single-product" href="product.html?id=${id}">
      <img src=${imgUrl} class="single-product-img img" alt=${title}/>
      <footer>
        <h5 class="name">high-back bench</h5>
        <span class="price">$9.99</span>
      </footer>
    </a>`;
    })
    .join('');
  productsDOM.innerHTML = `<div class="products-center">${productsArr}</div>`;
};

// starting condition
const start = async () => {
  const productsList = await fetchProducts();
  displayProducts(productsList);
};

start();
