const advices = [ 
  { 
    "id": 1, 
    "categoria": "Comida", 
    "titulo": "Alimentación de cachorros de perro", 
    "subtitulo": "Cómo estructurar raciones y evitar errores comunes en el primer año", 
    "nombreUsuario": "VetExpert", 
    "descripcionCorta": "Dar pienso específico para cachorros 3 veces al día.", 
    "descripcionLarga": "Durante el crecimiento, los cachorros necesitan un aporte energético y proteico superior, repartido en pequeñas raciones para evitar problemas digestivos y picos de glucosa. Elegir un pienso específico para cachorros ayuda a equilibrar nutrientes esenciales como DHA, calcio y fósforo. Divide la alimentación en 3–4 tomas al día durante los primeros 6–8 meses, ajustando la cantidad según el peso objetivo de adulto. Prioriza piensos para cachorros con proteínas de alta calidad y evita dietas caseras improvisadas sin supervisión profesional. Introduce nuevos alimentos de forma gradual (transición de 7 días) para prevenir diarreas. Mantén horarios regulares, agua fresca disponible, y evita premios calóricos excesivos. Consulta al veterinario ante cambios de apetito, vómitos o diarreas recurrentes.", 
    "datosExtra": "Evitar cambios bruscos de dieta. No dar leche ni huesos cocidos." 
  }, 
  { 
    "id": 2, 
    "categoria": "Higiene", 
    "titulo": "Baño seguro para gatos", 
    "subtitulo": "Cuándo, cómo y con qué productos higienizar sin generar estrés", 
    "nombreUsuario": "CatLover", 
    "descripcionCorta": "Usar champú especial y poca frecuencia.", 
    "descripcionLarga": "La mayoría de los gatos no necesitan baños frecuentes, pero algunos casos (dermatitis, suciedad puntual, razas de pelo largo) lo requieren. La clave es reducir el estrés y utilizar productos específicos felinos. Usa champú para gatos sin perfumes intensos y agua templada. Prepara el entorno con toallas y una alfombra antideslizante. Moja lentamente evitando cabeza y oídos; limpia con paño húmedo estas zonas. Enjuaga por completo para eliminar residuos de champú y seca con toalla, finalizando con un secador en modo tibio a distancia si el gato lo tolera. Limita los baños a cada 2–3 meses en casos puntuales y refuerza el grooming diario con cepillado para reducir bolas de pelo.", 
    "datosExtra": "Evitar baños innecesarios. Usar feromonas sintéticas si el gato es muy nervioso." 
  }, 
  { 
    "id": 3, 
    "categoria": "Accesorios", 
    "titulo": "Collares y arneses seguros para perros", 
    "subtitulo": "Elegir el sistema de sujeción adecuado según actividad y morfología", 
    "nombreUsuario": "DogTrainer", 
    "descripcionCorta": "Elegir collares con cierre de seguridad.", 
    "descripcionLarga": "Un arnés bien ajustado reduce tensión cervical y mejora el control durante paseos. Los collares con cierre de seguridad son útiles en entornos controlados, pero no para tirones intensos. Para paseos largos y perros que tiran, prioriza arneses tipo H o Y con acolchado en pecho y espalda. Ajusta de forma que entren dos dedos entre la correa y el cuerpo. Evita collares de ahogo o púas. Para identificación, usa collar ligero con chapa y microchip actualizado. Revisa hebillas y costuras cada mes, y reemplaza el accesorio si aparecen desgastes o el ajuste se desregula con facilidad.", 
    "datosExtra": "Evitar collares de castigo. Supervisar el uso en cachorros." 
  }, 
  { 
    "id": 4, 
    "categoria": "Comida", 
    "titulo": "Premios saludables para perros y gatos", 
    "subtitulo": "Qué snacks elegir y cómo usarlos sin romper la dieta", 
    "nombreUsuario": "HealthyPets", 
    "descripcionCorta": "Evitar dar chocolate o dulces.", 
    "descripcionLarga": "Los premios deben complementar, no sustituir, la dieta. Un uso excesivo provoca sobrepeso y desequilibrios nutricionales. Elige snacks bajos en calorías y sin azúcar. Para perros, trozos pequeños de manzana sin semillas o zanahoria cruda funcionan bien. Para gatos, snacks ricos en proteína y taurina. Limita los premios al 10% de la ingesta calórica diaria y úsalos para reforzar conductas deseadas. Evita chocolate, cebolla, ajo, uvas y xilitol. Si el animal está en plan de pérdida de peso, sustituye premios por refuerzo social (juego, caricias).", 
    "datosExtra": "Consultar calorías en etiquetas. Premiar solo conductas deseadas." 
  }, 
  { 
    "id": 5, 
    "categoria": "Higiene", 
    "titulo": "Cepillado regular en perros", 
    "subtitulo": "Rutina por tipo de pelaje para reducir nudos y muda", 
    "nombreUsuario": "PetCareTips", 
    "descripcionCorta": "Cepillar al menos 2 veces por semana.", 
    "descripcionLarga": "Un cepillado constante mejora la salud de la piel, reduce la caída y permite detectar parásitos o lesiones tempranas. Perros de pelo corto: guante de goma 2–3 veces por semana para retirar pelo muerto. Pelo medio: cepillo de púas suaves y peinado en capas, mínimo 3 veces/semana. Pelo largo: cepillo dematting y acondicionador en spray, a diario si hay tendencia a nudos. Revisa zonas conflictivas (detrás de orejas, axilas, ingles). Termina con paño húmedo para retirar polvo y aplica un acondicionador sin aclarado si el pelaje está muy seco.", 
    "datosExtra": "Evitar cepillos metálicos sin protección. Supervisar en cachorros." 
  }, 
  { 
    "id": 6, 
    "categoria": "Accesorios", 
    "titulo": "Juguetes resistentes para masticadores", 
    "subtitulo": "Materiales y tamaños adecuados para seguridad y durabilidad", 
    "nombreUsuario": "JuguetesCaninos", 
    "descripcionCorta": "Usar juguetes de goma para perros grandes.", 
    "descripcionLarga": "Los juguetes de baja calidad pueden romperse y generar riesgo de ingestión. Elegir materiales adecuados evita accidentes y mantiene el interés. Para perros grandes o masticadores intensos, usa juguetes de goma natural o nylon reforzado. Evita pelotas demasiado pequeñas que puedan tragarse. Reemplaza juguetes con grietas o trozos sueltos. Alterna texturas (cuerdas, kong rellenable) para estimulación mental. En gatos, combina pelotas ligeras, varitas con plumas y rascadores con superficies variadas. Supervisa sesiones de juego y guarda los juguetes dañados.", 
    "datosExtra": "Evitar juguetes con piezas pequeñas. Supervisar siempre el juego." 
  }, 
  { 
    "id": 7, 
    "categoria": "Comida", 
    "titulo": "Hidratación adecuada en verano", 
    "subtitulo": "Cómo asegurar que tu mascota beba suficiente agua", 
    "nombreUsuario": "VetHydra", 
    "descripcionCorta": "Cambiar el agua al menos 2 veces al día.", 
    "descripcionLarga": "Durante los meses de calor, es fundamental asegurarse de que nuestras mascotas tengan acceso constante a agua limpia y fresca. Los perros y gatos pueden deshidratarse rápidamente, especialmente si pasan tiempo al aire libre. Se recomienda colocar varios bebederos en diferentes zonas de la casa, usar fuentes automáticas para gatos que prefieren el agua en movimiento, y llevar siempre una botella de agua durante los paseos. También se puede añadir un poco de caldo sin sal al agua para incentivar la hidratación. Si notas encías secas, letargo o pérdida de elasticidad en la piel, consulta al veterinario de inmediato. La hidratación es clave para el buen funcionamiento renal, la digestión y la regulación térmica. En gatos mayores o con problemas urinarios, el agua fresca y accesible puede prevenir infecciones y cálculos.", 
    "datosExtra": "Ideal usar fuentes automáticas para gatos. Evitar exposición prolongada al sol." 
  }, 
  { 
    "id": 8, 
    "categoria": "Higiene", 
    "titulo": "Gestión de la arena de gatos", 
    "subtitulo": "Elección, limpieza y colocación para minimizar olores", 
    "nombreUsuario": "GatoZen", 
    "descripcionCorta": "Cambiar la arena cada 2 días.", 
    "descripcionLarga": "Una buena gestión de la bandeja de arena es clave para la salud y el bienestar de los gatos. Se recomienda usar arena aglomerante de grano medio, que facilita la limpieza diaria. La bandeja debe colocarse en un lugar tranquilo, alejado de la comida y el agua. Es importante retirar los residuos sólidos y aglomerados al menos una vez al día y hacer un cambio completo de arena cada 7–10 días. Si hay varios gatos, se recomienda una bandeja por gato más una adicional. El uso de arenas con carbón activo puede ayudar a controlar los olores. También es importante limpiar la bandeja con agua caliente y jabón neutro semanalmente. Evita productos con olores fuertes que puedan desagradar al gato. Una bandeja limpia no solo mejora la higiene, sino que también previene problemas de comportamiento como la micción fuera del arenero.", 
    "datosExtra": "Evitar arenas perfumadas si el gato muestra rechazo. Limpiar la bandeja con agua caliente y jabón neutro semanalmente." 
  }, 
  { 
    "id": 9, 
    "categoria": "Accesorios", 
    "titulo": "Camas ortopédicas para perros mayores", 
    "subtitulo": "Cómo mejorar descanso y aliviar articulaciones", 
    "nombreUsuario": "SeniorDogCare", 
    "descripcionCorta": "Elegir camas acolchadas para perros mayores.", 
    "descripcionLarga": "Los perros mayores suelen desarrollar problemas articulares como artritis o displasia de cadera, lo que hace que el descanso sea fundamental para su calidad de vida. Las camas ortopédicas, especialmente las que incluyen espuma viscoelástica, ayudan a distribuir el peso del cuerpo y reducir los puntos de presión. Estas camas deben colocarse en lugares cálidos, alejados de corrientes de aire, y contar con fundas lavables para mantener la higiene. También es recomendable que tengan bordes bajos para facilitar el acceso. Algunos modelos incluyen calefacción o materiales térmicos que ayudan a aliviar el dolor en las articulaciones. Una buena cama puede mejorar el sueño, reducir la rigidez matutina y prevenir la formación de callos.", 
    "datosExtra": "Revisar que la cama tenga base antideslizante. Ideal para perros con artrosis o displasia." 
  }, 
  { 
    "id": 10, 
    "categoria": "Comida", 
    "titulo": "Frutas y verduras seguras para mascotas", 
    "subtitulo": "Opciones saludables y cómo ofrecerlas correctamente", 
    "nombreUsuario": "NutriMascotas", 
    "descripcionCorta": "Dar manzana o plátano en pequeñas cantidades.", 
    "descripcionLarga": "Las frutas y verduras pueden ser un excelente complemento en la dieta de perros y, en menor medida, de gatos. Algunas opciones seguras para perros incluyen manzana (sin semillas), plátano, zanahoria, calabaza cocida y pepino. Estas aportan fibra, vitaminas y antioxidantes. Para gatos, se pueden ofrecer pequeñas cantidades de calabaza cocida o guisantes, aunque su dieta debe seguir siendo principalmente carnívora. Es importante introducir estos alimentos de forma gradual y observar cualquier reacción adversa. Evita alimentos tóxicos como uvas, pasas, cebolla, ajo, aguacate y tomate verde. Las frutas deben darse como premio ocasional, no como sustituto del alimento principal.", 
    "datosExtra": "Lavar bien las frutas. Evitar frutas con hueso o semillas grandes." 
  }, 
  { 
    "id": 11, 
    "categoria": "Higiene", 
    "titulo": "Corte de uñas seguro en mascotas", 
    "subtitulo": "Frecuencia, herramientas y señales de alerta", 
    "nombreUsuario": "PatasFelices", 
    "descripcionCorta": "Cortar uñas cada 3–4 semanas.", 
    "descripcionLarga": "El corte de uñas es una parte esencial del cuidado de perros y gatos. Las uñas largas pueden causar dolor, alterar la postura y provocar lesiones. Se recomienda cortarlas cada 3–4 semanas, dependiendo del nivel de actividad del animal. Utiliza un cortaúñas específico para mascotas y evita cortar demasiado cerca de la parte rosada (la pulpa), ya que contiene vasos sanguíneos y nervios. Si no estás seguro, es mejor cortar poco a poco o acudir a un profesional. En gatos, el corte de uñas también ayuda a reducir daños en muebles y a prevenir que se enganchen. Acostumbra a tu mascota desde pequeña para que el proceso sea más fácil y menos estresante.", 
    "datosExtra": "Usar cortaúñas de calidad. Tener a mano polvo hemostático por si sangra." 
  }, 
  { 
    "id": 12, 
    "categoria": "Accesorios", 
    "titulo": "Transportín seguro para viajes", 
    "subtitulo": "Cómo elegir y preparar el transportín ideal", 
    "nombreUsuario": "ViajaConTuMascota", 
    "descripcionCorta": "Usar transportín homologado para viajes.", 
    "descripcionLarga": "El transportín es un accesorio indispensable para viajar con mascotas, ya sea en coche, tren o avión. Debe ser del tamaño adecuado: lo suficientemente grande para que el animal pueda girar y acostarse, pero no tan amplio que se desplace demasiado. Debe tener buena ventilación, cierre seguro y base antideslizante. Para facilitar la adaptación, deja el transportín abierto en casa con una manta y juguetes dentro, permitiendo que el animal lo explore. Durante el viaje, asegúralo con el cinturón de seguridad o en el suelo del vehículo. No dejes a tu mascota sola en el coche y evita alimentarla justo antes del viaje para prevenir mareos. En trayectos largos, haz paradas para que beba agua y se relaje.", 
    "datosExtra": "Colocar una manta con su olor. Usar feromonas si hay ansiedad." 
  }, 
  { 
    "id": 13, 
    "categoria": "Comida", 
    "titulo": "Pienso de calidad para gatos", 
    "subtitulo": "Qué mirar en la etiqueta y cómo hacer la transición", 
    "nombreUsuario": "NutriFelino", 
    "descripcionCorta": "Elegir pienso rico en proteínas.", 
    "descripcionLarga": "Los gatos son carnívoros estrictos, por lo que su pienso debe tener como primer ingrediente una fuente de proteína animal de alta calidad. Evita piensos con exceso de cereales, subproductos o aditivos artificiales. Busca fórmulas que incluyan taurina, ácidos grasos omega-3 y un equilibrio adecuado de minerales para prevenir problemas urinarios. Para cambiar de pienso, realiza una transición gradual durante 7–10 días, mezclando el nuevo alimento con el anterior en proporciones crecientes. Esto evita trastornos digestivos y mejora la aceptación. Controla el peso y la condición corporal del gato, y ajusta la ración según su nivel de actividad y edad.", 
    "datosExtra": "Evitar piensos con maíz como primer ingrediente. Consultar al veterinario si hay intolerancias." 
  }, 
  { 
    "id": 14, 
    "categoria": "Higiene", 
    "titulo": "Limpieza de orejas en mascotas", 
    "subtitulo": "Prevención de otitis en perros y gatos", 
    "nombreUsuario": "CuidaOrejas", 
    "descripcionCorta": "Usar solución veterinaria una vez al mes.", 
    "descripcionLarga": "La limpieza de las orejas es fundamental para prevenir infecciones como la otitis. En razas con orejas caídas o peludas, la acumulación de cera y humedad puede favorecer el crecimiento de bacterias y hongos. Utiliza una solución específica recomendada por el veterinario, aplica unas gotas en el canal auditivo, masajea suavemente la base de la oreja y limpia el exceso con una gasa. Nunca uses bastoncillos, ya que pueden empujar la suciedad hacia el interior o dañar el tímpano. Si notas mal olor, secreción oscura, enrojecimiento o que tu mascota se rasca con frecuencia, acude al veterinario para una revisión.", 
    "datosExtra": "Evitar productos con alcohol. No introducir objetos en el canal auditivo." 
  }, 
  { 
    "id": 15, 
    "categoria": "Accesorios", 
    "titulo": "Rascadores para gatos", 
    "subtitulo": "Tipos, ubicaciones y trucos para que los usen", 
    "nombreUsuario": "GatoActivo", 
    "descripcionCorta": "Colocar rascadores para evitar daños en muebles.", 
    "descripcionLarga": "El rascado es una necesidad natural para los gatos: les ayuda a mantener sus uñas sanas, marcar territorio y liberar estrés. Para evitar que dañen muebles, proporciona rascadores adecuados. Hay verticales, horizontales, de cartón, cuerda o alfombra. Colócalos cerca de sus zonas de descanso o donde suelen rascar. Usa catnip o feromonas para atraerlos. Refuerza con premios cuando los usen. Cambia o renueva los rascadores cuando estén muy desgastados. Si el gato no los usa, prueba con diferentes texturas o alturas hasta encontrar su preferido.", 
    "datosExtra": "Evitar castigos. Mejor reforzar el uso correcto con premios." 
  }, 
  { 
    "id": 16, 
    "categoria": "Comida", 
    "titulo": "Por qué evitar huesos cocidos", 
    "subtitulo": "Riesgos de astillas y alternativas seguras", 
    "nombreUsuario": "SeguridadAnimal", 
    "descripcionCorta": "Pueden astillarse y causar daño.", 
    "descripcionLarga": "Los huesos cocidos, especialmente de pollo o cerdo, pueden astillarse fácilmente y causar obstrucciones, perforaciones intestinales o asfixia. Aunque parezcan un premio natural, no son seguros. En su lugar, opta por juguetes masticables diseñados para perros, huesos prensados o snacks dentales aprobados por veterinarios. Si tu mascota ha ingerido un hueso cocido, observa signos como vómitos, estreñimiento, dolor abdominal o sangre en las heces. En caso de duda, acude al veterinario de inmediato. La prevención es clave para evitar emergencias.", 
    "datosExtra": "Nunca dar huesos cocidos. Supervisar siempre cuando mastican." 
  }, 
  { 
    "id": 17, 
    "categoria": "Higiene", 
    "titulo": "Frecuencia de baño en perros", 
    "subtitulo": "Adaptar la rutina a la raza y al estilo de vida", 
    "nombreUsuario": "HigieneCanina", 
    "descripcionCorta": "Cada 4–6 semanas según raza.", 
    "descripcionLarga": "El baño en perros debe adaptarse a su tipo de pelaje, nivel de actividad y entorno. En general, se recomienda bañar cada 4–6 semanas. Perros de pelo largo o que pasan mucho tiempo al aire libre pueden requerir baños más frecuentes. Usa siempre champú específico para perros, con pH neutro, y evita productos humanos. Asegúrate de secar bien, especialmente en climas fríos o en razas propensas a infecciones cutáneas. Entre baños, puedes usar toallitas húmedas o champú en seco para mantener la higiene. Un exceso de baños puede eliminar los aceites naturales de la piel y causar irritaciones.", 
    "datosExtra": "Evitar baños semanales salvo indicación veterinaria. Secar bien las orejas y pliegues." 
  }, 
  { 
    "id": 18, 
    "categoria": "Accesorios", 
    "titulo": "Arnés vs collar", 
    "subtitulo": "Qué elegir para paseos largos y perros que tiran", 
    "nombreUsuario": "PaseosFelices", 
    "descripcionCorta": "El arnés es más seguro para paseos largos.", 
    "descripcionLarga": "El arnés distribuye la fuerza de tracción por el pecho y el torso, evitando presión en el cuello. Es ideal para perros que tiran, razas pequeñas con tráquea sensible o perros mayores. Los collares pueden ser útiles para identificación, pero no deben usarse como único sistema de sujeción en paseos largos. Existen arneses tipo H, Y o antitirones, cada uno con ventajas según el comportamiento del perro. Asegúrate de que el arnés esté bien ajustado: deben caber dos dedos entre la correa y el cuerpo. Observa si hay rozaduras o incomodidad y ajusta o cambia el modelo si es necesario.", 
    "datosExtra": "Evitar collares de ahogo. Revisar el ajuste del arnés regularmente." 
  }, 
  { 
    "id": 19, 
    "categoria": "Comida", 
    "titulo": "Comida húmeda como complemento", 
    "subtitulo": "Beneficios de hidratación y palatabilidad", 
    "nombreUsuario": "AlimentacionMixta", 
    "descripcionCorta": "Dar en ocasiones para variar la dieta.", 
    "descripcionLarga": "La comida húmeda puede ser un excelente complemento para la dieta de perros y gatos, especialmente en animales con baja ingesta de agua o problemas urinarios. Aporta mayor palatabilidad, facilita la masticación en animales mayores y mejora la hidratación. Se recomienda combinarla con pienso seco para mantener la salud dental. Es importante elegir productos de calidad, con alto contenido cárnico y sin azúcares añadidos. La transición debe ser gradual para evitar trastornos digestivos. Una vez abierta, conservar en refrigeración y consumir en 48 horas. Servir a temperatura ambiente para potenciar el aroma y sabor.", 
    "datosExtra": "Ideal para gatos con cistitis o perros con problemas renales. Consultar raciones con el veterinario." 
  }, 
  { 
    "id": 20, 
    "categoria": "Higiene", 
    "titulo": "Cepillado en gatos de pelo largo", 
    "subtitulo": "Prevenir nudos y bolas de pelo", 
    "nombreUsuario": "GatoCepillado", 
    "descripcionCorta": "Cepillar gatos de pelo largo diariamente.", 
    "descripcionLarga": "Los gatos de pelo largo requieren un cepillado diario para evitar la formación de nudos, reducir la caída de pelo y prevenir la formación de bolas de pelo en el tracto digestivo. Utiliza un peine de púas metálicas para desenredar y un cepillo suave para dar acabado. Comienza por zonas menos sensibles como el lomo y avanza hacia el abdomen y las patas. Si encuentras nudos difíciles, usa un spray desenredante o consulta a un peluquero felino. El cepillado también fortalece el vínculo con tu gato y permite detectar parásitos o problemas en la piel a tiempo.", 
    "datosExtra": "Complementar con pasta de malta para facilitar la expulsión de bolas de pelo." 
  }, 
  { 
    "id": 21, 
    "categoria": "Accesorios", 
    "titulo": "Platos antideslizantes para mascotas", 
    "subtitulo": "Evitar derrames y mejorar la postura al comer", 
    "nombreUsuario": "ComederosSeguros", 
    "descripcionCorta": "Evitan derrames durante la comida.", 
    "descripcionLarga": "Los platos antideslizantes son ideales para evitar que la comida o el agua se derramen mientras la mascota come. Están diseñados con bases de goma o silicona que se adhieren al suelo, proporcionando estabilidad. Son especialmente útiles para cachorros, perros mayores o mascotas con problemas de movilidad. También existen versiones elevadas que mejoran la postura al comer, reduciendo el riesgo de torsión gástrica en razas grandes. Es importante elegir un tamaño adecuado al animal y materiales fáciles de limpiar como acero inoxidable o cerámica.", 
    "datosExtra": "Evitar plásticos por acumulación de bacterias. Lavar a diario." 
  }, 
  { 
    "id": 22, 
    "categoria": "Comida", 
    "titulo": "Gestión de peso saludable", 
    "subtitulo": "Cómo ajustar raciones y detectar señales de sobrepeso", 
    "nombreUsuario": "PesoIdeal", 
    "descripcionCorta": "Ajustar raciones y evitar sobrepeso.", 
    "descripcionLarga": "El sobrepeso en mascotas puede derivar en enfermedades como diabetes, problemas articulares y cardiovasculares. Para mantener un peso saludable, es fundamental medir las raciones con báscula, evitar dar sobras de comida humana y fomentar el ejercicio diario. Observa la silueta del animal: deben notarse las costillas al tacto sin exceso de grasa. Si notas aumento de peso, reduce la ración un 10% y consulta al veterinario para un plan nutricional. Existen piensos light o específicos para control de peso que pueden ayudar en el proceso.", 
    "datosExtra": "Evitar premios calóricos. Usar juguetes interactivos para fomentar el movimiento." 
  }, 
  { 
    "id": 23, 
    "categoria": "Higiene", 
    "titulo": "Rutina dental básica", 
    "subtitulo": "Cepillado y alternativas para reducir placa", 
    "nombreUsuario": "SonrisaAnimal", 
    "descripcionCorta": "Cepillar y usar snacks dentales.", 
    "descripcionLarga": "La salud bucal es clave para el bienestar general de tu mascota. El cepillado regular con pasta dental específica para animales ayuda a prevenir la acumulación de placa, sarro y enfermedades periodontales. Se recomienda cepillar al menos 3 veces por semana. Complementa con snacks dentales, juguetes masticables y soluciones en el agua que ayuden a mantener la higiene. En razas pequeñas o animales mayores, la acumulación de sarro puede ser más rápida, por lo que es importante realizar limpiezas veterinarias periódicas. El mal aliento persistente puede ser señal de problemas dentales.", 
    "datosExtra": "Nunca usar pasta humana. Introducir el cepillado desde cachorro." 
  }, 
  { 
    "id": 24, 
    "categoria": "Accesorios", 
    "titulo": "Kit básico para adopción", 
    "subtitulo": "Qué preparar antes de la llegada del nuevo miembro", 
    "nombreUsuario": "AdoptaBien", 
    "descripcionCorta": "Prepara cama, comida, juguetes y seguridad.", 
    "descripcionLarga": "Adoptar una mascota es una gran responsabilidad y requiere preparación. Antes de su llegada, asegúrate de tener una cama cómoda, comedero y bebedero, alimento adecuado, juguetes para su estimulación, productos de higiene (cepillo, champú, arenero si es gato), collar o arnés con identificación, y un espacio tranquilo donde pueda adaptarse. También es recomendable tener el contacto de un veterinario de confianza y programar una primera revisión. La adaptación puede llevar días o semanas, por lo que es importante tener paciencia, establecer rutinas y ofrecer mucho cariño.", 
    "datosExtra": "Evitar cambios bruscos de entorno. Supervisar los primeros días para prevenir escapes." 
  } 
] 
 

export default consejos;