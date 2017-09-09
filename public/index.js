window.onload = function(){

    var showsData = new ShowsDatas('http://api.tvmaze.com/search/shows?q=');
    
    var form = document.querySelector('#searchForm');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        this.search = document.getElementById("searchText").value;
        showsData.getData(this.search);
        

    })

}



