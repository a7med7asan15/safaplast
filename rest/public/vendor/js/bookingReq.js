var $validate = $("#bookingReqForm").validate({
    rules: {
        cuName: {
            required: true
        },
        cuMob: {
            required: true
        }


    },
    messages: {
        cuName: {
            required: "من فضلك ادخل الاسم",
        },
        cuMob: {
            required: "من فضلك ادخل هاتف محمول",
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
        //console.log(serialData);
        
        var products = ProductManager.getAllProducts();
        var loopVar = products.length;
        console.log(JSON.stringify(products));
        
        serialData.push({name:"orders", value: JSON.stringify(products)})
        console.log(serialData);
        
        
        var data = {}
        $(serialData ).each(function(index, obj){
             data[obj.name] = obj.value;
         });

        
        $.ajax({
            type: "POST",
            url: '/orders/add',
            data: serialData,
            headers: {
                'X-CSRF-TOKEN': $("meta[name=csrf-token]").attr("content")
            },
            success: function (result) {
                console.log(result);

                if (!result.err) {
                    localStorage.setItem("name", result.cuName);
                    localStorage.setItem("orderId", result.orderId);
                    return window.location.replace("http://" + result.domainName + "/orders/confirm");
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
    },

})
ProductManager.updateIcon()