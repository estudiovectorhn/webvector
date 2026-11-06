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
,

{id:"farmacia",label:"Farmacia",emoji:"💊",cli:"cliente",clis:"clientes",neg:"Farmacia",
 open:"Buenas, ¿tienen el medicamento para la presión?",
 probQ:"¡Con gusto le reviso! ¿Me dice el nombre que trae la receta y la presentación?",
 probA:"Es para mi papá, ya se le acabó y no quiero que pase el día sin tomarlo 😟",
 who:["Doña Marta","La Lima"],
 impQ:"Le entiendo, eso es importante. ¿Para cuándo lo necesita y es la primera vez que lo compra con nosotros?",
 impA:"Lo necesita hoy mismo. ¿Cuánto cuesta?",
 sol:"Para que no le falte hoy: la caja tiene un valor de L [precio] y tenemos [existencias] disponibles. Si lo lleva por mes le queda a [precio especial].",
 close:"¿Pasa por él antes de las 6:00 p. m. o se lo enviamos a domicilio esta tarde?",
 closeA:"Mándemelo a domicilio, por favor.",
 confirm:"¡Listo! Le enviamos el medicamento hoy en la tarde a nombre de Doña Marta. Le aviso cuando salga el motorista 😊",
 simpleQ:"Solo dígame el precio del jarabe, no me pregunte tanto 🙄",
 simpleR:"¡Claro! El jarabe tiene un valor de L [precio] 😊 Una sola pregunta para darle el correcto: ¿es para adulto o para niño?",
 simpleA:"Para un niño de 6 años.",
 simpleF:"Perfecto, la presentación pediátrica es la indicada. ¿Se lo aparto o se lo enviamos?",
 urgQ:"Mi mamá se quedó sin su insulina y la farmacia de aquí ya cerró 😭",
 urgR:"Vamos a ayudarle ya. ¿Me dice el nombre exacto que aparece en la caja y en qué zona está?",
 urgA:"Soy Gabriela, estoy en el Barrio Guamilito.",
 urgClose:"Gabriela, sí la tenemos y tiene un valor de L [precio]. ¿Pasa usted en los próximos 20 minutos o se la mandamos con el motorista?",
 caroQ:"¿Cuánto cuesta el tratamiento completo del mes?",
 caroE:"Con gusto le cotizo. ¿Cuántos medicamentos trae la receta y es tratamiento permanente?",
 caroA:"Son tres y es de por vida. Pero en otra farmacia me salía más barato 😕",
 payR:"Le entiendo, es un gasto de todos los meses. Tenemos [opción genérica autorizada] y [precio de paquete mensual], y el farmacéutico le confirma la equivalencia. ¿Le preparo la cotización de los tres hoy o mañana?",
 segItem:"el tratamiento del mes",segEvent:"la recarga del próximo mes",
 rule:"No recomendar ni cambiar medicamentos por chat: el farmacéutico o el médico indican, quien atiende confirma existencias y precios.",
 ruleBad:"Para eso tómese este otro, es lo mismo y es más barato.",
 quick:[["Disponibilidad","¿Tienen este medicamento?","¡Con gusto le reviso! ¿Me manda una foto de la receta o el nombre exacto de la caja?"],["Precio","¿Cuánto cuesta?","¡Con gusto! ¿Me dice el nombre y la presentación? Así le doy el precio exacto y le digo si hay equivalente autorizado."],["Domicilio","¿Hacen entregas?","¡Sí! ¿A qué zona sería y para qué hora lo necesita?"],["Genéricos","¿Tienen genérico?","Puede que sí. ¿Me dice cuál es el medicamento? El farmacéutico le confirma la equivalencia."]]},

{id:"hotel",label:"Hotel, hostal o cabañas",emoji:"🏨",cli:"huésped",clis:"huéspedes",neg:"Hotel",
 open:"Hola, ¿cuánto cuesta la noche?",
 probQ:"¡Con gusto le comparto las tarifas! ¿Para qué fechas sería y cuántas personas viajan?",
 probA:"Vamos mi esposa y yo, es nuestro aniversario y queremos algo tranquilo 💕",
 who:["Óscar","Tegucigalpa"],
 impQ:"¡Felicidades! ¿Qué fecha tienen pensada y les gustaría algo con vista o más privado?",
 impA:"El fin de semana del 20. ¿Cuánto nos sale?",
 sol:"¡Qué bonito plan! Para esa fecha la habitación [tipo] va en L [precio] la noche e incluye [desayuno y servicios]. Como es su aniversario les podemos preparar [detalle de cortesía].",
 close:"¿Les reservo dos noches del viernes al domingo o solo la del sábado?",
 closeA:"Las dos noches, por favor.",
 confirm:"¡Listo! Queda su reserva del viernes al domingo a nombre de Óscar. Le envío los datos para el anticipo y el lunes le confirmo todo 😊",
 simpleQ:"Solo quiero saber el precio de la noche, no me pregunte tanto 🙄",
 simpleR:"¡Claro! La habitación sencilla está en L [precio] la noche 😊 Una sola pregunta para confirmarle disponibilidad: ¿para qué fecha?",
 simpleA:"Para este sábado.",
 simpleF:"¡Perfecto! Para el sábado tenemos disponible. ¿Se la aparto?",
 urgQ:"Se nos canceló el hotel y llegamos a la ciudad en dos horas 😩 ¿Tienen cuarto?",
 urgR:"¡Le ayudamos! Vamos a resolverlo ya. ¿Cuántas personas son y me regala su nombre?",
 urgA:"Somos cuatro. Soy Jessica.",
 urgClose:"Jessica, tenemos una habitación para cuatro en L [precio] la noche y la dejamos lista para su llegada. ¿Se la aparto ahorita o prefiere que le mande fotos primero?",
 caroQ:"¿Cuánto por el grupo de 12 personas?",
 caroE:"Con gusto le cotizo. ¿Cuántas noches serían y es viaje de trabajo o de paseo?",
 caroA:"Dos noches, es un retiro de la empresa. Pero otro hotel nos dio mejor precio 😕",
 payR:"Le entiendo. Nuestra tarifa de grupo incluye [desayuno, salón y estacionamiento], que normalmente se cobra aparte. Podemos hacer anticipo y el resto al llegar. ¿Le envío la cotización formal hoy o mañana temprano?",
 segItem:"la reserva del aniversario",segEvent:"un viaje el fin de semana",
 rule:"No confirmar habitaciones ni tarifas sin revisar la disponibilidad real del sistema.",
 ruleBad:"Sí, seguro hay cuartos, venga sin reservar.",
 quick:[["Tarifas","¿Cuánto la noche?","¡Con gusto! ¿Para qué fechas y cuántas personas? Así le doy la tarifa exacta y le confirmo disponibilidad."],["Disponibilidad","¿Tienen para este fin?","¡Déjeme revisar! ¿Cuántas personas y cuántas noches serían?"],["Grupos / eventos","Somos un grupo","¡Con gusto le cotizo! ¿Cuántas personas, cuántas noches y es trabajo o paseo?"],["Qué incluye","¿Incluye desayuno?","¡Con gusto le detallo todo! ¿Para qué fecha está viendo?"]]},

{id:"gimnasio",label:"Gimnasio o entrenamiento",emoji:"🏋️",cli:"cliente",clis:"clientes",neg:"Gimnasio",
 open:"Hola, ¿cuánto cuesta la mensualidad?",
 probQ:"¡Con gusto le comparto los planes! ¿Qué resultado está buscando: bajar de peso, ganar músculo o mejorar su salud?",
 probA:"Quiero bajar de peso. Ya intenté varias veces y siempre lo dejo 😔",
 who:["Nelson","Choloma"],
 impQ:"Le entiendo, es más común de lo que cree y con acompañamiento cambia. ¿Hay alguna fecha o motivo que lo tenga decidido ahora?",
 impA:"El doctor me dijo que tengo que bajar. ¿Cuánto es la mensualidad?",
 sol:"Para lo que me cuenta le recomiendo el plan [nombre], que incluye rutina guiada y seguimiento del entrenador: L [precio] al mes, con [forma de pago]. Así no lo deja a los dos meses.",
 close:"¿Viene a conocerlo hoy en la tarde o mañana en la mañana? La primera clase es de cortesía.",
 closeA:"Mañana en la mañana.",
 confirm:"¡Listo! Lo esperamos mañana a las 8:00 a. m. a nombre de Nelson. Traiga ropa cómoda y agua 💪",
 simpleQ:"Solo dígame el precio de la mensualidad, no me pregunte tanto 🙄",
 simpleR:"¡Claro! La mensualidad está en L [precio] 😊 Una sola pregunta para orientarlo: ¿entrenaría en la mañana o en la tarde?",
 simpleA:"En la tarde, saliendo del trabajo.",
 simpleF:"Perfecto, en la tarde tenemos [clases o espacio]. ¿Le aparto su clase de cortesía esta semana?",
 urgQ:"Necesito empezar ya, tengo un chequeo médico en un mes 😩",
 urgR:"¡Le ayudamos a empezar hoy mismo! ¿Me regala su nombre y qué le indicó el médico?",
 urgA:"Soy Carmen, me dijeron que baje de peso y mueva el cuerpo.",
 urgClose:"Carmen, el plan de acompañamiento está en L [precio] al mes y el entrenador le arma la rutina desde el primer día. ¿Viene hoy a las 5:00 p. m. o mañana a las 7:00 a. m.?",
 caroQ:"¿Cuánto cuesta el plan con entrenador personal?",
 caroE:"Con gusto le comparto el precio. ¿Qué quiere lograr con el entrenador y cuántos días a la semana podría venir?",
 caroA:"Tres días, quiero resultados rápido. Pero en otro gimnasio está más barato 😕",
 payR:"Le entiendo. El nuestro incluye [evaluación, plan de alimentación y seguimiento semanal], que es lo que hace la diferencia. Puede pagarlo con [forma de pago]. ¿Le aparto su evaluación el martes o el jueves?",
 segItem:"el plan mensual",segEvent:"un chequeo médico el próximo mes",
 rule:"No prometer kilos ni tallas exactas por chat: cada cuerpo responde distinto y el entrenador evalúa.",
 ruleBad:"En un mes baja 10 libras seguro.",
 quick:[["Mensualidad","¿Cuánto al mes?","¡Con gusto! ¿Qué resultado está buscando? Así le recomiendo el plan que le conviene."],["Horarios","¿A qué hora abren?","¡Con gusto le digo! ¿Entrenaría en la mañana o en la tarde?"],["Entrenador","¿Tienen entrenador?","¡Sí! ¿Qué le gustaría lograr y cuántos días podría venir?"],["Clase de prueba","¿Puedo probar?","¡Claro! La primera clase es de cortesía. ¿Viene hoy o mañana?"]]},

{id:"educacion",label:"Colegio, academia o centro educativo",emoji:"🎓",cli:"padre de familia",clis:"padres de familia",neg:"Centro Educativo",
 open:"Buenas, ¿cuánto cuesta la matrícula?",
 probQ:"¡Con gusto le informo! ¿Para qué grado sería y su hijo o hija viene de otro centro?",
 probA:"Para sexto grado. Es que en el colegio donde está no le están poniendo atención 😟",
 who:["Doña Lesly","Villanueva"],
 impQ:"Le entiendo, eso preocupa. ¿Desde cuándo lo nota y para cuándo le gustaría hacer el cambio?",
 impA:"Desde este año. Quiero cambiarlo para el próximo. ¿Cuánto sale todo?",
 sol:"Para sexto grado la matrícula es de L [precio] y la mensualidad de L [precio], e incluye [lo que incluye]. En la visita la directora le explica cómo acompañamos a los niños que vienen de un cambio.",
 close:"¿Le agendo la visita el martes a las 9:00 a. m. o el jueves a las 2:00 p. m.?",
 closeA:"El jueves en la tarde.",
 confirm:"¡Listo! Queda su visita el jueves a las 2:00 p. m. a nombre de Doña Lesly. Le mando la lista de documentos por si decide avanzar 😊",
 simpleQ:"Solo dígame cuánto es la mensualidad, no me pregunte tanto 🙄",
 simpleR:"¡Claro! La mensualidad de primaria es de L [precio] 😊 Una sola pregunta para darle el dato exacto: ¿para qué grado?",
 simpleA:"Para tercer grado.",
 simpleF:"Perfecto, para tercer grado es L [precio] e incluye [lo que incluye]. ¿Le mando la lista de requisitos?",
 urgQ:"Necesito cambiar a mi hija ya, las clases empiezan la otra semana 😩",
 urgR:"¡Le ayudamos! Vamos a resolverlo esta semana. ¿Para qué grado y me regala su nombre?",
 urgA:"Soy Wendy, es para séptimo.",
 urgClose:"Wendy, en séptimo tenemos cupo. La matrícula es de L [precio] y podemos hacer el proceso en un día. ¿Viene hoy antes de las 4:00 p. m. o mañana temprano?",
 caroQ:"¿Cuánto sale todo el año con los tres niños?",
 caroE:"Con gusto le hago el cálculo. ¿En qué grados van los tres y vienen todos del mismo centro?",
 caroA:"Van en primero, cuarto y séptimo. Pero otro colegio me cobra menos 😕",
 payR:"Le entiendo, con tres es una decisión grande. Tenemos [descuento por hermanos] y [plan de pagos], y la mensualidad incluye [lo que incluye]. ¿Le preparo el cálculo de los tres para hoy o mañana?",
 segItem:"la matrícula",segEvent:"el inicio de clases",
 rule:"No prometer cupos, becas ni resultados académicos sin confirmarlo con la dirección.",
 ruleBad:"Sí, seguro le damos beca, no se preocupe.",
 quick:[["Matrícula y mensualidad","¿Cuánto cuesta?","¡Con gusto le informo! ¿Para qué grado sería? Así le doy los montos exactos."],["Cupos","¿Tienen cupo?","¡Déjeme confirmar con la dirección! ¿Para qué grado y para cuándo sería?"],["Requisitos","¿Qué documentos piden?","¡Con gusto le mando la lista! ¿Para qué grado es?"],["Visita","¿Puedo ir a conocer?","¡Claro que sí! ¿Le queda mejor en la mañana o en la tarde?"]]},

