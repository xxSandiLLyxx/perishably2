function ifSelected(date){
    if ($('#day_of__Specific_notification_date').is(':checked')) {
        var num = $("#notify_num").val();
        var unit = $("#notify_date_type").val().replace("(s)", "");
        $('#notification_date').val(moment(date).subtract(unit,num).format("YYYY-MM-DD"));
    }
    else{
        $('#notification_date').val(date);
    }
};
$(function() {
    console.log('hello');
    $("#user_added_product_name").autocomplete({
        source: $("#user_added_product_name").data("autocomplete-source"),
        minLength: 3,
        select: function(event, object) {
            var url = '/products/search/' + object.item.label;
            $.getJSON(url, function(data) {
                $('#user_added_product_storage').val(data.storage);
                $('#user_added_product_unit_of_time_period').val(data.unit_of_time_period);
                $('#user_added_product_number_unit_of_time').val(data.number_unit_of_time);
                var date =    moment().add(data.unit_of_time_period.replace("(s)", ""), data.number_unit_of_time).format('YYYY-MM-DD');
                $('#datepicker').val(date);    
                ifSelected(date);
            });
        }
    });
});

$(function(){
    var onLoadDate = moment().add('days',1).format("YYYY-MM-DD");
    $("#datepicker").val(onLoadDate);
    $('#notification_date').val(onLoadDate);
    $("#datepicker").datepicker({
        minDate: 0,
        dateFormat: 'yy-mm-dd',
        onSelect: function(date){
            ifSelected(date);
        }
    });
});

$(function(){
    $("#user_added_product_number_unit_of_time, #user_added_product_unit_of_time_period").change(function(){
        var period_time = $('#user_added_product_unit_of_time_period').val().replace("(s)", "");
        var num_time = $('#user_added_product_number_unit_of_time').val();
        var date =    moment().add(period_time, num_time).format("YYYY-MM-DD");
        $('#datepicker').val(date);
        ifSelected(date);
    });
});


$(function(){
    $("#day_of__Specific_notification_date").change(function(){
        $("#select_notification_date").slideDown("slow");
        var expDate = $('#datepicker').val();
        var num = $("#notify_num").val();
        var unit = $("#notify_date_type").val().replace("(s)", "");
        $('#notification_date').val(moment(expDate).subtract(unit,num).format("YYYY-MM-DD"));
    })
});

$(function(){
    $("#day_of__Default_notification_date").change(function(){
        $("#select_notification_date").slideUp("slow");
        var expDate = $('#datepicker').val();
        var num = $("#notify_num").val();
        var unit = $("#notify_date_type").val().replace("(s)", "");
        $('#notification_date').val(moment(expDate).format("YYYY-MM-DD"));
    })

});    

$(function(){
    $("#notify_date_type").change(function(){
        var expDate= $("#datepicker").val();
        var expMoment = moment(expDate, "YYYY-MM-DD");
        var num = $("#notify_num").val();
        var unit = $("#notify_date_type").val().replace("(s)", "");
        var notiDate = expMoment.subtract(unit, num).format("YYYY-MM-DD");
        $("#notification_date").val(notiDate);
    })
});

//repeating above function entirely to make it register a change
$(function(){
    $("#notify_num").change(function(){
        var expDate= $("#datepicker").val();
        var expMoment = moment(expDate, "YYYY-MM-DD");
        var num = $("#notify_num").val();
        var unit = $("#notify_date_type").val().replace("(s)", "");
        var notiDate = expMoment.subtract(unit, num).format("YYYY-MM-DD");
        $("#notification_date").val(notiDate);
    })
});

$(function(){
    $("#add_ppl").hide();
    $("#add_recipients").click(function(){
    $("#add_ppl").slideDown("fast");
    $("#add_ppl").append("<div class='each_recipient'><div class='remove btn btn-inverse'>x</div> <label for='name'>NAME</label><input id='name' name='user_added_product[recipients_attributes][][name]' type='text'/><label for='email'>EMAIL</label><input id='email' name='user_added_product[recipients_attributes][][email]' type='text'/><label for='phone_number'>PHONE NUMBER</label><input id='phone_number' name='user_added_product[recipients_attributes][][phone_number]' type='text'/> </div>");
    $(".remove").click(function(){ $(this).parent().remove();});
    event.preventDefault();
    });
});
