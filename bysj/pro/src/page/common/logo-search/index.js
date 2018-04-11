require('./index.css');

$(function(){
	$('.search-btn').click(function(){
		window.location.href = './list.html?search='+$('.search-text').val();
	})
});