{id:"inmobiliaria",label:"Inmobiliaria o bienes raíces",emoji:"🏠",cli:"cliente",clis:"clientes",neg:"Inmobiliaria",
 open:"Hola, ¿cuánto cuesta la casa que publicaron?",
 probQ:"¡Con gusto le doy todos los datos! ¿La busca para vivir o como inversión?",
 probA:"Para vivir. Estamos pagando alquiler y ya queremos algo propio 🏡",
 who:["Kevin","San Pedro Sula"],
 impQ:"Le entiendo perfectamente. ¿Para cuándo les gustaría mudarse y ya han visto si califican para préstamo?",
 impA:"Queremos mudarnos este año. Todavía no hemos ido al banco. ¿Cuánto es?",
 sol:"Esa casa está en L [precio] y está en [zona]. Para lo que me cuenta, lo primero es la precalificación en el banco: es gratis y le dice exactamente hasta cuánto puede. Nosotros lo acompañamos en ese trámite.",
 close:"¿Le agendo la visita a la casa el sábado a las 10:00 a. m. o el domingo a las 3:00 p. m.?",
 closeA:"El sábado a las 10.",
 confirm:"¡Listo! Queda la visita el sábado a las 10:00 a. m. a nombre de Kevin. Le mando la ubicación y qué llevar 😊",
 simpleQ:"Solo dígame el precio, no me pregunte tanto 🙄",
 simpleR:"¡Claro! Esa propiedad está en L [precio] 😊 Una sola pregunta para mandarle opciones parecidas: ¿en qué zona la busca?",
 simpleA:"Por el sector norte.",
 simpleF:"Perfecto, en el sector norte tengo [cantidad] opciones en ese rango. ¿Le mando las fotos?",
 urgQ:"Me entregan el apartamento donde vivo en 15 días y no tengo a dónde irme 😩",
 urgR:"¡Le ayudamos a resolverlo! ¿Para cuántas personas, en qué zona y me regala su nombre?",
 urgA:"Somos tres. Soy Alejandra, busco por el centro.",
 urgClose:"Alejandra, tengo dos opciones listas para entrega inmediata por el centro, desde L [precio]. ¿Las vemos hoy en la tarde o mañana temprano?",
 caroQ:"¿Cuánto por la casa de la colonia?",
 caroE:"Con gusto le comparto el precio. ¿Qué es lo más importante para ustedes: el tamaño, la zona o la cuota mensual?",
 caroA:"La cuota, que no se nos dispare. Pero vi otra más barata 😕",
 payR:"Le entiendo, la cuota es lo que se paga todos los meses. Esta tiene [estado, servicios y ubicación] que afectan el valor a futuro, y con [plan de financiamiento] la cuota queda clara desde el inicio. ¿Vemos las dos el sábado y compara en persona?",
 segItem:"la casa del sector norte",segEvent:"la entrega del apartamento en 15 días",
 rule:"No prometer precios finales, aprobaciones de préstamo ni condiciones del banco: eso lo confirma la institución.",
 ruleBad:"Con ese sueldo seguro le aprueban, no se preocupe.",
 quick:[["Precio","¿Cuánto cuesta?","¡Con gusto! ¿La busca para vivir o como inversión? Así le mando también opciones parecidas."],["Visitas","¿Puedo verla?","¡Claro! ¿Le queda mejor entre semana o el fin de semana?"],["Financiamiento","¿Aceptan préstamo?","¡Sí! ¿Ya tiene precalificación del banco o lo acompañamos a sacarla?"],["Alquiler","¿Tienen en alquiler?","¡Sí! ¿En qué zona la busca y para cuántas personas?"]]},

{id:"veterinaria",label:"Veterinaria o pet shop",emoji:"🐾",cli:"cliente",clis:"clientes",neg:"Veterinaria",
 open:"Hola, ¿cuánto cuesta la consulta?",
 probQ:"¡Con gusto le digo! ¿Qué le está pasando a su mascota y qué edad tiene?",
 probA:"Mi perrita no quiere comer desde ayer y está bien decaída 😢",
 who:["Mónica","San Pedro Sula"],
 impQ:"Le entiendo, uno se preocupa un montón. ¿Ha vomitado o tiene algún otro síntoma? ¿Desde cuándo exactamente?",
 impA:"Desde ayer en la tarde. ¿Cuánto me cobran?",
 sol:"La consulta tiene un valor de L [precio] y la doctora la revisa completa. Si necesita exámenes se los indica ahí mismo y le dice el costo antes de hacerlos, para que no haya sorpresas.",
 close:"¿La trae hoy a las 3:00 p. m. o a las 5:30 p. m.?",
 closeA:"A las 3 voy.",
 confirm:"¡Listo! La esperamos hoy a las 3:00 p. m. a nombre de Mónica. Si vomita otra vez antes de venir, me avisa 😊",
 simpleQ:"Solo quiero el precio del baño, no me pregunte tanto 🙄",
 simpleR:"¡Claro! El baño tiene un valor de L [precio] 😊 Una sola pregunta para darle el precio exacto: ¿de qué tamaño es su perrito?",
 simpleA:"Es mediano, un french poodle.",
 simpleF:"¡Perfecto! Para talla mediana es L [precio] e incluye [lo que incluye]. ¿Le aparto espacio esta semana?",
 urgQ:"Mi gato se comió algo raro y está vomitando 😭 ¿Pueden verlo ya?",
 urgR:"Vamos a atenderlo de inmediato. ¿Sabe qué fue lo que se comió y hace cuánto? Me regala su nombre, por favor.",
 urgA:"Soy Daniel, creo que fue un pedazo de hilo, hace como una hora.",
 urgClose:"Daniel, tráigalo ya, la doctora lo recibe apenas llegue. La consulta de urgencia tiene un valor de L [precio]. ¿Viene usted o le ayudamos con el traslado?",
 caroQ:"¿Cuánto cuesta la esterilización?",
 caroE:"Con gusto le comparto el precio. ¿Es perro o gato, qué peso tiene y ya tiene sus vacunas al día?",
 caroA:"Es una perrita de 15 libras, sí está vacunada. Pero en otra clínica está más barato 😕",
 payR:"Le entiendo. El nuestro incluye [exámenes previos, anestesia monitoreada y control post operatorio], que es lo que cuida que todo salga bien. Puede pagarlo con [forma de pago]. ¿Le aparto el martes o el sábado?",
 segItem:"la cita de la perrita",segEvent:"las vacunas del próximo mes",
 rule:"No diagnosticar ni recomendar medicamentos por chat: quien atiende orienta y la veterinaria revisa al animal.",
 ruleBad:"Eso es parásitos, dele este desparasitante.",
 quick:[["Consulta","¿Cuánto la consulta?","¡Con gusto! ¿Qué le está pasando a su mascota? Así le digo qué necesita y le aparto espacio."],["Baño y estética","¿Precio del baño?","¡Claro! ¿De qué tamaño es su mascota? Así le doy el precio exacto."],["Vacunas","¿Tienen vacunas?","¡Sí! ¿Qué edad tiene su mascota y cuándo fue la última vacuna?"],["Urgencias","¿Atienden urgencias?","¡Sí! ¿Qué está pasando y hace cuánto? Dígame y lo coordinamos ya."]]}
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

/* ===== Motor del curso Metodología VECTOR =====
 * Registro en dos pasos cortos dentro del propio curso (reg1 al entrar, reg2 antes del examen),
 * lecciones donde el alumno envía cada mensaje, drill de orden VECTOR, examen con contexto y
 * consecuencias por respuesta, y certificado premium imprimible. */
const $ = id => document.getElementById(id);
const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }, del(k) { try { localStorage.removeItem(k); } catch (e) {} } };
const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const mark = t => esc(t).replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const track = (ev, d, custom) => { try { if (window.fbq) fbq(custom ? "trackCustom" : "track", ev, d || {}); } catch (e) {} };
const WA = "50495691481";
const ICONWA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 5-1.3A10 10 0 1 0 12 2Zm5.5 14c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.2-.9-2.7-1.2-4.4-4-4.5-4.2-.1-.2-1-1.4-1-2.7s.6-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.5-.1l.8-.9c.2-.2.3-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z"/></svg>';
/* ---------- Sonido corto generado en el navegador (sin archivos) ---------- */
let SND = LS.get("mv-snd", true), AC = null;
function sfx(tipo) {
  if (!SND) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === "suspended") AC.resume();
    const notas = { envio: [[660, 0, .06]], bien: [[660, 0, .09], [990, .08, .14]], mal: [[220, 0, .18]], insignia: [[660, 0, .08], [880, .07, .08], [1320, .14, .22]], perdido: [[300, 0, .14], [180, .12, .3]] }[tipo];
    if (!notas) return;
    notas.forEach(([f, t, d]) => {
      const o = AC.createOscillator(), g = AC.createGain(), t0 = AC.currentTime + t;
      o.type = "sine"; o.frequency.setValueAtTime(f, t0);
      g.gain.setValueAtTime(.0001, t0); g.gain.exponentialRampToValueAtTime(.16, t0 + .012); g.gain.exponentialRampToValueAtTime(.0001, t0 + d);
      o.connect(g); g.connect(AC.destination); o.start(t0); o.stop(t0 + d + .02);
    });
  } catch (e) {}
}
const buzz = ms => { try { if (SND && navigator.vibrate) navigator.vibrate(ms); } catch (e) {} };

