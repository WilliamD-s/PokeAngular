// Define the `phonecatApp` module
var pokeApiApp = angular.module('pokeAngularApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
pokeApiApp.controller('PhoneListController', function PhoneListController($scope, $http) {
    $scope.pokemons = [];
    $scope.currentPage = 1;

    var data = null;

    const link = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
    
    function loadPage(page=''){
        if(page === ''){
            page = link;
        }
        $http.get(page)
        .then((res) => {
            if(res.data.results){
                data = res.data;
                $scope.pokemons = data.results;
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    $scope.nextPage = () => {
        $scope.currentPage++;
        loadPage(data.next);
    }
    $scope.previousPage = () => {
        if($scope.currentPage > 1)
            $scope.currentPage--;
        
            loadPage(data.previous);
    }
    loadPage();

    $scope.loadPicture = (urlCode) => {
        let urlPic = urlCode.substring(0,urlCode.lastIndexOf('/')) + '';
        // urlPic = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon' + urlPic.substring(urlPic.lastIndexOf('/'),urlPic.length + urlPic.lastIndexOf('/'))+ '.png';
        urlPic = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + urlPic.substring(urlPic.lastIndexOf('/'),urlPic.length + urlPic.lastIndexOf('/'))+ '.gif';
        return urlPic;
    }
});