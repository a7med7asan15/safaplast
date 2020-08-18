
Dropzone.autoDiscover = false;

$(function () {
  var imagesArray = [];
  var csrf = $("meta[name=csrf-token]").attr("content");    
  $('.storeArea').select2();
  $('.norooms').select2();
  $('.types').select2();
  

  $("div#dropi").dropzone({ 
    
    url: "/dashboard/media/uploadimage",
    headers: {
      'X-CSRF-TOKEN': csrf
     },
    init: function() {
      this.on("complete", function(file) {
        
        
       let res = JSON.parse(file.xhr.response);
        if(res.err){
          return console.log(err)

        }
        
        imagesArray.push(res.filepath) 
      })

    } 
  });

  Inputmask().mask(document.querySelectorAll("input"));
  
    const validator = $("#addnewstore").validate({
      rules: {
        storeEnglish: {
          required: true,
        },
        storeArabic: {
          required: true,
        },
        mobileNumber: {
          required: true,
        },
        price:{
          required: true,
        },
        type: {
          required: true,
        },
        rooms: {
          required: true,
        },
        area: {
          required: true,
        },
        addressEnglish: {
          required: true,
        },
        addressArabic: {
          required: true,
        },


      },
      messages: {
        storeEnglish: {
          required: "Please Enter English Name",
        },
        storeArabic: {
          required: "Please Enter Arabic Name",
        },
        mobileNumber: {
          required: "Please Enter Valid Mobile Number",
        },
        storeArea: {
          required: "Please Enter Area",
        },
        type: {
          required: "Please Enter Type",
        },
        type: {
          required: "Please Enter Rooms",
        },
        addressEnglish: {
          required: "Please Enter Address in English",
        },
        addressArabic: {
          required: "Please Enter Address in Arabic",
        },

      },
      highlight: function (element) {
        $(element).addClass("is-invalid");
      },
      unhighlight: function (element) {
        $(element).removeClass("is-invalid");
      },
      submitHandler:function(form){
        
         $( "#addnewstore" ).submit(function(e){
          e.preventDefault();  
          var serialData = $( this ).serializeArray();
          serialData.push({name:"images" , value: [...imagesArray] })

           $.ajax({
            type: "POST",
            url: '/dashboard/propertys/add',
            data: serialData,
            success: function( result ) {
              if(!result.err){
                window.location.replace(window.location.href);
              }
            }
          });
        }) ;
      },
      errorElement: "span",
      errorClass: "error invalid-feedback",
    });

   







});




