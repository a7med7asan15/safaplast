$(function () {
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addColorForm").validate({
      rules: {
        colorName: {
          required: true,
        },
        colorArabic: {
          required: true,
        },
        colorHex: {
          required: true,
        },
      },
      messages: {
        colorName: {
          required: "Please Enter an English name",
        },
        colorArabic: {
          required: "Please Enter an Arabic Name",
        },
        colorHex: {
          required: " please Enter Color Hex",
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
  