/* ---------- Insignias ---------- */
const INSIGNIAS = [
  ["rayo", "⚡", "Rayo", "Contestó el primer mensaje en menos de 8 segundos"],
  ["caliente", "🔥", "Punto de ebullición", "Llevó al cliente de frío a caliente"],
  ["apurado", "⏱️", "El apurado", "Resolvió al cliente que no quiere preguntas"],
  ["regateador", "💰", "El regateador", "Sostuvo el precio sin regalar descuento"],
  ["urgencia", "🚨", "La urgencia", "Atendió una emergencia sin perder el método"],
  ["orden", "🧩", "Orden perfecto", "Armó la conversación VECTOR sin un solo error"],
  ["racha", "🎯", "Racha de 5", "Cinco respuestas correctas seguidas en el examen"],
  ["perfecto", "🏆", "Examen perfecto", "Respondió las 12 preguntas correctamente"]
];
function darInsignia(id) {
  if (!S.badges) S.badges = [];
  if (S.badges.includes(id)) return;
  S.badges.push(id); save();
  const b = INSIGNIAS.find(x => x[0] === id); if (!b) return;
  sfx("insignia"); buzz([18, 40, 18]); burst();
  toast(`${b[1]} Insignia desbloqueada: ${b[2]}`);
  const el = $("mvBadges"); if (el) { el.textContent = "🏅 " + S.badges.length; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
}

/* ---------- Termómetro del cliente: la mecánica del curso ---------- */
const NIVEL_T = t => t >= 75 ? ["Caliente", "hot"] : t >= 40 ? ["Tibio", "warm"] : t > 0 ? ["Frío", "cold"] : ["Se fue", "gone"];
function setTemp(d) {
  S.temp = Math.max(0, Math.min(100, (S.temp || 0) + d)); save();
  const el = $("mvTemp"); if (!el) return;
  const [n, c] = NIVEL_T(S.temp);
  el.className = "mv-temp " + c; el.querySelector("i").style.height = S.temp + "%"; el.querySelector("b").textContent = n;
  el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
  if (S.temp >= 100) darInsignia("caliente");
}
const ORD = ["V", "E", "C", "T", "O", "R"];
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
/* Solo el sitio en vivo envía registros y resultados: así las pruebas locales
   o en vista previa nunca generan correos ni filas en la base. */
const EN_VIVO = /(^|\.)estudiovector\.com$/.test(location.hostname);
const EP = player.dataset.endpoint || "";
const ENDPOINT = EN_VIVO ? EP : "";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

const EQ_PARAM = (new URLSearchParams(location.search).get("equipo") || "").trim().toUpperCase();
const FRESH = () => ({ ver: 2, equipo: null, reg: null, reg2: null, regId: null, idx: 0, xp: 0, done: [], exam: null, t0: Date.now(), temp: 15, badges: [], perdidos: 0, sesion: Math.random().toString(36).slice(2, 12) });
let S = LS.get("mv-state", null) || FRESH();
/* Migración del curso anterior (un solo formulario largo): se conservan nombre, empresa y contacto */
if (S.reg && S.ver !== 2) {
  if (!S.reg2 && (S.reg.correo || S.reg.telefono)) S.reg2 = { correo: S.reg.correo || "", telefono: S.reg.telefono || "", cargo: S.reg.cargo || "", ciudad: S.reg.ciudad || "", interes: S.reg.interes || "", vendedores: S.reg.vendedores || "" };
  S.ver = 2; S.idx = 1; S.exam = null; S.done = S.done || [];
  LS.set("mv-state", S);
}
const save = () => LS.set("mv-state", S);
let C = null;

function buildC() {
  const r = S.reg; if (!r) return;
  const base = r.rubro === "otro" ? customPreset(r.empresa, r.prod || "su producto o servicio", r.cli) : (PRESETS.find(p => p.id === r.rubro) || PRESETS[0]);
  C = Object.assign({}, base); C.neg = r.empresa || base.neg; C.Cli = cap(C.cli);
  C.hi = `¡Buen día! Le atiende ${r.nombre.split(" ")[0]} de ${C.neg} 😊`;
}
/* Datos completos del alumno (paso 1 + paso 2) */
const REG = () => Object.assign({ cargo: "", correo: "", telefono: "", ciudad: "", vendedores: "", interes: "" }, S.reg || {}, S.reg2 || {});

/* ---------- Contenido de cada letra ---------- */
function lessons() {
  const [n, c] = C.who;
  return [
    { l: "V", t: "Vincular", temp: "Frío", d: `El ${C.cli} llega frío: pregunta el precio y no sabe quién le responde. Su primer trabajo es que sienta que habla con una persona.`,
      do: ["Responda en menos de 5 minutos.", "Salude con su nombre y el del negocio.", "Reconozca la pregunta del precio: \"con gusto le comparto el precio\". Nunca la ignore."],
      ch: [["in", C.open], ["out", C.hi + " Con gusto le comparto el precio."]],
      fact: ["7×", "más probabilidad de lograr la conversación con quien decide si se responde en la primera hora. En una auditoría a 2,241 empresas, el promedio de respuesta fue de 42 horas.", "Oldroyd y col., Harvard Business Review, 2011", "rapidez"],
      q: { ctx: `Son las 8:40 a. m. Entra al WhatsApp de ${C.neg} un mensaje de un número que no tiene guardado.`, p: C.open, q: "¿Cuál es el mejor primer mensaje?",
        o: [C.hi + " Con gusto le comparto el precio.", C.hi + " El precio va desde L [precio], depende de lo que necesite.", "¡Buen día! Con gusto le ayudo 😊 ¿Me regala su nombre y en qué le podemos servir?"],
        cons: ["", `Se presentó bien, pero soltó el número antes de saber qué necesita. El ${C.cli} ya tiene con qué comparar y nada que lo amarre: se va al negocio más barato.`, `Saludó, pero dejó la pregunta del precio sin responder. El ${C.cli} siente que le están sacando la vuelta y contesta a medias o ya no contesta.`],
        res: `El ${C.cli} ve que le responde una persona con nombre y que no le esconden el precio: se abre la conversación.`,
        e: "Se presenta, usa el nombre del negocio y reconoce la pregunta. Así empieza el vínculo." } },
    { l: "E", t: "Explorar", temp: "Frío → tibio", d: `Antes de dar un número, descubra qué necesita resolver el ${C.cli}. Una sola pregunta abierta, sobre su problema o su objetivo.`,
      do: ["Pregunte por la necesidad, no por datos personales todavía.", "Una pregunta por mensaje.", "Escuche: su respuesta le dirá qué ofrecer."],
      ch: [["out", C.probQ], ["in", C.probA]],
      fact: ["430", "personas en un estudio de chat: quienes hicieron preguntas de seguimiento le cayeron mejor a su compañero, porque se percibían más atentos.", "Huang y col., Journal of Personality and Social Psychology, 2017", "preguntas"],
      q: { ctx: `Ya saludó y reconoció la pregunta del precio. El ${C.cli} está en línea esperando.`, p: C.open, q: "¿Qué pregunta hace a continuación?",
        o: [C.probQ, "¿Cuánto tenía pensado invertir en esto?", "¿Me regala su nombre y desde qué ciudad nos escribe?"],
        cons: ["", `Preguntar por el presupuesto antes de entender la necesidad pone al ${C.cli} a la defensiva: dice una cifra baja para protegerse y usted queda amarrado a ella.`, `Es una buena pregunta, pero va después: eso es Conocer. Pedida ahora, sin saber qué necesita, se siente formulario y el ${C.cli} todavía no tiene motivo para dar sus datos.`],
        res: `El ${C.cli} cuenta su caso con sus propias palabras: ahí está lo que de verdad necesita y lo que le va a ofrecer.`,
        e: "Una sola pregunta sobre la necesidad. Varias juntas se sienten como interrogatorio." } },
    { l: "C", t: "Conocer", temp: "Tibio → caliente", d: `Ahora conozca a la persona: nombre, ciudad y, sobre todo, el impacto. ¿Desde cuándo le pasa? ¿Para cuándo lo necesita? Ahí aparece la razón real para comprar.`,
      do: ["Valide lo que siente: \"le entiendo\".", "Pida nombre y ciudad, y úselo 2 o 3 veces.", "Pregunte por el impacto o la fecha que le importa."],
      ch: [["out", "Le entiendo perfectamente 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?"], ["in", `Soy ${n}, de ${c}.`], ["out", `Mucho gusto, ${n}. ${C.impQ}`], ["in", C.impA]],
      fact: ["Su nombre", "En tres experimentos, recordar el nombre de la persona aumentó su disposición a aceptar una solicitud de compra: lo perciben como un cumplido.", "Howard, Gengler y Jain, Journal of Consumer Research, 1995", "nombre"],
      q: { ctx: `El ${C.cli} acaba de abrirse y le contó algo personal sobre su caso.`, p: C.probA, q: "¿Cuál respuesta avanza mejor?",
        o: ["Le entiendo perfectamente, tiene solución 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?", C.ruleBad, "Le entiendo 😊 Déjeme mandarle las opciones que tenemos para que escoja la que más le guste."],
        cons: ["", `Usted resolvió por chat algo que no le toca resolver. Si después le dicen otra cosa, el ${C.cli} siente que le mintieron. ${C.rule}`, `Suena amable, pero le pasó la decisión al ${C.cli}. Acababa de contarle algo personal y, en vez de que lo escucharan, recibió un menú: escoge por precio o no escoge.`],
        res: `El ${C.cli} se siente escuchado y le da su nombre: desde aquí la conversación es entre dos personas, no entre un número y un catálogo.`,
        e: "Valida la emoción y pide datos para personalizar. " + C.rule } },
    { l: "T", t: "Transparentar", temp: "Caliente", d: `Ahora sí: el precio. Conéctelo con lo que el ${C.cli} le contó, dé el precio o rango y la forma de pago. Si pregunta el precio por segunda vez, se da en ese mismo mensaje.`,
      do: ["Repita su motivo con sus palabras.", "Precio o rango claro, sin rodeos.", "Mencione formas de pago si existen."],
      ch: [["in", C.impA], ["out", C.sol]],
      fact: ["Precio primero", "lleva a juzgar si el producto \"vale lo que cuesta\"; el producto primero, a preguntarse si se desea. El precio primero solo ayudó con productos claramente baratos.", "Karmarkar, Shiv y Knutson, Journal of Marketing Research, 2015", "precio"],
      q: { ctx: `Es la segunda vez en el mismo chat que el ${C.cli} le pregunta el precio, y ya le contó para cuándo lo necesita.`, p: C.impA, q: "¿Qué responde?",
        o: [C.sol, "Con gusto. Primero le explico todo lo que incluye y al final le doy el precio 😊", "Para darle el precio más exacto, ¿cuánto tenía pensado invertir?"],
        cons: ["", `Parece buena venta, pero es la segunda vez que pregunta. Mientras usted explica, el ${C.cli} solo busca el número: se salta el mensaje completo y queda con la idea de que le dan vueltas.`, `Devolver la pregunta con otra, y encima sobre dinero, se lee como evasión. El ${C.cli} piensa que el precio cambia según cuánto tenga y pierde la confianza.`],
        res: `El ${C.cli} ya puede decidir: sabe cuánto es, por qué le conviene y cómo pagarlo. Ahí es donde pregunta por horarios.`,
        e: "El precio no se esconde: se da con contexto y conectado a lo que el cliente contó." } },
    { l: "O", t: "Ofrecer", temp: "Cierre", d: `No deje la decisión en el aire. Ofrezca dos opciones concretas de día, hora o forma de entrega, y confirme todo por escrito.`,
      do: ["Dos opciones, no \"cuando usted guste\".", "Confirme día, hora y lugar por escrito.", "Si hay anticipo, explíquelo con calma, como reserva."],
      ch: [["out", C.close], ["in", C.closeA], ["out", C.confirm]],
      fact: ["94", "pruebas en un metaanálisis: un plan concreto de cuándo y dónde actuar aumenta de forma importante el cumplimiento (d = 0.65).", "Gollwitzer y Sheeran, metaanálisis, 2006", "plan"],
      q: { ctx: `El ${C.cli} ya conoce el precio y pregunta por disponibilidad: es la señal de que está listo.`, p: "¿Tienen disponible esta semana?", q: "¿Cuál es el mejor cierre?",
        o: ["Sí 😊 " + C.close, "¡Sí! ¿Qué día y a qué hora le queda mejor a usted?", "Sí, tenemos espacio 😊 Me avisa cuando quiera venir y se lo apartamos."],
        cons: ["", `Suena atento, pero le pasó el trabajo al ${C.cli}. Si no traía una fecha en mente, tiene que ponerse a pensar, y pensar es lo que posterga: no contesta.`, `"Me avisa" deja todo en el aire. Nadie agenda, nadie recuerda, y la conversación se enfría sin que nadie dijera que no.`],
        res: `El ${C.cli} solo tiene que elegir entre dos opciones fáciles, y queda una fecha por escrito a la que usted puede dar seguimiento.`,
        e: "Dos opciones concretas facilitan decidir. \"Me avisa\" deja enfriar al cliente." } },
    { l: "R", t: "Retener", temp: "Después", d: `La venta no termina en el chat. Guarde y etiquete el contacto, recuerde la cita, dé seguimiento a quien no decidió y publique historias para seguir presente.`,
      do: ["Guarde el contacto: nombre · interés · ciudad · fecha.", "Recordatorio un día antes; seguimiento de días 1, 3, 7 y 30.", "De 1 a 3 historias al día, sin saturar."],
      ch: [["ctx", `Contacto guardado: ${n} · ${C.segItem} · ${c}`], ["out", `Guárdenos como ${C.neg} para que le lleguen nuestras novedades 😊`], ["ctx", "Un día antes"], ["out", `Hola, ${n} 😊 Le recordamos su cita de mañana. ¿Nos confirma?`]],
      fact: ["78.6%", "de asistencia con recordatorio por mensaje frente a 67.8% sin recordatorio (7 estudios, 5,841 personas).", "Revisión sistemática Cochrane, 2013", "recordatorio"],
      q: { ctx: `Usted ya dio el precio y ofreció dos horarios. El ${C.cli} no dice ni sí ni no.`, p: "Mmm, lo voy a pensar.", q: "¿Qué responde?",
        o: [`¡Con mucho gusto! Le guardo como ${C.cli} de ${C.neg} para avisarle de novedades. ¿Hay alguna duda que pueda aclararle? 😊`, "Si lo confirma hoy le puedo hacer un mejor precio 😊", "¡Claro que sí! Quedo pendiente, que tenga buen día 😊"],
        cons: ["", `Regaló margen sin saber qué le detenía. Muchos ${C.clis} aprenden que basta con dudar para que baje el precio, y los que iban a comprar igual pagan menos.`, `Es educado, pero se despidió sin averiguar qué lo frenaba ni dejar nada abierto. El ${C.cli} se va con la misma duda con la que llegó y no vuelve.`],
        res: `El ${C.cli} se va sin presión pero queda guardado, ve sus historias y puede volver en días o semanas. Eso es Retener.`,
        e: "Respeta la decisión y asegura el contacto para el seguimiento." } }
  ];
}
function mission() {
  const [n, c] = C.who;
  return [
    { p: C.open, o: [[C.hi + " Con gusto le comparto el precio. " + C.probQ, 1, "Se presentó, no escondió el precio y abrió con una pregunta: el cliente responde."], ["Buen día. Cuesta L [precio].", 0, "Dio el número sin contexto: el cliente se va a comparar."], ["Para precios tiene que venir en persona.", -1, "El cliente siente que le esconden el precio y no vuelve."]] },
    { p: C.probA, o: [["Le entiendo perfectamente, tiene solución 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?", 1, "Validó lo que siente y pidió sus datos en el momento correcto."], ["Ok, entonces cuesta L [precio].", 0, "Contó algo personal y recibió un precio: se siente ignorado."], [C.ruleBad, -1, "Prometió o diagnosticó por chat. " + C.rule]] },
    { p: `Soy ${n}, de ${c}.`, o: [[`Mucho gusto, ${n}. ${C.impQ}`, 1, "Usó su nombre y buscó el impacto: ahí aparece la razón real de compra."], [`Ok ${n}, le esperamos cuando guste.`, 0, "\"Cuando guste\" no es una cita: el cliente se enfría."], [`${n}, hoy hay 20% de descuento si paga ya.`, -1, "Descuento antes de entender la necesidad: parece desesperación."]] },
    { p: C.impA, o: [[C.sol + " " + C.close, 1, "Precio con contexto y dos opciones concretas: así se cierra."], ["Cuesta L [precio]. Cualquier cosa me avisa.", 0, "El precio quedó suelto y la decisión en el aire."], ["Primero venga y ahí le decimos.", -1, "Segunda evasiva del precio: el cliente abandona el chat."]] }
  ];
}
function exam() {
  const [n, c] = C.who;
  const sc = t => `Usted atiende el WhatsApp de ${C.neg}. ${t}`;
  return [
    { l: "V", ctx: sc("Son las 8:40 a. m. y escribe un número nuevo, que no tiene guardado."), chat: C.open, q: "¿Cuál es la mejor primera respuesta?",
      o: [C.hi + " Con gusto le comparto el precio. " + C.probQ, C.hi + " El precio va desde L [precio], depende de lo que necesite.", "¡Buen día! Con gusto le ayudo 😊 ¿Me regala su nombre y desde qué ciudad nos escribe?", C.hi + " Le paso nuestro catálogo con todos los precios para que lo revise 📄"],
      cons: ["", `Se presentó y no escondió el precio, pero cerró sin pregunta. El ${C.cli} ya tiene el número y nada más que hablar: se va a comparar y gana el más barato.`, `Pedir los datos antes de saber qué necesita invierte el orden, y encima su pregunta del precio quedó sin responder.`, `El catálogo parece servicial, pero le entrega veinte precios y ninguna guía. El ${C.cli} no sabe cuál le sirve y deja el chat en visto.`],
      res: `El ${C.cli} sabe con quién habla, ve que no le esconden el precio y cuenta qué necesita.`,
      e: "V + E: se presenta, reconoce la pregunta y abre con la necesidad." },
    { l: "V", ctx: sc("Son las 10:00 a. m., en pleno horario de atención, y entra una consulta de precio."), q: "¿Cuál es la meta de tiempo para responderle?",
      o: ["Menos de 5 minutos", "Menos de 30 minutos, para contestarle bien", "Antes de que termine el día, sin falta", "Juntar varios mensajes y responderlos de corrido"],
      cons: ["", `Media hora suena razonable, pero el ${C.cli} le escribió a tres negocios a la vez. En ese rato otro ya le contestó y le está cotizando: usted llega a competir, no a atender.`, `Para el final del día el ${C.cli} ya decidió. Contestar entonces es entrar a una conversación que alguien más ya cerró.`, `Juntar mensajes es cómodo para usted y caro para el negocio: cada minuto de espera enfría a alguien que escribió con intención de comprar.`],
      res: "Responder en los primeros minutos multiplica la probabilidad de lograr la conversación con quien decide.",
      e: "El cliente escribe a varios negocios a la vez. Responder rápido multiplica las probabilidades de cerrar." },
    { l: "E", ctx: "Entra a trabajar una persona nueva en el equipo y le pregunta qué significa cada letra de VECTOR.", q: "¿Qué significa la E?",
      o: [C.probQ, "¿Cuánto tenía pensado invertir en esto?", "¿Me regala su nombre y desde qué ciudad nos escribe?", "¿Quiere que le mande las opciones que tenemos disponibles?"],
      cons: ["", `Hablar de dinero antes de entender el caso pone al ${C.cli} a la defensiva: dice una cifra baja para protegerse y usted queda amarrado a ella el resto del chat.`, "Es la pregunta correcta en el momento equivocado: eso es Conocer, y va después de Explorar. Pedida ahora se siente formulario.", `Le pasa la decisión al ${C.cli} sin saber qué necesita. Termina escogiendo por precio, que es justo lo que usted quería evitar.`],
      res: "Explorar primero le dice qué ofrecer y por qué le conviene a esa persona en particular.",
      e: "V Vincular, E Explorar, C Conocer, T Transparentar, O Ofrecer, R Retener." },
    { l: "E", ctx: sc(`El ${C.cli} ya contó su necesidad y usted necesita dos datos más para orientarlo.`), chat: C.probA, q: "¿Cuántas preguntas conviene hacer en cada mensaje?",
      o: ["Una sola, y esperar su respuesta", "Dos, para avanzar más rápido en el chat", "Las que hagan falta, pero todas en un mismo mensaje", "Ninguna: darle toda la información de una vez"],
      cons: ["", `Dos parecen pocas, pero en WhatsApp el ${C.cli} contesta solo la última y la primera se pierde. Usted cree que preguntó y quedó a medias.`, "Varias preguntas juntas se leen como interrogatorio. El cliente responde una, ninguna, o pide que mejor le manden el precio.", "Sin preguntas usted ofrece a ciegas: manda lo que usted cree y el cliente no siente que lo escucharon."],
      res: "Una pregunta por mensaje mantiene el ritmo de conversación y casi siempre obtiene respuesta.",
      e: "Una por mensaje. Varias juntas se sienten como interrogatorio." },
    { l: "C", ctx: sc(`El ${C.cli} ya le contó su problema, pero usted todavía no sabe qué tan urgente es.`), chat: C.probA, q: "¿Para qué sirve preguntar \"¿para cuándo lo necesita?\"",
      o: [C.impQ, "¿Cuánto tenía pensado invertir para resolverlo?", "¿Quiere que le mande las opciones que tenemos?", "¿Le gustaría que le reserve algo desde ya?"],
      cons: ["", `Pregunta por dinero cuando el ${C.cli} acaba de contarle algo personal. Corta la confianza, y la cifra que diga será baja para protegerse.`, "Salta de la emoción al catálogo. El cliente deja de hablar de su problema y empieza a comparar precios, que es lo contrario de lo que usted busca.", "Apura el cierre sin saber para cuándo lo necesita. Si todavía no tiene fecha, la propuesta le llega fuera de tiempo y la rechaza."],
      res: "Con la fecha y el motivo usted conecta el precio a algo que le importa, y el cliente deja de verlo como un gasto.",
      e: "El impacto y la fecha son la motivación real. Con eso, el precio se conecta con algo que le importa." },
    { l: "C", ctx: sc(`Un ${C.cli} le describe su caso con detalle y le pide que usted le diga qué tiene y qué necesita.`), chat: C.probA, q: `En ${C.neg}, ¿qué debe hacer quien atiende el WhatsApp?`,
      o: [C.rule, C.ruleBad, "Darle una respuesta aproximada para que no se vaya, y confirmarla después", "Pedirle que mejor llame por teléfono para explicarle con calma"],
      cons: ["", `Resolvió por chat algo que no le toca. Si el profesional dice otra cosa, el ${C.cli} siente que le mintieron y se pierde la venta y la confianza.`, `Es la trampa más común: suena a buen servicio, pero un "más o menos" se queda grabado como promesa. Cuando el dato real no coincide, usted queda mal y el ${C.cli} también.`, `Mover la conversación al teléfono suena atento, pero el ${C.cli} escribió por WhatsApp por algo: está trabajando, está ocupado o le da pena llamar. Muchos no llaman nunca.`],
      res: "Usted orienta, da el siguiente paso concreto y deja la decisión técnica a quien corresponde: el cliente avanza y nadie promete de más.",
      e: "Quien atiende orienta y confirma; nunca promete ni asegura lo que no ha verificado." },
    { l: "T", ctx: sc(`Es la segunda vez en el mismo chat que el ${C.cli} le pregunta cuánto cuesta.`), chat: "¿Pero cuánto me sale al final? 🙏", q: "¿Qué hace?",
      o: ["Le da el precio o rango en ese mismo mensaje y agrega una sola pregunta", "Le explica primero todo lo que incluye y al final le da el precio", "Le da el precio y le pide que pase al negocio para explicarle bien", "Le pregunta su presupuesto para darle una opción a su medida"],
      cons: ["", `Parece buena venta, pero el ${C.cli} ya preguntó dos veces: mientras usted explica, él solo busca el número. Se salta el mensaje y queda con la idea de que le dan vueltas.`, `El precio llegó condicionado a ir al local. El ${C.cli} entiende que el dato de verdad está en otro lado y que este fue incompleto: se queda con la duda.`, "Devolver una pregunta sobre dinero en la segunda insistencia se lee como que el precio depende de cuánto tenga. Es lo que más rápido rompe la confianza."],
      res: `El ${C.cli} obtiene lo que pidió, siente que le hablan claro y sigue conversando con usted.`,
      e: "Esquivar el precio dos veces se siente como evasión y rompe la confianza." },
    { l: "T", ctx: sc(`El ${C.cli} está apurado, escribe desde el trabajo y no quiere que le pregunten nada.`), chat: C.simpleQ, q: "¿Cuál respuesta respeta al cliente?",
      o: [C.simpleR, "¡Claro! Tiene un valor de L [precio] 😊 Cualquier duda, aquí estoy.", "Con gusto, pero déjeme entender bien su caso para no darle un dato equivocado.", "El precio varía según lo que necesite. ¿Me cuenta un poco más y se lo confirmo?"],
      cons: ["", `Respetó la prisa y dio el precio, pero cerró la puerta. Sin una pregunta útil no hay siguiente mensaje: el ${C.cli} dice "gracias" y se va a comparar.`, `Suena profesional, pero el ${C.cli} pidió un número y recibió una condición. Para alguien apurado eso es un trámite, y los trámites se abandonan.`, `Es una evasiva con buenos modales. El ${C.cli} ya dijo que no quiere que le pregunten, y le preguntaron igual sin darle nada a cambio.`],
      res: "Recibe el precio de inmediato, siente que lo respetan, y la única pregunta que le hacen le resulta útil: por eso la contesta.",
      e: "Si piden el precio directo, se da de inmediato con una sola pregunta útil." },
    { l: "O", ctx: sc(`El ${C.cli} ya sabe el precio y ahora pregunta por disponibilidad: está listo para cerrar.`), chat: "¿Tienen disponible esta semana?", q: "¿Cuál es el mejor cierre?",
      o: ["Sí 😊 " + C.close, "¡Sí! ¿Qué día y a qué hora le queda mejor a usted?", "Sí, tenemos espacio 😊 Me avisa cuando quiera venir y se lo apartamos.", "Sí, pero los espacios se llenan rápido. Le recomiendo apartar hoy mismo."],
      cons: ["", `Suena atento y es el error más común: le pasó el trabajo al ${C.cli}. Si no traía fecha en mente, tiene que ponerse a pensar, y pensar es lo que posterga.`, `"Me avisa" deja todo en el aire. Nadie agenda, nadie recuerda, y en dos días la conversación está muerta sin que nadie dijera que no.`, `La urgencia inventada se nota. El ${C.cli} siente presión en lugar de ayuda y se retira aunque le interesara.`],
      res: "El cliente solo elige entre dos opciones fáciles y queda una fecha por escrito que usted puede recordar un día antes.",
      e: "Dos opciones concretas facilitan decidir." },
    { l: "O", ctx: sc("Lleva seis mensajes con un cliente y quiere saber si ya puede ofrecer el cierre."), q: "¿Qué señal indica que ya está listo para cerrar?",
      o: ["Pregunta por horarios, entrega o formas de pago", "Dice que el precio le parece bien", "Responde rápido y con mensajes largos", "Vuelve a escribir después de varios días"],
      cons: ["", "Que el precio le parezca bien no es lo mismo que decidir: muchos lo dicen por cortesía y luego siguen comparando. Falta ver si ya se imagina usándolo.", "Responder rápido y extenso es interés, no decisión. Es señal de que siga explorando, no de que cierre.", "Volver después de días es una segunda oportunidad, no un cierre: toca retomar desde donde quedó, no apurarlo."],
      res: "Cuando pregunta cómo y cuándo, ya decidió por dentro: ofrecerle dos opciones solo le facilita el último paso.",
      e: "Cuando pregunta cómo y cuándo, es momento de ofrecer el cierre." },
    { l: "R", ctx: sc(`Usted ya dio el precio y ofreció dos horarios. El ${C.cli} no dice ni sí ni no.`), chat: "Mmm, lo voy a pensar.", q: "¿Cuál respuesta deja la puerta abierta sin presionar?",
      o: [`¡Con mucho gusto! Le guardo como ${C.cli} para avisarle de novedades. ¿Hay alguna duda que pueda aclararle? 😊`, "Si lo confirma hoy le puedo hacer un mejor precio 😊", "¡Claro que sí! Quedo pendiente, que tenga buen día 😊", "¡Con gusto! ¿Le parece si le escribo mañana para ver qué decidió?"],
      cons: ["", "Regaló margen sin saber qué lo detenía, y enseñó que dudando se consigue descuento.", "Es educado, pero se despidió sin averiguar qué lo frenaba. El cliente se va con la misma duda con la que llegó.", "Agendar el seguimiento está bien, pero deja la duda viva un día más. En 24 horas ya comparó con otros y el motivo real sigue sin resolverse."],
      res: "Se va sin presión pero queda guardado, ve sus historias y puede volver en días o semanas con la duda resuelta.",
      e: "Respeta la decisión y asegura el contacto: eso es Retener." },
    { l: "R", ctx: sc("Un cliente pidió precio hace tres días, le escribió dos veces y no ha vuelto a responder."), q: "¿Cuándo se deja descansar el contacto?",
      o: ["Después de 3 o 4 seguimientos (días 1, 3, 7 y 30) sin respuesta", "Después del segundo mensaje, para no incomodarlo", "Escribiéndole cada semana hasta que conteste algo", "Dejando de escribir y esperando a que vuelva solo"],
      cons: ["", "Dos es quedarse corto: buena parte de las ventas de seguimiento se cierran entre el segundo y el cuarto contacto, justo donde usted se detendría.", "Cada semana sin pausa se siente acoso y termina en bloqueo o reporte de WhatsApp, y ahí pierde el contacto para siempre.", "Esperar es regalar el cliente. Si nadie le recuerda, se queda con el negocio que sí le escribió."],
      res: "Deja de escribir pero no desaparece: si guardó el número, sigue viendo sus historias y puede volver solo.",
      e: "Días 1, 3, 7 y 30 como máximo. Sigue viendo las historias si guardó el número." }
  ];
}

/* ---------- Flujo ---------- */
let FLOW = [];
const DIF_TRAS = { E: 0, T: 1, O: 2 };
function buildFlow() {
  FLOW = [{ k: "reg1" }, { k: "intro" }];
  ORD.forEach((l, i) => {
    FLOW.push({ k: "lesson", i }, { k: "check", i });
    if (l === "C") FLOW.push({ k: "termo" });
    if (l in DIF_TRAS) FLOW.push({ k: "dificil", i: DIF_TRAS[l] });
    if (l === "O") FLOW.push({ k: "orden" });
  });
  FLOW.push({ k: "reg2" }, { k: "mission" }, { k: "examIntro" }, { k: "exam" }, { k: "result" });
}
const LESS = () => lessons();

function topbar() {
  if (!FLOW.length) buildFlow();
  const last = FLOW.length - 1, i = Math.min(S.idx, last);
  const pct = Math.round(i / last * 100);
  $("mvBar").style.width = pct + "%"; $("mvXp").textContent = S.xp + " XP";
  $("mvBadges").textContent = "🏅 " + ((S.badges || []).length);
  setTemp(0);
  const st = $("mvStep"); if (st) st.textContent = `Paso ${i + 1} de ${last + 1}`;
  const ex = $("mvExit"); if (ex) ex.hidden = !S.reg;
  $("mvLetters").querySelectorAll("span").forEach(s => s.classList.toggle("on", S.done.includes(s.dataset.l)));
}
function addXP(n) { S.xp += n; save(); const el = $("mvXp"); el.textContent = S.xp + " XP"; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
function toast(t) { const el = $("mvToast"); el.textContent = t; el.hidden = false; el.classList.remove("show"); void el.offsetWidth; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 2600); }
function go(i) { S.idx = Math.max(0, Math.min(FLOW.length - 1, i)); save(); render(); requestAnimationFrame(() => { const hh = (document.querySelector(".sitehead") || {}).offsetHeight || 64; const r = player.getBoundingClientRect(); if (r.top < hh || r.top > innerHeight * .4) window.scrollTo({ top: scrollY + r.top - hh - 8, behavior: reduce ? "auto" : "smooth" }); }); }
const next = () => go(S.idx + 1);
function bub(box, w, t) { const d = document.createElement("div"); d.className = w === "ctx" ? "mv-ctx" : "mv-b " + w; d.innerHTML = mark(t); box.appendChild(d); box.scrollTop = box.scrollHeight; return d; }
function animateChat(box, items, gap) {
  if (!box || !box.isConnected) return;
  let k = 0; const token = Symbol(); box._t = token;
  const step = () => {
    if (box._t !== token || !box.isConnected || k >= items.length) return;
    const [w, t] = items[k++];
    if (w === "in" && !reduce) { const ty = document.createElement("div"); ty.className = "mv-typing"; ty.innerHTML = "<i></i><i></i><i></i>"; box.appendChild(ty); box.scrollTop = box.scrollHeight; setTimeout(() => { ty.remove(); bub(box, w, t); setTimeout(step, gap); }, 700); }
    else { bub(box, w, t); setTimeout(step, reduce ? 0 : gap); }
  };
  step();
}
/* Lección interactiva: el alumno envía cada mensaje del negocio */
function playLesson(box, items, onDone) {
  if (!box) return;
  let k = 0; const token = Symbol(); box._t = token;
  const step = () => {
    if (box._t !== token || !box.isConnected) return;
    if (k >= items.length) { onDone && onDone(); return; }
    const [w, t] = items[k];
    if (w === "out") {
      const p = document.createElement("div"); p.className = "mv-send";
      p.innerHTML = `<span class="mv-sendl">Su respuesta</span><div class="mv-sendt">${mark(t)}</div><button class="mv-sendb" type="button">Enviar <b>➤</b></button>`;
      box.appendChild(p); box.scrollTop = box.scrollHeight;
      p.querySelector("button").onclick = () => { sfx("envio"); buzz(12); p.remove(); bub(box, "out", t); k++; step(); };
      return;
    }
    if (w === "in" && !reduce) { const ty = document.createElement("div"); ty.className = "mv-typing"; ty.innerHTML = "<i></i><i></i><i></i>"; box.appendChild(ty); box.scrollTop = box.scrollHeight; setTimeout(() => { if (box._t !== token) return; ty.remove(); bub(box, w, t); k++; step(); }, 700); return; }
    bub(box, w, t); k++; step();
  };
  step();
}
const wh = () => `<div class="mv-wa-head"><span class="mv-av">${esc(C.neg.charAt(0))}</span><div><b>${esc(C.neg)}</b><small>WhatsApp Business</small></div></div>`;

/* Efecto de la respuesta sobre el cliente. Si llega a cero, se va: se cuenta y vuelve tibio. */
function efecto(ok) {
  setTemp(ok ? 20 : -24);
  sfx(ok ? "bien" : "mal"); buzz(ok ? 14 : [30, 50, 30]);
  if (S.temp > 0) return "";
  S.perdidos = (S.perdidos || 0) + 1; save();
  sfx("perdido");
  setTimeout(() => setTemp(25), 1400);
  return `<div class="mv-perdido"><b>😕 El ${esc(C.cli)} se fue</b><p>Con esa respuesta la conversación se enfrió del todo. Pasa en la vida real y no se avisa: simplemente dejan de contestar.</p><small>Le mandamos otro ${esc(C.cli)}. Va ${S.perdidos} perdido${S.perdidos === 1 ? "" : "s"}.</small></div>`;
}

/* Retroalimentación: qué pasa si responde así, qué se pudo hacer y por qué */
function fbHTML(ok, q, k, extra) {
  if (ok) return `<div class="mv-fb ok"><b>¡Correcto!${extra || ""}</b>${q.res ? `<p class="mv-rz"><span>Lo que pasa con el cliente</span>${esc(q.res)}</p>` : ""}<p class="mv-rz why"><span>Por qué funciona</span>${esc(q.e)}</p></div>`;
  const cons = (q.cons && q.cons[k]) || "";
  return `<div class="mv-fb bad"><b>No es la mejor opción</b>
    ${cons ? `<p class="mv-rz bad"><span>El resultado de responder así</span>${esc(cons)}</p>` : ""}
    <p class="mv-rz best"><span>Qué se pudo hacer</span>${mark(q.o[0])}</p>
    <p class="mv-rz why"><span>Por qué funciona</span>${esc(q.e)}</p></div>`;
}

function render() {
  if (!FLOW.length) buildFlow();
  const f = FLOW[S.idx] || FLOW[0];
  if (f.k !== "reg1" && !S.reg) { S.idx = 0; save(); return render(); }
  if (f.k !== "reg1" && f.k !== "reg2" && FLOW.findIndex(x => x.k === "reg2") < S.idx && !S.reg2) { S.idx = FLOW.findIndex(x => x.k === "reg2"); save(); }
  const g = FLOW[S.idx];
  if (g.k !== "reg1") buildC();
  topbar();
  screen.className = "mv-screen in";
  ({ reg1: rReg1, intro: rIntro, lesson: rLesson, check: rCheck, termo: rTermo, dificil: rDificil, orden: rOrden, reg2: rReg2, mission: rMission, examIntro: rExamIntro, exam: rExam, result: rResult })[g.k](g);
  pulso(g.k, S.idx);
  requestAnimationFrame(() => screen.classList.add("on"));
}

/* ---------- Paso 1: tres datos y arranca ---------- */
const RUBROS = PRESETS.map(p => [p.id, p.emoji + " " + p.label]).concat([["otro", "✨ Otro negocio"]]);
function rReg1() {
  const r = LS.get("mv-draft", {});
  const eq = S.equipo;
  const opt = (arr, v) => arr.map(([k, l]) => `<option value="${esc(k)}"${k === v ? " selected" : ""}>${esc(l)}</option>`).join("");
  screen.innerHTML = `<div class="mv-reg">
    <div class="mv-reg-tx"><span class="eyebrow">Paso 1 de ${FLOW.length} · ${eq ? "10 segundos" : "20 segundos"}</span>
      <h2>${eq ? "Bienvenido al equipo" : "Empecemos"}</h2>
      ${eq ? `<div class="mv-eqbox"><b>${esc(eq.empresa)}</b><span>${esc(eq.jefe_nombre)} inscribió a su equipo, así que los ejemplos del curso ya vienen ajustados a su negocio.</span></div>
        <p>Solo escriba su nombre para empezar. Sus datos de contacto se piden más adelante, cuando ya haya avanzado.</p>`
      : `<p>Solo tres datos para que el curso use ejemplos de <b>su</b> negocio. Sus datos de contacto se piden más adelante, cuando ya haya avanzado.</p>`}
      <ul class="mv-ul"><li>6 lecciones donde usted escribe y envía las respuestas</li><li>Tres clientes difíciles y 8 insignias</li><li>Examen con casos reales y certificado imprimible</li></ul>
      <p class="mv-note">Sin correo ni teléfono para empezar.</p></div>
    <form class="mv-form short" id="mvForm" novalidate>
      <div class="mv-f full"><label for="f-nombre">Su nombre completo</label><input id="f-nombre" autocomplete="name" maxlength="80" value="${esc(r.nombre || "")}" placeholder="Ej. María Rodríguez"></div>
      ${eq ? "" : `<div class="mv-f full"><label for="f-empresa">Nombre de la empresa o negocio</label><input id="f-empresa" autocomplete="organization" maxlength="100" value="${esc(r.empresa || "")}" placeholder="Ej. Comercial Los Pinos"></div>
      <div class="mv-f full"><label for="f-rubro">Tipo de negocio</label><select id="f-rubro"><option value="">Seleccione…</option>${opt(RUBROS, r.rubro)}</select></div>
      <div class="mv-f full" id="f-otro" hidden><label for="f-prod">¿Qué producto o servicio le preguntan más?</label><input id="f-prod" maxlength="50" value="${esc(r.prod || "")}" placeholder="Ej. el plan de internet"></div>`}
      <p class="mv-err" id="mvErr" hidden></p>
      <button class="btn" type="submit" id="mvGo">Empezar el curso →</button>
    </form></div>`;
  if (!eq) {
    const rub = $("f-rubro"), otro = $("f-otro");
    const upd = () => (otro.hidden = rub.value !== "otro"); rub.onchange = upd; upd();
    const ids = ["nombre", "empresa", "rubro", "prod"];
    $("mvForm").oninput = () => { const d = LS.get("mv-draft", {}); ids.forEach(i => (d[i] = $("f-" + i).value)); LS.set("mv-draft", d); };
  } else {
    $("mvForm").oninput = () => { const d = LS.get("mv-draft", {}); d.nombre = $("f-nombre").value; LS.set("mv-draft", d); };
  }
  $("mvForm").onsubmit = e => {
    e.preventDefault();
    const v = id => { const el = $("f-" + id); return el ? el.value.trim() : ""; };
    const reg = eq
      ? { nombre: v("nombre"), empresa: eq.empresa, rubro: eq.rubro, prod: eq.prod || "", cli: "cliente" }
      : { nombre: v("nombre"), empresa: v("empresa"), rubro: v("rubro"), prod: v("prod"), cli: "cliente" };
    const err = $("mvErr");
    const bad = !reg.nombre || reg.nombre.length < 3 ? "nombre" : !reg.empresa ? "empresa" : !reg.rubro ? "rubro" : reg.rubro === "otro" && reg.prod.length < 3 ? "prod" : "";
    if (bad) { err.hidden = false; err.textContent = { nombre: "Escriba su nombre completo.", empresa: "Escriba el nombre de su empresa o negocio.", rubro: "Elija el tipo de negocio.", prod: "Escriba el producto o servicio que más le preguntan." }[bad]; const f = $("f-" + bad); f && f.focus(); return; }
    S = Object.assign(FRESH(), { reg, equipo: eq }); save(); buildC(); buildFlow();
    track("ViewContent", { content_name: "Metodología VECTOR · inicio" });
    burst(); next();
  };
}

/* ---------- Paso 2: contacto, justo antes del examen ---------- */
function rReg2() {
  const r = Object.assign({}, LS.get("mv-draft", {}), S.reg2 || {});
  const opt = (arr, v) => arr.map(([k, l]) => `<option value="${esc(k)}"${k === v ? " selected" : ""}>${esc(l)}</option>`).join("");
  screen.innerHTML = `<div class="mv-reg">
    <div class="mv-reg-tx"><span class="eyebrow">Paso ${S.idx + 1} de ${FLOW.length} · Ya completó las 6 letras</span><h2>¿A nombre de quién va el certificado?</h2>
      <p>Terminó las seis lecciones con <b>${S.xp} XP</b>. Para emitir su certificado de Vector Academy y enviarle su resultado, necesitamos dos datos.</p>
      <ul class="mv-ul"><li>Su nombre va impreso: <b>${esc(S.reg.nombre)}</b></li><li>El certificado se descarga en alta resolución para imprimir</li><li>Le enviamos su resultado y las respuestas para repasar</li></ul></div>
    <form class="mv-form" id="mvForm2" novalidate>
      <div class="mv-f"><label for="f-correo">Correo <i>*</i></label><input id="f-correo" type="email" autocomplete="email" inputmode="email" maxlength="120" value="${esc(r.correo || "")}" placeholder="nombre@empresa.com"></div>
      <div class="mv-f"><label for="f-tel">Teléfono / WhatsApp <i>*</i></label><input id="f-tel" type="tel" autocomplete="tel" inputmode="tel" maxlength="20" value="${esc(r.telefono || "")}" placeholder="Ej. 9876-5432"></div>
      <div class="mv-f"><label for="f-cargo">Cargo <small>(va en el certificado)</small></label><input id="f-cargo" autocomplete="organization-title" maxlength="80" value="${esc(r.cargo || "")}" placeholder="Ej. Vendedora, recepción, gerente"></div>
      <div class="mv-f"><label for="f-ciudad">Ciudad</label><input id="f-ciudad" autocomplete="address-level2" maxlength="60" value="${esc(r.ciudad || "")}" placeholder="Ej. San Pedro Sula"></div>
      ${S.equipo ? "" : `<div class="mv-f full"><label for="f-int">¿Qué le interesa? <i>*</i></label><select id="f-int">${opt([["", "Seleccione…"], ["Solo aprender por mi cuenta", "Solo aprender por mi cuenta"], ["Capacitación presencial para mi equipo", "Capacitación presencial para mi equipo"], ["Capacitación en línea para mi equipo", "Capacitación en línea para mi equipo"], ["Asesoría de marketing y ventas", "Asesoría de marketing y ventas"]], r.interes)}</select></div>`}
      <input class="mv-hp" id="f-web" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p class="mv-err" id="mvErr" hidden></p>
      <label class="mv-ok"><input type="checkbox" id="f-ok" ${r.ok ? "checked" : ""}><span>Acepto que Vector Marketing &amp; Academy me contacte sobre mi resultado y sus capacitaciones.</span></label>
      <button class="btn" type="submit" id="mvGo2">Emitir mi certificado y hacer el examen →</button>
      <button class="mv-link" type="button" id="mvBack2">← Volver a repasar las letras</button>
    </form></div>`;
  const ids = { correo: "correo", tel: "telefono", cargo: "cargo", ciudad: "ciudad", int: "interes" };
  $("mvForm2").oninput = () => { const d = LS.get("mv-draft", {}); Object.entries(ids).forEach(([f, k]) => { const el = $("f-" + f); if (el) d[k] = el.value; }); d.ok = $("f-ok").checked; LS.set("mv-draft", d); };
  $("mvBack2").onclick = () => go(S.idx - 1);
  $("mvForm2").onsubmit = async e => {
    e.preventDefault();
    const v = id => $("f-" + id).value.trim();
    const reg2 = { correo: v("correo").toLowerCase(), telefono: v("tel"), cargo: v("cargo"), ciudad: v("ciudad"), interes: S.equipo ? "Capacitación de equipo · " + S.equipo.empresa : v("int"), vendedores: "" };
    const err = $("mvErr");
    const bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reg2.correo) ? "correo" : reg2.telefono.replace(/\D/g, "").length < 8 ? "tel" : !reg2.interes ? "int" : !$("f-ok").checked ? "ok" : "";
    if (bad) { err.hidden = false; err.textContent = { correo: "Revise su correo.", tel: "Escriba un teléfono de 8 dígitos.", int: "Díganos qué le interesa.", ok: "Marque la casilla para continuar." }[bad]; const f = $("f-" + bad); f && f.focus(); return; }
    const btn = $("mvGo2"); btn.disabled = true; btn.textContent = "Preparando su examen…";
    S.reg2 = reg2; save();
    const rub = RUBROS.find(x => x[0] === S.reg.rubro);
    if (ENDPOINT) { try { const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.assign({ tipo: "registro", equipo: (S.equipo && S.equipo.codigo) || "" }, REG(), { rubro: rub ? rub[1].replace(/^\S+\s/, "") + (S.reg.rubro === "otro" ? ": " + S.reg.prod : "") : S.reg.rubro, web: $("f-web").value, origen: location.href })) }); const j = await res.json().catch(() => ({})); if (res.ok) S.regId = j.id || null; save(); } catch (x) {} }
    track("Lead", { content_name: "Metodología VECTOR" });
    burst(); next();
  };
}

