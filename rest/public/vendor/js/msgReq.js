var $validate = $(".msgForm").validate({
    rules: {
        name: {
            required: true
        },
        email: {
            required: true,
            email: true,
        },
        phone: {
            required: true,
            minlength: 11,
            maxlength: 11,
            //pattern: /['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
        },
        message:{
            required:true
        }
    },
    messages: {
        name: {
            required: "Enter Name",
        },
        email: {
            required: "Please enter a valid email",
            email: "Please enter a valid email",
        },
        phone: {
            required: "Enter Phone",
            minlength: "Enter Valid Phone",
            maxlength: "Enter Valid Phone",
            //pattern: /['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
        },
        message:{
            required: "Please Enter Message"
        }
    },
    highlight: function (element) {
        $(element).addClass("is-invalid");
        console.log(element)
    },
    unhighlight: function (element) {
        $(element).removeClass("is-invalid");
    },

    submitHandler: function (form, event) {
        event.preventDefault();

        const serialData = $(form).serializeArray();
        serialData.push({
            name: "captcha",
            value: ""
        });

        var data = {}
        $(serialData).each(function (index, obj) {
            data[obj.name] = obj.value;
        });


        $.ajax({
            type: "POST",
            url: '/sendMsg',
            data: serialData,
            headers: {
                'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
            },
            success: function (result) {
                if (!result.err) {
                    console.log("Hello")
                    console.log(data);
                    console.log(result)
                    //localStorage.setItem("name", data.cuName);
                    // localStorage.setItem("orderId", serialData.orderId);
                    $("#message-contact").slideUp(750, function () {
                        $('#message-contact').hide();

                        $('#message-contact')
                            .after('<h5>We will contact you soon..</h5>')




                    });
                } else {
                    $("#message-contact .btn").after('You cannot submit')

                    return $validate.showErrors(errors);
                }

            }
        })
        /* JSON.stringify({firstName:firstName,lastName:lastName,captcha:captcha})
        }).then(res => res.json()).then(data => { alert("msg: " + data.msg + ", success?: " + data.success + ", score: " + data.score)})  */


    },

})