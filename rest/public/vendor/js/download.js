var $validate = $(".download_cat").validate({
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
        '#g-recaptcha-response':{
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
        '#g-recaptcha-response':{
            required:"Please Select Captcha"
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
            url: '/downloadCatalog',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
            },
            success: function (result) {
                if (!result.err) {
                        console.log(serialData)
                        console.log(data)
                        console.log(result)
                        $(".download_cat .btn").prop('disabled', true);
                        setTimeout(function(){
                            $(".download_cat .btn").prop('disabled', false);
                        }, 10*1000);
                    //localStorage.setItem("name", data.cuName);
                    // localStorage.setItem("orderId", serialData.orderId);
                    return window.location.replace(doLink);
                } else {
                    $(".download_cat .btn").after('You cannot submit')

                    return $validate.showErrors(errors);
                }

            }
        })
        /* JSON.stringify({firstName:firstName,lastName:lastName,captcha:captcha})
        }).then(res => res.json()).then(data => { alert("msg: " + data.msg + ", success?: " + data.success + ", score: " + data.score)})  */


    },

})