function rIntro() {
  const first = S.reg.nombre.split(" ")[0];
  screen.innerHTML = `<div class="mv-intro"><span class="eyebrow">Bienvenido, ${esc(first)}</span><h2>Así va a vender ${esc(C.neg)} por WhatsApp</h2>
  <p class="mv-lead">Vamos a recorrer las 6 letras de <b>VECTOR</b> con chats de ${C.id === "otro" ? "su negocio" : esc(C.label.toLowerCase())}. En cada letra usted <b>envía las respuestas</b> y resuelve un reto. Gane XP, desbloquee las letras y al final haga el examen.</p>
  <div class="mv-road">${LESS().map((x, i) => `<div class="mv-rs" style="--i:${i}"><b>${x.l}</b><span>${x.t}</span></div>`).join("")}<div class="mv-rs fin" style="--i:6"><b>🏆</b><span>Examen</span></div></div>
  <div class="mv-reglas"><h3>Cómo se juega</h3><ul>
    <li><b>Usted escribe.</b> En cada lección toca Enviar para mandar la respuesta del negocio.</li>
    <li><b>El cliente se enfría o se calienta.</b> El termómetro de arriba sube con cada acierto y baja con cada error. Si llega a cero, el cliente se va.</li>
    <li><b>Tres clientes difíciles.</b> El apurado, el regateador y la urgencia. Cada uno tiene su insignia.</li>
    <li><b>8 insignias y un certificado.</b> Las que gane quedan impresas en su certificado.</li>
  </ul></div>
  <div class="mv-mini3"><div><b>⏱️</b><span>12 minutos</span></div><div><b>🏅</b><span>8 insignias</span></div><div><b>🎓</b><span>Certificado imprimible</span></div></div>
  ${nav("Empezar con la V →")}</div>`;
  wireNav();
}
function nav(label, cls) { return `<div class="mv-nav">${S.idx > 1 ? `<button class="btn ghost" type="button" data-back>← Atrás</button>` : ""}<button class="btn ${cls || ""}" type="button" data-next>${label}</button></div>`; }
function wireNav() { const b = screen.querySelector("[data-back]"), n = screen.querySelector("[data-next]"); b && (b.onclick = () => go(S.idx - 1)); n && (n.onclick = next); }

