let container = document.getElementById('ext-container'),
		authorContainer = document.getElementById('author-mention'),
		p = document.getElementById('date-string'),
		option_text = '',
		api_url = '',
		d = new Date(),
		date = d.getDate(),
		day = d.getDay(),
		month = d.getMonth(),
		year = d.getFullYear(),
		hours = d.getHours(),
		minutes = d.getMinutes();
var urlArray = [],
    urls = '',
    link = '',
    authors = '',
    data = null,
    imagesData = {},
    key ='',
    objectKey = [];

var show_date = function() {
    var days = ["Sunday",  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

    var months = ["January", "February", "March", "April", "May", "June", "July" ];

    if( hours < 10 ){

			hours = "0" + hours;
		}

		if( minutes < 10 ){
			minutes = "0" + minutes;
		}
		if( p !== null ){
			p.innerHTML = months[month] +' ' + date + ', ' + year + "<br><br>" + hours + ' :' + ' ' + minutes;
		}
		else {
		}
};

    //api call to get the rando  images from an unsplash
    var get_images = function(){
        chrome.storage.sync.get(['custom_option'], function(text){
            if( text.custom_option.length > 0 ){
                option_text = text.custom_option;
            }
            else{
                option_text = "wallpaper";
            }
            api_url = "https://api.unsplash.com/search/photos?per_page=200&query="+ option_text + "&client_id=XXXXXXX";
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function() {
                if (this.readyState === 4) {
                    var response = JSON.parse(this.responseText);
                    //console.log(response);
                    if (response.results.length > 0) {
                        for (var item = 0; item < response.results.length; item++) {
                            urls = response.results[item].urls.regular;
                            authors = response.results[item].user.name;
                            imagesData[authors] = urls;
                        }
                        //select a link randomly
                        objectKey = Object.keys(imagesData);
                        //getrandom key
                        key = objectKey[Math.floor(Math.random() * Math.floor(objectKey.length))];
                        //console.log(key);
                        link = imagesData[key];
                        //console.log(link);
												if( container !== null ){
													if( document.title == "Background beautifier | Chrome extension" ){
														container.style.position = "absolute";
														container.style.top = 0;
														container.style.right = 0;
														container.style.height = window.innerHeight + 'px';
		                        container.style.width = window.innerWidth + 'px';
		                        container.style.background = 'url('+link+') no-repeat center fixed';
														container.style.opacity = 1;
		                        container.style.backgroundSize = 'cover';
		                        container.style.backgroundRepeat = 'no-repeat';
													}
													else{
														container.style.display = "none";
													}

												}

												if( authorContainer !== null ){
													authorContainer.style.position = 'fixed';
	                        authorContainer.style.bottom = '0px';
	                        authorContainer.textContent = 'Unsplash Image by ' + key;
												}
                    }
                }
        });

            xhr.open( "GET", api_url );
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("dataType", "string");
            xhr.send(data);
        });

    };

var manage_search = function() {
    var input = document.getElementById("search-input");
		if( input !== null ){
			input.addEventListener("keyup", function(event) {
	        event.preventDefault();
	        if (event.keyCode === 13) {
	            var searchTerm = input.value;
	            if (searchTerm.length > 0) {
	                window.location = "https://www.google.fr/search?q=" + searchTerm;
	            } else {
	                window.location = "https://www.google.fr/search?q=" + "la question sur la vie l'univers et le reste";
	            }
	        }
	    });
		}

};
get_images();
show_date();
manage_search();
