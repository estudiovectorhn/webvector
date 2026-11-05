/* Metodología VECTOR · Vector Marketing & Academy · curso interactivo de /metodologia-vector/ */
(function () {
"use strict";
/* ===== Tipos de negocio: cada uno llena los textos de chats, simulador, trivia y kit ===== */
const PRESETS=[
{id:"dental",label:"Clínica dental",emoji:"🦷",cli:"paciente",clis:"pacientes",neg:"Clínica Dental",
 open:"Hola buen día, ¿qué precio tienen los brackets?",
 probQ:"Para darle el dato correcto, ¿qué le gustaría corregir de su sonrisa: dientes torcidos, separados o la mordida?",
 probA:"Tengo los dientes de enfrente montados y me da pena sonreír en fotos 🙈",
 who:["Andrea","El Progreso"],
 impQ:"¿Desde hace cuánto le incomoda? ¿Tiene alguna fecha especial en mente, como una boda o graduación?",
 impA:"Desde siempre. Me caso en un año 💍 ¿Y cuánto sale?",
 sol:"¡Felicidades! Un año es buen tiempo para llegar a su boda con la sonrisa que quiere. El tratamiento va desde L [rango] y el precio exacto se lo da la doctora en la valoración, con [forma de pago].",
 close:"¿Le queda mejor el jueves a las 9:00 a. m. o el sábado a las 10:00 a. m.?",
 closeA:"¡El jueves! 🙌",
 confirm:"¡Listo! Queda su cita de valoración el jueves a las 9:00 a. m. Un día antes le escribo para confirmar 😊",
 simpleQ:"Solo quiero el precio de la limpieza, no me pregunte tanto 🙄",
 simpleR:"¡Claro! La limpieza tiene un valor de L [precio] 😊 Solo una pregunta para recomendarle bien: ¿hace cuánto fue su última limpieza?",
 simpleA:"Como dos años. A veces me sangran las encías.",
 simpleF:"Gracias por contarme. La doctora le indica si necesita la limpieza normal o una más profunda. ¿Le aparto un espacio esta semana?",
 urgQ:"Me duele mucho una muela y tengo la cara hinchada 😭 ¿Cuánto cobran?",
 urgR:"Lamento mucho que esté con ese dolor 😟 Vamos a ayudarle hoy mismo. ¿Me regala su nombre y en qué ciudad está?",
 urgA:"Soy María, estoy en La Ceiba.",
 urgClose:"María, la consulta de urgencia tiene un valor de L [precio]. La doctora tiene espacio hoy a las 2:00 p. m. o a las 4:30 p. m. ¿Cuál le queda mejor?",
 caroQ:"Buenas, ¿cuánto vale un implante?",
 caroE:"Con gusto le oriento con el precio. ¿Cuántas piezas le hacen falta y le ha costado masticar de ese lado?",
 caroA:"Una muela, y sí, como solo de un lado. Pero ya pregunté en otra clínica y está muy caro 😕",
 payR:"Le entiendo. Con [plan de pago] puede empezar su tratamiento y pagarlo por partes; la doctora le confirma el plan en la valoración. ¿Le queda mejor el martes a las 10:00 a. m. o el sábado a las 9:00 a. m.?",
 segItem:"el blanqueamiento",segEvent:"una boda el sábado",
 rule:"No diagnosticar por chat: quien atiende orienta, el profesional diagnostica.",
 ruleBad:"Eso es una caries, ocupa calza seguro.",
 quick:[["Brackets / ortodoncia","¿Qué precio tienen los brackets?","Con gusto le comparto el precio. Para darle el dato correcto, ¿qué le gustaría corregir de su sonrisa: dientes torcidos, separados o la mordida?"],["Calza / obturación","¿Cuánto cuesta una calza?","Con gusto le ayudo. ¿Siente dolor o sensibilidad en esa pieza, o es una calza que se le cayó?"],["Limpieza","¿Precio de limpieza?","¡Claro! La limpieza tiene un valor de L [precio] 😊 Para recomendarle la indicada, ¿hace cuánto fue su última limpieza?"],["Blanqueamiento","¿Cuánto el blanqueamiento?","Con gusto le comparto el precio ✨ ¿Es para alguna ocasión especial o algo que quiere mejorar desde hace tiempo?"],["Implantes","¿Cuánto vale un implante?","Con gusto le oriento con el precio. ¿Cuántas piezas le hacen falta y hace cuánto las perdió?"]]},

{id:"bienestar",label:"Clínica de bienestar o estética",emoji:"🌿",cli:"cliente",clis:"clientes",neg:"Clínica de Bienestar",
 open:"Hola, ¿cuánto cuesta el tratamiento reductor?",
 probQ:"Para recomendarle bien, ¿qué zona le gustaría trabajar y qué resultado busca?",
 probA:"El abdomen. Después de mi embarazo no he podido bajarlo y ya no me siento cómoda con la ropa 😔",
 who:["Karla","San Pedro Sula"],
 impQ:"Le entiendo perfectamente. ¿Desde hace cuánto quiere lograrlo? ¿Tiene alguna fecha en mente, como un viaje o un evento?",
 impA:"Quiero verme bien para un viaje en diciembre. ¿Y cuánto es?",
 sol:"¡Qué bonito plan! Para lo que me cuenta, el paquete va desde L [rango] y en la evaluación gratuita la especialista le arma el plan exacto según su caso, con [forma de pago].",
 close:"¿Le queda mejor el miércoles a las 4:00 p. m. o el sábado a las 9:00 a. m. para su evaluación?",
 closeA:"El sábado me queda perfecto.",
 confirm:"¡Listo! Queda su evaluación el sábado a las 9:00 a. m. Un día antes le escribo para confirmar 😊",
 simpleQ:"Solo dígame cuánto cuesta el masaje relajante, no me pregunte tanto 🙄",
 simpleR:"¡Claro! El masaje relajante de 60 minutos tiene un valor de L [precio] 😊 Una sola pregunta: ¿lo busca para el estrés o tiene alguna molestia en espalda o cuello?",
 simpleA:"Es que ando con el cuello bien tenso por el trabajo.",
 simpleF:"Le entiendo, es muy común. La terapeuta puede enfocarse en cuello y espalda en su sesión. ¿Le aparto un espacio esta semana?",
 urgQ:"Necesito una cita para hoy, mañana tengo un evento importante 😩",
 urgR:"¡Con gusto le ayudamos! Vamos a buscarle espacio hoy mismo. ¿Qué tratamiento necesita para mañana y me regala su nombre?",
 urgA:"Soy Daniela. Quería un facial para que me luzca la piel.",
 urgClose:"Daniela, el facial de hidratación tiene un valor de L [precio] y deja la piel lista para el día siguiente. Tengo espacio hoy a las 3:00 p. m. o a las 5:30 p. m. ¿Cuál le queda mejor?",
 caroQ:"¿Cuánto cuesta el paquete completo de 10 sesiones?",
 caroE:"Con gusto le comparto el precio. ¿Qué resultado quiere lograr con las sesiones y ha probado algo antes?",
 caroA:"Quiero reducir medidas, ya probé dietas y nada. Pero en otro lugar me salía más barato 😕",
 payR:"Le entiendo. Con [plan de pago] puede empezar ya y pagar por sesiones; la especialista le confirma el plan en su evaluación. ¿Le queda mejor el martes a las 4:00 p. m. o el sábado a las 10:00 a. m.?",
 segItem:"el facial",segEvent:"una boda el sábado",
 rule:"No prometer resultados exactos por chat: cada cuerpo responde distinto y la especialista evalúa.",
 ruleBad:"Con 5 sesiones le aseguro que baja 2 tallas.",
 quick:[["Tratamiento reductor","¿Cuánto cuesta el reductor?","Con gusto le comparto el precio. Para recomendarle bien, ¿qué zona le gustaría trabajar y qué resultado busca?"],["Masajes","¿Precio del masaje?","¡Claro! El masaje de 60 minutos tiene un valor de L [precio] 😊 ¿Lo busca para relajarse o tiene alguna molestia en espalda o cuello?"],["Faciales","Info de faciales","¡Con gusto! ¿Qué le gustaría mejorar de su piel: manchas, acné, resequedad o líneas de expresión?"],["Paquetes","¿Tienen paquetes?","Sí, tenemos paquetes según el resultado que busque. ¿Qué le gustaría lograr y para cuándo?"]]},

{id:"ropa",label:"Tienda de ropa y calzado",emoji:"👗",cli:"cliente",clis:"clientes",neg:"Tienda de Moda",
 open:"Hola, ¿precio del vestido negro que publicaron?",
 probQ:"¡Ese vestido es precioso! Para ayudarle mejor, ¿lo busca para alguna ocasión especial?",
 probA:"Es para una graduación, pero no sé si me va a quedar bien 🙈",
 who:["Valeria","Villanueva"],
 impQ:"¡Qué emoción! ¿Para cuándo es la graduación y qué talla usa normalmente?",
 impA:"Es el 20 de este mes, uso talla M. ¿Y cuánto cuesta?",
 sol:"¡Le va a encantar! El vestido tiene un valor de L [precio] y en talla M nos quedan [existencias]. Si quiere, le mando una foto de cómo se ve puesto para que se imagine el look.",
 close:"¿Se lo aparto para que pase a probárselo hoy en la tarde o prefiere que se lo enviemos a domicilio mañana?",
 closeA:"Paso hoy en la tarde 🙌",
 confirm:"¡Listo! Le aparto el vestido negro talla M hasta las 6:00 p. m. a nombre de Valeria. Aquí le espero 😊",
 simpleQ:"Solo quiero el precio de los jeans, no me pregunte tanto 🙄",
 simpleR:"¡Claro! Los jeans tienen un valor de L [precio] 😊 Solo una pregunta para ayudarle: ¿qué talla y corte prefiere, ajustado o recto?",
 simpleA:"Talla 30, recto.",
 simpleF:"¡Perfecto! En talla 30 recto tenemos azul claro y azul oscuro. ¿Le mando fotos de los dos?",
 urgQ:"Necesito unos zapatos formales para mañana, ¿tienen? 😩",
 urgR:"¡Claro que le ayudamos! Vamos a resolverlo hoy. ¿Qué número calza y de qué color los necesita?",
 urgA:"Calzo 40, negros. Soy Luis.",
 urgClose:"Luis, en 40 negro tenemos dos modelos desde L [precio]. Le mando fotos ya. ¿Pasa a medírselos hoy antes de las 7:00 p. m. o se los enviamos esta noche?",
 caroQ:"¿Cuánto cuesta la chaqueta de cuero?",
 caroE:"Con gusto le comparto el precio. ¿La busca para usar a diario o para alguna ocasión?",
 caroA:"Para usarla seguido. Pero en otra tienda vi una más barata 😕",
 payR:"Le entiendo. Esta es de cuero genuino y le dura años. Además puede pagarla con [forma de pago]. ¿Se la aparto para que la vea en persona hoy o mañana?",
 segItem:"el vestido",segEvent:"una fiesta el sábado",
 rule:"No prometer tallas ni existencias sin revisar el inventario.",
 ruleBad:"Sí, seguro hay en su talla, venga.",
 quick:[["Precio de una prenda","¿Precio del vestido?","¡Con gusto! Ese modelo es precioso. ¿Lo busca para alguna ocasión especial? Así le ayudo a elegir talla y color."],["Tallas","¿Tienen en talla L?","¡Déjeme revisar! ¿Qué prenda le interesa y qué color prefiere? Así le confirmo existencias."],["Envíos","¿Hacen envíos?","¡Sí! Enviamos a [zonas]. ¿Qué prenda le interesa y a qué ciudad sería?"],["Zapatos","¿Precio de los tenis?","¡Con gusto! ¿Qué número calza y los busca para hacer deporte o para uso diario?"]]},

{id:"restaurante",label:"Restaurante o comida",emoji:"🍽️",cli:"cliente",clis:"clientes",neg:"Restaurante",
 open:"Hola, ¿cuánto cuesta el menú para eventos?",
 probQ:"¡Con gusto le ayudo! ¿Para qué tipo de evento es y para cuántas personas?",
 probA:"Es el cumpleaños de mi mamá, como para 25 personas 🎉",
 who:["Carlos","San Pedro Sula"],
 impQ:"¡Qué bonito! ¿Para qué fecha sería y hay algún plato que a ella le guste mucho?",
 impA:"El sábado 22. Le encanta el camarón. ¿Y cuánto sale?",
 sol:"¡Perfecto! Para 25 personas el menú de eventos va desde L [rango] por persona, y podemos incluir un plato de camarón especial para ella.",
 close:"¿Le reservo el salón para el sábado 22 a las 6:00 p. m. o prefiere a las 7:00 p. m.?",
 closeA:"A las 7:00 está bien.",
 confirm:"¡Listo! Queda reservado el sábado 22 a las 7:00 p. m. para 25 personas a nombre de Carlos. Le escribo el jueves para confirmar el menú 😊",
 simpleQ:"Solo quiero el precio del combo familiar, no me pregunte tanto 🙄",
 simpleR:"¡Claro! El combo familiar tiene un valor de L [precio] y alcanza para 4 personas 😊 ¿Lo quiere para recoger o a domicilio?",
 simpleA:"A domicilio, somos 5.",
 simpleF:"¡Perfecto! Para 5 le recomiendo agregar una porción extra por L [precio]. ¿Me confirma su dirección y se lo enviamos?",
 urgQ:"Necesito comida para 15 personas hoy en la noche 😩 ¿Pueden?",
 urgR:"¡Claro que le ayudamos! Vamos a resolverlo hoy. ¿A qué hora la necesita y es para recoger o a domicilio?",
 urgA:"Para las 7:00 p. m., a domicilio. Soy Ana.",
 urgClose:"Ana, para 15 personas le recomiendo [opción] por L [precio] en total. ¿Lo confirmamos para las 7:00 p. m. o lo adelantamos a las 6:30 p. m.?",
 caroQ:"¿Cuánto cobran por el catering para la empresa?",
 caroE:"Con gusto le cotizo. ¿Para cuántas personas es y qué tipo de evento?",
 caroA:"Para 60 personas, un almuerzo de fin de año. Pero otro lugar me cotizó más barato 😕",
 payR:"Le entiendo. Nuestro precio incluye [servicio, montaje y bebidas]. Podemos hacer un anticipo y el resto el día del evento. ¿Le parece si le envío dos opciones de menú hoy o mañana temprano?",
 segItem:"la reservación",segEvent:"un cumpleaños el sábado",
 rule:"No confirmar tiempos de entrega ni disponibilidad que la cocina no pueda cumplir.",
 ruleBad:"Sí, en 15 minutos le llega, seguro.",
 quick:[["Menú y precios","¿Me pasa el menú?","¡Con gusto! ¿Es para comer en el restaurante, para llevar o a domicilio? Así le comparto las opciones que mejor le quedan."],["Eventos","¿Hacen eventos?","¡Sí! ¿Para qué tipo de evento y para cuántas personas sería?"],["Domicilio","¿Tienen delivery?","¡Sí! ¿A qué zona sería y para cuántas personas?"],["Reservaciones","¿Puedo reservar?","¡Claro! ¿Para cuántas personas, qué día y a qué hora?"]]},

{id:"ferreteria",label:"Ferretería o construcción",emoji:"🔧",cli:"cliente",clis:"clientes",neg:"Ferretería",
 open:"Buenas, ¿precio del cemento?",
 probQ:"¡Con gusto! Para recomendarle bien, ¿qué está construyendo o reparando?",
 probA:"Voy a echar el piso de un cuarto, como de 4 por 4 metros.",
 who:["Don José","Choloma"],
 impQ:"¡Buen proyecto! ¿Para cuándo quiere empezar y ya tiene los demás materiales?",
 impA:"Quiero empezar el lunes y me falta casi todo. ¿Cuánto me sale?",
 sol:"Para un piso de 4 por 4 le calculo [cantidad] bolsas de cemento, más arena y grava. El cemento está a L [precio] la bolsa y si lleva todo el paquete le hacemos [precio especial].",
 close:"¿Se lo enviamos el sábado en la mañana o prefiere recogerlo el viernes en la tarde?",
 closeA:"El sábado en la mañana.",
 confirm:"¡Listo! Queda su pedido para el sábado en la mañana a nombre de Don José en Choloma. El viernes le escribo para confirmar la hora 😊",
 simpleQ:"Solo quiero el precio de la lámina, no me pregunte tanto 🙄",
 simpleR:"¡Claro! La lámina de [medida] tiene un valor de L [precio] 😊 Solo una pregunta: ¿de qué largo la necesita? Así le confirmo existencias.",
 simpleA:"De 12 pies, son 10 láminas.",
 simpleF:"¡Perfecto! Tenemos las 10 en 12 pies. ¿Las recoge o se las enviamos?",
 urgQ:"Se me rompió un tubo y se está saliendo el agua 😩 ¿Tienen repuesto?",
 urgR:"¡Claro! Vamos a resolverlo ya. ¿De qué medida es el tubo y es de PVC o de cobre? Si puede, mándeme una foto.",
 urgA:"Es PVC de media pulgada. Soy Mario.",
 urgClose:"Mario, tenemos el tubo y los accesorios para la reparación por L [precio]. ¿Pasa por ellos ahorita o se los enviamos en la próxima hora?",
 caroQ:"¿Cuánto cuesta el taladro inalámbrico?",
 caroE:"Con gusto le comparto el precio. ¿Para qué trabajos lo va a usar: hogar o trabajo pesado?",
 caroA:"Para trabajo diario, soy contratista. Pero en otro lado está más barato 😕",
 payR:"Le entiendo. Este modelo trae [garantía y batería extra] y aguanta uso diario. Puede pagarlo con [forma de pago]. ¿Se lo aparto para que lo pruebe hoy o mañana?",
 segItem:"el pedido de materiales",segEvent:"una obra que empieza el lunes",
 rule:"No recomendar soluciones técnicas sin conocer el trabajo; pregunte medidas y uso.",
 ruleBad:"Cualquier cemento sirve, lleve el más barato.",
 quick:[["Cemento y materiales","¿Precio del cemento?","¡Con gusto! ¿Qué está construyendo o reparando? Así le calculo cuánto necesita."],["Herramientas","¿Precio del taladro?","¡Con gusto! ¿Para qué trabajos lo va a usar? Así le recomiendo el modelo indicado."],["Envíos","¿Hacen entregas?","¡Sí! ¿A qué zona sería y qué materiales necesita?"],["Cotización","Necesito una cotización","¡Claro! ¿Qué proyecto tiene y para cuándo lo necesita?"]]},

{id:"taller",label:"Taller, detailing o automotriz",emoji:"🚗",cli:"cliente",clis:"clientes",neg:"Taller Automotriz",
 open:"Hola, ¿cuánto cuesta el polarizado?",
 probQ:"¡Con gusto! Para darle el precio correcto, ¿qué carro tiene y qué busca: más privacidad o menos calor?",
 probA:"Un Corolla 2018. El calor adentro es insoportable 🥵",
 who:["Ricardo","San Pedro Sula"],
 impQ:"Le entiendo, con este sol es muy común. ¿Maneja mucho de día o lleva niños en el carro?",
 impA:"Manejo todo el día por trabajo. ¿Cuánto es?",
 sol:"Para un Corolla y su uso diario le recomiendo [tipo de película] que bloquea el calor, desde L [rango]. Incluye [garantía].",
 close:"¿Le queda mejor traerlo el jueves a las 8:00 a. m. o el sábado a las 9:00 a. m.?",
 closeA:"El sábado.",
 confirm:"¡Listo! Queda su cita el sábado a las 9:00 a. m. a nombre de Ricardo. El viernes le escribo para confirmar 😊",
 simpleQ:"Solo quiero el precio del lavado, no me pregunte tanto 🙄",
 simpleR:"¡Claro! El lavado completo tiene un valor de L [precio] 😊 Una sola pregunta: ¿es carro o camioneta?",
 simpleA:"Camioneta.",
 simpleF:"¡Perfecto! Para camioneta es L [precio]. Hoy tengo espacio a las 2:00 p. m. o a las 4:00 p. m. ¿Le aparto uno?",
 urgQ:"Mi carro no enciende y tengo que viajar mañana 😩",
 urgR:"¡Le ayudamos! Vamos a revisarlo lo antes posible. ¿Qué carro es y qué hace cuando intenta encenderlo?",
 urgA:"Un Civic, solo hace clic. Soy Paola.",
 urgClose:"Paola, podemos revisarlo hoy. El diagnóstico tiene un valor de L [precio]. ¿Lo trae a las 3:00 p. m. o le enviamos la grúa a las 4:00 p. m.?",
 caroQ:"¿Cuánto cuesta el detailing completo?",
 caroE:"Con gusto le comparto el precio. ¿Qué carro es y qué le gustaría mejorar: pintura, interiores o ambos?",
 caroA:"Una camioneta, quiero venderla y que se vea como nueva. Pero en otro lado está más barato 😕",
 payR:"Le entiendo. Nuestro detailing incluye [corrección de pintura y protección], que ayuda a venderla mejor. Puede pagarlo con [forma de pago]. ¿La trae el martes o el sábado?",
 segItem:"el detailing",segEvent:"un viaje el sábado",
 rule:"No dar diagnósticos mecánicos por chat: el técnico revisa el carro.",
 ruleBad:"Seguro es la batería, cámbiela.",
 quick:[["Polarizado","¿Precio del polarizado?","¡Con gusto! ¿Qué carro tiene y qué busca: privacidad o bloquear el calor?"],["Lavado / detailing","¿Cuánto el detailing?","¡Con gusto! ¿Qué carro es y qué le gustaría mejorar: pintura, interiores o ambos?"],["Mecánica","Mi carro hace un ruido","Le ayudamos a revisarlo. ¿Qué carro es y cuándo hace el ruido: al frenar, al arrancar o al girar?"],["Citas","¿Tienen espacio hoy?","¡Déjeme revisar! ¿Qué servicio necesita y qué carro es?"]]},

{id:"servicios",label:"Servicios profesionales",emoji:"💼",cli:"cliente",clis:"clientes",neg:"Despacho Profesional",
 open:"Buenas, ¿cuánto cobran por llevar la contabilidad?",
 probQ:"¡Con gusto le ayudo! Para darle el precio correcto, ¿qué tipo de negocio tiene y cuántas facturas maneja al mes?",
 probA:"Tengo una tienda pequeña, unas 100 facturas al mes. Me atrasé con las declaraciones 😟",
 who:["Sofía","Puerto Cortés"],
 impQ:"Le entiendo, es más común de lo que cree y tiene solución. ¿Tiene alguna fecha límite o le llegó alguna notificación?",
 impA:"Tengo que ponerme al día este mes. ¿Cuánto sería?",
 sol:"Para su caso, el servicio mensual va desde L [rango] y la puesta al día se cotiza aparte según los meses atrasados. En la reunión inicial le damos el precio exacto.",
 close:"¿Le queda mejor una llamada mañana a las 10:00 a. m. o el viernes a las 3:00 p. m.?",
 closeA:"Mañana a las 10.",
 confirm:"¡Listo! Queda su reunión mañana a las 10:00 a. m. Hoy en la tarde le envío la lista de documentos que necesitamos 😊",
 simpleQ:"Solo quiero saber cuánto cobran por la declaración, no me pregunte tanto 🙄",
 simpleR:"¡Claro! La declaración tiene un valor desde L [precio] 😊 Solo una pregunta: ¿es persona natural o empresa?",
 simpleA:"Persona natural.",
 simpleF:"Perfecto, para persona natural es L [precio]. ¿Le envío la lista de documentos para empezar?",
 urgQ:"Me vence un plazo mañana y no tengo nada listo 😩",
 urgR:"¡Le ayudamos! Vamos a revisarlo hoy. ¿Qué trámite es y qué documentos tiene a mano?",
 urgA:"Es la declaración. Soy Roberto, tengo las facturas.",
 urgClose:"Roberto, la podemos presentar hoy. El servicio urgente tiene un valor de L [precio]. ¿Me envía las facturas ahorita o pasa por la oficina antes de las 4:00 p. m.?",
 caroQ:"¿Cuánto cuesta la asesoría completa?",
 caroE:"Con gusto le comparto el precio. ¿Qué le gustaría resolver con la asesoría y para cuándo?",
 caroA:"Ordenar todo mi negocio este año. Pero otro despacho me cobra menos 😕",
 payR:"Le entiendo. Nuestro servicio incluye [reportes mensuales y acompañamiento]. Podemos empezar con [plan de pago]. ¿Le queda mejor una reunión el martes o el jueves?",
 segItem:"la asesoría",segEvent:"un plazo el viernes",
 rule:"No dar asesoría específica por chat sin conocer el caso completo.",
 ruleBad:"No se preocupe, eso no le van a multar.",
 quick:[["Precio del servicio","¿Cuánto cobran?","¡Con gusto le ayudo! ¿Qué le gustaría resolver? Así le doy el precio correcto."],["Asesoría","Necesito asesoría","¡Claro! ¿Sobre qué tema y para cuándo lo necesita?"],["Trámites","¿Hacen trámites?","¡Sí! ¿Qué trámite necesita y tiene alguna fecha límite?"],["Reunión","¿Puedo hablar con alguien?","¡Por supuesto! ¿Le queda mejor una llamada hoy o mañana?"]]}
];

/* "Otro negocio": se arma con lo que escribe el usuario */
function customPreset(name,prod,cli){
 const c=cli||"cliente";
 return {id:"otro",label:"Otro negocio",emoji:"✨",cli:c,clis:c+"s",neg:name||"Su Negocio",
 open:`Hola, ¿qué precio tiene ${prod}?`,
 probQ:`Para darle el dato correcto, ¿qué necesita resolver con ${prod}?`,
 probA:"Lo necesito pero no sé cuál me conviene 🤔",
 who:["Andrea","San Pedro Sula"],
 impQ:"Le entiendo. ¿Para cuándo lo necesita y qué es lo más importante para usted?",
 impA:"Lo necesito para este mes. ¿Cuánto cuesta?",
 sol:`Para lo que me cuenta, ${prod} va desde L [rango], con [forma de pago]. Le confirmo el precio exacto según lo que necesite.`,
 close:"¿Le queda mejor el jueves en la mañana o el sábado temprano?",
 closeA:"El jueves.",
 confirm:"¡Listo! Queda agendado para el jueves en la mañana. Un día antes le escribo para confirmar 😊",
 simpleQ:`Solo quiero el precio de ${prod}, no me pregunte tanto 🙄`,
 simpleR:`¡Claro! ${cap(prod)} tiene un valor de L [precio] 😊 Solo una pregunta para recomendarle bien: ¿para qué lo necesita?`,
 simpleA:"Para usarlo en mi casa.",
 simpleF:"¡Perfecto! Para ese uso le recomiendo [opción]. ¿Se lo aparto?",
 urgQ:"Lo necesito para hoy mismo 😩 ¿Pueden?",
 urgR:"¡Con gusto le ayudamos! Vamos a resolverlo hoy. ¿Qué necesita exactamente y me regala su nombre?",
 urgA:"Soy María, necesito "+prod+".",
 urgClose:"María, se lo tenemos hoy por L [precio]. ¿Pasa antes de las 3:00 p. m. o se lo enviamos a las 5:00 p. m.?",
 caroQ:`¿Cuánto cuesta ${prod}?`,
 caroE:"Con gusto le comparto el precio. ¿Qué resultado espera y para cuándo lo necesita?",
 caroA:"Lo necesito pronto, pero en otro lado está más barato 😕",
 payR:"Le entiendo. El nuestro incluye [lo que lo hace diferente]. Puede pagarlo con [forma de pago]. ¿Se lo aparto hoy o mañana?",
 segItem:prod,segEvent:"algo importante el sábado",
 rule:"No prometer lo que el negocio no puede cumplir: confirme antes de asegurar.",
 ruleBad:"Sí, seguro, se lo garantizo.",
 quick:[["Precio",`¿Precio de ${prod}?`,`¡Con gusto le comparto el precio! Para darle el dato correcto, ¿qué necesita resolver con ${prod}?`],["Información","Info por favor","¡Con gusto! ¿Sobre qué producto o servicio le gustaría información?"],["Disponibilidad","¿Tienen disponible?","¡Déjeme revisar! ¿Qué necesita exactamente y para cuándo?"],["Envíos / citas","¿Cómo hago el pedido?","¡Es muy fácil! ¿Qué necesita y a qué ciudad sería?"]]};
}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s}

/* ===== Motor del curso Metodología VECTOR ===== */
const $ = id => document.getElementById(id);
const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const mark = t => esc(t).replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const track = (ev, d, custom) => { try { if (window.fbq) fbq(custom ? "trackCustom" : "track", ev, d || {}); } catch (e) {} };
const WA = "50495691481";
const player = $("mvPlayer"), screen = $("mvScreen");
/* Respaldo científico: filtro por letra y abrir el estudio enlazado desde las lecciones */
(function () {
  const evs = document.querySelectorAll(".mv-ev"); if (!evs.length) return;
  document.querySelectorAll(".mv-filter button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".mv-filter button").forEach(x => x.setAttribute("aria-pressed", x === b));
    evs.forEach(e => (e.hidden = !!b.dataset.f && e.dataset.l !== b.dataset.f));
  }));
  const open = () => { const m = /^#ev-([\w-]+)$/.exec(location.hash); if (!m) return; const el = document.getElementById("ev-" + m[1]); if (!el) return; evs.forEach(e => (e.hidden = false)); el.open = true; el.classList.add("hl"); setTimeout(() => el.classList.remove("hl"), 2400); };
  addEventListener("hashchange", open); open();
})();
if (!player) return;
const ENDPOINT = player.dataset.endpoint || "";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

