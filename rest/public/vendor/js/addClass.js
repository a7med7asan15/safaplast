$(function () {
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addClassForm").validate({
      rules: {
        classEnglish: {
          required: true,
        },
        classArabic: {
          required: true,
        },
      },
      messages: {
        classEnglish: {
          required: "Please Enter English Name",
        },
        classArabic: {
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
  