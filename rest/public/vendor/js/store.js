
Dropzone.autoDiscover = false;

$(function () {
  var imagesArray = [];
  var csrf = $("meta[name=csrf-token]").attr("content");    
  $('.storeArea').select2();
  $('.norooms').select2();
  $('.types').select2();
  $('.amenties').select2();
  

  $("div#dropi").dropzone({ 
    addRemoveLinks: true,
    url: "/dashboard/media/uploadimage",
    headers: {
      'X-CSRF-TOKEN': csrf
     },
    init: function() {
      if(data != undefined ){
        for (var i = 0; i < data.length; i++) {
        var mockFile = { 
          name: data[i]._id, 
          exist:true,
          size: 12345, 
          dataURL:data[i].imageLink
        }
        this.displayExistingFile(mockFile,data[i].imageLink ,null , true ,false)
        imagesArray.push(data[i].imageLink);
    }
      }

      this.on("complete", function(file) {
        
       let res = JSON.parse(file.xhr.response);
        if(res.err){
          return console.log(err)

        }
        file.dataURL = res.filepath;
        file.exist = false;
        imagesArray.push(res.filepath) 
      })
      this.on("removedfile" ,function(file){
        var exist = false ;
        var existPostId = false;
        var imageId = false;
        if (file.exist) {
          exist = true
          existPostId = postId
          imageId = file.name
        }
        let index = imagesArray.indexOf(file.dataURL)
        imagesArray.splice(index, 1);
        $.ajax({
          type: 'POST',
          url: `/dashboard/media/deleteimage?exist=${exist}`,
          data: {postId: existPostId,
                 imageUrl :  file.dataURL,
                 imageId :imageId
                },
          headers: {
                  'X-CSRF-TOKEN': csrf
                 },      
          sucess: function(data){
          }
        });
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
      submitHandler:function(form,e){
        var link = '/dashboard/propertys/add';
        if(!add){
           link =`/dashboard/propertys/edit?id=${postId}`;
        }
          e.preventDefault();  
          var serialData = $( form ).serializeArray();
          serialData.push({name:"images" , value: [...imagesArray] })
           $.ajax({
            type: "POST",
            url: link,
            data: serialData,
            success: function( result ) {
              if(!result.err){
                window.location.replace(window.location.href);
              }
            }
          });
    
      },
      errorElement: "span",
      errorClass: "error invalid-feedback",
    });

   







});




