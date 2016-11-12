import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2A', (req, res) => {
	const sum = (+req.query.a || 0) + (+req.query.b || 0);
	res.send(sum.toString());
});

function with_initials(fullname){
	//const re = new RegExp('([A-Za-z]*\\s?)+');
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

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
