Dropzone.autoDiscover = false;

$(function () {
  
  var csrf = $("meta[name=csrf-token]").attr("content");    
  var featImageLogo = '';
  var featImageCat = "";
  var featImageFav = "";

  $("div#dropi_cat").dropzone({ 
    addRemoveLinks: true,
    maxFiles:1,
    url: "/dashboard/media/uploadimage",
    timeout:360000,
    headers: {
      'X-CSRF-TOKEN': csrf
     },
    init: function() {
      this.on("addedfile", function() {
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });

      if(catalog){
        var mockFile = { 
          name: 'catalog', 
          exist:true,
          size: 12345, 
          dataURL: catalog
        }
        this.emit("addedfile", mockFile);
        this.emit("thumbnail", mockFile, catalog);
        this.emit("complete", mockFile); 
        this.files.push(mockFile);
        featImageCat = catalog;
        
        
  
      }

    
      this.on("complete", function(file) {
        let res = JSON.parse(file.xhr.response);
         if(res.err){
           return console.log(err)
 
         }
         file.dataURL = res.filepath;
         file.exist = false;
         featImageCat = res.filepath
         
       })

       this.on("removedfile" ,function(file){
        featImageCat = '';
      
      })

    } 
  });
  $("div#dropi_fav").dropzone({ 
    addRemoveLinks: true,
    maxFiles:1,
    url: "/dashboard/media/uploadimage",
    timeout:360000,
    headers: {
      'X-CSRF-TOKEN': csrf
     },
    init: function() {
      this.on("addedfile", function() {
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });

      if(favicon){
        var mockFile = { 
          name: 'favicon', 
          exist:true,
          size: 12345, 
          dataURL: favicon
        }
        this.emit("addedfile", mockFile);
        this.emit("thumbnail", mockFile, favicon);
        this.emit("complete", mockFile); 
        this.files.push(mockFile);
        featImageFav = favicon;
        
        
  
      }

    
      this.on("complete", function(file) {
        let res = JSON.parse(file.xhr.response);
         if(res.err){
           return console.log(err)
 
         }
         file.dataURL = res.filepath;
         file.exist = false;
         featImageFav = res.filepath
         
       })

       this.on("removedfile" ,function(file){
        featImageFav = '';
      
      })

    } 
  });
 
  $("div#dropi_logo").dropzone({ 
    addRemoveLinks: true,
    maxFiles:1,
    timeout:360000,
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

      if(logo){
        var mockFile = { 
          name: 'logo', 
          exist:true,
          size: 12345, 
          dataURL: logo
        }
        this.emit("addedfile", mockFile);
        this.emit("thumbnail", mockFile, logo);
        this.emit("complete", mockFile); 
        this.files.push(mockFile);
        featImageLogo = logo;
        
        
  
      }

    
      this.on("complete", function(file) {
        let res = JSON.parse(file.xhr.response);
         if(res.err){
           return console.log(err)
 
         }
         file.dataURL = res.filepath;
         file.exist = false;
         featImageLogo = res.filepath
         
       })

       this.on("removedfile" ,function(file){
        featImageLogo = '';
      
      })

    } 
  });
 
  Inputmask().mask(document.querySelectorAll("input"));
  
    $("#setData").validate({
      //ignore: [],
      rules: {
        facebook: {
          required: true,
        },
      },
      messages: {
        facebook: {
          required: "أدخل اللينك",
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
          console.log(serialData)
          var link = '/dashboard/settings/';
        serialData.push({name:"logo" , value: featImageLogo })
        serialData.push({name:"catalog" , value: featImageCat })
        serialData.push({name:"favicon" , value: featImageFav })
          var sentdata = {}
  
          $(serialData ).each(function(index, obj){
 
              sentdata[obj.name] = obj.value;
            
               
           });
           console.log(sentdata)
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




