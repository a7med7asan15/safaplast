$(function () {
  
    $("#loginForm").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 3,
        }
      },
      highlight: function (element) {
        $(element).addClass("is-invalid");
      },
      unhighlight: function (element) {
        $(element).removeClass("is-invalid");
      },
      errorElement: "span",
      errorClass: "error invalid-feedback",
      errorPlacement:function(error,element){
 
    
            $(element).parent().append(error);
      
      }
    });
  
  });
  