let S = LS.get("mv-state", null) || { reg: null, regId: null, idx: 0, xp: 0, done: [], exam: null };
const save = () => LS.set("mv-state", S);
let C = null;

function buildC() {
  const r = S.reg; if (!r) return;
  const base = r.rubro === "otro" ? customPreset(r.empresa, r.prod || "su producto o servicio", r.cli) : (PRESETS.find(p => p.id === r.rubro) || PRESETS[0]);
  C = Object.assign({}, base); C.neg = r.empresa || base.neg; C.Cli = cap(C.cli);
  C.hi = `¡Buen día! Le atiende ${r.nombre.split(" ")[0]} de ${C.neg} 😊`;
}

/* ---------- Contenido de cada letra ---------- */
function lessons() {
  const [n, c] = C.who;
  return [
    { l: "V", t: "Vincular", temp: "Frío", d: `El ${C.cli} llega frío: pregunta el precio y no sabe quién le responde. Su primer trabajo es que sienta que habla con una persona.`,
      do: ["Responda en menos de 5 minutos.", "Salude con su nombre y el del negocio.", "Reconozca la pregunta del precio: \"con gusto le comparto el precio\". Nunca la ignore."],
      ch: [["in", C.open], ["out", C.hi + " Con gusto le comparto el precio."]],
      fact: ["7×", "más probabilidad de lograr la conversación con quien decide si se responde en la primera hora. En una auditoría a 2,241 empresas, el promedio de respuesta fue de 42 horas.", "Oldroyd y col., Harvard Business Review, 2011", "rapidez"],
      q: { p: C.open, q: "¿Cuál es el mejor primer mensaje?", o: [C.hi + " Con gusto le comparto el precio.", "Cuesta L ____ 👍", "Para precios tiene que venir en persona."], e: "Se presenta, usa el nombre del negocio y reconoce la pregunta. Así empieza el vínculo." } },
    { l: "E", t: "Explorar", temp: "Frío → tibio", d: `Antes de dar un número, descubra qué necesita resolver el ${C.cli}. Una sola pregunta abierta, sobre su problema o su objetivo.`,
      do: ["Pregunte por la necesidad, no por datos personales todavía.", "Una pregunta por mensaje.", "Escuche: su respuesta le dirá qué ofrecer."],
      ch: [["out", C.probQ], ["in", C.probA]],
      fact: ["430", "personas en un estudio de chat: quienes hicieron preguntas de seguimiento le cayeron mejor a su compañero, porque se percibían más atentos.", "Huang y col., Journal of Personality and Social Psychology, 2017", "preguntas"],
      q: { p: "(Ya saludó y reconoció la pregunta)", q: "¿Qué pregunta hace a continuación?", o: [C.probQ, "¿Nombre completo, ciudad, edad y cómo nos encontró?", "Le mando el catálogo completo 📄"], e: "Una sola pregunta sobre la necesidad. Varias juntas se sienten como interrogatorio." } },
    { l: "C", t: "Conocer", temp: "Tibio → caliente", d: `Ahora conozca a la persona: nombre, ciudad y, sobre todo, el impacto. ¿Desde cuándo le pasa? ¿Para cuándo lo necesita? Ahí aparece la razón real para comprar.`,
      do: ["Valide lo que siente: \"le entiendo\".", "Pida nombre y ciudad, y úselo 2 o 3 veces.", "Pregunte por el impacto o la fecha que le importa."],
      ch: [["out", "Le entiendo perfectamente 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?"], ["in", `Soy ${n}, de ${c}.`], ["out", `Mucho gusto, ${n}. ${C.impQ}`], ["in", C.impA]],
      fact: ["Su nombre", "En tres experimentos, recordar el nombre de la persona aumentó su disposición a aceptar una solicitud de compra: lo perciben como un cumplido.", "Howard, Gengler y Jain, Journal of Consumer Research, 1995", "nombre"],
      q: { p: C.probA, q: "¿Cuál respuesta avanza mejor?", o: ["Le entiendo perfectamente, tiene solución 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?", C.ruleBad, "Ok, cuesta L [precio]."], e: "Valida la emoción y pide datos para personalizar. " + C.rule } },
    { l: "T", t: "Transparentar", temp: "Caliente", d: `Ahora sí: el precio. Conéctelo con lo que el ${C.cli} le contó, dé el precio o rango y la forma de pago. Si pregunta el precio por segunda vez, se da en ese mismo mensaje.`,
      do: ["Repita su motivo con sus palabras.", "Precio o rango claro, sin rodeos.", "Mencione formas de pago si existen."],
      ch: [["in", C.impA], ["out", C.sol]],
      fact: ["Precio primero", "lleva a juzgar si el producto \"vale lo que cuesta\"; el producto primero, a preguntarse si se desea. El precio primero solo ayudó con productos claramente baratos.", "Karmarkar, Shiv y Knutson, Journal of Marketing Research, 2015", "precio"],
      q: { p: C.impA, q: "Es la segunda vez que pregunta el precio. ¿Qué responde?", o: [C.sol, "Primero venga y ahí le decimos.", "Depende de muchas cosas."], e: "El precio no se esconde: se da con contexto y conectado a lo que el cliente contó." } },
    { l: "O", t: "Ofrecer", temp: "Cierre", d: `No deje la decisión en el aire. Ofrezca dos opciones concretas de día, hora o forma de entrega, y confirme todo por escrito.`,
      do: ["Dos opciones, no \"cuando usted guste\".", "Confirme día, hora y lugar por escrito.", "Si hay anticipo, explíquelo con calma, como reserva."],
      ch: [["out", C.close], ["in", C.closeA], ["out", C.confirm]],
      fact: ["94", "pruebas en un metaanálisis: un plan concreto de cuándo y dónde actuar aumenta de forma importante el cumplimiento (d = 0.65).", "Gollwitzer y Sheeran, metaanálisis, 2006", "plan"],
      q: { p: "¿Tienen disponible esta semana?", q: "¿Cuál es el mejor cierre?", o: ["Sí 😊 " + C.close, "Sí. Cualquier cosa me avisa.", "Sí, pero deposite hoy o se pierde."], e: "Dos opciones concretas facilitan decidir. \"Me avisa\" deja enfriar al cliente." } },
    { l: "R", t: "Retener", temp: "Después", d: `La venta no termina en el chat. Guarde y etiquete el contacto, recuerde la cita, dé seguimiento a quien no decidió y publique historias para seguir presente.`,
      do: ["Guarde el contacto: nombre · interés · ciudad · fecha.", "Recordatorio un día antes; seguimiento de días 1, 3, 7 y 30.", "De 1 a 3 historias al día, sin saturar."],
      ch: [["ctx", `Contacto guardado: ${n} · ${C.segItem} · ${c}`], ["out", `Guárdenos como ${C.neg} para que le lleguen nuestras novedades 😊`], ["ctx", "Un día antes"], ["out", `Hola, ${n} 😊 Le recordamos su cita de mañana. ¿Nos confirma?`]],
      fact: ["78.6%", "de asistencia con recordatorio por mensaje frente a 67.8% sin recordatorio (7 estudios, 5,841 personas).", "Revisión sistemática Cochrane, 2013", "recordatorio"],
      q: { p: "Mmm, lo voy a pensar.", q: "¿Qué responde?", o: [`¡Con mucho gusto! Le guardo como ${C.cli} de ${C.neg} para avisarle de novedades. ¿Hay alguna duda que pueda aclararle? 😊`, "Si compra hoy le hago 10% de descuento.", "Ok."], e: "Respeta la decisión y asegura el contacto para el seguimiento." } }
  ];
}
function mission() {
  const [n, c] = C.who;
  return [
    { p: C.open, o: [[C.hi + " Con gusto le comparto el precio. " + C.probQ, 1], ["Buen día. Cuesta L [precio].", 0], ["Para precios tiene que venir en persona.", -1]] },
    { p: C.probA, o: [["Le entiendo perfectamente, tiene solución 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?", 1], ["Ok, entonces cuesta L [precio].", 0], [C.ruleBad, -1]] },
    { p: `Soy ${n}, de ${c}.`, o: [[`Mucho gusto, ${n}. ${C.impQ}`, 1], [`Ok ${n}, le esperamos cuando guste.`, 0], [`${n}, hoy hay 20% de descuento si paga ya.`, -1]] },
    { p: C.impA, o: [[C.sol + " " + C.close, 1], ["Cuesta L [precio]. Cualquier cosa me avisa.", 0], ["Primero venga y ahí le decimos.", -1]] }
  ];
}
function exam() {
  const L = "VECTOR";
  return [
    { l: "V", chat: C.open, q: "Llega este mensaje. ¿Cuál es la mejor primera respuesta?", o: [C.hi + " Con gusto le comparto el precio. " + C.probQ, "Buen día. Cuesta L ____.", "Para precios tiene que venir en persona.", "Le mando el catálogo completo 📄"], e: "V + E: se presenta, reconoce la pregunta y abre con la necesidad." },
    { l: "V", q: "¿Cuál es la meta de tiempo para responder un mensaje nuevo en horario?", o: ["Menos de 5 minutos", "Menos de 2 horas", "El mismo día", "Cuando haya tiempo"], e: "El cliente escribe a varios negocios a la vez. Responder rápido multiplica las probabilidades de cerrar." },
    { l: "E", q: "En la Metodología VECTOR, ¿qué significa la E?", o: ["Explorar lo que el cliente necesita resolver", "Enviar el catálogo", "Esperar a que el cliente vuelva a escribir", "Exigir el anticipo"], e: "V Vincular, E Explorar, C Conocer, T Transparentar, O Ofrecer, R Retener." },
    { l: "E", q: "¿Cuántas preguntas conviene hacer en cada mensaje?", o: ["Una", "Tres, para avanzar rápido", "Todas de una vez", "Ninguna, solo informar"], e: "Una por mensaje. Varias juntas se sienten como interrogatorio." },
    { l: "C", q: "¿Para qué sirve preguntar \"para cuándo lo necesita\"?", o: ["Para descubrir la razón real de compra y la urgencia", "Para llenar un formulario", "Para alargar la conversación", "No sirve, mejor dar el precio"], e: "El impacto y la fecha son la motivación real. Con eso, el precio se conecta con algo que le importa." },
    { l: "C", q: "¿Cuál de estas es una regla de este negocio?", o: [C.rule, C.ruleBad, "Contestar solo en la noche", "Mandar audios largos para explicar mejor"], e: "Quien atiende orienta y confirma; nunca promete ni asegura lo que no ha verificado." },
    { l: "T", q: "El cliente pregunta el precio por segunda vez. ¿Qué hace?", o: ["Le da el precio o rango en ese mensaje y sigue con una sola pregunta", "Le insiste en que venga en persona", "Le hace otra pregunta sin mencionar el precio", "Le manda una promoción"], e: "Esquivar el precio dos veces se siente como evasión y rompe la confianza." },
    { l: "T", chat: C.simpleQ, q: "¿Cuál respuesta respeta al cliente?", o: [C.simpleR, "Para darle el precio necesito saber su caso.", "L [precio].", "Primero dígame su nombre, ciudad y edad."], e: "Si piden el precio directo, se da de inmediato con una sola pregunta útil." },
    { l: "O", chat: "¿Tienen disponible esta semana?", q: "¿Cuál es el mejor cierre?", o: ["Sí 😊 " + C.close, "Sí. Cualquier cosa me avisa.", "Sí, pero deposite hoy o se pierde.", "Depende, ¿cuándo puede usted?"], e: "Dos opciones concretas facilitan decidir." },
    { l: "O", q: "¿Qué señal indica que el cliente ya está listo para cerrar?", o: ["Pregunta por horarios, entrega o formas de pago", "Pregunta el precio", "Responde \"ok\"", "Deja en visto"], e: "Cuando pregunta cómo y cuándo, es momento de ofrecer el cierre." },
    { l: "R", chat: "Mmm, lo voy a pensar.", q: "¿Cuál respuesta deja la puerta abierta sin presionar?", o: [`¡Con mucho gusto! Le guardo como ${C.cli} para avisarle de novedades. ¿Hay alguna duda que pueda aclararle? 😊`, "Si compra hoy le hago 10% de descuento.", "Ok.", "¿Qué hay que pensar?"], e: "Respeta la decisión y asegura el contacto: eso es Retener." },
    { l: "R", q: "Un cliente no responde. ¿Cuándo se deja descansar el contacto?", o: ["Después de 3 mensajes de seguimiento sin respuesta", "Después del primer mensaje", "Nunca: hay que escribir todos los días", "Se le bloquea"], e: "Días 1, 3, 7 y 30 como máximo. Sigue viendo las historias si guardó el número." }
  ];
}

