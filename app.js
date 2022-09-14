const url = 'https://course-api.com/javascript-store-products';

const productsDOM = document.querySelector('.products-center');

const fetchProducts = async () => {
  productsDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`There was an error: ${response.status}`);
    }
    const data = await response.json();
    return data; // even data here is an array but fetchProducts is an async function, it still returns a promise
  } catch (err) {
    productsDOM.innerHTML = '<p class="error">there was an error</p>';
  }
};

const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const { id } = product;
      const { name: title, price } = product.fields; // set an alias for name variable
      const { url: img } = product.fields.image[0]; // set an alias for url variable
      const formatPrice = price / 100;
      // id, name, price, image url
      return `<a href="product.html?id=${id}" class="single-product">
                <img src=${img} class="single-product-img img" alt=${title} />
                <footer>
                    <h5 class="name">${title}</h5>
                    <span class="price">$${formatPrice}</span>
                </footer>
            </a>`;
    })
    .join('');
  productsDOM.innerHTML = `<div class="products-container">${productList}</div>`;
};

// // EVERY ASYNC FUNCTION returns A PROMISE -> since displayProducts is an async function and it returns data which is a promise, we have to use await here on line 25
const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

start();

/*My SOLUTION*/
// function displayProducts(productsList) {
//   productsDOM.removeChild(productsDOM.firstElementChild);
//   console.log(productsList);
//   const allProducts = productsList
//     .map((product) => {
//       const { id, fields } = product;
//       console.log(fields);
//       const { image, name, price } = fields;
//       const [imageObj] = image;
//       const { url } = imageObj;
//       console.log(url);
//       return `<a href="product.html" class="single-product">
//                 <img src=${url} class="single-product-img img" alt="title" />
//                 <footer>
//                     <h5 class="name">${name}</h5>
//                     <span class="price">$${price}</span>
//                 </footer>
//             </a>`;
//     })
//     .join('');
//   console.log(allProducts);
//   const element = document.createElement('div');
//   element.className = 'products-container';
//   element.innerHTML = allProducts;
//   productsDOM.appendChild(element);
// }

// // EVERY ASYNC FUNCTION returns A PROMISE -> since displayProducts is an async function and it returns data which is a promise, we have to use await here on line 47
// const start = async () => {
//   const list = await fetchProducts();
//   console.log(list);
//   displayProducts(list);
// };

// start();
