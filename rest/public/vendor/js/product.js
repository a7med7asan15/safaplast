
Dropzone.autoDiscover = false;

$(function () {
  var imagesArray = [];
  var csrf = $("meta[name=csrf-token]").attr("content");    

  $('.types').select2();
  $('.htmlInfo').summernote({
    direction: 'ltr',
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline']],
      //['font', ['strikethrough', 'superscript', 'subscript']],
      //['fontsize', ['fontsize']],
      //['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      //['height', ['height']]
    ]
  });
  $('.htmlTable').summernote({
    direction: 'ltr',
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline']],
      //['font', ['strikethrough', 'superscript', 'subscript']],
      //['fontsize', ['fontsize']],
      //['color', ['color']],
      ['table', ['table']],
      //['height', ['height']]
    ]
  });
  if(!add){
    $('.htmlInfo').summernote('code',htmlInfoVal);
    $('.htmlTable').summernote('code',htmlTableVal);
 }
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

    const validator = $("#addnewdata").validate({
      ignore: ".note-editor *",
      rules: {
        title: {
          required: true,
        },
        code: {
          required: true,
        },
        type: {
          required: true,
        },
        

      },
      messages: {
        title: {
          required: "أدخل اسم المنتج",
        },
        code: {
          required: "أدخل كود المنتج",
        },
        type: {
          required: "أدخل نوع المنتج",
        },
      },
      highlight: function (element) {
        $(element).addClass("is-invalid");
      },
      unhighlight: function (element) {
        $(element).removeClass("is-invalid");
      },
      submitHandler:function(form,e){
        var link = '/dashboard/products/add';
        if(!add){
           link =`/dashboard/products/edit?id=${postId}`;
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




