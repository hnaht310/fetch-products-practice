const productDOM = document.querySelector('.product');
const url = 'https://course-api.com/javascript-store-single-product';

// fetch a single product
const fetchAProduct = async () => {
  productDOM.innerHTML = '<div class="loading"></div>';
  try {
    // console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    // get the value of id key from the params
    const id = params.get('id');
    const response = await fetch(`${url}?id=${id}`);
    if (!response.ok) {
      throw new Error(`Couldn't fetch product data. Error: ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// display a product
const displayAProduct = (productData) => {
  // img url, title, company, price, colors, description
  // prettier-ignore
  const {company, colors, price, name: title, description, image} = productData.fields;
  const { url: imgURL } = image[0];
  //   change title of the document
  document.title = title;
  // get all the colors and replace its html
  let colorsList = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join('');
  productDOM.innerHTML = `<div class="product-wrapper">
                            <img src=${imgURL} alt=${title} class="img" />
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
};

// starting condition
const start = async () => {
  console.log('start loading the page');
  const product = await fetchAProduct();
  displayAProduct(product);
};

start();
