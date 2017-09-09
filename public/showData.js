var ShowsDatas = function (url) {
    this.url = url;

}

ShowsDatas.prototype.getData = function (search) {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', this.url + search);
    xhr.addEventListener('load', function () {
        if (xhr.status !== 200) return;

        var jsonString = xhr.responseText;
        var data = JSON.parse(jsonString);

        var div = document.querySelector('#shows');
        div.innerHTML = "";
        
        for (var i = 0; i < data.length; i++) {
            
            var output = document.createElement('div');
            var element = data[i];
            
            output.innerHTML += `
                    <div class="col-md-3">
                        <div class="well text-center">
                        <img src="${element.show.image.medium}">
                        <h5>${element.show.name}</h5>
                         <a onclick="tvShowSelected('${element.show.id}')" class="btn btn-primary" href="#">TvShow Details</a>
                        </div>
                    </div>
                    `;
            div.appendChild(output)
            console.log(element.show.id)
        }
    
    }.bind(this));

    xhr.send();
}

function tvShowSelected(id){
    sessionStorage.setItem('showId', id)
    window.location = 'tvshow.html';
    return false;
}

function getTvShow(){
    var tvShowId = sessionStorage.getItem('showId');

    var xhr = new XMLHttpRequest();
    xhr.open('Get', 'http://api.tvmaze.com/shows/' + tvShowId);
    xhr.addEventListener('load', function () {
        if (xhr.status !== 200) return;

        var jsonString = xhr.responseText;
        var data = JSON.parse(jsonString);
        
        console.log(data)
        var div = document.querySelector('#show')

        var output = document.createElement('div')
        output.innerHTML = `
        <div class="row">
          <div class="col-md-4">
            <img src="${data.image.original}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${data.name}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${data.genres}</li>
              <li class="list-group-item"><strong>Released:</strong> ${data.premiered}</li>
              <li class="list-group-item"><strong>Status:</strong> ${data.status}</li>
              <li class="list-group-item"><strong>Running:</strong> ${data.schedule.days} at ${data.schedule.time} </li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${data.rating.average}</li>
              <li class="list-group-item"><strong>Language:</strong> ${data.language}</li>
              <li class="list-group-item"><strong>Official Site:</strong> ${data.officialSite}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${data.summary}
            <hr>
            <a href="http://imdb.com/title/${data.externals.imdb}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="../index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

        div.appendChild(output)

    }.bind(this));

    xhr.send();

}




