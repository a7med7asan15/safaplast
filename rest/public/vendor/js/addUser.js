$(function () {
  Inputmask().mask(document.querySelectorAll("input"));

  $("#adduserForm").validate({
    rules: {
      username: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      mobilenumber: {
        required: true,
        minlength: 11,
      },
    },
    messages: {
      username: {
        required: "Please Enter a working Username",
      },
      email: {
        required: "Please Enter  E-mail Address",
        email: "Please Enter A Working Email Address ",
      },
      password: {
        required: " please Enter Password",
        minlength: "Please Verify That it is not less than 5 Charachters",
      },
      mobilenumber: {
        required: "Please Provide A Mobile Number",
        minlength: "Please Verify That it is not less than 11 Charachters",
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
