/*
 * jQuery myCart - v1.7 - 2018-03-07
 * http://asraf-uddin-ahmed.github.io/
 * Copyright (c) 2017 Asraf Uddin Ahmed; Licensed None
 */

  
    var OptionManager = (function () {
      var objToReturn = {};
  
      var _options = null;
      var DEFAULT_OPTIONS = {
        currencySymbol: '$',
        classCartIcon: 'my-cart-icon',
        classCartBadge: 'my-cart-badge',
        classProductQuantity: 'my-product-quantity',
        classProductRemove: 'my-product-remove',
        classCheckoutCart: 'my-cart-checkout',
        affixCartIcon: true,
        showCheckoutModal: true,
        numberOfDecimals: 2,
        cartItems: null,
        clickOnAddToCart: function ($addTocart) {},
        afterAddOnCart: function (products, totalPrice, totalQuantity) {},
        clickOnCartIcon: function ($cartIcon, products, totalPrice, totalQuantity) {},
        checkoutCart: function (products, totalPrice, totalQuantity) {
          return false;
        },
        getDiscountPrice: function (products, totalPrice, totalQuantity) {
          return null;
        }
      };
  
  
      var loadOptions = function (customOptions) {
        _options = $.extend({}, DEFAULT_OPTIONS);
        if (typeof customOptions === 'object') {
          $.extend(_options, customOptions);
        }
      };
      
      var getOptions = function () {
        return _options;
      };
  
      objToReturn.loadOptions = loadOptions;
      objToReturn.getOptions = getOptions;
      return objToReturn;
    }());
  
    var MathHelper = (function () {
      var objToReturn = {};
      var getRoundedNumber = function (number) {
        if (isNaN(number)) {
          throw new Error('Parameter is not a Number');
        }
        number = number * 1;
        var options = OptionManager.getOptions();
        return number.toFixed(options.numberOfDecimals);
      };
      objToReturn.getRoundedNumber = getRoundedNumber;
      return objToReturn;
    }());
  
    var ProductManager = (function () {
      var objToReturn = {};
  
      /*
      PRIVATE
      */
      var addtoCartIcon = $('#addToCart');
      localStorage.products = localStorage.products ? localStorage.products : '';
      var getIndexOfProduct = function (id) {
        var productIndex = -1;
        var products = getAllProducts();
        $.each(products, function (index, value) {
          if (value.id == id) {
            productIndex = index;
            return;
          }
        });
        return productIndex;
      };
      var setAllProducts = function (products) {
        localStorage.products = JSON.stringify(products);
      };
      var addProduct = function (id, name, adults,child, dateEnd, dateStart, price ,propertySlug) {
        var products = getAllProducts();
        products.push({
          id: id,
          name: name,
          child: child,
          adults: adults,
          dateEnd: dateEnd,
          dateStart: dateStart,
          price: price,
          slug: propertySlug,
        });
        setAllProducts(products);
      };
  
      /*
      PUBLIC
      */
      var getAllProducts = function () {
        try {
          var products = JSON.parse(localStorage.products);
          return products;
        } catch (e) {
          return [];
        }
      };
      var updatePoduct = function (id, quantity) {
        var productIndex = getIndexOfProduct(id);
        if (productIndex < 0) {
          return false;
        }
        var products = getAllProducts();
        products[productIndex].quantity = typeof quantity === "undefined" ? products[productIndex].quantity * 1 + 1 : quantity;
        setAllProducts(products);
        return true;
      };
      var setProduct = function (id, name, adults,child, dateEnd, dateStart, price ,propertySlug) {
        if (typeof id === "undefined") {
          console.error("id required");
          return false;
        }
        if (typeof name === "undefined") {
          console.error("name required");
          return false;
        }
        if (typeof adults === "undefined") {
          console.error("adults required");
          return false;
        }
        if (typeof child === "undefined") {
          console.error("child required");
          return false;
        }
        if (typeof dateEnd === "undefined") {
          console.error("dateEnd required");
          return false;
        }
        if (typeof dateStart === "undefined") {
          console.error("dateStart required");
          return false;
        }
        if (typeof propertySlug === "undefined") {
          console.error("propertySlug required");
          return false;
        }
        if (!$.isNumeric(price)) {
          console.error("price is not a number");
          return false;
        }
  
        if (!updatePoduct(id)) {
          addProduct(id, name, adults, child, dateEnd, dateStart, price ,propertySlug);
        }
      };
      var clearProduct = function () {
        setAllProducts([]);
      };
      var removeProduct = function (id) {
        var products = getAllProducts();
        products = $.grep(products, function (value, index) {
          return value.id != id;
        });
        setAllProducts(products);
      };
      var getTotalQuantity = function () {
        var total = 0;
        var products = getAllProducts();
        total = products.length;
        return total;
      };
      var getTotalPrice = function () {
        var products = getAllProducts();
        var total = 0;
        $.each(products, function (index, value) {
          total += value.quantity * value.price;
          total = MathHelper.getRoundedNumber(total) * 1;
        });
        return total;
      };
      var updateIcon = function (){
        addtoCartIcon.html(getTotalQuantity());
        return addtoCartIcon.addClass('visible')
      }
      objToReturn.getAllProducts = getAllProducts;
      objToReturn.updatePoduct = updatePoduct;
      objToReturn.setProduct = setProduct;
      objToReturn.clearProduct = clearProduct;
      objToReturn.removeProduct = removeProduct;
      objToReturn.getTotalQuantity = getTotalQuantity;
      objToReturn.getTotalPrice = getTotalPrice;
      objToReturn.updateIcon = updateIcon;
      updateIcon()
      return objToReturn;
    }());
 
    

