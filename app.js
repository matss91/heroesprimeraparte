// Require de Express
const express = require('express');
// Require de FS
const fs = require('fs');

// Ejecución de Express
const app=express();

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync('./heroes.json','utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', (req,res) => {
	res.send("Ni Superman, Iron"+
		"Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y"+
		"hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como"+
		"inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en"+
		"ti!."
		)});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req,res) => {
	res.send(heroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/detalle/:id', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe =heroes.filter(function(elemento){
return (elemento.id==req.params.id)

	})
	if(heroe[0]!=undefined){
		res.send(heroe[0].nombre+heroe[0].profesion)
	}else{
res.send("no hay dicho superheroe")

	}
	
	// Si se encuentra al héroe se envía el nombre y su profesión
	// Si NO se encuentra se envía el mensaje de no encontrado
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get("/heroes/bio/:id/:ok?", (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe =heroes.filter(function(elemento){
		return (elemento.id==req.params.id)
		
			})
			if(heroe[0]!=undefined&&req.params.ok=="ok"){
				res.send(heroe[0].nombre+heroe[0].resenia)
			}else if(heroe[0]!=undefined){
		res.send(heroe[0].nombre+"lamento que no quieras saber mas de mi")
	}
	else{
res.send( "No encontramos"+
"un héroe para mostrarte su biografía")

}



	
	// Si NO se encuentra al héroe se envía un mensaje
	// Si se encuentra al héroe:
		// Se pregunta si vino el parámetro Y el valor esperado y se envía la información
		// Si nó vino el parámetro se envía el mensaje de error
	
});

// Ruta Créditos
// ¿?

// Ruta... ¿Pára qué sirve esto?
app.get("/creditos", (req, res) => {
	res.send('Matias Esteban Cardillo Mercade');
});