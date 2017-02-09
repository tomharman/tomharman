// Setup

var names = ['Cait','Allison','Lindsey','Wolasi','Emily'];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max+1);
  return Math.floor(Math.random() * (max - min)) + min;
}

function init() {
	list = shuffle(names);

  var html = "<ol>";
  var jokester = getRandomInt(0,4);

	for (var a = 0; a < names.length; a++) {
		html +=  "<li>" + names[a];
    if(jokester==a){
      html += "*";
    }
    html += "</li>";
	}
	html += "</ol>";

	// output full list
	d = document.getElementById("results");
	d.innerHTML = html;
}
