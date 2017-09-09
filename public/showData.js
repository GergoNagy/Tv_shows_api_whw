var ShowsDatas = function (url) {
    this.url = url;
    // this.data = [];

}

ShowsDatas.prototype.getData = function (search) {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', this.url + search);
    xhr.addEventListener('load', function () {
        if (xhr.status !== 200) return;

        var jsonString = xhr.responseText;
        var data = JSON.parse(jsonString);

        // div.innerHTML = "";
        
        for (var i = 0; i < data.length; i++) {
            var div = document.querySelector('#show');
            var output = document.createElement('div');
            var element = data[i];
            
            output.innerHTML += `
                    <div class="col-md-3">
                        <div class="well text-center">
                        <img src="${element.show.image.medium}">
                        <h5>${element.show.name}</h5>
                        </div>
                    </div>
                    `;
            div.appendChild(output)
        }
    
    }.bind(this));

    xhr.send();
}




