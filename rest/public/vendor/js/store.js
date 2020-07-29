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

  $('.storeArea').select2({
    ajax: {
      url: '/dashboard/logistic/areas/search',
      type:"POST",
      dataType:"json",
      delay:250,
      data: function (params) {
        var query = {
          nameEnglish: params.term,
          _csrf: csrf
        }
  
        // Query parameters will be ?search=[term]&type=public
        return query;
      },
      processResults: function (data) {
        // Transforms the top-level key of the response object from 'items' to 'results'
        return { results: $.map(data.results, function (val,i){
          return {id:val._id,text:val.nameEnglish}
        } )
        }
      }
  }});
 

  $('#addnewstore').validate({
        rules:{
          storeNameEnglish:{
                required: true,
            },
            storeNameArabic:{
                required: true,
            },
            mobilenumber:{
              required:true,
              minlength: 11,
            },

              storelogo:{ 
                required: true, 
                extension: "png|jpe?g|gif", 
               },
               storecover:{
                required: true, 
                extension: "png|jpe?g|gif", 
               },
               openhour:{
                required: true,
            },
            closehour:{
                required: true,
            },
            waitingtime:{
                required: true,
            },
            storeservices:{
                required: true,

            },
            addressarabic:{
                required: true,

            },
            addressenglish:{
                required: true,

            },
            longtude:{
                required: true,

            },
            latitude:{
                required: true,

            }

        },
        messages:{
          storeNameEnglish:{
            required: 'Please Enter Store Name In English',
          },
          storeNameEnglish:{
            required: 'Please Enter Store Name In Arabic',
          },
          mobilenumber:{
            required: ' please Enter landline Number',
            minlength:'Please Verify That it is not less than 8 Charachters'
          },
          storelogo:{ 
                required: 'Please Provide Us With the Store Logo', 
                extension: "The Only Valid extensions is [ png,jpeg , jpg ,gif]", 
               },
          storecover:{ 
                required: 'Please Provide Us With the Store Cover', 
                extension: "The Only Valid extensions is [ png,jpeg , jpg ,gif]", 
               },
               openhour:{
                required: "Required Feild",
            },
            closehour:{
                required: "Required Feild",
            },
            waitingtime:{
                required: "Required Feild",
            },
            storeservices:{
                required: "Please Select At Least one Service",

            },
            addressarabic:{
                required: "Please Provide Us With Address In Arabic",

            },
            addressenglish:{
              required: "Please Provide Us With Address In English",
            },
            longtude:{
              required: "Please Provide Us With Google longtude",

            },
            latitude:{
              required: "Please Provide Us With Google latitude",

            }

        },
        highlight: function(element) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).removeClass('is-invalid');
        },
        errorElement: 'span',    
        errorClass: 'error invalid-feedback',
        errorPlacement:function(error,element){
          if (element.attr("name") == "storelogo" || "storecover" ) {
            $(element).closest(".form-group").append(error);
            }
            else{

            $(element).parent().append(error);
            }
        }
        })








});




