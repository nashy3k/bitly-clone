$(document).ready(function() {
  $('#brand_nash').click(function() {
    $(this).fadeOut('slow');
    $(this).fadeIn('slow');
  });

	$('#Alpha').hover(
		function() {
		$(this).addClass('active');
	  },
	  function() {
	  $(this).removeClass('active');    
	});

	$('[data-toggle="tooltip"]').tooltip();

	// $( "#long_url" ).submit(function( event ) {
	$( "form" ).on( "submit", function( e )  {
  // alert( "Handler for .submit() called." );
	  $("#loading").html("Checking system");
	  e.preventDefault();
	  var input = ( $( this ).serialize() );
	  	$.ajax ({
	  		type: $(this).attr('method'), //post
	  		url: $(this).attr('action'),	///urls
	  		data: input,
	  		dataType: "json",
	  	}).done(function(msg) {

	  		//alert(msg["shorten_url"]);
				$("#display").html("Presto! Your shorten URL is " + msg["short_url"]);
				$("#loading").hide();
				// tableJ();
				$('div#datatable > table > tbody').prepend('<tr><td data-toggle=\"tooltip\" title data-original-title=\"Based on SecureRandom\">' + '<a href=\"' + msg["short_url"] + '\"" >' + msg["short_url"] + '</a></td><td data-toggle=\"tooltip\" title data-original-title=\"FQDN\">' + msg["long_url"] + '</td><td data-toggle=\"tooltip\" title data-original-title=\"click throughs\">' + msg["click_count"] + '</td></tr>');
				$("#loading").show();
				$("#loading").html("Shorten");

				// $('#datatable').append('<td>' + msg["long_url"] + '</td><td>' + msg["shorten_url"] + '</td><td>' + msg["click_count"] + '</td>');
	  	});
	});

		function tableJ() {
				$.ajax ({
					url: $('#allLink').attr('href'),			
				}).done(function(msg) {

					var obj = JSON.parse(msg);
					$.each(obj, function(val, val2) {
						$('div#datatable > table > tbody').append('<tr><td>' + val2[1] + '</td><td>' + val2[2] + '</td><td>' + val2[3] + '</td></tr>');
					});
				});
		};
 

	//for all link ajax
	$('#allLink').click(function( e ) {
		e.preventDefault();
		$.ajax ({
			url: $(this).attr('href'),			
		}).done(function(msg) {

			var obj = JSON.parse(msg);
			$.each(obj, function(val, val2) {
				$('div#links > table > tbody').append('<tr><td>' + val2[0] + '</td><td>' + val2[1] + '</td><td>' + val2[2] + '</td></tr>');
			});
		});
	});
});

