import express 	from 'express';
import cors 	from 'cors';

const app = express();
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
app.use(cors());
app.use(bodyParser.json());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
.then(async (res) => {
	pc = await res.json();
})
.catch(err => {
	console.log('Чтото пошло не так:', err);
});




const arrDevice = ["board", "ram", "os", "floppy", "hdd", "monitor", "length", "height", "width", undefined];
const arrProperty = ["vendor", "model", "cpu", "image", "video", "volume", "pins", "size", undefined];
const arrParameter = ["model", "hz", "vendor", "size", "volume", undefined];

app.get('/task3A/:device?/:property?/:parameter?/:somefield?', (req, res) => {
	const device = req.params.device;
	const property = req.params.property;
	const parameter = req.params.parameter;
	const somefield = req.params.somefield;

	if (device == "volumes") {
		var C = 0;
		var D = 0;
		var i = pc.hdd.length - 1;
		for (i; i >= 0; i--) {
			if (pc.hdd[i]["volume"] == "C:") {
				C += pc.hdd[i]["size"];
			} else {
				D += pc.hdd[i]["size"];
			}
		}
		C = C.toString();
		D = D.toString();
		return res.json({
			"C:":C+"B",
			"D:":D+"B",
		});
	}

	if (somefield) {
		return res.status(404).send('Not Found');
	}

	if ((arrDevice.indexOf(device) == -1) || (arrProperty.indexOf(property) == -1 && property.match('[0-9]*') == '') || (arrParameter.indexOf(parameter) == -1) || (parseInt(req.params.property) >= pc.hdd.length)) {
		return res.status(404).send('Not Found');
	}

	if (device) {
		if (property) {
			if (parameter) {
				return res.json(pc[device][property][parameter]);
			}
		 return res.json(pc[device][property]);
		}
		return res.json(pc[device]);
	} else {
		return res.json(pc);
	}
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});