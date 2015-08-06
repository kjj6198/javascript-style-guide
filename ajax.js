myid = 0;


$(document).on('sexyEvent', function(){
	for(var i = 0; i < 1; i++){
		$.ajax({
			url: 'https://www.dcard.tw/api/post/all/'+ myid,
			datatype:'json'
		})
		.done(function(result) {
			var $container = $('table tbody');
				console.log(result);
				$(result).each(function(){

				  var $node = $container.append('<tr></tr>'),
				  	  href = document.createElement('a'),
				  	  link = 'https://www.dcard.tw/f/all/p/' + this.id;

			  	  $(href).attr('href', link);
			  	  $(href).append('連結');
				   

				  $node.append('<th>' + this.version[0].title + '</th>');
				  $node.append('<th>' + this.member.school + '</th>');
				  $node.append('<th>' + this.version[0].content + '</th>');
				  console.log(href);
				  $node.append('<th>' + this.createdAt + '</th>');

				  
				});
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			setTimeout(console.log('next page'),10000);
			console.log("complete");
		});

	}
	
	
});
(function(){
	$('a').on('click', function(event) {
		event.preventDefault();
		var id = '10'
		for(var i = 50; i < 51 ; i++){
			setTimeout(function(){
				$.ajax({
					url: 'https://www.dcard.tw/api/forum/sex/' + i,
					datatype: 'json'
					
				})
				.done(function(results) {
					console.log("success");

					$(results).each(function(index, el) {
						myid = this.id;
						$(document).trigger('sexyEvent');
					});
					
					
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
					console.log(myid);
				});

			},5000);
	} 
		
	});
}());