$(document).ready(function(){
 $("#submitbutton").mouseenter(function(){
   $(this).css("background-color", "pink");
 });
 $("#submitbutton").mouseleave(function(){
   $(this).css("background-color", "orange");
 });
 $("#intro").hide();

 $("#img01").hover(function(){
   $("#intro").show();
 });
 $("#img01").mouseleave(function(){
   $("#intro").hide();
 });

 $( "form" ).on( "submit", function( e ) {
   e.preventDefault();
   $("#loading").html("Please wait....we are working magic on your URL");
   // debugger;
   var input = ( $( this ).serialize() );
     $.ajax ({
       type: $(this).attr('method'),
       url: $(this).attr('action'),
       data: input,
       dataType: "json",
     }).done(function(msg) {

       //alert(msg["shorten_url"]);
          $("#shorturl").html("Tada!!! Your shorten URL is " + msg["shorten_url"]);
          $("#loading").hide();
          $('#datatable').append('<td>' + msg["long_url"] + '</td><td>' + msg["shorten_url"]  + '</td><td>' + msg["click_count"]  + '</td>');
      });
   });

     $("#datatable").hide();
     $(".dropdown").click(function(){
     $("#datatable").slideToggle('slow');
 });
 // $("#submitbutton").hover(function(){
 //   $(this).fadeOut(2000);
 // });
 $("#p01").hover(function(){
   $(this).css("color", "gray");
 });
 $("#p01").mouseleave(function(){
   $(this).css("color", "black");
 });


 // for all link ajax
 $('#allLink').click(function(e){
   e.preventDefault();
   $.ajax ({
     url: $(this).attr('href'),
   }).done(function(msg){
     var obj = JSON.parse(msg);
     $.each(obj, function(val, val2){
       $('div#links > table > tbody').append('<tr><td>' + val2[0] + '</td><td>' + val2[1] + '</td><td>' + val2[2] + '</td></tr>');
     });

   });
 });
});