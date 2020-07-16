$(function () {
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#adduserForm").validate({
      rules: {

        oldpassword: {
          required: true,
          minlength: 5,
        },
        newpassword: {
          required: true,
          minlength: 5,
        },
      },
      messages: {
        oldpassword: {
          required: " please Enter The Old Password ",
          minlength: "Please Verify That it is not less than 5 Charachters",
        },
        newpassword: {
          required: " please Enter The New Password",
          minlength: "Please Verify That it is not less than 5 Charachters",
        },

      },
      highlight: function (element) {
        $(element).addClass("is-invalid");
      },
      unhighlight: function (element) {
        $(element).removeClass("is-invalid");
      },
      errorElement: "span",
      errorClass: "error invalid-feedback",
    });
  
  });
  