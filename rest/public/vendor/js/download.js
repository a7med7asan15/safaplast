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
            data: serialData,
            headers: {
                'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
            },
            success: function (result) {
                if (!result.err) {
                    console.log("Hello")
                    console.log(data);
                    console.log(result)
                    console.log(doLink)
                    //localStorage.setItem("name", data.cuName);
                    // localStorage.setItem("orderId", serialData.orderId);
                    return window.location.replace(doLink);
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