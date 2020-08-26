
$('#carousel_in').owlCarousel({
center: false,
items:1,
loop:false,
rtl: true,
margin:0
});


$(function() {
$('input[name="dateStart"]').daterangepicker({
singleDatePicker:true,
autoUpdateInput: false,
parentEl:'#input-dates',
showDropdowns: false,
opens: 'right',
locale: {
direction: 'rtl',
cancelLabel: 'مسح',
applyLabel:'تحديد',
}
});
$('input[name="dateEnd"]').daterangepicker({
singleDatePicker:true,
autoUpdateInput: false,
parentEl:'#input-dates',
showDropdowns: false,
opens: 'right',
locale: {
direction: 'rtl',
cancelLabel: 'مسح',
applyLabel:'تحديد',
}
});

$('input[name="dateStart"]').on('apply.daterangepicker', function(ev, picker) {
$(this).val(picker.startDate.format('MM-DD-YYYY'));
});
$('input[name="dateEnd"]').on('apply.daterangepicker', function(ev, picker) {
$(this).val(picker.startDate.format('MM-DD-YYYY'));
});

$('input[name="dateEnd"]').on('cancel.daterangepicker', function(ev, picker) {
$(this).val('');
});
});
jQuery.validator.addMethod("startDate", function(value, element) {
     return new Date(value) > new Date(Date.now()) 
  }, "لا يمكن اختيار تاريخ وصول قبل تاريخ اليوم ");


jQuery.validator.addMethod("endDate", function(value, element) {
    return new Date(value) > new Date($('input[name="dateStart"]').val());
  }, "لا يمكن اختيار تاريخ وصول قبل تاريخ الوصول  ");

var $validate = $("#reqForm").validate({
rules:{
    dateStart:{
        required:true,
        startDate:true
    },
    dateEnd:{
        required:true,
        startDate:true,
        endDate:true
    },
    nameCustomer:{
        required:true
    },
    customerMobileNo:{
        required:true
    }


},
messages:{
    dateStart:{
        required: "من فضلك ادخل تاريخ الوصول",
    },
    dateEnd:{
        required: "من فضلك ادخل تاريخ العودة",
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