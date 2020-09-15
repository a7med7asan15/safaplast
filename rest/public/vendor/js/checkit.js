var bookingWrapper = $('.box_booking');
var priceTag = $('.price');
var target = $('#addToCart');
var hagz = $('#hagz');



function doCheck (){
    bookingWrapper.removeClass('loading');
    var appender = ''
    var totalInvoice = 0;
    var dataAr = ProductManager.getAllProducts();
    if(dataAr.length){

 
    for(i=0 ; i < dataAr.length ; i++){
        var startDate = new Date(dataAr[i].dateStart);
        var endDate = new Date(dataAr[i].dateEnd);
        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        var total = dataAr[i].price * numberOfNights;
        totalInvoice = totalInvoice + total
        appender = appender + `
        <div class="strip_booking">
        <div class="row">
          <div class="col-lg-2 col-md-2">
              <div class="date">
                  <span class="month">
                      ${startDate.toLocaleDateString('ar-EG',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).split(' ')[2]}
                  </span>
                  <span class="day">
                      <strong> ${startDate.toLocaleDateString('ar-EG',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).split(' ')[1]}</strong>
                      ${startDate.toLocaleDateString('ar-EG',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).split(' ')[0]}
                  </span>
              </div>
          </div>
          <div class="col-lg-5 col-md-4">
              <h3 class="hotel_booking">
                  ${dataAr[i].name}
                  <span>
                     عدد اليالى :  ${numberOfNights} 
                  </span>
                  <span>
                  الثمن الإجمالى : ${total}
                  </span>
              </h3>
          </div>
          <div class="col-lg-3 col-md-2">
              <ul class="info_booking">
                  <li>
                      <strong>
                         معاد الوصول
                      </strong>
                      ${startDate.toLocaleDateString('ar-EG',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
                  </li>
                  <li>
                      <strong>
                        معاد المغادرة  
                      </strong>
                      ${endDate.toLocaleDateString('ar-EG',  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

                  </li>
              </ul>
          </div>
          <div class="col-lg-2 col-md-2">
              <div class="booking_buttons">
                  
                  <button  class="btn_3 deleteProperty" onclick="deleter('${dataAr[i].id}')" >إلغاء</button>
              </div>
          </div>
        </div>   </div>    `
    }
    bookingWrapper.html(appender)   
    priceTag.html(`<span>${totalInvoice}جم <small>/ للحجز</small></span>`);
    return bookingWrapper.removeClass('loading');
    }else{
        bookingWrapper.removeClass('loading');
        bookingWrapper.html('<div style="display:flex; width:100%; height:100%; justify-content:center; align-items:center;"><h2>انت لسه محجزتش وحدة <a href="/"> إحجز دلوقتى</a></h2></div> ');
        priceTag.html(`<span>0 جم <small>/ للحجز</small></span>`)
        return hagz.prop('disabled', true);
    }


} 

function deleter (e){
ProductManager.removeProduct(e);
ProductManager.updateIcon();
return doCheck();
}

$(function () {

        return doCheck()

    
 
    });

   
