# [AngularJS Portfolio](iamjigz.github.io)

**https://iamjigz.github.io/jigz**
is my personal portfolio page.
You will most likely find it hosted in [GitHub Pages](https://iamjigz.github.io/jigz).


## Description

##### Home Page
Loads data to controller from a data.js file and provides an option to update the name, age, location, mobile number, and email information on the page by using AngularJS's two-way data binding which synchronizes the model and view.

##### Skills List
Loads data to controller from a data.js file by using the [ngRepeat](https://docs.angularjs.org/api/ng/directive/ngRepeat)  directive which instantiates a template once per item from a collection. Also allows a filter through an input box.

##### Wiki Search
Sets a watch on the input box then uses an [ngResource](https://docs.angularjs.org/api/ngResource/service/$resource) factory which interacts with the [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page).

##### To Do App
Uses the [HTML Local Storage](https://www.w3schools.com/html/html5_webstorage.asp) for a simple [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) Task/TODO app.

##### GitHub API
Interacts with the [GitHub API](https://developer.github.com/v3/) to show the project's commits, README.md, and author information. Uses a slider to filter the number of commits shown.

## Usage

If you want to run the project locally, you need to serve the code from a web server
and access it on localhost.

If you have a NodeJS setup, you can use [http-server](https://github.com/indexzero/http-server).

Just run
```
npm install http-server -g
```

then on your terminal
```
http-server C:\location\to\app
```

## Built With

* [GitHub Pages](http://pages.github.com/) - The free hosting from GitHub.
* [AngularJS](https://angularjs.org/) - Web framework used.
* [AngularJS Material](https://material.angularjs.org/) - UI Component framework used.
* [MediaWiki](https://www.mediawiki.org/wiki/API) - API used to access Wikipedia data over http.
* [GitHub API](https://developer.github.com/v3/) - API used to access GitHub data over http.
* [Font Awesome](https://developer.github.com/v3/) - Icon set used.
* [Google Material Icons](https://material.io/icons/) - Icon set used.

## Author

* **Jigno Alfred V. Venezuela** - [@iamjigz](https://github.com/iamjigz)
* Homepage: https://iamjigz.github.io/jigz/
* e-mail: jigzimon@gmail.com

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
