Dropzone.autoDiscover = false;

$(function () {
  
  var csrf = $("meta[name=csrf-token]").attr("content");    
  var featImage = '';


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
  
    $("#addnewdata").validate({
      //ignore: [],
      rules: {
        title: {
          required: true,
        },
      },
      messages: {
        title: {
          required: "Please Enter Ad Title",
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
          var link = '/dashboard/slider/add';
        if(!add){
           link =`/dashboard/slider/edit/${postId}`;
        }
        serialData.push({name:"img" , value: featImage })
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




