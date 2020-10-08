// Storage Controller
const StorageController = (function (){

})();



// Product Controller
const ProductController = (function(){
  //private
  const Product = function(id,name,price){
    this.id=id;
    this.name=name;
    this.price=price;
  }

  const data = {
    products : [
      {id:0, name:'Monitor', price: 100},
      {id:1, name:'Ram', price: 30},
      {id:2, name:'Klavye', price: 10},
      {id:3, name:'Mouse', price: 5}
    ],
    selectedProduct:null,
    totalPrice:0
  }

  // public
  return {
    getProducts : function(){
      return data.products;
    },
    getData : function(){
      return data;
    },
    addProduct : function(name,price){
      let id;
      if(data.products.length>0){
        id = data.products[data.items.length-1].id+1;
      }
      else{
        id=0;
      }
      const newProduct = new Product(id,name,price);
      data.products.push(newProduct);
      return newProduct;
    }
  }

})();


//UI Controller
const UIController = (function (){
  const Selectors ={
    productList : "#item-list",
    addButton: ".addBtn",
    productName:"#productName",
    productPrice:"#productPrice"
  }

  return {
    createProductList: function (products){
      let html = '';
      products.forEach(prd => {
        html +=`
        <tr>
          <td>${prd.id}</td>
          <td>${prd.name}</td>
          <td>${prd.price}</td>
          <td class="text-right">
            <button type="submit" class="btn btn-warning btn-sm">
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>`
      });
      document.querySelector(Selectors.productList).innerHTML=html;
    },
    getSelectors: function(){
      return Selectors;
    }
  }
})();

// App Controller

const App = (function (ProductCtrl,UICtrl){
  const UISelectors = UIController.getSelectors();

  //Load Event Listeners
  const loadEventListeners = function(){
    // add product event
    document.querySelector(UISelectors.addButton).addEventListener('click',productAddSubmit);
  }
  const productAddSubmit = function(e){
    const productName = document.querySelector(UISelectors.productName).value;
    const productPrice = document.querySelector(UISelectors.productPrice).value;
    if(productName!=='' && productPrice!==''){
      // Add Product
      const newProduct =ProductCtrl.addProduct(productName,productPrice);
      console.log(newProduct);
    }
    console.log(productName,productPrice);

    e.preventDefault();
  }

  return {
    init:function(){
      console.log('starting app...');
      const products = ProductController.getProducts();
      UICtrl.createProductList(products);

      // Load Event Listeners
      loadEventListeners();
    }
  }
})(ProductController,UIController);


App.init();