function rLesson(f) {
  const x = LESS()[f.i];
  screen.innerHTML = `<div class="mv-lesson">
   <div class="mv-lx"><div class="mv-big">${x.l}</div><span class="eyebrow">Letra ${f.i + 1} de 6 · Temperatura: ${esc(x.temp)}</span><h2>${x.t}</h2><p>${esc(x.d)}</p>
     <ul class="mv-do">${x.do.map((d, k) => `<li style="--k:${k}">${esc(d)}</li>`).join("")}</ul>
     <div class="mv-fact"><b>${esc(x.fact[0])}</b><span>${esc(x.fact[1])}</span><small>${esc(x.fact[2])} · <a href="#ev-${x.fact[3]}">Ver el estudio y cómo citarlo</a></small></div></div>
   <div class="mv-phone"><div class="mv-hint">Toque <b>Enviar</b> para responderle al ${esc(C.cli)}</div>${wh()}<div class="mv-thread" id="mvT"></div></div></div>
   <div id="mvLn"></div>`;
  playLesson($("mvT"), x.ch, () => {
    $("mvLn").innerHTML = nav("Entendido, ponerme a prueba →");
    wireNav();
    screen.querySelector("[data-next]").onclick = () => { if (!S["read" + f.i]) { S["read" + f.i] = 1; addXP(10); } next(); };
  });
}
function rCheck(f) {
  const x = LESS()[f.i], q = x.q, order = shuffle([0, 1, 2]), reloj = f.i === 0;
  screen.innerHTML = `<div class="mv-check"><span class="eyebrow">Reto rápido · ${x.l} · ${x.t}</span>
   ${q.ctx ? `<p class="mv-ctxline">${esc(q.ctx)}</p>` : ""}
   ${reloj ? `<div class="mv-reloj" id="mvReloj"><i></i><b>El ${esc(C.cli)} está en línea. Conteste rápido.</b></div>` : ""}
   <div class="mv-phone sm">${wh()}<div class="mv-thread" id="mvT"><div class="mv-b in">${mark(q.p)}</div></div></div>
   <h2>${esc(q.q)}</h2><div class="mv-opts">${order.map((k, n) => `<button type="button" class="mv-opt" data-k="${k}"><span class="mv-lt">${"ABC"[n]}</span><span>${mark(q.o[k])}</span></button>`).join("")}</div><div id="mvFb"></div></div>`;
  const t0 = Date.now(), th = $("mvT"); let tarde = false, tmr = null, r = null;
  if (reloj) {
    r = $("mvReloj"); const barra = r.querySelector("i");
    requestAnimationFrame(() => { barra.style.transition = "width 8s linear"; barra.style.width = "0%"; });
    tmr = setTimeout(() => {
      if (!r.isConnected) return;
      tarde = true; r.classList.add("tarde"); r.querySelector("b").textContent = "Se tardó. Así se siente del otro lado:";
      bub(th, "in", "¿Hola? 😕 Ya me respondieron de otro lado.");
      setTemp(-10); sfx("mal");
    }, 8000);
  }
  screen.querySelectorAll(".mv-opt").forEach(b => b.onclick = () => {
    clearTimeout(tmr);
    const k = +b.dataset.k, ok = k === 0, seg = (Date.now() - t0) / 1000;
    screen.querySelectorAll(".mv-opt").forEach(o => { o.disabled = true; if (+o.dataset.k === 0) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
    if (ok) addXP(20); else b.classList.add("shake");
    if (reloj) { r.querySelector("i").style.transition = "none"; if (ok && !tarde && seg < 8) darInsignia("rayo"); }
    const perdido = efecto(ok);
    const first = !S.done.includes(x.l);
    if (first) { S.done.push(x.l); save(); topbar(); setTimeout(() => { burst(); toast(`¡Letra ${x.l} desbloqueada! ${S.done.length}/6`); }, 250); }
    $("mvFb").innerHTML = perdido + fbHTML(ok, q, k, ok ? " +20 XP" : "") + nav(f.i < 5 ? `Siguiente: ${LESS()[f.i + 1].l} →` : "Seguir →");
    wireNav();
  });
}

/* ---------- Clientes difíciles: tres personajes con una decisión cada uno ---------- */
function dificiles() {
  return [
    { id: "apurado", emoji: "⏱️", nombre: "El apurado", desc: `Escribe desde el trabajo, no quiere preguntas y quiere el número ya.`,
      ch: [["in", C.simpleQ]], q: "¿Qué le responde?",
      o: [C.simpleR, "¡Claro! Tiene un valor de L [precio] 😊 Cualquier duda, aquí estoy.", "Con gusto, pero déjeme entender su caso para no darle un dato equivocado."],
      cons: ["", `Le dio el precio y cerró la puerta. Sin una pregunta útil no hay siguiente mensaje: el ${C.cli} agradece y se va a comparar.`, `Pidió un número y recibió una condición. Para alguien apurado eso es un trámite, y los trámites se abandonan.`],
      fin: [["in", C.simpleA], ["out", C.simpleF]],
      res: `Le dio el precio de una vez, así que se sintió respetado, y la única pregunta que le hizo le resultaba útil: por eso la contestó.`,
      e: "Al apurado se le da el precio de inmediato y se le hace una sola pregunta que a él le sirva." },
    { id: "regateador", emoji: "💰", nombre: "El regateador", desc: `Ya le dio el precio y le acaba de decir que en otro lado está más barato.`,
      ch: [["in", C.caroQ], ["out", C.caroE], ["in", C.caroA]], q: "¿Qué le responde?",
      o: [C.payR, "Le puedo dejar un precio especial si lo confirma hoy 😊", "Es que la calidad se paga, nosotros no somos los más baratos."],
      cons: ["", `Bajó el precio sin saber qué lo detenía. Aprende que dudando consigue descuento, y los que iban a pagar completo también se enteran.`, `Suena a reproche. El ${C.cli} siente que le están diciendo que no sabe comprar y se va con el otro, aunque sea peor.`],
      fin: [["in", "Mmm… tiene razón. ¿Cuándo puedo ir?"], ["out", C.close]],
      res: `No bajó el precio: cambió la conversación de "cuánto cuesta" a "qué incluye", y cerró con una fecha concreta.`,
      e: "Al regateador no se le baja el precio: se le explica qué incluye y se le facilita el pago, sin regalar margen." },
    { id: "urgencia", emoji: "🚨", nombre: "La urgencia", desc: `Escribe angustiado y necesita una solución hoy mismo.`,
      ch: [["in", C.urgQ]], q: "¿Qué le responde?",
      o: [C.urgR, "Con gusto le ayudamos. El servicio tiene un valor de L [precio] 😊", "Lo entiendo. Déjeme revisar y en un ratito le confirmo."],
      cons: ["", `Está angustiado y lo primero que recibe es un precio. Siente que al negocio le importa más cobrar que ayudarlo.`, `"En un ratito" a alguien con una urgencia se le hace eterno. Mientras espera, escribe a otro negocio que sí le contestó con algo concreto.`],
      fin: [["in", C.urgA], ["out", C.urgClose]],
      res: `Primero reconoció la urgencia y pidió solo lo necesario para actuar. El ${C.cli} sintió que alguien ya estaba resolviendo su problema.`,
      e: "En una urgencia primero se calma y se actúa; el precio va después, junto con la solución concreta." }
  ];
}
function rDificil(f) {
  const d = dificiles()[f.i], order = shuffle([0, 1, 2]);
  screen.innerHTML = `<div class="mv-dif">
   <div class="mv-cab"><span class="eyebrow">Cliente difícil ${f.i + 1} de 3</span>
     <div class="mv-difh"><span class="mv-difem">${d.emoji}</span><div><h2>${esc(d.nombre)}</h2><p>${esc(d.desc)}</p></div></div></div>
   <div class="mv-phone tall">${wh()}<div class="mv-thread" id="mvT"></div></div>
   <div class="mv-dec"><h3>${esc(d.q)}</h3><div class="mv-opts">${order.map((k, n) => `<button type="button" class="mv-opt" data-k="${k}"><span class="mv-lt">${"ABC"[n]}</span><span>${mark(d.o[k])}</span></button>`).join("")}</div><div id="mvFb"></div></div></div>`;
  const th = $("mvT");
  animateChat(th, d.ch, 600);
  screen.querySelectorAll(".mv-opt").forEach(b => b.onclick = () => {
    const k = +b.dataset.k, ok = k === 0;
    screen.querySelectorAll(".mv-opt").forEach(o => { o.disabled = true; if (+o.dataset.k === 0) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
    bub(th, "out", d.o[k]);
    if (ok) { addXP(25); darInsignia(d.id); } else b.classList.add("shake");
    const perdido = efecto(ok);
    if (ok) setTimeout(() => animateChat(th, d.fin, 600), 500);
    $("mvFb").innerHTML = perdido + fbHTML(ok, d, k, ok ? " +25 XP" : "") + nav("Seguir →");
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
/* Drill: ordenar una conversación completa en el orden VECTOR */
function rOrden() {
  const [n] = C.who;
  const steps = [
    ["V", "Saludo con mi nombre y el del negocio", C.hi + " Con gusto le comparto el precio."],
    ["E", "Pregunto qué necesita resolver", C.probQ],
    ["C", "Pido su nombre y para cuándo lo necesita", `¿Me regala su nombre? ${C.impQ}`],
    ["T", "Doy el precio con contexto", C.sol],
    ["O", "Cierro con dos opciones concretas", C.close]
  ];
  screen.innerHTML = `<div class="mv-orden">
   <div class="mv-cab"><span class="eyebrow">Drill · Arme la conversación</span><h2>Ponga los cinco mensajes en orden</h2>
     <p class="mv-lead">Toque las tarjetas en el orden en que las enviaría. Si se equivoca, le decimos qué falta antes.</p></div>
   <div class="mv-phone tall">${wh()}<div class="mv-thread" id="mvT"><div class="mv-b in">${mark(C.open)}</div></div></div>
   <div class="mv-dec"><div class="mv-chips" id="mvCh">${shuffle(steps.map((s, i) => i)).map(i => `<button type="button" class="mv-chip" data-i="${i}"><b>${steps[i][0]}</b><span>${esc(steps[i][1])}</span></button>`).join("")}</div>
     <div id="mvOf"></div></div></div>`;
  const th = $("mvT"); let k = 0, fallos = 0;
  const fin = () => { burst(); if (!fallos) darInsignia("orden"); $("mvCh").innerHTML = ""; $("mvOf").innerHTML = `<div class="mv-fb ok"><b>¡Conversación completa!</b><p class="mv-rz"><span>Lo que pasa con el cliente</span>Llegó frío preguntando precio y se va con una cita por escrito. Ese es el camino VECTOR de principio a fin.</p></div>` + nav("Seguir con la R →"); wireNav(); };
  screen.querySelectorAll(".mv-chip").forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    if (i !== k) { fallos++; sfx("mal"); b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 500); $("mvOf").innerHTML = `<div class="mv-fb bad"><b>Todavía no</b><p class="mv-rz bad"><span>El resultado de enviarlo así</span>Si manda eso ahora, se salta la letra <b>${steps[k][0]}</b> y el cliente recibe un mensaje que no corresponde a lo que acaba de escribir.</p><p class="mv-rz best"><span>Qué va primero</span>${steps[k][0]} · ${esc(steps[k][1])}</p></div>`; return; }
    b.remove(); sfx("envio"); bub(th, "out", steps[i][2]); addXP(10); k++;
    if (k < steps.length) { $("mvOf").innerHTML = `<div class="mv-fb ok"><b>Bien · +10 XP</b><p>${esc(steps[i][0])} listo. Siguen ${steps.length - k} mensajes.</p></div>`; setTimeout(() => bub(th, "ctx", "El cliente responde y la conversación avanza…"), 400); }
    else fin();
  });
}
function rMission() {
  const M = mission(); let k = 0, good = 0;
  screen.innerHTML = `<div class="mv-mission">
   <div class="mv-cab"><span class="eyebrow">Misión final · 4 mensajes</span><h2>Atienda a un cliente de principio a fin</h2><p>Responda cada mensaje. Mire cómo sube o baja la temperatura.</p>
     <div class="mv-gauge"><div><i id="mvG"></i></div><span>Frío</span><span>Caliente</span></div></div>
   <div class="mv-phone tall">${wh()}<div class="mv-thread" id="mvT"></div></div>
   <div class="mv-dec"><div id="mvMo"></div></div></div>`;
  const th = $("mvT"); let temp = 10;
  const setG = () => ($("mvG").style.width = Math.max(5, Math.min(100, temp)) + "%");
  const ask = () => {
    const st = M[k];
    animateChat(th, [["in", st.p]], 0);
    setTimeout(() => {
      if (!th.isConnected) return;
      $("mvMo").innerHTML = `<div class="mv-opts">${shuffle([0, 1, 2]).map((i, n) => `<button type="button" class="mv-opt" data-i="${i}"><span class="mv-lt">${"ABC"[n]}</span><span>${mark(st.o[i][0])}</span></button>`).join("")}</div>`;
      $("mvMo").querySelectorAll(".mv-opt").forEach(b => b.onclick = () => {
        const o = st.o[+b.dataset.i]; bub(th, "out", o[0]);
        temp += o[1] === 1 ? 23 : o[1] === 0 ? 4 : -12; setG();
        sfx(o[1] === 1 ? "bien" : "mal"); setTemp(o[1] === 1 ? 12 : o[1] === 0 ? 0 : -10);
        if (o[1] === 1) { good++; addXP(15); } else bub(th, "ctx", o[1] === 0 ? "El cliente tarda en responder…" : "Visto ✓✓ · aquí el cliente se enfría");
        const best = st.o[0];
        $("mvMo").innerHTML = `<div class="mv-fb ${o[1] === 1 ? "ok" : "bad"}"><b>${o[1] === 1 ? "¡Bien! +15 XP" : "No es la mejor opción"}</b>
          <p class="mv-rz ${o[1] === 1 ? "" : "bad"}"><span>El resultado de responder así</span>${esc(o[2])}</p>
          ${o[1] === 1 ? "" : `<p class="mv-rz best"><span>Qué se pudo hacer</span>${mark(best[0])}</p><p class="mv-rz why"><span>Por qué funciona</span>${esc(best[2])}</p>`}</div>
          <button class="btn" type="button" id="mvMn">${k < M.length - 1 ? "Siguiente mensaje →" : "Ver resultado de la misión"}</button>`;
        $("mvMn").onclick = () => { k++; if (k < M.length) ask(); else end(); };
      });
    }, reduce ? 50 : 900);
  };
  const end = () => { if (good === M.length) burst(); $("mvMo").innerHTML = `<div class="mv-fb ${good >= 3 ? "ok" : "bad"}"><b>${good} de ${M.length} respuestas ideales</b><p>${good === M.length ? "Cliente caliente y con cita. ¡Está listo para el examen!" : "Buen intento. En el examen aplique cada letra en orden."}</p></div>${nav("Ir al examen →")}`; wireNav(); };
  setG(); ask();
}
function rExamIntro() {
  screen.innerHTML = `<div class="mv-intro center"><div class="mv-trophy">🏆</div><span class="eyebrow">Último paso</span><h2>Examen de certificación</h2><p class="mv-lead">12 casos reales de ${C.id === "otro" ? "su negocio" : esc(C.label.toLowerCase())}. Cada pregunta le dice la situación completa antes de preguntarle qué haría. Con 70% o más obtiene su certificado.</p>
   <div class="mv-mini3"><div><b>12</b><span>casos con contexto</span></div><div><b>3 min</b><span>aproximado</span></div><div><b>70%</b><span>para aprobar</span></div></div>${nav("Empezar el examen →")}</div>`;
  wireNav();
  screen.querySelector("[data-next]").onclick = () => { const E = exam(); S.exam = { order: shuffle(E.map((_, i) => i)), i: 0, ok: 0, miss: [], t0: Date.now(), streak: 0, best: 0 }; save(); next(); };
}
function rExam() {
  const E = exam(), X = S.exam; if (!X) return go(S.idx - 1);
  if (X.i >= E.length) return next();
  const qi = X.order[X.i], q = E[qi], idx = shuffle(q.o.map((_, k) => k));
  screen.innerHTML = `<div class="mv-exam"><div class="mv-eh"><span class="mv-pill">Pregunta ${X.i + 1} de ${E.length}</span><span class="mv-pill">✓ ${X.ok}</span><span class="mv-pill">🔥 ${X.streak}</span><span class="mv-pill lt">${q.l}</span></div>
   <div class="mv-ebar"><i style="width:${X.i / E.length * 100}%"></i></div>
   <p class="mv-ctxline"><b>La situación:</b> ${esc(q.ctx)}</p>
   ${q.chat ? `<div class="mv-phone sm">${wh()}<div class="mv-thread"><div class="mv-b in">${mark(q.chat)}</div></div></div>` : ""}
   <h2>${esc(q.q)}</h2><div class="mv-opts">${idx.map((k, n) => `<button type="button" class="mv-opt" data-k="${k}"><span class="mv-lt">${"ABCD"[n]}</span><span>${mark(q.o[k])}</span></button>`).join("")}</div><div id="mvFb"></div></div>`;
  screen.querySelectorAll(".mv-opt").forEach(b => b.onclick = () => {
    const k = +b.dataset.k, ok = k === 0;
    screen.querySelectorAll(".mv-opt").forEach(o => { o.disabled = true; if (+o.dataset.k === 0) o.classList.add("right"); else if (o === b) o.classList.add("wrong"); });
    if (ok) { X.ok++; X.streak++; X.best = Math.max(X.best, X.streak); addXP(25); if (X.streak >= 5) darInsignia("racha"); } else { X.streak = 0; b.classList.add("shake"); X.miss.push({ letra: q.l, situacion: q.ctx, pregunta: q.q, eligio: q.o[k], consecuencia: (q.cons && q.cons[k]) || "", correcta: q.o[0], comoMejorar: q.e }); }
    X.i++; save();
    const perdido = efecto(ok);
    if (X.i >= E.length && X.ok === E.length) darInsignia("perfecto");
    $("mvFb").innerHTML = perdido + fbHTML(ok, q, k, ok ? (X.streak >= 3 ? ` ¡Racha de ${X.streak}! 🔥` : " +25 XP") : "") + `<div class="mv-nav"><button class="btn" type="button" id="mvEn">${X.i < E.length ? "Siguiente caso →" : "Ver mi resultado"}</button></div>`;
    $("mvEn").onclick = () => (X.i < E.length ? render() : next());
  });
}
function level(p) { return p >= 90 ? ["Experto VECTOR", "#0E9A60"] : p >= 70 ? ["Vendedor certificado", "#6A3BF5"] : p >= 50 ? ["En camino", "#E89B0C"] : ["Necesita repasar", "#E0169B"]; }
function rResult() {
  const X = S.exam, n = exam().length, p = Math.round(X.ok / n * 100), [lv, col] = level(p), secs = Math.round((Date.now() - X.t0) / 1000), pass = p >= 70;
  const r = REG();
  if (!X.sent) {
    X.sent = 1; save();
    if (ENDPOINT) fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tipo: "examen", registro_id: S.regId, equipo: (S.equipo && S.equipo.codigo) || "", nombre: r.nombre, empresa: r.empresa, cargo: r.cargo, correo: r.correo, telefono: r.telefono, ciudad: r.ciudad, rubro: C.label + (r.rubro === "otro" ? ": " + r.prod : ""), vendedores: r.vendedores, interes: r.interes, correctas: X.ok, total: n, nivel: lv, segundos: secs, falladas: X.miss, origen: location.href }) }).catch(() => {});
    track("MetodologiaVectorExamen", { score: p, nivel: lv }, true);
    if (pass) setTimeout(burst, 300);
  }
  const waTxt = `Hola Vector Academy, terminé el curso de la Metodología VECTOR.\n${r.nombre} · ${r.empresa}\nResultado: ${X.ok}/${n} (${p}%) · ${lv}\nMe interesa: ${r.interes}`;
  const share = `https://wa.me/?text=${encodeURIComponent("Les recomiendo este curso gratuito de atención y ventas por WhatsApp de Vector Academy. Dura menos de 10 minutos: " + location.origin + location.pathname)}`;
  screen.innerHTML = `<div class="mv-result">
   <div class="mv-score"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="bg"/><circle cx="60" cy="60" r="52" class="fg" style="stroke:${col};stroke-dashoffset:${327 - 327 * p / 100}"/></svg><div><b>${X.ok}/${n}</b><small>${p}%</small></div></div>
   <div class="mv-rt"><span class="eyebrow">${pass ? "¡Aprobado!" : "Resultado"}</span><h2>${esc(lv)}</h2><p>${pass ? `Felicidades, ${esc(r.nombre.split(" ")[0])}. Ya domina la Metodología VECTOR. Descargue su certificado, imprímalo y cuélguelo.` : "Le faltó poco. Repase los casos marcados y vuelva a intentarlo."} · ${S.xp} XP · ${Math.floor(secs / 60)} min ${secs % 60} s</p></div>
   <div class="mv-insig"><b>Insignias · ${(S.badges || []).length} de ${INSIGNIAS.length}</b><div class="mv-insg">${INSIGNIAS.map(([id, em, nom, d]) => `<div class="mv-ins${(S.badges || []).includes(id) ? " on" : ""}" title="${esc(d)}"><span>${em}</span><small>${esc(nom)}</small></div>`).join("")}</div>${S.perdidos ? `<small class="mv-perd">Clientes perdidos en el camino: ${S.perdidos}</small>` : `<small class="mv-perd ok">No perdió un solo cliente 👏</small>`}</div>
   ${pass ? `<div class="mv-certbox" id="mvCertBox"><div class="mv-certload">Preparando su certificado…</div></div>` : ""}
   ${X.miss.length ? `<div class="mv-miss"><b>Para repasar</b>${X.miss.map(m => `<div><span class="mv-lt">${m.letra}</span><p>${esc(m.pregunta)}<small>${esc(m.comoMejorar)}</small></p></div>`).join("")}</div>` : ""}
   <div class="mv-actions">
     ${pass ? `<button class="btn" type="button" id="mvCert">🎓 Descargar certificado (PNG)</button><button class="btn light" type="button" id="mvPrint">🖨️ Imprimir certificado</button>` : `<button class="btn" type="button" id="mvRetry">Repetir el examen</button>`}
     <a class="btn ghost" href="pdf-placeholder" download id="mvPdf">📄 Descargar la metodología (PDF)</a>
     <a class="btn ghost" href="${share}" target="_blank" rel="noopener">Compartir con mi equipo por WhatsApp</a>
   </div>
   <div class="mv-upsell"><div><span class="eyebrow">Para su equipo</span><h3>Lleve la Metodología VECTOR a toda su empresa</h3><p>Capacitación práctica con casos reales de su negocio: presencial en Vector Academy, en sus instalaciones o en línea. Incluye inspección de chats y plan de mejora.</p></div>
     <a class="btn" href="https://wa.me/${WA}?text=${encodeURIComponent(waTxt)}" target="_blank" rel="noopener" id="mvWa">Quiero capacitar a mi equipo</a></div>
   <div class="mv-endnav"><button class="mv-link" type="button" id="mvRestart">Volver a tomar el curso</button><button class="mv-link" type="button" id="mvOther">Registrar a otra persona</button><a class="mv-link" href="/">Ir al inicio del sitio</a></div></div>`;
  $("mvPdf").href = location.pathname.replace(/\/?$/, "/") + "metodologia-vector.pdf";
  $("mvWa").onclick = () => track("Contact", { content_name: "Capacitación VECTOR" });
  if (pass) {
    certCanvas(r, X.ok, n, p, lv, (S.badges || []).length).then(cv => {
      const url = cv.toDataURL("image/png");
      $("mvCertBox").innerHTML = `<img src="${url}" alt="Certificado en Atención al Cliente, Método VECTOR, a nombre de ${esc(r.nombre)}"><small>Listo para imprimir en hoja horizontal (A4 o carta).</small>`;
      $("mvCert").onclick = () => { certDownload(cv, r.nombre); track("MetodologiaVectorCertificado", {}, true); };
      $("mvPrint").onclick = () => certPrint(url);
    });
  }
  $("mvRetry") && ($("mvRetry").onclick = () => { S.exam = null; save(); go(FLOW.findIndex(f => f.k === "examIntro")); });
  $("mvRestart").onclick = () => { S = Object.assign(FRESH(), { reg: S.reg, reg2: S.reg2, regId: S.regId, badges: S.badges || [] }); save(); go(1); };
  $("mvOther").onclick = resetAll;
}

