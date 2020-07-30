$(function () {
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addVariantForm").validate({
      rules: {
        variantEnglish: {
          required: true,
        },
        variantArabic: {
          required: true,
        },
        parentType: {
          required: true,
        },
        parentClass: {
          required: true,
        },
      },
      messages: {
        variantEnglish: {
          required: "Please Enter English Name",
        },
        variantArabic: {
          required: "Please Enter Arabic Name",
        },
        parentType: {
          required: "Please Enter Type",
        },
        parentClass: {
          required: "Please Enter Class",
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
  