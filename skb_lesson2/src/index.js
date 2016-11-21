import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});


/*--------------- 1 ---------------*/

app.get('/task2A', (req, res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(sum.toString());
});


/*--------------- 2 ---------------*/

function with_initials(fullname){
	const re = new RegExp('(?:\\s*)([A-Za-zа-яА-ЯÀ-ÿ\']*)?(?:\\s*)([A-Za-zа-яА-ЯÀ-ÿ\']*)?(?:\\s*)([A-Za-zа-яА-ЯÀ-ÿ\']*)?(?:\\s*)([A-Za-zа-яА-ЯÀ-ÿ\']*)?');
	const reInvalid = new RegExp('([0-9_\/])');
	const first = new RegExp('([A-ZА-Яa-zа-яÀ-ÿ])');
	const array = fullname.match(re);
	if (array[4] != null) {return 'Invalid fullname';}
	const checkInvalid = fullname.match(reInvalid);
	if (checkInvalid != null) {return 'Invalid fullname';}
	for (var i = 3; i >= 1; i--) { 
		if (fullname.match('[À-ÿ]') == null && array[i]) {
			array[i] = array[i].toLowerCase().replace(/[a-zа-я]/, array[i].match(first)[1].toUpperCase());
		}
	}
	var surname = array[3];
	var name = '';
	var patr = '';
	var initials = '';
	var result = '';

	if (array[3] == null) {
		if (array[2] == null) {
			if (array[1] == null) {
				result = 'Invalid fullname';
			} else{
				surname = array[1];
				result = surname;
			}
		} else {
			surname = array[2];
			name = array[1].match(first)[1];
			initials = name+'.';
			result = surname+ ' ' + initials;
		}
	} else {
		name = array[1].match(first)[1];
		patr = array[2].match(first)[1];
		initials = name+'. ' + patr +'.';
		result = surname+ ' ' + initials;
	}

	return result;
}


app.get('/task2B', (req, res) => {
	const surname = with_initials(req.query.fullname);
	res.send(surname);
});


/*--------------- 3 ---------------*/

function canonize(url){
	const re = new RegExp('@?(https?:)?(\/\/)?(www.)?((telegram|vk|vkontakte|twitter|github)?[^\/]*\/)?([a-zA-Z0-9@_\.]*)', 'i');
	const username = url.match(re)[6]; console.log(url.match(re));
	if (username.match('@') == null ) {
		return '@' + username;
	} else return username;
	
}


app.get('/task2C', (req, res) => {
	const username = canonize(req.query.username);
	if (username == '@') {
		res.send('Invalid username');
	} else{
		res.send(username);
	}
	
});


/*--------------- 4 ---------------*/


app.get('/task2D', (req, res) => {
	if (!req.query.color) {return res.send('Invalid color');}
	var color = req.query.color;


	const reRGB = new RegExp('(?:\\s*)?(rgb\\()(?:\\s*)?([0-9]{1,3})(?:\\s*)?,(?:\\s*)?([0-9]{1,3})(?:\\s*)?,(?:\\s*)?([0-9]{1,3})(?:\\s*)?\\)');
	const reHSL = new RegExp('(?:\\s*)?(hsl\\()(?:\\s*)?([0-9]{1,3})(?:\\s*)?,(?:%20)*?([0-9]{1,3})(?:%)(?:\\s*)?,(?:\\s*)?(?:%20)*?([0-9]{1,3})');

	if (color.match(reRGB)) { 
		var r = parseInt(color.match(reRGB)[2]);
		var g = parseInt(color.match(reRGB)[3]);
		var b = parseInt(color.match(reRGB)[4]);

		if (r > 255 || g > 255 || b > 255 || color.match('([^rgb0-9\\(\\),\\s])')) {return res.send('Invalid color');}

		function componentToHex(c) {
			var hex = c.toString(16);
			if (hex.length == 1) {
				return "0" + hex;
			} else {
				return hex;
			}
			//return hex.length == 1 ? "0" + hex : hex;
		}

		function rgbToHex(r, g, b) {
			return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}

		return res.send(rgbToHex(r, g, b));
	}

	if (color.match(reHSL)) {
		var hsl = require('hsl-to-hex');
		var h = parseInt(color.match(reHSL)[2]);
		var s = parseInt(color.match(reHSL)[3]);
		var l = parseInt(color.match(reHSL)[4]);

		if (s > 100 || l > 100) {return res.send('Invalid color');}

		var hex = hsl(h, s, l);
		return res.send(hex);
	}


	const re = new RegExp('(#)?([^\\s][A-Fa-f0-9%]*)');
	const invalid = new RegExp('([^A-Fa-f0-9\\s#])');

	if (color.match(invalid)) {return res.send('Invalid color');}

	color = color.toLowerCase();
	color = color.match(re)[2];

	if (color.length != 3 && color.length != 6) {
		return res.send('Invalid color');
	}

	if (color.length == 3) {
		color = color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
	}

	res.send('#'+color);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