function resetAll() {
  if (!confirm("Se borrará el avance de esta persona en esta computadora para empezar un registro nuevo. ¿Continuar?")) return;
  LS.del("mv-state"); LS.del("mv-draft");
  S = FRESH(); C = null; buildFlow(); go(0);
}

/* ---------- Certificado premium imprimible ---------- */
const CERT_FONTS = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&display=swap";
let fontsReady = null;
function loadCertFonts() {
  if (fontsReady) return fontsReady;
  if (!document.querySelector('link[data-certfont]')) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = CERT_FONTS; l.setAttribute("data-certfont", "1"); document.head.appendChild(l); }
  const want = document.fonts ? Promise.all(['700 80px "Playfair Display"', '500 40px "Playfair Display"', '400 60px Anton', '800 40px Manrope'].map(f => document.fonts.load(f).catch(() => {}))) : Promise.resolve();
  fontsReady = Promise.race([want, new Promise(r => setTimeout(r, 2500))]);
  return fontsReady;
}
const img = src => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; });
function folio(name) { let h = 2166136261; for (const ch of String(name)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } const d = new Date(); const p = x => String(x).padStart(2, "0"); return `VA-MV-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${String(h % 100000).padStart(5, "0")}`; }
function lsp(x, t, cx, y, sp, align) { const ch = [...String(t)]; const w = ch.reduce((a, c) => a + x.measureText(c).width + sp, 0) - sp; let px = align === "left" ? cx : cx - w / 2; const prev = x.textAlign; x.textAlign = "left"; ch.forEach(c => { x.fillText(c, px, y); px += x.measureText(c).width + sp; }); x.textAlign = prev; return w; }
function wrapLines(x, t, max) { const ws = String(t).split(" "); const out = []; let c = ""; ws.forEach(w => { const n = c ? c + " " + w : w; if (x.measureText(n).width > max && c) { out.push(c); c = w; } else c = n; }); if (c) out.push(c); return out; }
function fitText(x, t, max, px, mk) { let s = px; x.font = mk(s); while (x.measureText(t).width > max && s > 24) { s -= 2; x.font = mk(s); } return s; }

