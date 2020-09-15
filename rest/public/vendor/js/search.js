var urlParams = new URLSearchParams(window.location.search);
var args = {
    type:[],
    price:'',
    rooms:[],
    area:[],
};

var loadmore = $('.col-lg-9 #loadmore');
var cardsContainer = $('#cardsContainer .row')
function card (page,image,h,p,price,area,slug,type,rooms){

    return `<div class="col-md-6 page-${page}">
      <div class=" strip grid">
      <figure>
      <a href="/list/${slug}">
      <img class="img-fluid" src="${image}"/>
      <div class="read_more">
        <span>اعرف أكتر</span>
      </div>
      </a>
      <small>${type}</small>
      </figure>
      <div class="wrapper"> 
      <h3><a href="/list/${slug}">${h}</a></h3>
      <small>${rooms}</small>
      <p style="line-height: 18px;max-height: 54px;overflow: hidden;">${p}</p>
      </div>
      <ul style="display:flex; justify-content:space-between;align-items:center">
        <li>
            <span class="loc_open">${area}</span>
        </li>
        <li>
        <div class="score">
        <strong>${price} جنية الليلة</strong>
        </div>
        </li>
      </ul>
      </div>  
    </div>`
}

loadmore.on('click',function(e){
    e.preventDefault()
    page = parseInt(page) + 1
    
    let url = '/loadmore?p=' + page
    if(urlParams.has('price')){
        var query  = $('aside #filters_col').serialize() + '&p=' + page;
         url = '/loadmore?' + query

    }
    args.page = page;
    $.ajax({
        type: "POST",
        url:url,
        data: args,
        headers: {
            'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
           }, 
        success:function(result){
            if(result.err){
                return console.log('error')
            }
            var d = result.data.docs
            var data = []
            d.forEach((i,e)=>{
                data.push(card(page,i.images[0].imageLink , i.nameArabic, i.Address.desriptionArabic,i.price , i.areaId.nameArabic ,i.slugArabic, i.type.nameArabic ,i.rooms.nameArabic));
            })   
            if(page === totalPages){
                loadmore.hide();
            }
            var cardss= data.join('')
            
            cardsContainer.append(cardss);
            $('html, body').animate({
                    scrollTop: $(`.page-${page}`).offset().top
                }, 500);
            
           
             
            

        } 
    })

})

