$(function () {
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addTypeForm").validate({
      rules: {
        typeEnglish: {
          required: true,
        },
        typeArabic: {
          required: true,
        },
      },
      messages: {
        typeEnglish: {
          required: "Please Enter English Name",
        },
        typeArabic: {
          required: "Please Enter Arabic Name",
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
  