/* ---------- Pantallas ---------- */
let FLOW = [];
function buildFlow() {
  FLOW = [{ k: "intro" }];
  lessons().forEach((x, i) => { FLOW.push({ k: "lesson", i }); FLOW.push({ k: "check", i }); if (x.l === "C") FLOW.push({ k: "termo" }); });
  FLOW.push({ k: "mission" }, { k: "examIntro" }, { k: "exam" }, { k: "result" });
}
const LESS = () => lessons();

function topbar() {
  $("mvTop").hidden = !S.reg;
  if (!S.reg) return;
  const pct = Math.round(Math.min(S.idx, FLOW.length - 1) / (FLOW.length - 1) * 100);
  $("mvBar").style.width = pct + "%"; $("mvPct").textContent = pct + "%"; $("mvXp").textContent = S.xp + " XP";
  $("mvLetters").querySelectorAll("span").forEach(s => s.classList.toggle("on", S.done.includes(s.dataset.l)));
}
function addXP(n) { S.xp += n; save(); const el = $("mvXp"); el.textContent = S.xp + " XP"; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
function toast(t) { const el = $("mvToast"); el.textContent = t; el.hidden = false; el.classList.remove("show"); void el.offsetWidth; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 2600); }
function go(i) { S.idx = Math.max(0, Math.min(FLOW.length - 1, i)); save(); render(); requestAnimationFrame(() => { const hh = (document.querySelector(".sitehead") || {}).offsetHeight || 64; const r = player.getBoundingClientRect(); if (r.top < hh || r.top > innerHeight * .4) window.scrollTo({ top: scrollY + r.top - hh - 8, behavior: reduce ? "auto" : "smooth" }); }); }
const next = () => go(S.idx + 1);
function animateChat(box, items, gap) {
  let k = 0; const token = Symbol(); box._t = token;
  const step = () => {
    if (box._t !== token || k >= items.length) return;
    const [w, t] = items[k++];
    if (w === "in" && !reduce) { const ty = document.createElement("div"); ty.className = "mv-typing"; ty.innerHTML = "<i></i><i></i><i></i>"; box.appendChild(ty); setTimeout(() => { ty.remove(); add(w, t); setTimeout(step, gap); }, 700); }
    else { add(w, t); setTimeout(step, reduce ? 0 : gap); }
  };
  const add = (w, t) => { const d = document.createElement("div"); d.className = w === "ctx" ? "mv-ctx" : "mv-b " + w; d.innerHTML = mark(t); box.appendChild(d); };
  step();
}
const wh = () => `<div class="mv-wa-head"><span class="mv-av">${esc(C.neg.charAt(0))}</span><div><b>${esc(C.neg)}</b><small>WhatsApp Business</small></div></div>`;

