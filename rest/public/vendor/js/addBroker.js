

$(function () {


  Inputmask().mask(document.querySelectorAll("input"));
  
    const validator = $("#addDataForm").validate({
      rules: {
        name: {
          required: true,
        },
        mobileNo: {
          required: true,
          minlength:11,
          maxlength:11,
          pattern: /['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
        },


      },
      messages: {
        name: {
          required: "Please Enter Name",
        },
        mobileNumber: {
          required: "Please Enter a Mobile Number",
          minlength: "Minimum 11 characters",
          maxlength: "Maximum 11 Characters",
          pattern: "Please Enter Valid Mobile Number",
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




