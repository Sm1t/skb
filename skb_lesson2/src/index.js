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

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
