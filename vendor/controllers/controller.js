(function(){
	angular.module('myApp',['ang-drag-drop']);

	function MainCtrl(makeRequest, $interval){
		var main = this;
		main.onDrop = function(event, elementIndex, data){
          	makeRequest.checkDragging().then(
				function(success){
					main.Messages[data-1].status = event.target.innerHTML
				},
				function(error){
					alert('error');
				}
			);
      	};
      	main.onDropMessage = function(event, elementIndex, draggedElementIndex){
          alert('Довільне повідомлення');
      	};
		main.Messages;
		main.load = function(){
			makeRequest.takeMessages().then(
				function(success){
					main.Messages = success.data;
				},
				function(error){
					alert('error_inload');
				}
			);
		}
		$interval(function() {
	        main.load();
	    },20000);
	    main.load();
	}
	MainCtrl.$inject = ['makeRequest', '$interval'];

	function makeRequest($http){
		var makeRequest = {};
		makeRequest.checkDragging = function(){
			return $http.post('vendor/main.php',{drag: 'true',  messages: 'false'});
		};
		makeRequest.takeMessages = function(){
			return $http.post('vendor/main.php',{drag: 'false', messages: 'true'});
		};
		return makeRequest;
	}
	makeRequest.$inject = ['$http'];

	angular.module('myApp')
		.controller('MainCtrl', MainCtrl)
		.factory('makeRequest', makeRequest);
})();
