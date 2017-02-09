// Setup

var names = ['Cait','Allison','Lindsey','Wolasi','Emily'];
var colors = [
'#EE3322',
'#BA1B16',
'#910A0A',
'#FFEE00',
'#C1A000',
'#997200',
'#F43192',
'#C41475',
'#870753',
'#6645DD',
'#41259D',
'#301984',
'#0F65EF',
'#0030BA',
'#00298E',
'#0DCCB0',
'#007C7C',
'#005B60',
'#68AF15',
'#3C7A05',
'#2D5B00',
'#F7AD19',
'#CC8200',
'#A56200',
'#F47F16',
'#BF5608',
'#964108'
];

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
  var randomBg = getRandomInt(0,colors.length);
  var jokester = getRandomInt(0,4);

	for (var a = 0; a < names.length; a++) {
		html +=  "<li>" + names[a];
    if(jokester==a){
      html += "*";
    }
    html += "</li>";
	}
	html += "</ol>";

  // change bg color
  html += "<style type=\"text/css\">body{ background: "+colors[randomBg]+" !important; }</style>";

	// output full list
	d = document.getElementById("results");
	d.innerHTML = html;

}
