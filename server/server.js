import express from 'express';
const app = express();

import cors from 'cors'
import mercadopago from 'mercadopago';

app.use(express.json());
app.use(cors())
app.get("/", function(req, res) {
    res.send("el servidor de mercado pago funciona")
})

mercadopago.configure({
    access_token: "TEST-1878375418655883-111117-50b1bf5554499961b686b64795c045e1-1153345491",
});



app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:3000/calu",
			"failure": "http://localhost:3000",
			"pending": ""
		}, 
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});
app.listen(4000, () => {
    console.log('listening on port 4000')
})