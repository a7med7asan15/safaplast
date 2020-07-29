$(function () {
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addAreaForm").validate({
      rules: {
        nameEnglish: {
          required: true,
        },
        nameArabic: {
          required: true,
        },
        parentCity: {
          required: true,
        },
      },
      messages: {
        nameEnglish: {
          required: "Please Enter English Name",
        },
        nameArabic: {
          required: "Please Enter Arabic Name",
        },
        parentCity: {
          required: "Please Enter City",
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
  