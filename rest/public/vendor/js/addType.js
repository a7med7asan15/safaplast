$(function () {
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addData").validate({
      rules: {
        name: {
          required: true,
        },
        
      },
      messages: {
        name: {
          required: "من فضلك أدخل نوع المنتج",
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
  