async function certCanvas(r, ok, n, p, lv, insignias) {
  await loadCertFonts();
  const W = 2480, H = 1754, cv = document.createElement("canvas"); cv.width = W; cv.height = H; const x = cv.getContext("2d");
  const INK = "#140A3C", MUT = "#5B5280", GOLD = "#B4933F", PUR = "#3A0CC9";
  /* papel */
  x.fillStyle = "#FDFCF8"; x.fillRect(0, 0, W, H);
  const warm = x.createRadialGradient(W / 2, H * .42, 100, W / 2, H * .42, W * .75);
  warm.addColorStop(0, "rgba(255,255,255,1)"); warm.addColorStop(1, "rgba(243,239,230,1)"); x.fillStyle = warm; x.fillRect(0, 0, W, H);
  /* marco exterior con la marca */
  const band = x.createLinearGradient(0, 0, W, H); band.addColorStop(0, "#2C02A4"); band.addColorStop(.5, "#7B4DFF"); band.addColorStop(1, "#E0169B");
  x.fillStyle = band; x.fillRect(0, 0, W, 26); x.fillRect(0, H - 26, W, 26); x.fillRect(0, 0, 26, H); x.fillRect(W - 26, 0, 26, H);
  /* doble filete dorado */
  x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(78, 78, W - 156, H - 156);
  x.lineWidth = 2; x.strokeRect(100, 100, W - 200, H - 200);
  /* ornamento de esquinas: arcos finos */
  x.save(); x.strokeStyle = "rgba(180,147,63,.55)"; x.lineWidth = 2;
  [[100, 100, 1, 1], [W - 100, 100, -1, 1], [100, H - 100, 1, -1], [W - 100, H - 100, -1, -1]].forEach(([cx0, cy0, sx, sy]) => {
    for (let k = 0; k < 7; k++) { const rr = 70 + k * 22; x.beginPath(); x.arc(cx0, cy0, rr, 0, Math.PI * 2); x.save(); x.beginPath(); x.rect(Math.min(cx0, cx0 + sx * 230), Math.min(cy0, cy0 + sy * 230), 230, 230); x.clip(); x.beginPath(); x.arc(cx0, cy0, rr, 0, Math.PI * 2); x.stroke(); x.restore(); }
  });
  x.restore();
  /* logo */
  const logo = await img("/img/logo-morado.png");
  const logoTop = 136; let logoBot = logoTop + 232;
  if (logo) { let lw = 300, lh = lw * logo.height / logo.width; if (lh > 240) { lh = 240; lw = lh * logo.width / logo.height; } x.drawImage(logo, W / 2 - lw / 2, logoTop, lw, lh); logoBot = logoTop + lh; }
  x.textAlign = "center"; x.textBaseline = "alphabetic";
  /* la línea de marca arranca siempre debajo del logo, nunca encima */
  const eyeY = logoBot + 56;
  x.fillStyle = MUT; x.font = '600 30px Manrope, sans-serif';
  lsp(x, "VECTOR MARKETING & ACADEMY · SAN PEDRO SULA, HONDURAS", W / 2, eyeY, 5);
  /* divisor con rombo */
  const div = (y, w) => { x.strokeStyle = GOLD; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - w, y); x.lineTo(W / 2 - 16, y); x.moveTo(W / 2 + 16, y); x.lineTo(W / 2 + w, y); x.stroke(); x.fillStyle = GOLD; x.save(); x.translate(W / 2, y); x.rotate(Math.PI / 4); x.fillRect(-7, -7, 14, 14); x.restore(); };
  div(eyeY + 42, 360);
  /* título */
  x.fillStyle = INK; x.font = '400 150px Anton, Impact, sans-serif'; lsp(x, "CERTIFICADO", W / 2, eyeY + 192, 10);
  x.fillStyle = PUR; x.font = '800 46px Manrope, sans-serif'; lsp(x, "EN ATENCIÓN AL CLIENTE", W / 2, eyeY + 260, 9);
  x.fillStyle = MUT; x.font = '500 34px Manrope, sans-serif'; x.fillText("Se otorga el presente certificado a", W / 2, 770);
  /* nombre */
  x.fillStyle = INK; const ns = fitText(x, r.nombre, W - 700, 132, s => `700 ${s}px "Playfair Display", Georgia, serif`);
  x.fillText(r.nombre, W / 2, 900);
  x.strokeStyle = "rgba(20,10,60,.18)"; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 560, 936); x.lineTo(W / 2 + 560, 936); x.stroke();
  x.fillStyle = MUT; x.font = '600 32px Manrope, sans-serif';
  x.fillText([r.cargo, r.empresa].filter(Boolean).join(" · "), W / 2, 986, W - 600);
  /* cuerpo */
  x.fillStyle = "#3A3360"; x.font = '400 34px Manrope, sans-serif';
  const body = `por haber completado y aprobado el curso de atención y ventas por WhatsApp con el Método VECTOR — Vincular, Explorar, Conocer, Transparentar, Ofrecer y Retener — obteniendo una calificación de ${p}% (${ok} de ${n} respuestas correctas)${insignias ? `, ${insignias} de 8 insignias de práctica` : ""} y la distinción de ${lv}.`;
  const lineas = wrapLines(x, body, W - 860);
  lineas.forEach((ln, i) => x.fillText(ln, W / 2, 1046 + i * 47));
  /* sello: baja según cuántas líneas haya ocupado el cuerpo, sin chocar con la firma */
  const scx = W / 2, R = 112;
  const scy = Math.min(1372, Math.max(1316, 1046 + (lineas.length - 1) * 47 + 160));
  const sg = x.createLinearGradient(scx - R, scy - R, scx + R, scy + R); sg.addColorStop(0, "#2C02A4"); sg.addColorStop(.55, "#7B4DFF"); sg.addColorStop(1, "#E0169B");
  x.beginPath(); x.arc(scx, scy, R, 0, Math.PI * 2); x.fillStyle = sg; x.fill();
  x.beginPath(); x.arc(scx, scy, R - 14, 0, Math.PI * 2); x.strokeStyle = "rgba(255,255,255,.6)"; x.lineWidth = 3; x.stroke();
  x.beginPath(); x.arc(scx, scy, R + 16, 0, Math.PI * 2); x.strokeStyle = GOLD; x.lineWidth = 4; x.stroke();
  x.fillStyle = "#fff"; x.font = '700 18px Manrope, sans-serif'; lsp(x, "MÉTODO", scx, scy - 46, 5);
  x.font = '400 56px Anton, Impact, sans-serif'; lsp(x, "VECTOR", scx, scy + 14, 3);
  x.font = '700 19px Manrope, sans-serif'; lsp(x, "ACADEMY", scx, scy + 58, 6);
  /* pie: fecha, folio y firma */
  const fecha = new Date().toLocaleDateString("es-HN", { day: "numeric", month: "long", year: "numeric" });
  const yb = 1540;
  x.textAlign = "center"; x.strokeStyle = "rgba(20,10,60,.3)"; x.lineWidth = 2;
  x.beginPath(); x.moveTo(300, yb); x.lineTo(900, yb); x.stroke();
  x.beginPath(); x.moveTo(W - 900, yb); x.lineTo(W - 300, yb); x.stroke();
  x.fillStyle = INK; x.font = '500 40px "Playfair Display", Georgia, serif'; x.fillText("Edgardo A. López", 600, yb - 20);
  x.font = '600 26px Manrope, sans-serif'; x.fillStyle = MUT; x.fillText("Director · Vector Marketing & Academy", 600, yb + 46);
  x.fillStyle = INK; x.font = '600 32px Manrope, sans-serif'; x.fillText(fecha, W - 600, yb - 20);
  x.font = '600 26px Manrope, sans-serif'; x.fillStyle = MUT; x.fillText("San Pedro Sula, Honduras", W - 600, yb + 46);
  x.font = '500 23px Manrope, sans-serif'; x.fillStyle = "#8A82AC";
  lsp(x, `FOLIO ${folio(r.nombre + r.correo)} · estudiovector.com/metodologia-vector`, W / 2, H - 128, 3);
  return cv;
}
function certDownload(cv, nombre) { cv.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `Certificado Atencion al Cliente - Metodo VECTOR - ${nombre}.png`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }, "image/png"); }
function certPrint(url) {
  const w = window.open("", "_blank"); if (!w) { toast("Permita las ventanas emergentes para imprimir."); return; }
  w.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Certificado · Método VECTOR</title><style>@page{size:A4 landscape;margin:0}html,body{margin:0;background:#fff}img{width:100%;height:auto;display:block}</style></head><body><img src="${url}" alt="Certificado"></body></html>`);
  w.document.close();
  const go2 = () => { try { w.focus(); w.print(); } catch (e) {} };
  w.addEventListener ? w.addEventListener("load", go2) : setTimeout(go2, 800); setTimeout(go2, 1200);
  track("MetodologiaVectorCertificado", {}, true);
}

/* Confeti */
function burst() {
  if (reduce) return; const cv = $("mvConfetti"); if (!cv) return;
  const W = cv.width = innerWidth, H = cv.height = innerHeight, x = cv.getContext("2d"), cols = ["#E0169B", "#7B4DFF", "#3A0CC9", "#22D3EE", "#FFC94D"];
  const ps = Array.from({ length: 140 }, () => ({ x: W / 2 + (Math.random() - .5) * 200, y: H * .45, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, s: 5 + Math.random() * 6, c: cols[Math.random() * 5 | 0], a: Math.random() * 6 }));
  let f = 0; (function t() { x.clearRect(0, 0, W, H); ps.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.a += .15; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); x.restore(); }); if (++f < 120) requestAnimationFrame(t); else x.clearRect(0, 0, W, H); })();
}

