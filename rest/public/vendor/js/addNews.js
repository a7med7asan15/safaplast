
Dropzone.autoDiscover = false;

$(function () {
    var featImage = '';
  var csrf = $("meta[name=csrf-token]").attr("content");    

  $('.htmlArticle').summernote({
    direction: 'ltr',
    callbacks: {
        onImageUpload: function(files) {
            var file
            for(var i=0; i < files.length; i++) {
                file = files[i]
                if (file.type.includes('image')) {
                    var name = file.name.split(".");
                    name = name[0];
                    var data = new FormData();
                    data.append('file', file);
                    $.ajax({
                        url: "/dashboard/media/uploadimage",
                        type: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
                        },
                        contentType: false,
                        cache: false,
                        processData: false,
                        dataType: 'JSON',
                        data: data,
                        success: function (url) {
                            console.log(url)
                            $('.htmlArticle').summernote('insertImage', url.filepath);
                            console.log("Hello")
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert(textStatus + " " + errorThrown);
                        }
                    });
                }
            }
        }
      }, 
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline']],
      //['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
      //['height', ['height']]
    ]
  });

  if(!add){
    $('.htmlArticle').summernote('code',htmlArticleVal);
 }

 $("div#dropi").dropzone({ 
    addRemoveLinks: true,
    maxFiles:1,
    url: "/dashboard/media/uploadimage",
    headers: {
      'X-CSRF-TOKEN': csrf
     },
    init: function() {
      this.on("addedfile", function() {
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });

      if(featImageEdit){
        var mockFile = { 
          name: 'featuredImage', 
          exist:true,
          size: 12345, 
          dataURL: featImageEdit
        }
        this.emit("addedfile", mockFile);
        this.emit("thumbnail", mockFile, featImageEdit);
        this.emit("complete", mockFile); 
        this.files.push(mockFile);
        featImage = featImageEdit;
        
        
  
      }

    
      this.on("complete", function(file) {
        let res = JSON.parse(file.xhr.response);
         if(res.err){
           return console.log(err)
 
         }
         file.dataURL = res.filepath;
         file.exist = false;
         featImage = res.filepath
         
       })

       this.on("removedfile" ,function(file){
        featuredImage = '';
      
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
        tag: {
          required: true,
        },
      },
      messages: {
        title: {
          required: "لا تترك هذا الحقل فارغا",
        },
        tag: {
          required: "لا تترك هذا الحقل فارغا",
        },
      },
      highlight: function (element) {
        $(element).addClass("is-invalid");
      },
      unhighlight: function (element) {
        $(element).removeClass("is-invalid");
      },
      submitHandler: function (form, event) {
        event.preventDefault();
        const serialData = $(form).serializeArray();
        var link = '/dashboard/news/add';
      if(!add){
         link =`/dashboard/news/edit/${postId}`;
      }
      serialData.push({name:"featuredImage" , value: featImage })
        var sentdata = {}

        $(serialData ).each(function(index, obj){

            sentdata[obj.name] = obj.value;
          
             
         });
         $.ajax({

            type: "POST",
            url: link,
            data: sentdata,
            headers: {
                'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
            },
            success: function (result) {
              if(!result.err){
                window.location.replace(window.location.href);
              }else{
                console.log("Here")
              }               
                
            }
        })
    },
    errorElement: "span",
    errorClass: "error invalid-feedback",
  });


   







});




