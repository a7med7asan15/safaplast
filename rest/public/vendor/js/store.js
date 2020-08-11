$(function () {
  var csrf = $("meta[name=csrf-token]").attr("content");    

  $('.storeowner').select2({
    ajax: {
      url: '/dashboard/users/search',
      type:"POST",
      dataType:"json",
      delay:250,
      data: function (params) {
        var query = {
          email: params.term,
          _csrf: csrf
        }
  
        // Query parameters will be ?search=[term]&type=public
        return query;
      },
      processResults: function (data) {
        // Transforms the top-level key of the response object from 'items' to 'results'
        return { results: $.map(data.results, function (val,i){
          return {id:val._id,text:val.username}
        } )
        }
      }
  }});

  $('.storeArea').select2();
 
  Inputmask().mask(document.querySelectorAll("input"));
  
    $("#addnewstore").validate({
      rules: {
        storeEnglish: {
          required: true,
        },
        storeArabic: {
          required: true,
        },
        mobileNumber: {
          required: true,
          minLength: 11,
        },
        storeOwner: {
          required: true,
        },
        storeArea: {
          required: true,
        },
        addressEnglish: {
          required: true,
        },
        addressArabic: {
          required: true,
        },
        longtude: {
          required: true,
        },
        latitude: {
          required: true,
        },

      },
      messages: {
        storeEnglish: {
          required: "Please Enter English Name",
        },
        storeArabic: {
          required: "Please Enter Arabic Name",
        },
        mobileNumber: {
          required: "Please Enter Valid Mobile Number",
          minLength: "Must be 11 digits",
        },
        storeOwner: {
          required: "Please Enter Store Owner",
        },
        storeArea: {
          required: "Please Enter Area",
        },
        addressEnglish: {
          required: "Please Enter Address in English",
        },
        addressArabic: {
          required: "Please Enter Address in Arabic",
        },
        longtude: {
          required: "Please Enter Longitude",
        },
        latitude: {
          required: "Please Enter Latitude",
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




