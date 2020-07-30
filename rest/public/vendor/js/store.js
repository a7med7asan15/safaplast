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
 










});




