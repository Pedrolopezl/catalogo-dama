const express = require('express');
const bodyParser = require('body-parser');
const repository = require("./repository");
const mercadopago = require("mercadopago");
const app = express();
const port = process.env.PORT || 3000;

mercadopago.configure({
  access_token:
    "TEST-2434035411768924-053022-a13148f042f675e81b37e2c042954cbf-1025485442",
});



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


const products = [
{
  id: 1,
  name: "PANTALON 1",
  price: 55000,
  image: "images/product-1.jpeg",
  stock: 1000
},
{
  id: 2,
  name: "PANTALON 2",
  price: 55000,
  image: "images/product-2.jpeg",
  stock: 1000
},
{
  id: 3,
  name: "PANTALON 3",
  price: 55000,
  image: "images/product-3.jpeg",
  stock: 1000
},
{
  id: 4,
  name: "PANTALON 4",
  price: 55000,
  image: "images/product-4.jpeg",
  stock: 1000
},
{
  id: 5,
  name: "PANTALON 5",
  price: 55000,
  image: "images/product-5.jpeg",
  stock: 1000
},
{
  id:6 ,
  name: "PANTALON 6",
  price: 55000,
  image: "images/product-6.jpeg",
  stock: 1000
},
{
  id: 7,
  name: "PANTALON 7",
  price: 55000,
  image: "images/product-7.jpeg",
  stock: 1000
},
{
  id: 8,
  name: "PANTALON 8",
  price: 55000,
  image: "images/product-8.jpeg",
  stock: 1000
},
{
  id: 9,
  name: "PANTALON 9",
  price: 55000,
  image: "images/product-9.jpeg",
  stock: 1000
},
{
  id: 10,
  name: "PANTALON 10",
  price: 55000,
  image: "images/product-10.jpeg",
  stock: 1000
},
{
  id: 11,
  name: "PANTALON 11",
  price: 55000,
  image: "images/product-11.jpeg",
  stock: 1000
},
{
  id: 12,
  name: "PANTALON 12",
  price: 55000,
  image: "images/product-12.jpeg",
  stock: 1000
},
{
  id: 13,
  name: "PANTALON 13",
  price: 55000,
  image: "images/product-13.jpeg",
  stock: 1000
},
{
  id: 14,
  name: "PANTALON 14",
  price: 55000,
  image: "images/product-14.jpeg",
  stock: 1000
},
{
  id: 15,
  name: "PANTALON 15",
  price: 55000,
  image: "images/product-15.jpeg",
  stock: 1000
},
];
app.get('/api/products', (req, res) => {
  res.send(products);
})

app.post('/api/pay', async (req, res) => { 
  const ids = req.body;
  let preference = {
    items: [],
    back_urls: {
      success: "http://localhost:3000/feedback",
      failure: "http://localhost:3000/feedback",
      pending: "http://localhost:3000/feedback",
    },
    auto_return: "approved",
  };
  ids.forEach(id => {
    const product = products.find(p => p.id === id);
    product.stock--
    preference.items.push({
      title: product.name,
      unit_price: product.price,
      quantity: 1,
    })
    
  });
  const response = await mercadopago.preferences.create(preference);
  const preferenceId = response.body.id;
    //await repository.write(productsCopy);
  res.send({ preferenceId });
  //res.send(products);
});
app.get('/feedback', function(request, response) {
   response.json({
   Payment: request.query.payment_id,
   Status: request.query.status,
   MerchantOrder: request.query.merchant_order_id
 })
});

app.use("/", express.static("fe"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});