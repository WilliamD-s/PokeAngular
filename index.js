// Define the `phonecatApp` module
var pokeApiApp = angular.module('pokeAngularApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
pokeApiApp.controller('PhoneListController', function PhoneListController($scope, $http) {
    $scope.pokemons = [];
    $scope.page = 1;

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
        loadPage(data.next);
    }
    $scope.previousPage = () => {
        loadPage(data.previous);
    }
    loadPage();

    $scope.loadPicture = (urlCode) => {
        let urlPic = urlCode.substring(0,urlCode.lastIndexOf('/')) + '';
        urlPic = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon' + urlPic.substring(urlPic.lastIndexOf('/'),urlPic.length + urlPic.lastIndexOf('/'))+ '.png';
        return urlPic;
    }
});