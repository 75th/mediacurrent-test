var $ = document.querySelector.bind(document);

(function() {
	var $body = $('body');
	console.log($body);

	$body.classList.add('js');

	$('button.to-dark').addEventListener('click', function() {
		$body.classList.remove('light');
		$body.classList.add('dark');
	});

	$('button.to-light').addEventListener('click', function() {
		$body.classList.remove('dark');
		$body.classList.add('light');
	});
})();
