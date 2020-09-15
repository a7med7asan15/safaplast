var cl = window.localStorage.getItem('cart');




$(function () {

   
    if(JSON.parse(cl) === null){

        return localStorage.setItem('cart', JSON.stringify([]));
    }

    if(JSON.parse(cl).length > 0 ){
        return updateIcon(cl); 

    }
    
    });