function render() {
  topbar();
  if (!S.reg) { renderRegistro(); requestAnimationFrame(() => screen.classList.add("on")); return; }
  buildC(); if (!FLOW.length) buildFlow();
  const f = FLOW[S.idx] || FLOW[0];
  screen.className = "mv-screen in";
  ({ intro: rIntro, lesson: rLesson, check: rCheck, termo: rTermo, mission: rMission, examIntro: rExamIntro, exam: rExam, result: rResult })[f.k](f);
  requestAnimationFrame(() => screen.classList.add("on"));
}

/* Registro */
const RUBROS = PRESETS.map(p => [p.id, p.emoji + " " + p.label]).concat([["otro", "✨ Otro negocio"]]);
function renderRegistro() {
  const r = LS.get("mv-draft", {});
  const opt = (arr, v) => arr.map(([k, l]) => `<option value="${esc(k)}"${k === v ? " selected" : ""}>${esc(l)}</option>`).join("");
  screen.className = "mv-screen in";
  screen.innerHTML = `<div class="mv-reg">
    <div class="mv-reg-tx"><span class="eyebrow">Paso 0 · Su registro</span><h2>Empecemos por conocerle</h2><p>Con estos datos adaptamos los ejemplos a su negocio y le entregamos su certificado al final. Toma 30 segundos.</p>
      <ul class="mv-ul"><li>6 lecciones cortas con chats reales</li><li>Una misión práctica y un examen de 12 preguntas</li><li>Certificado digital de Vector Academy</li></ul></div>
    <form class="mv-form" id="mvForm" novalidate>
      <div class="mv-f"><label for="f-nombre">Su nombre completo</label><input id="f-nombre" autocomplete="name" maxlength="80" value="${esc(r.nombre || "")}" placeholder="Ej. María Rodríguez"></div>
      <div class="mv-f"><label for="f-cargo">Cargo</label><input id="f-cargo" autocomplete="organization-title" maxlength="80" value="${esc(r.cargo || "")}" placeholder="Ej. Vendedora, recepción, gerente"></div>
      <div class="mv-f"><label for="f-empresa">Nombre de la empresa</label><input id="f-empresa" autocomplete="organization" maxlength="100" value="${esc(r.empresa || "")}" placeholder="Ej. Comercial Los Pinos"></div>
      <div class="mv-f"><label for="f-rubro">Tipo de negocio</label><select id="f-rubro"><option value="">Seleccione…</option>${opt(RUBROS, r.rubro)}</select></div>
      <div class="mv-f full" id="f-otro" hidden><label for="f-prod">¿Qué producto o servicio le preguntan más?</label><input id="f-prod" maxlength="50" value="${esc(r.prod || "")}" placeholder="Ej. el plan de internet"></div>
      <div class="mv-f"><label for="f-correo">Correo</label><input id="f-correo" type="email" autocomplete="email" inputmode="email" maxlength="120" value="${esc(r.correo || "")}" placeholder="nombre@empresa.com"></div>
      <div class="mv-f"><label for="f-tel">Teléfono / WhatsApp</label><input id="f-tel" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" value="${esc(r.telefono || "")}" placeholder="Ej. 9876-5432"></div>
      <div class="mv-f"><label for="f-ciudad">Ciudad</label><input id="f-ciudad" autocomplete="address-level2" maxlength="60" value="${esc(r.ciudad || "")}" placeholder="Ej. San Pedro Sula"></div>
      <div class="mv-f"><label for="f-vend">¿Cuántas personas atienden clientes?</label><select id="f-vend">${opt([["", "Seleccione…"], ["Solo yo", "Solo yo"], ["2 a 5", "2 a 5"], ["6 a 15", "6 a 15"], ["Más de 15", "Más de 15"]], r.vendedores)}</select></div>
      <div class="mv-f full"><label for="f-int">¿Qué le interesa?</label><select id="f-int">${opt([["", "Seleccione…"], ["Solo aprender por mi cuenta", "Solo aprender por mi cuenta"], ["Capacitación presencial para mi equipo", "Capacitación presencial para mi equipo"], ["Capacitación en línea para mi equipo", "Capacitación en línea para mi equipo"], ["Asesoría de marketing y ventas", "Asesoría de marketing y ventas"]], r.interes)}</select></div>
      <input class="mv-hp" id="f-web" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p class="mv-err" id="mvErr" hidden></p>
      <label class="mv-ok"><input type="checkbox" id="f-ok" ${r.ok ? "checked" : ""}><span>Acepto que Vector Marketing &amp; Academy me contacte sobre mi resultado y sus capacitaciones.</span></label>
      <button class="btn" type="submit" id="mvGo">Comenzar el curso →</button>
    </form></div>`;
  const rub = $("f-rubro"), otro = $("f-otro");
  const upd = () => (otro.hidden = rub.value !== "otro"); rub.onchange = upd; upd();
  const ids = ["nombre", "cargo", "empresa", "rubro", "prod", "correo", "tel", "ciudad", "vend", "int"];
  $("mvForm").oninput = () => { const d = {}; ids.forEach(i => (d[i] = $("f-" + i).value)); LS.set("mv-draft", { nombre: d.nombre, cargo: d.cargo, empresa: d.empresa, rubro: d.rubro, prod: d.prod, correo: d.correo, telefono: d.tel, ciudad: d.ciudad, vendedores: d.vend, interes: d.int, ok: $("f-ok").checked }); };
  $("mvForm").onsubmit = async e => {
    e.preventDefault();
    const v = id => $("f-" + id).value.trim();
    const reg = { nombre: v("nombre"), cargo: v("cargo"), empresa: v("empresa"), rubro: v("rubro"), prod: v("prod"), correo: v("correo").toLowerCase(), telefono: v("tel"), ciudad: v("ciudad"), vendedores: v("vend"), interes: v("int"), cli: "cliente" };
    const err = $("mvErr");
    const bad = !reg.nombre || reg.nombre.length < 3 ? "nombre" : !reg.empresa ? "empresa" : !reg.rubro ? "rubro" : reg.rubro === "otro" && reg.prod.length < 3 ? "prod" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg.correo) ? "correo" : reg.telefono.replace(/\D/g, "").length < 8 ? "tel" : !reg.interes ? "int" : !$("f-ok").checked ? "ok" : "";
    if (bad) { err.hidden = false; err.textContent = { nombre: "Escriba su nombre completo.", empresa: "Escriba el nombre de la empresa.", rubro: "Elija el tipo de negocio.", prod: "Escriba el producto o servicio que más le preguntan.", correo: "Revise su correo.", tel: "Escriba un teléfono de 8 dígitos.", int: "Díganos qué le interesa.", ok: "Marque la casilla para continuar." }[bad]; $("f-" + bad).focus(); return; }
    const btn = $("mvGo"); btn.disabled = true; btn.textContent = "Preparando su curso…";
    const rub = RUBROS.find(x => x[0] === reg.rubro);
    let id = null;
    if (ENDPOINT) { try { const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tipo: "registro", ...reg, rubro: rub ? rub[1].replace(/^\S+\s/, "") + (reg.rubro === "otro" ? ": " + reg.prod : "") : reg.rubro, web: $("f-web").value, origen: location.href }) }); const j = await res.json().catch(() => ({})); if (res.ok) id = j.id || null; } catch (x) {} }
    track("Lead", { content_name: "Metodología VECTOR" });
    S = { reg, regId: id, idx: 0, xp: 0, done: [], exam: null, t0: Date.now() }; save(); buildC(); buildFlow();
    burst(); go(0);
  };
}

