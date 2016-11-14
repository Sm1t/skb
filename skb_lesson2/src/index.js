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
	const re = new RegExp('([A-Za-zа-яА-ЯÀ-ÿ]*)?\\s?([A-Za-zа-яА-ЯÀ-ÿ]*)?\\s?([A-Za-zа-яА-ЯÀ-ÿ]*)?\\s?([0-9A-Za-zа-яА-Я]*)?');
	const first = new RegExp('([A-ZА-Яa-zа-яÀ-ÿ])');
	const array = fullname.match(re);
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

	if (array[4] != null) {
		result = 'Invalid fullname';
	}

	return result;
}


app.get('/task2B', (req, res) => {
	const surname = with_initials(req.query.fullname);
	res.send(surname);
});


/*--------------- 3 ---------------*/

function canonize(url){
	const re = new RegExp('@?(https?:)?(\/\/)?(www.)?((telegram|vk|vkontakte|twitter|github)[^\/]*\/)?([a-zA-Z0-9]*)', 'i');
	const username = url.match(re)[6];
	return '@' + username;
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
