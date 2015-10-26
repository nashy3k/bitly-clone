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
});