function nav(label, cls) { return `<div class="mv-nav">${S.idx > 0 ? `<button class="btn ghost" type="button" data-back>← Atrás</button>` : ""}<button class="btn ${cls || ""}" type="button" data-next>${label}</button></div>`; }
function wireNav() { const b = screen.querySelector("[data-back]"), n = screen.querySelector("[data-next]"); b && (b.onclick = () => go(S.idx - 1)); n && (n.onclick = next); }

function rIntro() {
  const first = S.reg.nombre.split(" ")[0];
  screen.innerHTML = `<div class="mv-intro"><span class="eyebrow">Bienvenido, ${esc(first)}</span><h2>Así va a vender ${esc(C.neg)} por WhatsApp</h2>
  <p class="mv-lead">Vamos a recorrer las 6 letras de <b>VECTOR</b> con chats de ${C.id === "otro" ? "su negocio" : esc(C.label.toLowerCase())}. En cada letra: una lección corta, un ejemplo real y un reto rápido. Gane XP, desbloquee las letras y al final haga el examen.</p>
  <div class="mv-road">${LESS().map((x, i) => `<div class="mv-rs" style="--i:${i}"><b>${x.l}</b><span>${x.t}</span></div>`).join("")}<div class="mv-rs fin" style="--i:6"><b>🏆</b><span>Examen</span></div></div>
  <div class="mv-mini3"><div><b>⏱️</b><span>8 minutos</span></div><div><b>⚡</b><span>XP por cada acierto</span></div><div><b>🎓</b><span>Certificado</span></div></div>
  ${nav("Empezar con la V →")}</div>`;
  wireNav();
}
function rLesson(f) {
  const x = LESS()[f.i];
  screen.innerHTML = `<div class="mv-lesson">
   <div class="mv-lx"><div class="mv-big">${x.l}</div><span class="eyebrow">Letra ${f.i + 1} de 6 · Temperatura: ${esc(x.temp)}</span><h2>${x.t}</h2><p>${esc(x.d)}</p>
     <ul class="mv-do">${x.do.map((d, k) => `<li style="--k:${k}">${esc(d)}</li>`).join("")}</ul>
     <div class="mv-fact"><b>${esc(x.fact[0])}</b><span>${esc(x.fact[1])}</span><small>${esc(x.fact[2])} · <a href="#ev-${x.fact[3]}">Ver el estudio y cómo citarlo</a></small></div></div>
   <div class="mv-phone">${wh()}<div class="mv-thread" id="mvT"></div></div></div>
   ${nav("Entendido, ponerme a prueba →")}`;
  animateChat($("mvT"), x.ch, 650); wireNav();
  screen.querySelector("[data-next]").onclick = () => { if (!S["read" + f.i]) { S["read" + f.i] = 1; addXP(10); } next(); };
}
function rCheck(f) {
  const x = LESS()[f.i], q = x.q, order = shuffle([0, 1, 2]);
  screen.innerHTML = `<div class="mv-check"><span class="eyebrow">Reto rápido · ${x.l} · ${x.t}</span>
   <div class="mv-phone sm">${wh()}<div class="mv-thread"><div class="mv-b in">${mark(q.p)}</div></div></div>
   <h2>${esc(q.q)}</h2><div class="mv-opts">${order.map((k, n) => `<button type="button" class="mv-opt" data-k="${k}"><span class="mv-lt">${"ABC"[n]}</span><span>${mark(q.o[k])}</span></button>`).join("")}</div><div id="mvFb"></div></div>`;
  screen.querySelectorAll(".mv-opt").forEach(b => b.onclick = () => {
    const k = +b.dataset.k, ok = k === 0;
    screen.querySelectorAll(".mv-opt").forEach(o => { o.disabled = true; if (+o.dataset.k === 0) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
    if (ok) addXP(20); else { b.classList.add("shake"); }
    const first = !S.done.includes(x.l);
    if (first) { S.done.push(x.l); save(); topbar(); setTimeout(() => { burst(); toast(`¡Letra ${x.l} desbloqueada! ${S.done.length}/6`); }, 250); }
    $("mvFb").innerHTML = `<div class="mv-fb ${ok ? "ok" : "bad"}"><b>${ok ? "¡Correcto! +20 XP" : "Casi. Esta es la mejor respuesta:"}</b><p>${ok ? "" : mark(q.o[0]) + "<br>"}${esc(q.e)}</p></div>${nav(f.i < 5 ? `Siguiente: ${LESS()[f.i + 1].l} →` : "Ir a la misión final →")}`;
    wireNav();
  });
}
function rTermo() {
  const st = [["Frío", "var(--mv-cold)", "Solo pregunta precio. Objetivo: que cuente lo que necesita (V + E)."], ["Tibio", "var(--mv-warm)", "Contó su necesidad. Objetivo: conocerlo e impacto (C)."], ["Caliente", "var(--mv-hot)", "Pregunta horarios, entrega o pagos. Objetivo: precio con contexto y cierre (T + O)."], ["Cliente", "var(--ok)", "Compró o agendó. Objetivo: que vuelva y recomiende (R)."]];
  screen.innerHTML = `<div class="mv-termo"><span class="eyebrow">Bonus · El termómetro del cliente</span><h2>¿En qué temperatura está su cliente?</h2><p class="mv-lead">Cada letra sube la temperatura. Toque cada nivel.</p>
   <div class="mv-thermo"><div class="mv-tube"><i id="mvTf"></i></div><div class="mv-tlist">${st.map((s, i) => `<button type="button" class="mv-tb" data-i="${i}" style="--c:${s[1]}"><b>${s[0]}</b><span>${s[2]}</span></button>`).join("")}</div></div>
   ${nav("Seguir con la T →")}</div>`;
  const pick = i => { screen.querySelectorAll(".mv-tb").forEach((b, k) => b.classList.toggle("on", k <= i)); $("mvTf").style.height = (i + 1) * 25 + "%"; };
  screen.querySelectorAll(".mv-tb").forEach(b => b.onclick = () => pick(+b.dataset.i)); setTimeout(() => pick(0), 200);
  wireNav(); screen.querySelector("[data-next]").onclick = () => { if (!S.termo) { S.termo = 1; addXP(10); } next(); };
}
function rMission() {
  const M = mission(); let k = 0, good = 0;
  screen.innerHTML = `<div class="mv-mission"><div class="mv-mx"><span class="eyebrow">Misión final · 4 mensajes</span><h2>Atienda a un cliente de principio a fin</h2><p>Responda cada mensaje. Mire cómo sube o baja la temperatura.</p>
   <div class="mv-gauge"><div><i id="mvG"></i></div><span>Frío</span><span>Caliente</span></div><div id="mvMo"></div></div>
   <div class="mv-phone tall">${wh()}<div class="mv-thread" id="mvT"></div></div></div>`;
  const th = $("mvT"); let temp = 10;
  const setG = () => ($("mvG").style.width = Math.max(5, Math.min(100, temp)) + "%");
  const ask = () => {
    const st = M[k];
    animateChat(th, [["in", st.p]], 0);
    setTimeout(() => {
      $("mvMo").innerHTML = `<div class="mv-opts">${shuffle([0, 1, 2]).map((i, n) => `<button type="button" class="mv-opt" data-i="${i}"><span class="mv-lt">${"ABC"[n]}</span><span>${mark(st.o[i][0])}</span></button>`).join("")}</div>`;
      $("mvMo").querySelectorAll(".mv-opt").forEach(b => b.onclick = () => {
        const o = st.o[+b.dataset.i]; animateChat(th, [["out", o[0]]], 0);
        temp += o[1] === 1 ? 23 : o[1] === 0 ? 4 : -12; setG();
        if (o[1] === 1) { good++; addXP(15); } else th.insertAdjacentHTML("beforeend", `<div class="mv-ctx">${o[1] === 0 ? "El cliente tarda en responder…" : "Visto ✓✓ · aquí el cliente se enfría"}</div>`);
        th.scrollTop = th.scrollHeight;
        const best = st.o[0][0];
        $("mvMo").innerHTML = `<div class="mv-fb ${o[1] === 1 ? "ok" : "bad"}"><b>${o[1] === 1 ? "¡Bien! +15 XP" : "Mejor así:"}</b>${o[1] === 1 ? "" : `<p>${mark(best)}</p>`}</div><button class="btn" type="button" id="mvMn">${k < M.length - 1 ? "Siguiente mensaje →" : "Ver resultado de la misión"}</button>`;
        $("mvMn").onclick = () => { k++; if (k < M.length) ask(); else end(); };
      });
    }, reduce ? 50 : 900);
  };
  const end = () => { if (good === M.length) burst(); $("mvMo").innerHTML = `<div class="mv-fb ${good >= 3 ? "ok" : "bad"}"><b>${good} de ${M.length} respuestas ideales</b><p>${good === M.length ? "Cliente caliente y con cita. ¡Está listo para el examen!" : "Buen intento. En el examen aplique cada letra en orden."}</p></div>${nav("Ir al examen →")}`; wireNav(); };
  setG(); ask();
}
function rExamIntro() {
  screen.innerHTML = `<div class="mv-intro center"><div class="mv-trophy">🏆</div><span class="eyebrow">Último paso</span><h2>Examen de certificación</h2><p class="mv-lead">12 preguntas sobre las 6 letras. Con 70% o más obtiene su certificado de Vector Academy. Su resultado se envía a su capacitador.</p>
   <div class="mv-mini3"><div><b>12</b><span>preguntas</span></div><div><b>3 min</b><span>aproximado</span></div><div><b>70%</b><span>para aprobar</span></div></div>${nav("Empezar el examen →")}</div>`;
  wireNav();
  screen.querySelector("[data-next]").onclick = () => { const E = exam(); S.exam = { order: shuffle(E.map((_, i) => i)), i: 0, ok: 0, miss: [], t0: Date.now(), streak: 0, best: 0 }; save(); next(); };
}
function rExam() {
  const E = exam(), X = S.exam; if (!X) return go(S.idx - 1);
  if (X.i >= E.length) return next();
  const qi = X.order[X.i], q = E[qi], idx = shuffle(q.o.map((_, k) => k));
  screen.innerHTML = `<div class="mv-exam"><div class="mv-eh"><span class="mv-pill">Pregunta ${X.i + 1} de ${E.length}</span><span class="mv-pill">✓ ${X.ok}</span><span class="mv-pill">🔥 ${X.streak}</span><span class="mv-pill lt">${q.l}</span></div>
   <div class="mv-ebar"><i style="width:${X.i / E.length * 100}%"></i></div>
   ${q.chat ? `<div class="mv-phone sm">${wh()}<div class="mv-thread"><div class="mv-b in">${mark(q.chat)}</div></div></div>` : ""}
   <h2>${esc(q.q)}</h2><div class="mv-opts">${idx.map((k, n) => `<button type="button" class="mv-opt" data-k="${k}"><span class="mv-lt">${"ABCD"[n]}</span><span>${mark(q.o[k])}</span></button>`).join("")}</div><div id="mvFb"></div></div>`;
  screen.querySelectorAll(".mv-opt").forEach(b => b.onclick = () => {
    const k = +b.dataset.k, ok = k === 0;
    screen.querySelectorAll(".mv-opt").forEach(o => { o.disabled = true; if (+o.dataset.k === 0) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
    if (ok) { X.ok++; X.streak++; X.best = Math.max(X.best, X.streak); addXP(25); } else { X.streak = 0; b.classList.add("shake"); X.miss.push({ letra: q.l, pregunta: q.q, eligio: q.o[k], correcta: q.o[0], comoMejorar: q.e }); }
    X.i++; save();
    $("mvFb").innerHTML = `<div class="mv-fb ${ok ? "ok" : "bad"}"><b>${ok ? (X.streak >= 3 ? `¡Racha de ${X.streak}! 🔥` : "¡Correcto!") : "No es la mejor opción"}</b><p>${esc(q.e)}</p></div><div class="mv-nav"><button class="btn" type="button" id="mvEn">${X.i < E.length ? "Siguiente pregunta →" : "Ver mi resultado"}</button></div>`;
    $("mvEn").onclick = () => (X.i < E.length ? render() : next());
  });
}
function level(p) { return p >= 90 ? ["Experto VECTOR", "#0E9A60"] : p >= 70 ? ["Vendedor certificado", "#6A3BF5"] : p >= 50 ? ["En camino", "#E89B0C"] : ["Necesita repasar", "#E0169B"]; }
function rResult() {
  const X = S.exam, n = exam().length, p = Math.round(X.ok / n * 100), [lv, col] = level(p), secs = Math.round((Date.now() - X.t0) / 1000), pass = p >= 70;
  const r = S.reg;
  if (!X.sent) {
    X.sent = 1; save();
    if (ENDPOINT) fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tipo: "examen", registro_id: S.regId, nombre: r.nombre, empresa: r.empresa, cargo: r.cargo, correo: r.correo, telefono: r.telefono, ciudad: r.ciudad, rubro: C.label + (r.rubro === "otro" ? ": " + r.prod : ""), vendedores: r.vendedores, interes: r.interes, correctas: X.ok, total: n, nivel: lv, segundos: secs, falladas: X.miss, origen: location.href }) }).catch(() => {});
    track("MetodologiaVectorExamen", { score: p, nivel: lv }, true);
    if (pass) setTimeout(burst, 300);
  }
  const waTxt = `Hola Vector Academy, terminé el curso de la Metodología VECTOR.\n${r.nombre} · ${r.empresa}\nResultado: ${X.ok}/${n} (${p}%) · ${lv}\nMe interesa: ${r.interes}`;
  const share = `https://wa.me/?text=${encodeURIComponent("Les recomiendo este curso gratuito de atención y ventas por WhatsApp de Vector Academy. Dura menos de 10 minutos: " + location.origin + location.pathname)}`;
  screen.innerHTML = `<div class="mv-result">
   <div class="mv-score"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="bg"/><circle cx="60" cy="60" r="52" class="fg" style="stroke:${col};stroke-dashoffset:${327 - 327 * p / 100}"/></svg><div><b>${X.ok}/${n}</b><small>${p}%</small></div></div>
   <div class="mv-rt"><span class="eyebrow">${pass ? "¡Aprobado!" : "Resultado"}</span><h2>${esc(lv)}</h2><p>${pass ? `Felicidades, ${esc(r.nombre.split(" ")[0])}. Ya domina la Metodología VECTOR. Descargue su certificado y compártalo.` : "Le faltó poco. Repase las letras marcadas y vuelva a intentarlo."} · ${S.xp} XP · ${Math.floor(secs / 60)} min ${secs % 60} s</p></div>
   ${X.miss.length ? `<div class="mv-miss"><b>Para repasar</b>${X.miss.map(m => `<div><span class="mv-lt">${m.letra}</span><p>${esc(m.pregunta)}<small>${esc(m.comoMejorar)}</small></p></div>`).join("")}</div>` : ""}
   <div class="mv-actions">
     ${pass ? `<button class="btn" type="button" id="mvCert">🎓 Descargar mi certificado</button>` : `<button class="btn" type="button" id="mvRetry">Repetir el examen</button>`}
     <a class="btn ghost" href="pdf-placeholder" download id="mvPdf">📄 Descargar la metodología (PDF)</a>
     <a class="btn ghost" href="${share}" target="_blank" rel="noopener">Compartir con mi equipo por WhatsApp</a>
   </div>
   <div class="mv-upsell"><div><span class="eyebrow">Para su equipo</span><h3>Lleve la Metodología VECTOR a toda su empresa</h3><p>Capacitación práctica con casos reales de su negocio: presencial en Vector Academy, en sus instalaciones o en línea. Incluye inspección de chats y plan de mejora.</p></div>
     <a class="btn" href="https://wa.me/${WA}?text=${encodeURIComponent(waTxt)}" target="_blank" rel="noopener" id="mvWa">Quiero capacitar a mi equipo</a></div>
   <button class="mv-link" type="button" id="mvRestart">Volver a tomar el curso desde el inicio</button></div>`;
  $("mvPdf").href = location.pathname.replace(/\/?$/, "/") + "metodologia-vector.pdf";
  $("mvWa").onclick = () => track("Contact", { content_name: "Capacitación VECTOR" });
  $("mvCert") && ($("mvCert").onclick = () => cert(r, X.ok, n, p, lv));
  $("mvRetry") && ($("mvRetry").onclick = () => { S.exam = null; go(FLOW.findIndex(f => f.k === "examIntro")); });
  $("mvRestart").onclick = () => { const reg = S.reg, id = S.regId; S = { reg, regId: id, idx: 0, xp: 0, done: [], exam: null }; save(); render(); };
}

