var $validate = $("#contactForm").validate({
    rules: {
        name_contact: {
            required: true
        },
        lastname_contact: {
            required: true
        },
        email_contact: {
            required: true,
            email: true,
        },
        phone_contact: {
            required: true,
            minlength: 11,
            maxlength: 11,
            //pattern: /['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/,
        },
        message_contact: {
            required: true,
        },


    },
    messages: {
        name_contact: {
            required: "من فضلك ادخل الاسم",
        },
        lastname_contact: {
            required: "من فضلك ادخل الاسم الاخير",
        },
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
                    grecaptcha.execute('6Le8rs8ZAAAAAKfO_HMOqTWHLos8guMBe6VgdL_u', {
                        action: 'submit'
                    }).then(function (token) {
                        data.captcha = token;
                        console.log(token);
                    });
                    $("#message-contact").slideUp(750, function () {
                        $('#message-contact').hide();

                        $('#message-contact')
                            .after('<p>سيتم الارسال..شكرا</p>')




                    });

                    console.log(data);
                    //localStorage.setItem("name", data.cuName);
                    // localStorage.setItem("orderId", serialData.orderId);
                    //return window.location.replace("http://" + result.domainName + "/orders/confirm");
                } else {
                    let key = result.key
                    let msg = result.msg
                    let errors = {
                        [key]: msg
                    };

                    return $validate.showErrors(errors);
                }

            }
        })
        /* JSON.stringify({firstName:firstName,lastName:lastName,captcha:captcha})
        }).then(res => res.json()).then(data => { alert("msg: " + data.msg + ", success?: " + data.success + ", score: " + data.score)})  */


    },

})