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

function init() {
	var html = "<ol>";
	list = shuffle(names);

	for (var a = 0; a < names.length; a++) {
		html +=  "<li>" + names[a] + "</li>";
	}
	html += "</ol>";

	// output full list
	d = document.getElementById("results");
	d.innerHTML = html;
}