/* Certificado en imagen */
function cert(r, ok, n, p, lv) {
  const W = 1600, H = 1131, cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
  const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#3A0CC9"); g.addColorStop(.45, "#7B4DFF"); g.addColorStop(1, "#E0169B");
  x.fillStyle = "#0E0630"; x.fillRect(0, 0, W, H); x.fillStyle = g; x.fillRect(0, 0, W, 16); x.fillRect(0, H - 16, W, 16);
  x.strokeStyle = "rgba(255,255,255,.18)"; x.lineWidth = 2; x.strokeRect(50, 50, W - 100, H - 100);
  const rg = x.createRadialGradient(W, 0, 10, W, 0, 900); rg.addColorStop(0, "rgba(224,22,155,.45)"); rg.addColorStop(1, "rgba(224,22,155,0)"); x.fillStyle = rg; x.fillRect(0, 0, W, H);
  x.textAlign = "center"; x.fillStyle = "#FF9AD2"; x.font = "800 26px Manrope, sans-serif"; x.fillText("VECTOR MARKETING & ACADEMY", W / 2, 190);
  x.fillStyle = "#fff"; x.font = "88px Anton, Impact, sans-serif"; x.fillText("CERTIFICADO DE APROBACIÓN", W / 2, 300);
  x.font = "500 30px Manrope, sans-serif"; x.fillStyle = "#D6CCF5"; x.fillText("Se otorga a", W / 2, 390);
  x.fillStyle = "#fff"; x.font = "800 72px Manrope, sans-serif"; x.fillText(r.nombre, W / 2, 480, W - 240);
  x.font = "500 30px Manrope, sans-serif"; x.fillStyle = "#D6CCF5"; x.fillText(`${r.cargo ? r.cargo + " · " : ""}${r.empresa}`, W / 2, 535, W - 240);
  x.fillText("por aprobar el curso de atención y ventas por WhatsApp", W / 2, 620);
  x.font = "120px Anton, Impact, sans-serif"; x.fillStyle = g; x.fillText("METODOLOGÍA VECTOR", W / 2, 760, W - 200);
  x.font = "700 30px Manrope, sans-serif"; x.fillStyle = "#fff"; x.fillText(`Resultado: ${ok}/${n} (${p}%) · ${lv}`, W / 2, 840);
  x.font = "500 26px Manrope, sans-serif"; x.fillStyle = "#B9B0E3"; x.fillText(`San Pedro Sula, Honduras · ${new Date().toLocaleDateString("es-HN", { day: "numeric", month: "long", year: "numeric" })}`, W / 2, 900);
  x.fillText("Edgardo A. López · Director Creativo, Vector Marketing & Academy · estudiovector.com", W / 2, 990);
  const done = () => cv.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `Certificado VECTOR - ${r.nombre}.png`; document.body.appendChild(a); a.click(); a.remove(); }, "image/png");
  const logo = new Image(); logo.onload = () => { x.drawImage(logo, W / 2 - 70, 60, 140, 106); done(); }; logo.onerror = done; logo.src = "/img/logo-blanco.png";
  track("MetodologiaVectorCertificado", {}, true);
}

/* Confeti */
function burst() {
  if (reduce) return; const cv = $("mvConfetti"); if (!cv) return;
  const W = cv.width = innerWidth, H = cv.height = innerHeight, x = cv.getContext("2d"), cols = ["#E0169B", "#7B4DFF", "#3A0CC9", "#22D3EE", "#FFC94D"];
  const ps = Array.from({ length: 140 }, () => ({ x: W / 2 + (Math.random() - .5) * 200, y: H * .45, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, s: 5 + Math.random() * 6, c: cols[Math.random() * 5 | 0], a: Math.random() * 6 }));
  let f = 0; (function t() { x.clearRect(0, 0, W, H); ps.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.a += .15; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); x.restore(); }); if (++f < 120) requestAnimationFrame(t); else x.clearRect(0, 0, W, H); })();
}

if (S.reg) { buildC(); buildFlow(); }
render();

})();
