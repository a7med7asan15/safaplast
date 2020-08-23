
$('#carousel_in').owlCarousel({
center: false,
items:1,
loop:false,
rtl: true,
margin:0
});


$(function() {
$('input[name="dates"]').daterangepicker({
autoUpdateInput: false,
parentEl:'#input-dates',
opens: 'right',
locale: {
direction: 'rtl',
cancelLabel: 'مسح',
applyLabel:'تحديد',
}
});
$('input[name="dates"]').on('apply.daterangepicker', function(ev, picker) {
$(this).val(picker.startDate.format('MM-DD-YY') + ' > ' + picker.endDate.format('MM-DD-YY'));
});
$('input[name="dates"]').on('cancel.daterangepicker', function(ev, picker) {
$(this).val('');
});
});

var $validate = $("#reqForm").validate({
rules:{
    dates:{
        required:true
    },
    nameCustomer:{
        required:true
    },
    customerMobileNo:{
        required:true
    }


},
messages:{
    dates:{
        required: "من فضلك ادخل مدة البقاء",
    },
    nameCustomer:{
        required: "من فضلك ادخل مدة البقاء",
    },
    customerMobileNo:{
        required: "من فضلك ادخل مدة البقاء",
    }
},
highlight: function (element) {
    $(element).addClass("is-invalid");
    console.log(element)
  },
  unhighlight: function (element) {
    $(element).removeClass("is-invalid");
  },
submitHandler:function(form,event){
    event.preventDefault();
    const serialData = $(form).serializeArray();
          serialData.push({name:"propertyId" , value:propertyId })
    $.ajax({
        type: "POST",
        url:'/orders/add',
        data: serialData,
        headers: {
            'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
           }, 
        success:function(result){
            console.log(result);
            
            if(!result.err){
                localStorage.setItem("name", result.customerName);
                localStorage.setItem("orderId", result.orderId);
                return window.location.replace( "http://" + result.domainName + "/orders/confirm");
            }else{

                
                let key = result.key
                let msg = result.msg
                let errors = {[key]: msg };
                
                return $validate.showErrors(errors);
            }

        } 
    })
  },

})