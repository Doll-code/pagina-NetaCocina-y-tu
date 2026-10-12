/* ==========================================
   NETACOCINA - LÓGICA DE LA APLICACIÓN (JS)
   ========================================== */

class NetacocinaApp {
    constructor() {
        this.currentUser = null;
        this.usersDB = {};
        this.currentView = 'home';
        this.activeCourseId = null;
        this.activeLessonId = null;
        this.activeExam = null; // { type: 'module'|'final', courseId, moduleId }
        this.examCurrentQuestion = 0;
        this.examAnswers = [];
        this.authMode = 'login'; // 'login' o 'register'

        // Datos oficiales de los 4 cursos obligatorios
        this.coursesData = [
            {
                id: 'course-1',
                title: 'Cómo hacer arroz',
                desc: 'Aprende los secretos fundamentales para dominar el arroz blanco perfecto y el clásico arroz con pollo.',
                image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80',
                modules: [
                    {
                        id: 'm1-c1',
                        title: 'Módulo 1: Cómo hacer arroz blanco paso a paso',
                        lessons: [
                            {
                                id: 'l1-m1-c1',
                                title: '1.1 Ingredientes y proporciones exactas',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'El secreto del arroz blanco comienza con la proporción perfecta: por cada taza de arroz, se utilizan generalmente 2 tazas de agua. En este módulo aprenderás la importancia de lavar el arroz para eliminar el exceso de almidón, evitando que quede pastoso.',
                                images: [
                                    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1536304993881-ff6c93ffaef7?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80'
                                ]
                            },
                            {
                                id: 'l2-m1-c1',
                                title: '1.2 Cocción a fuego bajo y reposo final',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Una vez que el agua hierve y se reduce al nivel del arroz, se debe tapar herméticamente y bajar el fuego al mínimo absoluto durante 15 minutos. El reposo final de 5 minutos sin destapar es clave para que los granos se expandan con suavidad.',
                                images: [
                                    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: true,
                        examId: 'exam-c1-m1'
                    },
                    {
                        id: 'm2-c1',
                        title: 'Módulo 2: Arroz con pollo',
                        lessons: [
                            {
                                id: 'l1-m2-c1',
                                title: '2.1 Preparación y marinado del pollo',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Para un excelente arroz con pollo, el secreto radica en marinar las piezas de pollo con ajo, comino, sal, pimienta y un toque de pasta de ají. Se doran profundamente en la olla para dejar los jugos concentrados (fondos) que darán sabor al arroz.',
                                images: [
                                    'https://images.unsplash.com/photo-1604908176997-125f2596f37c?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80'
                                ]
                            },
                            {
                                id: 'l2-m2-c1',
                                title: '2.2 Integración con vegetales y cocción final',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Agregamos zanahoria en cubos, guisantes (alverjas), pimiento rojo y el caldo de pollo concentrado. Incorporamos el arroz, mezclamos de manera envolvente y dejamos cocinar hasta obtener el grano en su punto exacto.',
                                images: [
                                    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: true,
                        examId: 'exam-c1-m2'
                    }
                ],
                hasFinalExam: true,
                finalExamId: 'exam-c1-final'
            },
            {
                id: 'course-2',
                title: 'Carne molida al estilo napolitano',
                desc: 'Domina una salsa napolitana casera e intégrala con carne molida especiada y acompañamientos irresistibles.',
                image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
                modules: [
                    {
                        id: 'm1-c2',
                        title: 'Módulo Único: Salsa, Carne y Acompañamientos',
                        lessons: [
                            {
                                id: 'l1-m1-c2',
                                title: 'Punto 1 y 2: La salsa y sus ingredientes',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'La base napolitana requiere tomates maduros triturados, ajo sofrito en aceite de oliva virgen extra, hojas de albahaca fresca y una pizca de azúcar para contrarrestar la acidez natural del tomate.',
                                images: [
                                    'https://images.unsplash.com/photo-1598866594230-a7d12756260f?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=400&q=80'
                                ]
                            },
                            {
                                id: 'l2-m1-c2',
                                title: 'Punto 3 y 4: Preparación de la carne y acompañamientos',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Sellamos la carne molida de res con orégano y vino tinto hasta evaporar. Se fusiona con la salsa napolitana a fuego lento por 20 minutos. Se acompaña idealmente con polenta cremosa o pasta al dente.',
                                images: [
                                    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: true,
                        examId: 'exam-c2-m1'
                    }
                ],
                hasFinalExam: true,
                finalExamId: 'exam-c2-final'
            },
            {
                id: 'course-3',
                title: 'Cómo ser tú sin guiarte por estereotipos',
                desc: 'Un espacio de desarrollo personal culinario para romper moldes, conectar con tu voz interior y crear recetas auténticas.',
                image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=600&q=80',
                modules: [
                    {
                        id: 'm1-c3',
                        title: 'Módulo 1: Identidad y orígenes en la cocina',
                        lessons: [
                            {
                                id: 'l1-m1-c3',
                                title: '1.1 Reconociendo tus sabores de infancia',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'La cocina auténtica nace de la memoria y la identidad. Rompe con los cánones estrictos de la alta cocina comercial y abraza los sabores caseros que te definen.',
                                images: [
                                    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: false
                    },
                    {
                        id: 'm2-c3',
                        title: 'Módulo 2: Expectativas sociales vs. Pasión propia',
                        lessons: [
                            {
                                id: 'l1-m2-c3',
                                title: '2.1 Cocinar sin miedo al qué dirán',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Muchos abandonan la cocina por miedo a cometer errores o no seguir modas estéticas en redes sociales. Aprende a disfrutar el proceso creativo culinario sin presiones.',
                                images: [
                                    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: false
                    },
                    {
                        id: 'm3-c3',
                        title: 'Módulo 3: Creación de tu propio recetario libre',
                        lessons: [
                            {
                                id: 'l1-m3-c3',
                                title: '3.1 Innovación culinaria sin estereotipos',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Combina ingredientes de forma libre y diseña tu firma personal en cada plato que prepares.',
                                images: [
                                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: false
                    }
                ],
                hasFinalExam: true,
                finalExamId: 'exam-c3-final'
            },
            {
                id: 'course-4',
                title: 'Postres rápidos en sartén',
                desc: 'Aprende a preparar deliciosos postres y pasteles directamente en la sartén sin necesidad de horno tradicional.',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
                modules: [
                    {
                        id: 'm1-c4',
                        title: 'Módulo 1: Bizcocho esponjoso a la sartén',
                        lessons: [
                            {
                                id: 'l1-m1-c4',
                                title: '1.1 Mezcla y control de temperatura',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Aprende las proporciones de harina, huevo, azúcar y leche para lograr un bizcocho aireado utilizando una sartén antiadherente tapada a fuego muy bajo.',
                                images: [
                                    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: true,
                        examId: 'exam-c4-m1'
                    },
                    {
                        id: 'm2-c4',
                        title: 'Módulo 2: Panqueques y salsas dulces',
                        lessons: [
                            {
                                id: 'l1-m2-c4',
                                title: '2.1 Técnicas de volteo y caramelo rápido',
                                videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
                                text: 'Domina el punto exacto de cocción de panqueques dorados y acompaña con una salsa de caramelo o frutos rojos express.',
                                images: [
                                    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=400&q=80',
                                    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
                                ]
                            }
                        ],
                        hasExam: true,
                        examId: 'exam-c4-m2'
                    }
                ],
                hasFinalExam: true,
                finalExamId: 'exam-c4-final'
            }
        ];

        // Bancos de preguntas para exámenes (10 para módulos, 15-20 para finales)
        this.questionBanks = {
            'exam-c1-m1': [
                { q: '¿Cuál es la proporción recomendada de agua por cada taza de arroz blanco?', options: ['1 taza de agua', '1.5 tazas de agua', '2 tazas de agua', '3 tazas de agua'], correct: 2 },
                { q: '¿Por qué es importante lavar el arroz antes de cocinarlo?', options: ['Para calentarlo', 'Para eliminar el exceso de almidón y evitar que quede pastoso', 'Para teñirlo de blanco', 'Para añadirle sal'], correct: 1 },
                { q: '¿A qué intensidad de fuego se debe cocinar el arroz una vez que hierve el agua?', options: ['Fuego máximo', 'Fuego medio', 'Fuego mínimo absoluto', 'Sin fuego'], correct: 2 },
                { q: '¿Cuánto tiempo aproximado de cocción requiere el arroz a fuego bajo una vez tapado?', options: ['5 minutos', '10 minutos', '15 minutos', '40 minutos'], correct: 2 },
                { q: '¿Se debe destapar el arroz inmediatamente al apagar el fuego?', options: ['Sí, para que escape el vapor', 'No, requiere un reposo de 5 minutos sin destapar', 'Sí, para revolverlo enérgicamente', 'No importa'], correct: 1 },
                { q: '¿Qué utensilio es fundamental para una cocción uniforme?', options: ['Una sartén abierta', 'Una olla con tapa hermética', 'Un colador de metal', 'Una licuadora'], correct: 1 },
                { q: '¿Qué ingrediente básico adicional se suele añadir al agua junto con la sal?', options: ['Aceite o mantequilla', 'Vinagre de manzana', 'Azúcar glass', 'Café'], correct: 0 },
                { q: 'Si el arroz queda duro al terminar el tiempo, ¿qué se debe hacer?', options: ['Botarlo a la basura', 'Añadir 2 cucharadas más de agua caliente y dar 3 minutos extra a fuego muy bajo', 'Meterlo al refrigerador', 'Congelarlo'], correct: 1 },
                { q: '¿Cuál es el color ideal del grano al servirlo?', options: ['Translúcido y pegajoso', 'Suelto, entero y blanco brillante', 'Tostado oscuro', 'Amarillo intenso'], correct: 1 },
                { q: '¿Qué indica un olor a tostado en la base de la olla?', options: ['El arroz está perfecto', 'El calor estuvo muy alto y comenzó a dorarse de más', 'Faltó agua al inicio', 'Es normal siempre'], correct: 1 }
            ],
            'exam-c1-m2': [
                { q: '¿Qué especias son ideales para marinar el pollo del arroz con pollo?', options: ['Ajo, comino, sal y pimienta', 'Canela y vainilla', 'Azúcar y chocolate', 'Menta y limón únicamente'], correct: 0 },
                { q: '¿Por qué se deben dorar primero las piezas de pollo en la olla?', options: ['Para quemarlas', 'Para concentrar los jugos (fondos) que darán sabor al arroz', 'Para enfriarlas', 'Para quitarles la piel'], correct: 1 },
                { q: '¿Qué vegetales acompañan tradicionalmente al arroz con pollo?', options: ['Zanahoria, guisantes (alverjas) y pimiento', 'Fresa y plátano', 'Lechuga y tomate fresco', 'Pepino y rábano'], correct: 0 },
                { q: '¿Qué líquido aporta el sabor principal al cocinar el grano en esta receta?', options: ['Café con leche', 'Caldo de pollo concentrado', 'Agua mineral con gas', 'Jugo de naranja'], correct: 1 },
                { q: '¿Cómo se debe incorporar el arroz junto con el pollo y los vegetales?', options: ['De manera muy brusca con batidora', 'De manera envolvente para no romper los granos', 'Licuándolo todo', 'No se mezcla'], correct: 1 },
                { q: '¿Qué pasta o ingrediente opcional da un toque tradicional sudamericano al aderezo?', options: ['Pasta de ají o palillo (cúrcuma)', 'Mayonesa', 'Mostaza dulce', 'Salsa de arándanos'], correct: 0 },
                { q: '¿Cuál es el punto óptimo del pollo al integrarlo?', options: ['Crudo por dentro', 'Dorado por fuera y jugoso en su interior', 'Completamente pulverizado', 'Seco e incandescente'], correct: 1 },
                { q: '¿Qué fuego se utiliza al terminar la cocción del arroz con pollo?', options: ['Fuego lento/bajo', 'Fuego alto directo', 'Microondas', 'Hielo'], correct: 0 },
                { q: '¿Por qué se deja reposar el plato antes de servir?', options: ['Para que se enfríe por completo', 'Para que los sabores se asentaren y el grano absorba el jugo restante', 'Para que se vuelva duro', 'No es necesario'], correct: 1 },
                { q: '¿Con qué se suele decorar al servir el plato caliente?', options: ['Cilantro o perejil fresco picado', 'Hojas de eucalipto', 'Chocolate rallado', 'Queso azul'], correct: 0 }
            ],
            'exam-c1-final': [
                { q: '¿Cuál es la proporción de agua para el arroz blanco del Módulo 1?', options: ['1 a 1', '2 tazas de agua por 1 de arroz', '4 tazas de agua', 'Media taza'], correct: 1 },
                { q: '¿Por qué se lava el arroz?', options: ['Para quitar almidón sobrante', 'Para pintarlo', 'Para calentarlo', 'Para salarlo'], correct: 0 },
                { q: '¿Cuánto tiempo de reposo final necesita el arroz blanco?', options: ['1 minuto', '5 minutos', '1 hora', 'Ninguno'], correct: 1 },
                { q: '¿Qué se hace primero con el pollo en el Módulo 2?', options: ['Hervirlo en agua fría', 'Marinarlo y dorarlo para generar fondos', 'Licuarlo crudo', 'Congelarlo'], correct: 1 },
                { q: '¿Qué vegetales se usan en el arroz con pollo?', options: ['Zanahoria y guisantes', 'Manzana y pera', 'Lechuga', 'Cebolla blanca sola'], correct: 0 },
                { q: '¿Qué líquido sustituye al agua simple en el Módulo 2?', options: ['Caldo de pollo', 'Refresco de cola', 'Té helado', 'Vinagre'], correct: 0 },
                { q: '¿Cómo se mezcla el arroz con los vegetales?', options: ['Envolvente', 'Con batidora eléctrica', 'A golpes', 'Con licuadora'], correct: 0 },
                { q: '¿Qué fuego se requiere para la cocción final de ambos platos?', options: ['Fuego bajo / mínimo', 'Fuego máximo', 'Fuego intermitente', 'Sin calor'], correct: 0 },
                { q: '¿Qué hierba se usa para decorar al servir?', options: ['Cilantro o perejil', 'Césped', 'Orégano seco en polvo únicamente', 'Hojas de laurel enteras duras'], correct: 0 },
                { q: '¿Por qué es importante el marinado del pollo?', options: ['Para darle profundidad de sabor', 'Para enfriar la carne', 'Para ablandar la olla', 'Para cambiar su color a verde'], correct: 0 },
                { q: '¿Qué se debe evitar al cocinar arroz blanco?', options: ['Destapar constantemente durante la cocción', 'Usar sal', 'Lavar el arroz', 'Usar agua'], correct: 0 },
                { q: '¿Qué tipo de olla es ideal?', options: ['Una con tapa hermética', 'Una bandeja plana', 'Un plato hondo', 'Una taza'], correct: 0 },
                { q: '¿Qué aporta el sofrito inicial?', options: ['Sabor base', 'Enfriamiento', 'Acidez extrema', 'Color negro'], correct: 0 },
                { q: '¿Cuál es el resultado de un buen arroz con pollo?', options: ['Grano suelto y pollo jugoso', 'Pasta pegajosa', 'Carne cruda', 'Sopa líquida'], correct: 0 },
                { q: '¿Qué calificación mínima se requiere para aprobar?', options: ['50%', '60%', '70%', '100%'], correct: 2 }
            ],
            'exam-c2-m1': [
                { q: '¿Cuál es la base principal de una salsa napolitana auténtica?', options: ['Tomates maduros triturados', 'Mayonesa', 'Leche condensada', 'Salsa de soya'], correct: 0 },
                { q: '¿Qué aceite se utiliza tradicionalmente para sofreír el ajo en la salsa?', options: ['Aceite de oliva virgen extra', 'Aceite de motor', 'Aceite de linaza', 'Ninguno'], correct: 0 },
                { q: '¿Qué hierba aromática es esencial en la salsa napolitana?', options: ['Albahaca fresca', 'Eucalipto', 'Menta fuerte', 'Romero seco en rama dura'], correct: 0 },
                { q: '¿Por qué se añade una pizca de azúcar a la salsa de tomate?', options: ['Para endulzar como postre', 'Para contrarrestar la acidez natural del tomate', 'Para espesar instantáneamente', 'Para cambiar el color'], correct: 1 },
                { q: '¿Cómo se prepara la carne molida antes de unirla a la salsa?', options: ['Se sella con orégano y vino tinto hasta evaporar', 'Se hierve en agua fría', 'Se come cruda', 'Se licua con hielo'], correct: 0 },
                { q: '¿Cuánto tiempo se recomienda cocinar a fuego lento la salsa con la carne?', options: ['2 minutos', '20 minutos', '5 horas', '10 segundos'], correct: 1 },
                { q: '¿Qué acompañamiento se sugiere tradicionalmente para este plato?', options: ['Polenta cremosa o pasta al dente', 'Gelatina de fresa', 'Cereal de caja', 'Pan con chocolate'], correct: 0 },
                { q: '¿Qué tipo de carne molida es recomendada?', options: ['Res con un porcentaje equilibrado de grasa para mantener jugosidad', 'Carne congelada sin deshebrar', 'Huesos molidos', 'Grasa pura'], correct: 0 },
                { q: '¿Qué vino se puede usar opcionalmente en el sofrito de la carne?', options: ['Vino tinto', 'Vino espumoso dulce', 'Cerveza negra', 'Ninguno'], correct: 0 },
                { q: '¿Cuál es la consistencia final ideal de la salsa napolitana con carne?', options: ['Líquida como agua', 'Espesa, untuosa y bien integrada', 'Sólida como piedra', 'Separada en aceite y agua'], correct: 1 }
            ],
            'exam-c2-final': [
                { q: '¿Cuál es el ingrediente principal de la salsa napolitana?', options: ['Tomate maduro', 'Papa', 'Arroz', 'Pollo'], correct: 0 },
                { q: '¿Qué grasa se usa para el sofrito?', options: ['Aceite de oliva', 'Aceite sintético', 'Manteca fría', 'Agua'], correct: 0 },
                { q: '¿Qué hierba da el toque clásico napolitano?', options: ['Albahaca', 'Césped', 'Perejil seco viejo', 'Pimienta blanca'], correct: 0 },
                { q: '¿Para qué sirve el azúcar en la salsa?', options: ['Neutralizar acidez', 'Hacer caramelo', 'Endulzar postre', 'Salar'], correct: 1 },
                { q: '¿Cómo se sella la carne molida?', options: ['Con orégano y vino tinto', 'Con agua fría', 'Al horno microondas', 'Cruda'], correct: 0 },
                { q: '¿Cuánto tiempo de cocción lenta lleva la mezcla?', options: ['20 minutos', '1 minuto', '3 horas', '10 segundos'], correct: 0 },
                { q: '¿Qué acompañamiento se sugiere?', options: ['Polenta o pasta al dente', 'Helado', 'Sopa', 'Ensalada de frutas'], correct: 0 },
                { q: '¿Qué tipo de carne se prefiere?', options: ['Res equilibrada en grasa', 'Hueso', 'Grasa pura', 'Pescado'], correct: 0 },
                { q: '¿Qué vino se puede incorporar?', options: ['Vino tinto', 'Ninguno', 'Vinagre', 'Café'], correct: 0 },
                { q: '¿Cómo debe ser la textura final?', options: ['Espesa y untuosa', 'Líquida', 'Seca', 'Polvorienta'], correct: 0 },
                { q: '¿Por qué se tritura el tomate?', options: ['Para obtener una salsa homogénea', 'Para hacer jugo', 'Para freír entero', 'Para congelar'], correct: 0 },
                { q: '¿Qué función cumple el ajo?', options: ['Aromatizar el sofrito', 'Endulzar', 'Dar color azul', 'Enfriar'], correct: 0 },
                { q: '¿Se puede usar albahaca seca si no hay fresca?', options: ['Sí, aunque la fresca es superior', 'No, está prohibido', 'Explota la cocina', 'Sabe a jabón'], correct: 0 },
                { q: '¿Qué temperatura de cocción es ideal para la salsa?', options: ['Fuego lento', 'Fuego máximo', 'Congelación', 'Ninguna'], correct: 0 },
                { q: '¿Cuál es el porcentaje mínimo para aprobar?', options: ['70%', '50%', '30%', '100%'], correct: 0 }
            ],
            'exam-c3-final': [
                { q: '¿Qué busca fomentar el curso sobre estereotipos culinarios?', options: ['La autenticidad y la confianza en la cocina propia', 'Copiar recetas idénticas sin pensar', 'Comprar utensilios caros', 'Seguir modas estrictas'], correct: 0 },
                { q: '¿Por qué son importantes los sabores de infancia?', options: ['Conectan con nuestra identidad y memoria emocional', 'Porque son obligatorios', 'Porque no se pueden cambiar', 'Para vender más'], correct: 0 },
                { q: '¿Qué obstaculiza la creatividad culinaria según el Módulo 2?', options: ['El miedo al qué dirán y a cometer errores', 'Usar sal', 'Tener una cocina limpia', 'Comprar tomates'], correct: 0 },
                { q: '¿Qué representa diseñar tu propio recetario libre?', options: ['Innovar sin seguir moldes comerciales rígidos', 'Romper libros', 'No cocinar nunca', 'Vender recetas'], correct: 0 },
                { q: '¿Es necesario seguir modas de redes sociales para cocinar bien?', options: ['No, la cocina personal se basa en tu gusto y autenticidad', 'Sí, siempre', 'Es obligatorio por ley', 'Solo en verano'], correct: 0 },
                { q: '¿Cómo se superan las expectativas sociales en la cocina?', options: ['Cocinando con confianza y experimentando', 'Dejando de comer', 'Comprando comida rápida', 'Escondiéndose'], correct: 0 },
                { q: '¿Qué papel juega la imperfección en un plato casero?', options: ['Le da carácter humano y autenticidad', 'Arruina el plato', 'Lo hace tóxico', 'No importa'], correct: 0 },
                { q: '¿Por qué la cocina es un acto de expresión personal?', options: ['Porque refleja quién eres y qué te gusta', 'Porque es una tarea aburrida', 'Porque es un examen escolar', 'Para impresionar desconocidos'], correct: 0 },
                { q: '¿Qué actitud debes tener frente a un error en una receta?', options: ['Aprender de él y adaptarlo', 'Abandonar la cocina para siempre', 'Llorar', 'Enojarte'], correct: 0 },
                { q: '¿Qué significa cocinar sin miedo?', options: ['Confiar en tus capacidades creativas', 'Arriesgarse a quemar la casa', 'No usar guantes', 'Cocinar a oscuras'], correct: 0 },
                { q: '¿De dónde surgen las mejores recetas familiares?', options: ['De la experimentación y el cariño', 'De fábricas industriales', 'De manuales robóticos', 'De internet'], correct: 0 },
                { q: '¿Por qué debemos ignorar los estereotipos estéticos extremos?', options: ['Porque la comida real prioriza el sabor y el bienestar', 'Porque no existen', 'Porque son feos', 'Para gastar menos'], correct: 0 },
                { q: '¿Qué define a un buen cocinero casero?', options: ['Su pasión y disfrute al alimentar', 'Tener 100 sartenes', 'Saber hablar francés', 'Gastar mucho dinero'], correct: 0 },
                { q: '¿Qué valor tiene compartir un plato creado por ti?', options: ['Transmite tu esencia y genera vínculos', 'Ninguno', 'Obligación social', 'Competencia'], correct: 0 },
                { q: '¿Cuál es la nota requerida para aprobar este examen final?', options: ['70%', '50%', '90%', '100%'], correct: 0 }
            ],
            'exam-c4-m1': [
                { q: '¿Qué utensilio principal se utiliza para hacer este bizcocho sin horno?', options: ['Sartén antiadherente con tapa', 'Holla de presión', 'Microondas', 'Parrilla de carbón'], correct: 0 },
                { q: '¿Qué fuego se requiere para cocinar un pastel en sartén sin quemarlo?', options: ['Fuego muy bajo / mínimo', 'Fuego máximo', 'Fuego intermitente', 'Sin calor'], correct: 0 },
                { q: '¿Qué ingredientes básicos conforman la mezcla?', options: ['Harina, huevo, azúcar y leche', 'Carne y tomate', 'Arroz y agua', 'Sal y pimienta'], correct: 0 },
                { q: '¿Por qué es indispensable tapar la sartén?', options: ['Para que el vapor cocine la parte superior del bizcocho', 'Para que escape el aire', 'Para enfriarlo', 'Para apagar el fuego'], correct: 0 },
                { q: '¿Cómo saber cuándo voltear o retirar el bizcocho?', options: ['Cuando la superficie esté seca y los bordes se desprendan', 'Cuando esté negro', 'Al primer minuto', 'Nunca se revisa'], correct: 0 }
            ],
            'exam-c4-m2': [
                { q: '¿Qué caracteriza a unos buenos panqueques caseros?', options: ['Textura esponjosa y dorada uniforme', 'Textura dura como piedra', 'Sabor salado a carne', 'Color verde'], correct: 0 },
                { q: '¿Con qué se puede acompañar un postre rápido de sartén?', options: ['Salsa de caramelo o frutos rojos', 'Salsa de tomate napolitana', 'Queso azul', 'Ajo picado'], correct: 0 },
                { q: '¿Qué se debe aplicar a la sartén antes de verter la mezcla de panqueques?', options: ['Una ligera capa de mantequilla o aceite', 'Agua fría', 'Arena', 'Hielo'], correct: 0 },
                { q: '¿En qué momento se debe voltear el panqueque?', options: ['Cuando aparezcan pequeñas burbujas en la superficie', 'Inmediatamente al echar la mezcla', 'Cuando se queme', 'Nunca'], correct: 0 },
                { q: '¿Cuál es la principal ventaja de los postres en sartén?', options: ['No requieren horno tradicional y son muy rápidos', 'Tardan 5 horas', 'Gastan mucha energía', 'Son difíciles'], correct: 0 }
            ],
            'exam-c4-final': [
                { q: '¿Qué herramienta principal se usa en los cursos de postres rápidos?', options: ['Sartén antiadherente', 'Horno de leña industrial', 'Batidora de 10 velocidades', 'Parrilla'], correct: 0 },
                { q: '¿Qué intensidad de fuego cuida mejor los pasteles en sartén?', options: ['Fuego mínimo', 'Fuego máximo', 'Fuego medio-alto', 'Fuego directo'], correct: 0 },
                { q: '¿Qué ingredientes forman la base del bizcocho de sartén?', options: ['Harina, huevos, azúcar y leche', 'Tomate y albahaca', 'Pollo y arroz', 'Carne molida'], correct: 0 },
                { q: '¿Por qué se usa tapa en la sartén?', options: ['Para cocción por calor envolvente y vapor', 'Para guardar la sartén', 'Para enfriar', 'Para pesar'], correct: 0 },
                { q: '¿Cómo se evitan grumos en la mezcla?', options: ['Batiendo e integrando bien los líquidos con secos', 'Añadiendo piedras', 'Congelando', 'Licuando con sal'], correct: 0 },
                { q: '¿Qué salsa acompaña perfectamente los postres dulces?', options: ['Frutos rojos o caramelo', 'Napolitana de ajo', 'Salsa soya', 'Aderezo César'], correct: 0 },
                { q: '¿Qué grasa evita que se peguen los panqueques?', options: ['Mantequilla o aceite', 'Agua', 'Vinagre', 'Alcohol'], correct: 0 },
                { q: '¿Cuándo se voltea el panqueque?', options: ['Al salir burbujas en la superficie', 'Al segundo cero', 'Nunca', 'Cuando esté negro'], correct: 0 },
                { q: '¿Cuál es la mayor ventaja?', options: ['Rapidez y no requerir horno', 'Costo elevado', 'Dificultad extrema', 'Largo tiempo'], correct: 0 },
                { q: '¿Qué nota se necesita para aprobar?', options: ['70%', '50%', '30%', '100%'], correct: 0 },
                { q: '¿Qué textura debe tener la masa de bizcocho?', options: ['Homogénea y fluida', 'Líquida como agua', 'Sólida como roca', 'Polvo suelto'], correct: 0 },
                { q: '¿Qué agente impulsor ayuda a esponjar?', options: ['Polvo de hornear (levadura química)', 'Sal fina', 'Pimienta', 'Vinagre'], correct: 0 },
                { q: '¿Se puede hacer caramelo express?', options: ['Sí, fundiendo azúcar con unas gotas de agua en sartén', 'No, es imposible', 'Solo con horno', 'Solo con hielo'], correct: 0 },
                { q: '¿Qué temperatura requiere el caramelo?', options: ['Calor moderado con cuidado', 'Frío polar', 'Fuego máximo sin vigilar', 'Microondas 10 horas'], correct: 0 },
                { q: '¿Por qué triunfan estos postres?', options: ['Por su accesibilidad y gran sabor', 'Porque son difíciles', 'Porque saben mal', 'Por aburrimiento'], correct: 0 }
            ]
        };

        this.init();
    }

    init() {
        this.loadUsersDB();
        this.checkExistingSession();
        this.renderCatalog();
        this.setupEventListeners();
        this.animateCounters();
    }

    // --- GESTIÓN DE USUARIOS Y LOCALSTORAGE ---
    loadUsersDB() {
        const savedDB = localStorage.getItem('netacocina_usersDB');
        if (savedDB) {
            this.usersDB = JSON.parse(savedDB);
        } else {
            // Cuenta de demostración por defecto solicitada: juan / 12345juan
            this.usersDB = {
                'juan': {
                    username: 'juan',
                    password: '12345juan',
                    progress: {
                        // courseId: { completedLessons: [], passedModules: [], passedFinal: false, moduleScores: {} }
                    }
                }
            };
            this.saveUsersDB();
        }
    }

    saveUsersDB() {
        localStorage.setItem('netacocina_usersDB', JSON.stringify(this.usersDB));
    }

    checkExistingSession() {
        const activeName = localStorage.getItem('netacocina_activeUser');
        if (activeName && this.usersDB[activeName]) {
            this.currentUser = this.usersDB[activeName];
            this.updateUIAfterLogin();
            this.showToast('Progreso cargado correctamente');
        }
    }

    login(username, password) {
        const cleanUser = username.trim().toLowerCase();
        if (this.usersDB[cleanUser]) {
            if (this.usersDB[cleanUser].password === password) {
                this.currentUser = this.usersDB[cleanUser];
                localStorage.setItem('netacocina_activeUser', cleanUser);
                this.updateUIAfterLogin();
                this.closeAuthModal();
                this.showToast('Progreso cargado correctamente');
                this.navigateTo('learning');
                return true;
            } else {
                alert('Contraseña incorrecta.');
                return false;
            }
        } else {
            // Si no existe, lo registramos automáticamente para comodidad del usuario
            this.usersDB[cleanUser] = {
                username: cleanUser,
                password: password,
                progress: {}
            };
            this.saveUsersDB();
            this.currentUser = this.usersDB[cleanUser];
            localStorage.setItem('netacocina_activeUser', cleanUser);
            this.updateUIAfterLogin();
            this.closeAuthModal();
            this.showToast('Cuenta creada y progreso cargado');
            this.navigateTo('learning');
            return true;
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('netacocina_activeUser');
        this.updateUIAfterLogin();
        this.navigateTo('home');
        this.showToast('Sesión cerrada correctamente');
    }

    updateUIAfterLogin() {
        const authContainer = document.getElementById('authButtonsContainer');
        const profileMenu = document.getElementById('userProfileMenu');
        const avatarText = document.getElementById('userAvatarText');
        const nameDisplay = document.getElementById('userNameDisplay');

        if (this.currentUser) {
            authContainer.style.display = 'none';
            profileMenu.style.display = 'flex';
            avatarText.textContent = this.currentUser.username.charAt(0).toUpperCase();
            nameDisplay.textContent = this.currentUser.username;
        } else {
            authContainer.style.display = 'flex';
            profileMenu.style.display = 'none';
        }
    }

    // --- NAVEGACIÓN Y VISTAS ---
    navigateTo(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const target = document.getElementById(`view-${viewName}`);
        if (target) {
            target.classList.add('active');
            this.currentView = viewName;
            window.scrollTo(0, 0);

            if (viewName === 'catalog') {
                this.renderCatalog();
            } else if (viewName === 'learning') {
                if (!this.currentUser) {
                    this.openAuthModal('login');
                    return;
                }
                this.renderMyLearning();
                this.renderAchievements();
            }
        }
        // Cerrar menú móvil si está abierto
        document.getElementById('navCenter').classList.remove('active');
    }

    setupEventListeners() {
        // Menú hamburguesa
        document.getElementById('hamburgerBtn').addEventListener('click', () => {
            document.getElementById('navCenter').classList.toggle('active');
        });
    }

    // --- RENDERIZADO DE CURSOS Y CATÁLOGO ---
    renderCatalog() {
        const homeGrid = document.getElementById('homeCoursesGrid');
        const fullGrid = document.getElementById('fullCatalogGrid');
        
        let html = '';
        this.coursesData.forEach(course => {
            const prog = this.getCourseProgressPercent(course.id);
            html += `
                <div class="course-card">
                    <div class="course-card-img">
                        <img src="${course.image}" alt="${course.title}">
                        <span class="badge-beginner">Principiante</span>
                        <div class="play-badge" onclick="app.openCourse('${course.id}')">&#9658;</div>
                    </div>
                    <div class="course-card-body">
                        <h3>${course.title}</h3>
                        <p>${course.desc}</p>
                        <div class="course-progress-container">
                            <div class="progress-info">
                                <span>Progreso</span>
                                <span>${prog}%</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" style="width: ${prog}%;"></div>
                            </div>
                        </div>
                        <button class="btn-primary btn-block" onclick="app.openCourse('${course.id}')">
                            ${prog > 0 ? 'Continuar curso' : 'Empezar curso'}
                        </button>
                    </div>
                </div>
            `;
        });

        if (homeGrid) homeGrid.innerHTML = html;
        if (fullGrid) fullGrid.innerHTML = html;
    }

    filterCatalog(query) {
        const q = query.toLowerCase();
        const fullGrid = document.getElementById('fullCatalogGrid');
        if (!fullGrid) return;

        const cards = fullGrid.querySelectorAll('.course-card');
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(q) || desc.includes(q)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setCatalogView(type) {
        const gridBtn = document.getElementById('btnGrid');
        const listBtn = document.getElementById('btnList');
        const fullGrid = document.getElementById('fullCatalogGrid');

        if (type === 'grid') {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            fullGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        } else {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            fullGrid.style.gridTemplateColumns = '1fr';
        }
    }

    renderMyLearning() {
        const container = document.getElementById('myLearningCoursesList');
        if (!this.currentUser) return;

        let html = '';
        this.coursesData.forEach(course => {
            const prog = this.getCourseProgressPercent(course.id);
            html += `
                <div class="my-course-row">
                    <img src="${course.image}" alt="${course.title}" class="my-course-img">
                    <div class="my-course-info">
                        <h3>${course.title}</h3>
                        <p>${course.desc}</p>
                        <div class="course-progress-container" style="max-width: 400px; margin-top: 10px;">
                            <div class="progress-info">
                                <span>Progreso general</span>
                                <span>${prog}%</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" style="width: ${prog}%;"></div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary" onclick="app.openCourse('${course.id}')">Continuar</button>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    renderAchievements() {
        if (!this.currentUser) return;
        const listContainer = document.getElementById('achievementsList');
        
        let c1Prog = this.getCourseProgressPercent('course-1');
        let c2Prog = this.getCourseProgressPercent('course-2');
        let c3Prog = this.getCourseProgressPercent('course-3');

        listContainer.innerHTML = `
            <div class="achievement-item ${c1Prog === 100 ? 'unlocked' : 'locked'}">
                <span class="ach-icon">${c1Prog === 100 ? '🏆' : '🔒'}</span>
                <div>
                    <h4>Chef de Arroz</h4>
                    <p>${c1Prog === 100 ? '¡Completado!' : 'Completa el Curso 1 (' + c1Prog + '%)'}</p>
                </div>
            </div>
            <div class="achievement-item ${c2Prog === 100 ? 'unlocked' : 'locked'}">
                <span class="ach-icon">${c2Prog === 100 ? '🏆' : '🔒'}</span>
                <div>
                    <h4>Maestro Napolitano</h4>
                    <p>${c2Prog === 100 ? '¡Completado!' : 'Completa el Curso 2 (' + c2Prog + '%)'}</p>
                </div>
            </div>
            <div class="achievement-item ${c3Prog === 100 ? 'unlocked' : 'locked'}">
                <span class="ach-icon">${c3Prog === 100 ? '🏆' : '🔒'}</span>
                <div>
                    <h4>Autenticidad Culinaria</h4>
                    <p>${c3Prog === 100 ? '¡Completado!' : 'Completa el Curso 3 (' + c3Prog + '%)'}</p>
                </div>
            </div>
        `;
    }

    getCourseProgressPercent(courseId) {
        if (!this.currentUser || !this.currentUser.progress[courseId]) return 0;
        const p = this.currentUser.progress[courseId];
        const course = this.coursesData.find(c => c.id === courseId);
        if (!course) return 0;

        let totalItems = 0;
        let completedItems = 0;

        course.modules.forEach(m => {
            totalItems += m.lessons.length;
            if (m.hasExam) totalItems += 1;
        });
        if (course.hasFinalExam) totalItems += 1;

        if (p.completedLessons) completedItems += p.completedLessons.length;
        if (p.passedModules) completedItems += p.passedModules.length;
        if (p.passedFinal) completedItems += 1;

        const pct = Math.round((completedItems / totalItems) * 100);
        return pct > 100 ? 100 : pct;
    }

    // --- REPRODUCTOR DEL CURSO ---
    openCourse(courseId) {
        if (!this.currentUser) {
            this.openAuthModal('login');
            this.showToast('Inicia sesión para acceder a los cursos');
            return;
        }
        this.activeCourseId = courseId;
        const course = this.coursesData.find(c => c.id === courseId);
        if (!course) return;

        document.getElementById('playerCourseTitle').textContent = course.title;
        this.renderAccordionModules(course);
        this.navigateTo('course-player');
    }

    renderAccordionModules(course) {
        const accordion = document.getElementById('accordionModules');
        const progData = this.currentUser.progress[course.id] || { completedLessons: [], passedModules: [], passedFinal: false };

        let html = '';
        course.modules.forEach((mod, mIndex) => {
            // Validar si el módulo está bloqueado (excepto el primero)
            let isLocked = false;
            if (mIndex > 0) {
                const prevMod = course.modules[mIndex - 1];
                if (prevMod.hasExam && !progData.passedModules?.includes(prevMod.examId)) {
                    isLocked = true;
                }
            }

            let lessonsHtml = '';
            mod.lessons.forEach((lesson, lIndex) => {
                const isCompleted = progData.completedLessons?.includes(lesson.id);
                lessonsHtml += `
                    <div class="lesson-item ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `app.loadLesson('${course.id}', '${lesson.id}')`}">
                        <span>${lesson.title}</span>
                        <span>${isCompleted ? '✅' : '▶'}</span>
                    </div>
                `;
            });

            // Examen de módulo si aplica
            if (mod.hasExam) {
                const passedExam = progData.passedModules?.includes(mod.examId);
                lessonsHtml += `
                    <div class="lesson-item ${isLocked ? 'locked' : ''}" style="color: var(--accent-orange);" onclick="${isLocked ? '' : `app.startExam('module', '${course.id}', '${mod.examId}')`}">
                        <span>📝 Examen de Módulo</span>
                        <span>${passedExam ? '✅ Aprobado' : '🔒'}</span>
                    </div>
                `;
            }

            html += `
                <div class="module-accordion-item">
                    <div class="module-accordion-header" onclick="app.toggleAccordion(this)">
                        <div class="module-title-wrap">
                            <h4>${mod.title}</h4>
                            <span class="module-meta-info">${mod.lessons.length} lecciones ${isLocked ? '(Bloqueado)' : ''}</span>
                        </div>
                        <span>&#9662;</span>
                    </div>
                    <div class="module-lessons-list ${mIndex === 0 ? 'open' : ''}">
                        ${lessonsHtml}
                    </div>
                </div>
            `;
        });

        // Examen Final si aplica
        if (course.hasFinalExam) {
            // Verificar si todos los módulos con examen están aprobados
            let canTakeFinal = true;
            course.modules.forEach(m => {
                if (m.hasExam && !progData.passedModules?.includes(m.examId)) {
                    canTakeFinal = false;
                }
            });

            const passedFinalExam = progData.passedFinal;
            html += `
                <div class="module-accordion-item">
                    <div class="module-accordion-header" style="background: rgba(245, 158, 11, 0.1);" onclick="${canTakeFinal ? `app.startExam('final', '${course.id}', '${course.finalExamId}')` : `alert('Debes aprobar los exámenes de los módulos previos para desbloquear el examen final.')`}">
                        <div class="module-title-wrap">
                            <h4 style="color: var(--accent-orange);">🏆 Examen Final del Curso</h4>
                            <span class="module-meta-info">${canTakeFinal ? 'Disponible' : 'Bloqueado por módulos'}</span>
                        </div>
                        <span>${passedFinalExam ? '✅ Aprobado' : '🔒'}</span>
                    </div>
                </div>
            `;
        }

        accordion.innerHTML = html;
    }

    toggleAccordion(headerEl) {
        const list = headerEl.nextElementSibling;
        list.classList.toggle('open');
    }

    loadLesson(courseId, lessonId) {
        this.activeLessonId = lessonId;
        const course = this.coursesData.find(c => c.id === courseId);
        let lesson = null;
        course.modules.forEach(m => {
            const found = m.lessons.find(l => l.id === lessonId);
            if (found) lesson = found;
        });

        if (!lesson) return;

        // Marcar lección como completada en localStorage
        if (!this.currentUser.progress[courseId]) {
            this.currentUser.progress[courseId] = { completedLessons: [], passedModules: [], passedFinal: false, moduleScores: {} };
        }
        if (!this.currentUser.progress[courseId].completedLessons.includes(lessonId)) {
            this.currentUser.progress[courseId].completedLessons.push(lessonId);
            this.saveUsersDB();
        }

        let imagesHtml = '';
        if (lesson.images) {
            lesson.images.forEach(img => {
                imagesHtml += `<img src="${img}" alt="Receta imagen de alta retención">`;
            });
        }

        const mainContent = document.getElementById('playerMainContent');
        mainContent.innerHTML = `
            <div class="lesson-content-box animate-fade">
                <h2>${lesson.title}</h2>
                <div class="lesson-video-wrapper">
                    <div class="simulated-video-overlay">
                        <div class="simulated-play-btn" onclick="this.parentElement.style.display='none'">&#9658;</div>
                        <p style="color:#fff; margin-top:10px; font-weight:600;">Reproducir video corto de demostración</p>
                    </div>
                    <video class="simulated-video" controls>
                        <source src="${lesson.videoUrl}" type="video/mp4">
                        Tu navegador no soporta videos.
                    </video>
                </div>
                <p>${lesson.text}</p>
                <h4 style="margin-top: 24px; margin-bottom: 12px; color: #fff;">Imágenes clave de alta retención:</h4>
                <div class="lesson-images-grid">
                    ${imagesHtml}
                </div>
                <div class="lesson-footer-actions">
                    <button class="btn-outline" onclick="app.openCourse('${courseId}')">Volver al índice</button>
                    <button class="btn-primary" onclick="app.showToast('¡Lección completada con éxito!')">Marcar y continuar</button>
                </div>
            </div>
        `;
    }

    // --- SISTEMA DE EXÁMENES ---
    startExam(type, courseId, examId) {
        this.activeExam = { type, courseId, examId };
        this.examCurrentQuestion = 0;
        this.examAnswers = [];

        const questions = this.questionBanks[examId] || [];
        if (questions.length === 0) {
            alert('No hay preguntas configuradas para este examen.');
            return;
        }

        // Barajar preguntas aleatoriamente
        this.activeExam.questions = [...questions].sort(() => Math.random() - 0.5);

        this.navigateTo('view-exam');
        this.renderExamQuestion();
    }

    renderExamQuestion() {
        const body = document.getElementById('examBody');
        const qList = this.activeExam.questions;
        const idx = this.examCurrentQuestion;
        const total = qList.length;

        if (idx >= total) {
            this.finishExam();
            return;
        }

        const currentQ = qList[idx];
        const progressPct = Math.round((idx / total) * 100);
        document.getElementById('examProgressBarFill').style.width = `${progressPct}%`;
        document.getElementById('examTitle').textContent = `Pregunta ${idx + 1} de ${total}`;

        let optionsHtml = '';
        currentQ.options.forEach((opt, oIdx) => {
            optionsHtml += `
                <div class="option-item" onclick="app.selectExamOption(${oIdx})" id="opt-${oIdx}">
                    ${opt}
                </div>
            `;
        });

        body.innerHTML = `
            <div class="question-box">
                <h3>${currentQ.q}</h3>
                <div class="options-list">
                    ${optionsHtml}
                </div>
                <button class="btn-primary btn-block" id="nextExamBtn" onclick="app.nextExamQuestion()" disabled>Siguiente pregunta</button>
            </div>
        `;
    }

    selectExamOption(optIndex) {
        document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
        const selectedEl = document.getElementById(`opt-${optIndex}`);
        if (selectedEl) selectedEl.classList.add('selected');

        this.examAnswers[this.examCurrentQuestion] = optIndex;
        document.getElementById('nextExamBtn').removeAttribute('disabled');
    }

    nextExamQuestion() {
        this.examCurrentQuestion++;
        this.renderExamQuestion();
    }

    finishExam() {
        const qList = this.activeExam.questions;
        let correctCount = 0;

        qList.forEach((q, i) => {
            if (this.examAnswers[i] === q.correct) {
                correctCount++;
            }
        });

        // Porcentaje exacto de 1% a 100%
        const scorePercent = Math.round((correctCount / qList.length) * 100);
        const passed = scorePercent >= 70; // Mínimo 70% para aprobar

        const courseId = this.activeExam.courseId;
        const examId = this.activeExam.examId;
        const type = this.activeExam.type;

        if (!this.currentUser.progress[courseId]) {
            this.currentUser.progress[courseId] = { completedLessons: [], passedModules: [], passedFinal: false, moduleScores: {} };
        }

        if (passed) {
            if (type === 'module') {
                if (!this.currentUser.progress[courseId].passedModules.includes(examId)) {
                    this.currentUser.progress[courseId].passedModules.push(examId);
                }
            } else if (type === 'final') {
                this.currentUser.progress[courseId].passedFinal = true;
            }
        }
        this.currentUser.progress[courseId].moduleScores[examId] = scorePercent;
        this.saveUsersDB();

        document.getElementById('examProgressBarFill').style.width = '100%';
        const body = document.getElementById('examBody');

        body.innerHTML = `
            <div class="exam-results-box animate-fade">
                <h2>${passed ? '¡Felicitaciones! Has aprobado' : 'No alcanzaste el puntaje mínimo'}</h2>
                <div class="score-display">${scorePercent}%</div>
                <p>Aciertos: ${correctCount} de ${qList.length} (${passed ? 'Aprobado con éxito' : 'Necesitas al menos 70% para aprobar'}).</p>
                <div style="display: flex; gap: 16px; justify-content: center; margin-top: 30px;">
                    <button class="btn-outline" onclick="app.startExam('${type}', '${courseId}', '${examId}')">Reintentar examen</button>
                    ${passed && type === 'final' ? `<button class="btn-primary" onclick="app.openCertificateModal('${courseId}')">Ver certificado</button>` : ''}
                    <button class="btn-primary" onclick="app.openCourse('${courseId}')">Volver al curso</button>
                </div>
            </div>
        `;
    }

    // --- CERTIFICADOS Y MODALES ---
    openCertificateModal(courseId) {
        const course = this.coursesData.find(c => c.id === courseId);
        if (!course) return;

        document.getElementById('certUserName').textContent = this.currentUser.username.toUpperCase();
        document.getElementById('certCourseName').textContent = course.title;
        document.getElementById('certScore').textContent = (this.currentUser.progress[courseId]?.moduleScores[course.finalExamId] || 100) + '%';
        document.getElementById('certDate').textContent = new Date().toLocaleDateString();

        document.getElementById('certificateModal').classList.add('active');
    }

    closeCertificateModal() {
        document.getElementById('certificateModal').classList.remove('active');
    }

    openAuthModal(mode) {
        this.authMode = mode;
        const title = document.getElementById('authModalTitle');
        const submitBtn = document.getElementById('authSubmitBtn');
        const switchText = document.getElementById('authSwitchText');
        const switchLink = document.getElementById('authSwitchLink');

        if (mode === 'login') {
            title.textContent = 'Iniciar sesión';
            submitBtn.textContent = 'Ingresar';
            switchText.textContent = '¿No tienes cuenta?';
            switchLink.textContent = 'Regístrate aquí';
        } else {
            title.textContent = 'Crear cuenta';
            submitBtn.textContent = 'Registrarse';
            switchText.textContent = '¿Ya tienes cuenta?';
            switchLink.textContent = 'Inicia sesión aquí';
        }

        document.getElementById('authModal').classList.add('active');
    }

    closeAuthModal() {
        document.getElementById('authModal').classList.remove('active');
    }

    toggleAuthMode() {
        this.authMode = this.authMode === 'login' ? 'register' : 'login';
        this.openAuthModal(this.authMode);
    }

    handleAuthSubmit(e) {
        e.preventDefault();
        const u = document.getElementById('authUsername').value;
        const p = document.getElementById('authPassword').value;
        this.login(u, p);
    }

    openHelpModal() {
        document.getElementById('helpModal').classList.add('active');
    }

    closeHelpModal() {
        document.getElementById('helpModal').classList.remove('active');
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text) return;

        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML += `<div class="chat-msg user">${text}</div>`;
        input.value = '';

        setTimeout(() => {
            let botReply = '¡Excelente consulta culinaria! Recuerda seguir las proporciones exactas de agua y fuego lento para asegurar resultados perfectos en netacocina.';
            const lower = text.toLowerCase();
            if (lower.includes('arroz')) {
                botReply = 'Para el arroz blanco recuerda 2 tazas de agua por 1 de arroz y 15 minutos de cocción a fuego mínimo con olla tapada.';
            } else if (lower.includes('carne') || lower.includes('napolitano')) {
                botReply = 'La salsa napolitana requiere tomates triturados, ajo en aceite de oliva y albahaca fresca con cocción lenta.';
            } else if (lower.includes('examen')) {
                botReply = 'Los exámenes de módulo constan de 10 preguntas y necesitas un 70% o más para desbloquear los siguientes niveles.';
            }
            chatBox.innerHTML += `<div class="chat-msg bot">${botReply}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 600);
    }

    handleChatKey(e) {
        if (e.key === 'Enter') this.sendChatMessage();
    }

    toggleNotifDropdown() {
        document.getElementById('notifDropdown').classList.toggle('active');
    }

    goToPromoCourse() {
        this.openCourse('course-2');
    }

    exitExam() {
        if (confirm('¿Seguro que deseas salir del examen? Se perderá el avance actual.')) {
            this.navigateTo('course-player');
        }
    }

    showToast(message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = (target >= 1000 ? '+' + (target/1000).toFixed(1) + 'k' : (target === 97 ? '97%' : (target === 50 ? '+50' : target)));
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        });
    }
}

// Inicializar la aplicación global
const app = new NetacocinaApp();