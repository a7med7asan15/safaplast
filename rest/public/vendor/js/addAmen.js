

$(function () {
    $('.am-icons').select2({
        templateResult: formatOptions,
        templateSelection: formatOptions
    });
    
    Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addAmenForm").validate({
      rules: {
        nameEnglish: {
          required: true,
        },
        nameArabic: {
          required: true,
        },
        icon: {
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
        icon:{
            required: "Please Enter Icon",
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


  function formatOptions (state) {
    if (!state.id) { return state.text; }
    var optimage = $(state.element).attr('data-image');
    if(optimage!="0"){
        var $state = $(
            '<span><img style="display:inline-block;margin-right: 15px;background: #fff;padding:2px;height:29px;border-radius: 50%;" src="' + optimage + '"/>'  + state.text + '</span>'
           );
    }else{
        return state.text; 
    }
  
  return $state;
  }
  