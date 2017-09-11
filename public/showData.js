var ShowsDatas = function (url) {
    this.url = url;
    this.tvShows = []
    this.episodes = []
}

ShowsDatas.prototype.getData = function (search) {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', this.url + search);
    xhr.addEventListener('load', function () {
        if (xhr.status !== 200) return;

        var jsonString = xhr.responseText;
        this.tvShows = JSON.parse(jsonString);

        var div = document.querySelector('#shows');
        div.innerHTML = "";

        for (var i = 0; i < this.tvShows.length; i++) {

            var output = document.createElement('div');
            var element = this.tvShows[i];

            output.innerHTML += `
                    <div class="col-md-3">
                        <div class="well text-center">
                        <img src="${element.show.image.medium}">
                        <h5>${element.show.name}</h5>
                         <a onclick="ShowsDatas.prototype.tvShowSelected('${element.show.id}')" class="btn btn-primary" href="#">TvShow Details</a>
                        </div>
                    </div>
                    `;
            div.appendChild(output)
            console.log(element.show.id)
        }

    }.bind(this));

    xhr.send();
}

ShowsDatas.prototype.tvShowSelected = function (id) {
    sessionStorage.setItem('showId', id)
    window.location = 'tvshow.html';
    return false;
}

ShowsDatas.prototype.getTvShow = function () {
    var tvShowId = sessionStorage.getItem('showId');

    var xhr = new XMLHttpRequest();
    xhr.open('Get', 'http://api.tvmaze.com/shows/' + tvShowId);
    xhr.addEventListener('load', function () {
        if (xhr.status !== 200) return;

        var jsonString = xhr.responseText;
        var tvShow = JSON.parse(jsonString);

        console.log(tvShow)
        var div = document.querySelector('#show')

        var output = document.createElement('div')
        output.innerHTML = `
        <div class="row">
          <div class="col-md-4">
            <img src="${tvShow.image.original}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${tvShow.name}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${tvShow.genres}</li>
              <li class="list-group-item"><strong>Released:</strong> ${tvShow.premiered}</li>
              <li class="list-group-item"><strong>Status:</strong> ${tvShow.status}</li>
              <li class="list-group-item"><strong>Running:</strong> ${tvShow.schedule.days} at ${tvShow.schedule.time} </li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${tvShow.rating.average}</li>
              <li class="list-group-item"><strong>Language:</strong> ${tvShow.language}</li>
              <li class="list-group-item"><strong>Official Site:</strong> ${tvShow.officialSite}</li>
              <li class="list-group-item"><strong>Official Site:</strong> ${this.episodes}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${tvShow.summary}
            <hr>
            <a href="http://imdb.com/title/${tvShow.externals.imdb}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a onclick="ShowsDatas.prototype.seasonsSelected('${tvShow.id}')" class="btn btn-default href="#">Seasons</a>
            <a href="/" class="btn btn-default">Go Back To Search</a>
      `;

        div.appendChild(output)

    }.bind(this));

    xhr.send();

}

ShowsDatas.prototype.seasonsSelected = function (id) {
    sessionStorage.setItem('showId', id)
    window.location = 'seasons.html';
    return false;
}

ShowsDatas.prototype.getSeasons = function () {
    var tvShowId = sessionStorage.getItem('showId');

    var xhr = new XMLHttpRequest();
    xhr.open('Get', 'http://api.tvmaze.com/shows/' + tvShowId + '/episodes');
    xhr.addEventListener('load', function () {
        if (xhr.status !== 200) return;

        var jsonString = xhr.responseText;
        this.episodes = JSON.parse(jsonString);



        for (var i = 0; i < this.episodes.length; i++) {
            var episode = this.episodes[i];
            console.log(episode)

            var div = document.querySelector('#seasons')

            var output = document.createElement('div')
            output.innerHTML = `
                    <div class="row">
                    <div class="col-md-4">
                        <img src="${episode.image.original}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h3>${episode.name} </h3>
                        <h5>${episode.airdate} </h5>
                        <ul class="list-group">
                        <li class="list-group-item"><strong>Season:</strong> ${episode.season}</li>
                        <li class="list-group-item"><strong>Episode:</strong> ${episode.number}</li>
                        <li class="list-group-item"><strong>Runtime:</strong> ${episode.runtime}</li>
                        <li class="list-group-item"><strong>Airdate:</strong> ${episode.airdate}</li>
                    </div>
                    </div>
                    <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${episode.summary}
                        <hr>
                        <a href="/" class="btn btn-default">Go Back To Search</a>
                `;

            div.appendChild(output)


        }


    }.bind(this));

    xhr.send();

}