/* Pulso anónimo de avance: sin nombre, correo ni teléfono. Solo sirve para ver
   en qué pantalla abandona la gente y poder arreglarla. */
let ultPulso = "";
function pulso(k, i) {
  if (!ENDPOINT || !S.sesion) return;
  const id = k + ":" + i; if (id === ultPulso) return; ultPulso = id;
  try {
    const body = JSON.stringify({ tipo: "paso", sesion: S.sesion, paso: k, indice: i, total: FLOW.length, rubro: (S.reg && S.reg.rubro) || "", origen: location.href });
    if (navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "text/plain;charset=UTF-8" }));
    else fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch (e) {}
}

buildFlow();
if (S.reg) buildC();

/* Enlace de equipo: ?equipo=CODIGO llena empresa y rubro antes de que empiece el curso */
function cargarEquipo() {
  if (!EQ_PARAM || !EP) return Promise.resolve();
  if (S.equipo && S.equipo.codigo === EQ_PARAM) return Promise.resolve();
  if (S.reg) return Promise.resolve();  /* ya iba avanzando: no se le cambia el negocio a media marcha */
  screen.className = "mv-screen in on";
  screen.innerHTML = `<p class="mv-cargando">Abriendo el curso de su equipo…</p>`;
  return fetch(EP, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tipo: "equipo_info", equipo: EQ_PARAM, origen: location.href }) })
    .then(r => r.json())
    .then(j => { if (j && j.ok && j.equipo) { S.equipo = j.equipo; save(); } })
    .catch(() => {});
}

/* ---------- Crear el equipo de una empresa ---------- */
(function () {
  const f = $("eqForm"); if (!f) return;
  const sel = $("e-rubro"), otro = $("e-otro");
  sel.insertAdjacentHTML("beforeend", RUBROS.map(([k, l]) => `<option value="${esc(k)}">${esc(l)}</option>`).join(""));
  const upd = () => (otro.hidden = sel.value !== "otro"); sel.onchange = upd; upd();
  f.onsubmit = async e => {
    e.preventDefault();
    const v = id => $("e-" + id).value.trim();
    const err = $("eqErr"), btn = $("eqGo");
    const d = { tipo: "equipo", empresa: v("empresa"), rubro: v("rubro"), prod: v("prod"), nombre: v("nombre"), correo: v("correo").toLowerCase(), telefono: v("tel"), origen: location.href };
    const bad = d.empresa.length < 2 ? "empresa" : !d.rubro ? "rubro" : d.rubro === "otro" && d.prod.length < 3 ? "prod" : d.nombre.length < 3 ? "nombre" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo) ? "correo" : "";
    if (bad) { err.hidden = false; err.textContent = { empresa: "Escriba el nombre de su empresa.", rubro: "Elija el tipo de negocio.", prod: "Escriba el producto o servicio que más les preguntan.", nombre: "Escriba su nombre.", correo: "Revise su correo." }[bad]; $("e-" + bad).focus(); return; }
    if (!ENDPOINT) { err.hidden = false; err.textContent = "Los equipos solo se pueden crear desde estudiovector.com."; return; }
    err.hidden = true; btn.disabled = true; btn.textContent = "Creando su equipo…";
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "No se pudo crear el equipo.");
      const wa = "https://wa.me/?text=" + encodeURIComponent(`Les comparto el curso gratuito de atención y ventas por WhatsApp que vamos a hacer en ${d.empresa}. Toma unos 12 minutos y da certificado: ${j.enlace}`);
      f.hidden = true;
      const listo = $("eqListo"); listo.hidden = false;
      listo.innerHTML = `<div class="eq-ok">
        <h3>🎉 El equipo de ${esc(d.empresa)} está listo</h3>
        <p>Le mandamos todo esto a <b>${esc(d.correo)}</b>, para que no lo pierda.</p>
        <div class="eq-bloque"><span class="eyebrow">1 · Reparta este enlace a su gente</span>
          <div class="eq-link"><input id="eqU1" readonly value="${esc(j.enlace)}"><button class="btn" type="button" data-copia="eqU1">Copiar</button></div>
          <a class="btn light" href="${wa}" target="_blank" rel="noopener">${ICONWA}Compartir por WhatsApp</a></div>
        <div class="eq-bloque"><span class="eyebrow">2 · Guarde su tablero de resultados</span>
          <p class="eq-p">Este es privado: no se lo pase al equipo.</p>
          <div class="eq-link"><input id="eqU2" readonly value="${esc(j.panel)}"><button class="btn" type="button" data-copia="eqU2">Copiar</button></div>
          <a class="btn light" href="${j.panel}">Abrir mi tablero</a></div>
        <p class="mv-note">Código del equipo: <b>${esc(j.codigo)}</b>. Cada vez que alguien de su equipo apruebe, le llega el resultado a su correo.</p></div>`;
      listo.querySelectorAll("[data-copia]").forEach(b => b.onclick = async () => {
        const i = $(b.dataset.copia);
        try { await navigator.clipboard.writeText(i.value); } catch (x) { i.select(); try { document.execCommand("copy"); } catch (y) {} }
        b.textContent = "¡Copiado!"; setTimeout(() => (b.textContent = "Copiar"), 1800);
      });
      listo.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      track("Lead", { content_name: "Equipo Metodología VECTOR" });
      burst();
    } catch (x) {
      err.hidden = false; err.textContent = String(x.message || x);
      btn.disabled = false; btn.textContent = "Crear el equipo de mi empresa →";
    }
  };
})();

const sndBtn = $("mvSnd");
if (sndBtn) {
  const pinta = () => { sndBtn.textContent = SND ? "🔊" : "🔇"; sndBtn.setAttribute("aria-pressed", String(SND)); sndBtn.title = SND ? "Silenciar el curso" : "Activar el sonido"; };
  pinta();
  sndBtn.onclick = () => { SND = !SND; LS.set("mv-snd", SND); pinta(); if (SND) sfx("bien"); };
}
const exitBtn = $("mvExit"); if (exitBtn) exitBtn.onclick = resetAll;
cargarEquipo().then(render);

})();
