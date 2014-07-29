$(function() {
	return $("#user_added_product_name").autocomplete({
		source: $("#user_added_product_name").data("autocomplete-source"),
		minLength: 3,

		select: function(event, object) {
			var url = '/products/search/' + object.item.label;
			console.log(url);
			$.getJSON(url, function(data) {
				$('#user_added_product_unit_of_time_period').val(data.unit_of_time_period);
				$('#user_added_product_number_unit_of_time').val(data.number_unit_of_time);
				var date =	moment().add(data.unit_of_time_period.replace("(s)", ""), data.number_unit_of_time).format('YYYY-MM-DD');
				$('#datepicker').val(date);	
				change_exp();
			});
		}
	});
});

$(function() {
	return $("#datepicker").datepicker({
		minDate: 0,
		dateFormat: 'yy-mm-dd'
	});
});

function change_exp(){
	$("#user_added_product_number_unit_of_time, #user_added_product_unit_of_time_period").change(function(){
	//$('#user_added_product_unit_of_time_period').change(function(){
			var period_time = $('#user_added_product_unit_of_time_period').val();
			var num_time = $('#user_added_product_number_unit_of_time').val();
			switch (period_time){
		   	case "Day(s)":
	
		   		$('#datepicker').val((moment().add('d', num_time).format("YYYY-MM-DD")));
		   		break;
		   	case "Week(s)":
		   		$('#datepicker').val((moment().add('w', num_time).format("YYYY-MM-DD")));
		   		break;
		   	case "Month(s)": 
		      $('#datepicker').val((moment().add('M', num_time).format("YYYY-MM-DD")));
		      break;
		    case "Year(s)": 
		      $('#datepicker').val((moment().add('y', num_time).format("YYYY-MM-DD")));
		      break;
				default: 
		      alert('Error');
		      break;
		};
	});
};


$(function(){


});

<%#= Turn this into a form appended in javascript. 
select_tag(:notify_num, options_for_select(1..7)) %>
<%#= select_tag(:notify_date_type, options_for_select(["Day(s)", "Week(s)", "Month(s)", "Year(s)" ])) %> <br >



