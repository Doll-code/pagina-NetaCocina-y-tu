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
        this.activeExam = null;
        this.examCurrentQuestion = 0;
        this.examAnswers = [];
        this.authMode = 'login';

        // Cursos con VIDEOS Y FOTOGRAFÍAS ESTABLES
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
                                title: '1.1 Ingredientes, lavado y proporciones exactas',
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cutting-vegetables-in-a-kitchen-42998-large.mp4',
                                text: 'El secreto del arroz blanco comienza con la proporción perfecta: por cada taza de arroz, se utilizan 2 tazas de agua. Es vital lavar el arroz previamente para eliminar el exceso de almidón y evitar que quede pastoso.',
                                images: [
                                    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
                                    'https://images.unsplash.com/photo-1536304993881-ff6c93ffaef7?auto=format&fit=crop&w=600&q=80'
                                ]
                            },
                            {
                                id: 'l2-m1-c1',
                                title: '1.2 Cocción a fuego bajo y reposo final',
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pan-frying-vegetables-in-a-kitchen-42999-large.mp4',
                                text: 'Una vez que el agua hierve y se reduce al nivel del arroz, se debe tapar herméticamente y bajar el fuego al mínimo por 15 minutos. El reposo final de 5 minutos sin destapar logra que los granos queden sueltos.',
                                images: [
                                    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
                                    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80'
                                ]
                            }
                        ],
                        hasExam: true,
                        examId: 'exam-c1-m1'
                    },
                    {
                        id: 'm2-c1',
                        title: 'Módulo 2: Arroz con pollo paso a paso',
                        lessons: [
                            {
                                id: 'l1-m2-c1',
                                title: '2.1 Marinado, sazón y dorado del pollo',
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-chef-cooking-with-a-pan-43001-large.mp4',
                                text: 'Sazona el pollo con ajo, comino, sal y pimienta. Dóralo profundamente en la olla para sellar sus jugos y dejar un fondo dorado que impregnará todo el arroz de sabor.',
                                images: [
                                    'https://images.unsplash.com/photo-1604908176997-125f2596f37c?auto=format&fit=crop&w=600&q=80',
                                    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
                                ]
                            },
                            {
                                id: 'l2-m2-c1',
                                title: '2.2 Integración del arroz, verduras y cocción',
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-preparing-a-dish-in-a-restaurant-kitchen-43003-large.mp4',
                                text: 'Agrega zanahoria, guisantes, pimiento y caldo de pollo concentrado. Mezcla con el arroz de forma envolvente y cocina a fuego bajo hasta conseguir el punto perfecto.',
                                images: [
                                    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
                                    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
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
                                title: 'Punto 1 y 2: La salsa napolitana y sus ingredientes',
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-pasta-in-a-pan-43005-large.mp4',
                                text: 'Usa tomates maduros triturados, ajo sofrito en aceite de oliva, albahaca fresca y una pizca de azúcar para nivelar la acidez. Sofríe a fuego medio por 15 minutos.',
                                images: [
                                    'https://images.unsplash.com/photo-1598866594230-a7d12756260f?auto=format&fit=crop&w=600&q=80',
                                    'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=600&q=80'
                                ]
                            },
                            {
                                id: 'l2-m1-c2',
                                title: 'Punto 3 y 4: Sazón de carne molida y servido',
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-sauce-on-pasta-43007-large.mp4',
                                text: 'Sella la carne molida de res con orégano y un toque de vino tinto. Une con la salsa napolitana y sirve acompañada de polenta cremosa o pasta al dente.',
                                images: [
                                    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
                                    'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=600&q=80'
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
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-preparing-healthy-food-in-a-kitchen-43010-large.mp4',
                                text: 'La cocina auténtica nace de la memoria y la identidad. Rompe con los cánones estrictos y abraza los sabores caseros que verdaderamente te definen.',
                                images: ['https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80']
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
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-chef-cooking-43012-large.mp4',
                                text: 'No intentes imitar fotos perfectas de redes sociales. Disfruta el proceso creativo sin compararte con nadie.',
                                images: ['https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80']
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
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-expert-chef-cooking-in-a-kitchen-43015-large.mp4',
                                text: 'Combina ingredientes de forma totalmente libre y plasma tu sello personal en cada platillo.',
                                images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80']
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
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-baking-sweet-desserts-in-a-kitchen-43018-large.mp4',
                                text: 'Mezcla harina, huevo, leche y azúcar. Cocina en sartén antiadherente tapada a fuego muy bajo.',
                                images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80']
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
                                title: '2.1 Técnicas de volteo y caramelo express',
                                videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-preparing-pancakes-on-a-pan-43020-large.mp4',
                                text: 'Voltea tus panqueques al ver burbujas y acompáñalos con un caramelo rápido de sartén.',
                                images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80']
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

        // Bancos de preguntas para exámenes
        this.questionBanks = {
            'exam-c1-m1': [
                { q: '¿Cuál es la proporción recomendada de agua por cada taza de arroz blanco?', options: ['1 taza', '1.5 tazas', '2 tazas', '3 tazas'], correct: 2 },
                { q: '¿Por qué es importante lavar el arroz antes de cocinarlo?', options: ['Para calentarlo', 'Para eliminar el exceso de almidón', 'Para teñirlo', 'Para salarlo'], correct: 1 },
                { q: '¿A qué intensidad de fuego se cocina el arroz una vez que hierve?', options: ['Fuego máximo', 'Fuego medio', 'Fuego mínimo', 'Sin fuego'], correct: 2 },
                { q: '¿Cuánto tiempo aproximado de cocción requiere a fuego bajo?', options: ['5 minutos', '10 minutos', '15 minutos', '40 minutos'], correct: 2 },
                { q: '¿Se debe destapar el arroz inmediatamente al apagar el fuego?', options: ['Sí, para que escape el vapor', 'No, requiere reposo de 5 minutos sin destapar', 'Sí, para revolverlo', 'No importa'], correct: 1 },
                { q: '¿Qué utensilio es clave?', options: ['Sartén abierta', 'Olla con tapa hermética', 'Colador', 'Licuadora'], correct: 1 },
                { q: '¿Qué ingrediente adicional se suele añadir al agua?', options: ['Aceite o mantequilla', 'Vinagre', 'Azúcar', 'Café'], correct: 0 },
                { q: 'Si el arroz queda un poco duro, ¿qué hacer?', options: ['Botarlo', 'Añadir 2 cucharadas de agua caliente y dar 3 min a fuego bajo', 'Congelarlo', 'Meter al refrigerador'], correct: 1 },
                { q: '¿Cuál es el estado ideal del grano al servir?', options: ['Pegajoso', 'Suelto y brillante', 'Tostado oscuro', 'Líquido'], correct: 1 },
                { q: '¿Qué indica olor a quemado?', options: ['Está perfecto', 'El fuego estuvo muy alto', 'Faltó sal', 'Es normal'], correct: 1 }
            ],
            'exam-c1-m2': [
                { q: '¿Qué especias marinan el pollo del arroz con pollo?', options: ['Ajo, comino, sal y pimienta', 'Canela y vainilla', 'Azúcar', 'Limón solo'], correct: 0 },
                { q: '¿Por qué se dora el pollo primero?', options: ['Para quemarlo', 'Para concentrar los jugos (fondos) de sabor', 'Para enfriarlo', 'Para quitar la piel'], correct: 1 },
                { q: '¿Qué vegetales acompañan tradicionalmente al arroz con pollo?', options: ['Zanahoria, guisantes y pimiento', 'Manzana y fresa', 'Lechuga', 'Pepino'], correct: 0 },
                { q: '¿Qué líquido aporta el sabor principal al cocinar el grano?', options: ['Café', 'Caldo de pollo concentrado', 'Gaseosa', 'Jugo de naranja'], correct: 1 },
                { q: '¿Cómo se mezcla el arroz con el pollo?', options: ['Bruscamente', 'Envolvente para no romper los granos', 'Licuándolo', 'No se mezcla'], correct: 1 },
                { q: '¿Qué condimento da color tradicional?', options: ['Cúrcuma o ají', 'Mayonesa', 'Mostaza', 'Salsa dulce'], correct: 0 },
                { q: '¿Cuál es el punto del pollo al integrarlo?', options: ['Crudo', 'Dorado por fuera y jugoso por dentro', 'Seco', 'Quemado'], correct: 1 },
                { q: '¿A qué fuego se finaliza la cocción?', options: ['Fuego bajo', 'Fuego máximo', 'Sin fuego', 'Microondas'], correct: 0 },
                { q: '¿Por qué se deja reposar el plato?', options: ['Para que enfríe', 'Para asentar los sabores y absorber jugos', 'Para endurecer', 'No se reposa'], correct: 1 },
                { q: '¿Con qué se decora al servir?', options: ['Cilantro o perejil fresco', 'Eucalipto', 'Chocolate', 'Queso azul'], correct: 0 }
            ],
            'exam-c1-final': [
                { q: '¿Proporción de agua para el arroz blanco?', options: ['1 a 1', '2 tazas de agua por 1 de arroz', '4 tazas', 'Media taza'], correct: 1 },
                { q: '¿Por qué se lava el arroz?', options: ['Quitar almidón', 'Pintarlo', 'Calentarlo', 'Salarlo'], correct: 0 },
                { q: '¿Tiempo de reposo final del arroz blanco?', options: ['1 min', '5 min', '1 hora', 'Ninguno'], correct: 1 },
                { q: '¿Primer paso con el pollo en Módulo 2?', options: ['Hervir en agua', 'Marinar y dorar', 'Licuar crudo', 'Congelar'], correct: 1 },
                { q: '¿Vegetales del arroz con pollo?', options: ['Zanahoria y guisantes', 'Manzana', 'Lechuga', 'Ninguno'], correct: 0 },
                { q: '¿Líquido principal en Módulo 2?', options: ['Caldo de pollo', 'Gaseosa', 'Té', 'Vinagre'], correct: 0 },
                { q: '¿Cómo se mezcla el arroz?', options: ['Envolvente', 'Con batidora', 'Bruscamente', 'Licuando'], correct: 0 },
                { q: '¿Fuego de cocción final?', options: ['Fuego bajo', 'Fuego alto', 'Intermitente', 'Sin calor'], correct: 0 },
                { q: '¿Hierba de decoración?', options: ['Cilantro o perejil', 'Césped', 'Orégano duro', 'Laurel'], correct: 0 },
                { q: '¿Propósito del marinado del pollo?', options: ['Dar sabor profundo', 'Enfriarlo', 'Ablandar la olla', 'Cambiar color'], correct: 0 },
                { q: '¿Error al cocinar arroz?', options: ['Destapar constantemente', 'Usar sal', 'Lavar el arroz', 'Usar agua'], correct: 0 },
                { q: '¿Tipo de olla ideal?', options: ['Tapa hermética', 'Plana', 'Taza', 'Bandeja'], correct: 0 },
                { q: '¿Qué aporta el dorado inicial?', options: ['Sabor base', 'Enfriamiento', 'Acidez', 'Color negro'], correct: 0 },
                { q: '¿Resultado de un buen plato?', options: ['Grano suelto y pollo jugoso', 'Pasta pegajosa', 'Pollo crudo', 'Sopa'], correct: 0 },
                { q: '¿Porcentaje para aprobar?', options: ['50%', '60%', '70%', '100%'], correct: 2 }
            ],
            'exam-c2-m1': [
                { q: 'Base de la salsa napolitana:', options: ['Tomates maduros triturados', 'Mayonesa', 'Leche', 'Soya'], correct: 0 },
                { q: 'Aceite recomendado para el sofrito:', options: ['Oliva virgen extra', 'Motor', 'Linaza', 'Ninguno'], correct: 0 },
                { q: 'Hierba esencial napolitana:', options: ['Albahaca fresca', 'Eucalipto', 'Menta', 'Romero'], correct: 0 },
                { q: 'Función del azúcar en la salsa:', options: ['Endulzar', 'Contrarrestar la acidez del tomate', 'Espesar', 'Pintar'], correct: 1 },
                { q: '¿Cómo se prepara la carne molida?', options: ['Se sella con orégano y vino tinto', 'Se hierve en agua', 'Se come cruda', 'Se licua'], correct: 0 },
                { q: 'Tiempo de cocción a fuego lento de la salsa:', options: ['2 min', '20 min', '5 horas', '10 seg'], correct: 1 },
                { q: 'Acompañamiento ideal:', options: ['Polenta o pasta al dente', 'Gelatina', 'Cereal', 'Pan con dulce'], correct: 0 },
                { q: 'Carne molida sugerida:', options: ['Res equilibrada en grasa', 'Congelada dura', 'Hueso molido', 'Grasa pura'], correct: 0 },
                { q: 'Vino opcional en el sofrito:', options: ['Vino tinto', 'Vino dulce', 'Cerveza', 'Ninguno'], correct: 0 },
                { q: 'Consistencia final ideal:', options: ['Líquida', 'Espesa y untuosa', 'Sólida', 'Separada'], correct: 1 }
            ],
            'exam-c2-final': [
                { q: 'Ingrediente principal napolitano:', options: ['Tomate maduro', 'Papa', 'Arroz', 'Pollo'], correct: 0 },
                { q: 'Grasa del sofrito:', options: ['Aceite de oliva', 'Aceite motor', 'Manteca', 'Agua'], correct: 0 },
                { q: 'Hierba clásica:', options: ['Albahaca', 'Césped', 'Perejil seco', 'Pimienta'], correct: 0 },
                { q: 'Función del azúcar:', options: ['Neutralizar acidez', 'Hacer caramelo', 'Endulzar', 'Salar'], correct: 0 },
                { q: 'Sellado de la carne:', options: ['Con orégano y vino tinto', 'Con agua fría', 'En microondas', 'Cruda'], correct: 0 },
                { q: 'Tiempo a fuego lento:', options: ['20 minutos', '1 minuto', '3 horas', '10 segundos'], correct: 0 },
                { q: 'Acompañamiento:', options: ['Polenta o pasta al dente', 'Helado', 'Sopa', 'Frutas'], correct: 0 },
                { q: 'Tipo de carne:', options: ['Res equilibrada', 'Hueso', 'Grasa', 'Pescado'], correct: 0 },
                { q: 'Vino utilizado:', options: ['Vino tinto', 'Ninguno', 'Vinagre', 'Café'], correct: 0 },
                { q: 'Textura final:', options: ['Espesa y untuosa', 'Líquida', 'Seca', 'Polvo'], correct: 0 },
                { q: 'Por qué triturar tomates:', options: ['Salsa homogénea', 'Jugo', 'Freír enteros', 'Congelar'], correct: 0 },
                { q: 'Función del ajo:', options: ['Aromatizar sofrito', 'Endulzar', 'Color azul', 'Enfriar'], correct: 0 },
                { q: 'Uso de albahaca:', options: ['Fresca preferiblemente', 'Prohibida', 'Explosiva', 'Sabe a jabón'], correct: 0 },
                { q: 'Temperatura de cocción:', options: ['Fuego lento', 'Fuego alto', 'Congelación', 'Ninguna'], correct: 0 },
                { q: 'Aprobación mínima:', options: ['70%', '50%', '30%', '100%'], correct: 0 }
            ],
            'exam-c3-final': [
                { q: '¿Qué busca este curso?', options: ['Fomentar la autenticidad culinaria', 'Copiar recetas', 'Comprar cosas caras', 'Seguir modas'], correct: 0 },
                { q: '¿Por qué valen los sabores de infancia?', options: ['Conectan con tu identidad', 'Es obligatorio', 'No cambian', 'Vender'], correct: 0 },
                { q: '¿Qué frena la creatividad?', options: ['Miedo al qué dirán y al error', 'Usar sal', 'Tener cocina limpia', 'Comprar tomates'], correct: 0 },
                { q: '¿Qué es un recetario libre?', options: ['Innovar sin moldes rígidos', 'Romper libros', 'No cocinar', 'Vender'], correct: 0 },
                { q: '¿Son obligatorias las modas en redes?', options: ['No, la cocina se basa en tu gusto', 'Sí siempre', 'Por ley', 'En verano'], correct: 0 },
                { q: '¿Cómo superar expectativas sociales?', options: ['Con confianza y experimentación', 'Dejar de comer', 'Comida rápida', 'Esconderse'], correct: 0 },
                { q: '¿Qué aporta la imperfección?', options: ['Carácter humano y autenticidad', 'Arruina todo', 'Tóxico', 'Nada'], correct: 0 },
                { q: '¿Por qué la cocina expresa personalidad?', options: ['Refleja quién eres', 'Es aburrida', 'Es examen', 'Para presumir'], correct: 0 },
                { q: '¿Actitud frente al error?', options: ['Aprender y adaptar', 'Abandonar', 'Llorar', 'Enojarte'], correct: 0 },
                { q: '¿Qué significa cocinar sin miedo?', options: ['Confiar en tu creatividad', 'Quemarlo todo', 'No usar guantes', 'A oscuras'], correct: 0 },
                { q: '¿De dónde nacen mejores recetas?', options: ['De la pasión y la prueba', 'De fábricas', 'De robots', 'De internet'], correct: 0 },
                { q: '¿Por qué ignorar estereotipos estéticos?', options: ['Sabor y bienestar superan la estética', 'No existen', 'Son feos', 'Gastar menos'], correct: 0 },
                { q: '¿Qué define a un buen cocinero casero?', options: ['Disfrute al alimentar', 'Tener 100 sartenes', 'Hablar francés', 'Gastar dinero'], correct: 0 },
                { q: '¿Valor de compartir tu plato?', options: ['Transmite tu esencia', 'Ninguno', 'Obligación', 'Competir'], correct: 0 },
                { q: '¿Nota para aprobar?', options: ['70%', '50%', '90%', '100%'], correct: 0 }
            ],
            'exam-c4-m1': [
                { q: 'Herramienta principal:', options: ['Sartén antiadherente con tapa', 'Olla a presión', 'Microondas', 'Parrilla'], correct: 0 },
                { q: 'Fuego para bizcocho en sartén:', options: ['Fuego muy bajo', 'Fuego alto', 'Intermitente', 'Sin fuego'], correct: 0 },
                { q: 'Mezcla básica:', options: ['Harina, huevo, azúcar y leche', 'Carne y tomate', 'Arroz y agua', 'Sal y pimienta'], correct: 0 },
                { q: '¿Por qué tapar la sartén?', options: ['Para que el vapor cocine la parte superior', 'Para enfriar', 'Para apagar fuego', 'Para nada'], correct: 0 },
                { q: '¿Cuándo retirar el bizcocho?', options: ['Superficie seca y bordes sueltos', 'Cuando esté negro', 'Al minuto 1', 'Nunca'], correct: 0 }
            ],
            'exam-c4-m2': [
                { q: 'Panqueques ideales:', options: ['Esponjosos y dorados', 'Duros como piedra', 'Salados', 'Verdes'], correct: 0 },
                { q: 'Acompañamiento dulce:', options: ['Caramelo o frutos rojos', 'Salsa napolitana', 'Queso azul', 'Ajo'], correct: 0 },
                { q: 'Grasa para la sartén:', options: ['Mantequilla o aceite', 'Agua', 'Arena', 'Hielo'], correct: 0 },
                { q: '¿Cuándo voltear el panqueque?', options: ['Al salir burbujas en la superficie', 'Al inicio', 'Al quemarse', 'Nunca'], correct: 0 },
                { q: 'Ventaja principal:', options: ['Sin horno y rápido', 'Tarda 5 horas', 'Es costoso', 'Es imposible'], correct: 0 }
            ],
            'exam-c4-final': [
                { q: 'Herramienta clave:', options: ['Sartén antiadherente', 'Horno de leña', 'Batidora industrial', 'Parrilla'], correct: 0 },
                { q: 'Fuego idóneo:', options: ['Fuego mínimo', 'Fuego máximo', 'Fuego alto', 'Directo'], correct: 0 },
                { q: 'Base del bizcocho:', options: ['Harina, huevos, azúcar y leche', 'Tomate y albahaca', 'Pollo y arroz', 'Carne molida'], correct: 0 },
                { q: 'Función de la tapa:', options: ['Cocción por calor envolvente', 'Guardar sartén', 'Enfriar', 'Pesar'], correct: 0 },
                { q: 'Evitar grumos:', options: ['Integrando bien secos con líquidos', 'Piedras', 'Congelar', 'Sal'], correct: 0 },
                { q: 'Salsa ideal:', options: ['Frutos rojos o caramelo', 'Napolitana', 'Soya', 'César'], correct: 0 },
                { q: 'Grasa antiadherente:', options: ['Mantequilla o aceite', 'Agua', 'Vinagre', 'Alcohol'], correct: 0 },
                { q: 'Momento de voltear panqueque:', options: ['Salida de burbujas', 'Segundo cero', 'Nunca', 'Cuando esté negro'], correct: 0 },
                { q: 'Mayor beneficio:', options: ['Rapidez y no usar horno', 'Alto costo', 'Dificultad', 'Demora'], correct: 0 },
                { q: 'Nota para aprobar:', options: ['70%', '50%', '30%', '100%'], correct: 0 },
                { q: 'Textura de la mezcla:', options: ['Homogénea y fluida', 'Líquida agua', 'Roca', 'Polvo'], correct: 0 },
                { q: 'Impulsor de esponjosidad:', options: ['Polvo de hornear', 'Sal', 'Pimienta', 'Vinagre'], correct: 0 },
                { q: 'Caramelo express:', options: ['Fundiendo azúcar en sartén', 'Imposible', 'Solo en horno', 'Con hielo'], correct: 0 },
                { q: 'Cuidado del caramelo:', options: ['Calor moderado atento', 'Frío', 'Fuego máximo solo', 'Microondas'], correct: 0 },
                { q: '¿Por qué gustan estos postres?', options: ['Por accesibilidad y sabor', 'Por difíciles', 'Saben mal', 'Aburridos'], correct: 0 }
            ]
        };

        this.init();
    }

   init() {
        this.loadUsersDB();
        this.checkExistingSession();
        history.replaceState({ view: 'home' }, '', '#home'); // <--- Agrega esta línea aquí
        this.renderCatalog();
        this.setupEventListeners();
        this.animateCounters();
    }

    loadUsersDB() {
        const savedDB = localStorage.getItem('netacocina_usersDB');
        if (savedDB) {
            this.usersDB = JSON.parse(savedDB);
        } else {
            this.usersDB = {
                'juan': {
                    username: 'juan',
                    password: '12345juan',
                    progress: {}
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
            if (authContainer) authContainer.style.display = 'none';
            if (profileMenu) profileMenu.style.display = 'flex';
            if (avatarText) avatarText.textContent = this.currentUser.username.charAt(0).toUpperCase();
            if (nameDisplay) nameDisplay.textContent = this.currentUser.username;
        } else {
            if (authContainer) authContainer.style.display = 'flex';
            if (profileMenu) profileMenu.style.display = 'none';
        }
    }

    navigateTo(viewName, pushHistory = true) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const target = document.getElementById(`view-${viewName}`);
        if (target) {
            target.classList.add('active');
            this.currentView = viewName;
            window.scrollTo(0, 0);

            if (pushHistory) {
                history.pushState({ view: viewName }, '', `#${viewName}`);
            }

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
        const navCenter = document.getElementById('navCenter');
        if (navCenter) navCenter.classList.remove('active');
    }

   setupEventListeners() {
        const hamburger = document.getElementById('hamburgerBtn');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                const navCenter = document.getElementById('navCenter');
                if (navCenter) navCenter.classList.toggle('active');
            });
        }

        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view) {
                this.navigateTo(e.state.view, false);
            } else {
                this.navigateTo('home', false);
            }
        });
    }

    renderCatalog() {
        const homeGrid = document.getElementById('homeCoursesGrid');
        const fullGrid = document.getElementById('fullCatalogGrid');
        
        let html = '';
        this.coursesData.forEach(course => {
            const prog = this.getCourseProgressPercent(course.id);
            html += `
                <div class="course-card">
                    <div class="course-card-img">
                        <img src="${course.image}" alt="${course.title}" onerror="this.src='https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80'">
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
            if (gridBtn) gridBtn.classList.add('active');
            if (listBtn) listBtn.classList.remove('active');
            if (fullGrid) fullGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        } else {
            if (listBtn) listBtn.classList.add('active');
            if (gridBtn) gridBtn.classList.remove('active');
            if (fullGrid) fullGrid.style.gridTemplateColumns = '1fr';
        }
    }

    renderMyLearning() {
        const container = document.getElementById('myLearningCoursesList');
        if (!this.currentUser || !container) return;

        let html = '';
        this.coursesData.forEach(course => {
            const prog = this.getCourseProgressPercent(course.id);
            html += `
                <div class="my-course-row">
                    <img src="${course.image}" alt="${course.title}" class="my-course-img" onerror="this.src='https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80'">
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
        if (!listContainer) return;
        
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

    openCourse(courseId) {
        if (!this.currentUser) {
            this.openAuthModal('login');
            this.showToast('Inicia sesión para acceder a los cursos');
            return;
        }
        this.activeCourseId = courseId;
        const course = this.coursesData.find(c => c.id === courseId);
        if (!course) return;

        const titleEl = document.getElementById('playerCourseTitle');
        if (titleEl) titleEl.textContent = course.title;
        this.renderAccordionModules(course);
        this.showCourseWelcomeState(course);
        this.navigateTo('course-player');
    }

    showCourseWelcomeState(course) {
        const mainContent = document.getElementById('playerMainContent');
        if (!mainContent) return;
        const firstLesson = course.modules[0]?.lessons[0];

        mainContent.innerHTML = `
            <div class="player-welcome-state">
                <img src="${course.image}" alt="${course.title}" onerror="this.src='https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80'">
                <h2>Bienvenido a ${course.title}</h2>
                <p>Haz clic en cualquier lección del menú de la izquierda para comenzar tus clases interactivas con video, teoría e imágenes.</p>
                ${firstLesson ? `<button class="btn-primary btn-lg" style="margin-top:20px;" onclick="app.loadLesson('${course.id}', '${firstLesson.id}')">Comenzar primera lección</button>` : ''}
            </div>
        `;
    }

    resetCourseState() {
        if (this.activeCourseId) {
            const course = this.coursesData.find(c => c.id === this.activeCourseId);
            if (course) {
                this.renderAccordionModules(course);
                this.showCourseWelcomeState(course);
                return;
            }
        }
        this.navigateTo('learning');
    }

    renderAccordionModules(course) {
        const accordion = document.getElementById('accordionModules');
        if (!accordion) return;
        const progData = this.currentUser.progress[course.id] || { completedLessons: [], passedModules: [], passedFinal: false };

        let html = '';
        course.modules.forEach((mod, mIndex) => {
            let isLocked = false;
            if (mIndex > 0) {
                const prevMod = course.modules[mIndex - 1];
                if (prevMod.hasExam && !progData.passedModules?.includes(prevMod.examId)) {
                    isLocked = true;
                }
            }

            let lessonsHtml = '';
            mod.lessons.forEach((lesson) => {
                const isCompleted = progData.completedLessons?.includes(lesson.id);
                lessonsHtml += `
                    <div class="lesson-item ${isLocked ? 'locked' : ''} ${this.activeLessonId === lesson.id ? 'active' : ''}" 
                         onclick="${isLocked ? `alert('Completa el examen del módulo anterior para desbloquear este nivel.')` : `app.loadLesson('${course.id}', '${lesson.id}')`}">
                        <span>${lesson.title}</span>
                        <span>${isCompleted ? '✅' : '▶'}</span>
                    </div>
                `;
            });

            if (mod.hasExam) {
                const passedExam = progData.passedModules?.includes(mod.examId);
                lessonsHtml += `
                    <div class="lesson-item ${isLocked ? 'locked' : ''}" style="color: var(--accent-orange);" 
                         onclick="${isLocked ? `alert('Módulo bloqueado.')` : `app.startExam('module', '${course.id}', '${mod.examId}')`}">
                        <span>📝 Examen del Módulo</span>
                        <span>${passedExam ? '✅ Aprobado' : '🔓 Presentar'}</span>
                    </div>
                `;
            }

            html += `
                <div class="module-accordion-item">
                    <div class="module-accordion-header" onclick="app.toggleAccordion(this)">
                        <div class="module-title-wrap">
                            <h4>${mod.title}</h4>
                            <span class="module-meta-info">${mod.lessons.length} lecciones ${isLocked ? '🔒 (Bloqueado)' : ''}</span>
                        </div>
                        <span>&#9662;</span>
                    </div>
                    <div class="module-lessons-list ${mIndex === 0 ? 'open' : ''}">
                        ${lessonsHtml}
                    </div>
                </div>
            `;
        });

        if (course.hasFinalExam) {
            let canTakeFinal = true;
            course.modules.forEach(m => {
                if (m.hasExam && !progData.passedModules?.includes(m.examId)) {
                    canTakeFinal = false;
                }
            });

            const passedFinalExam = progData.passedFinal;
            html += `
                <div class="module-accordion-item">
                    <div class="module-accordion-header" style="background: rgba(245, 158, 11, 0.15);" 
                         onclick="${canTakeFinal ? `app.startExam('final', '${course.id}', '${course.finalExamId}')` : `alert('Debes aprobar el examen de los módulos anteriores para desbloquear el examen final.')`}">
                        <div class="module-title-wrap">
                            <h4 style="color: var(--accent-orange);">🏆 Examen Final del Curso</h4>
                            <span class="module-meta-info">${canTakeFinal ? '¡Disponible ahora!' : '🔒 Bloqueado por módulos'}</span>
                        </div>
                        <span>${passedFinalExam ? '✅ Aprobado' : '📝 Presentar'}</span>
                    </div>
                </div>
            `;
        }

        accordion.innerHTML = html;
    }

    toggleAccordion(headerEl) {
        const list = headerEl.nextElementSibling;
        if (list) list.classList.toggle('open');
    }

    loadLesson(courseId, lessonId) {
        this.activeLessonId = lessonId;
        const course = this.coursesData.find(c => c.id === courseId);
        let lesson = null;
        let lessonModule = null;

        course.modules.forEach(m => {
            const found = m.lessons.find(l => l.id === lessonId);
            if (found) {
                lesson = found;
                lessonModule = m;
            }
        });

        if (!lesson) return;

        if (!this.currentUser.progress[courseId]) {
            this.currentUser.progress[courseId] = { completedLessons: [], passedModules: [], passedFinal: false, moduleScores: {} };
        }
        if (!this.currentUser.progress[courseId].completedLessons.includes(lessonId)) {
            this.currentUser.progress[courseId].completedLessons.push(lessonId);
            this.saveUsersDB();
        }

        this.renderAccordionModules(course);

        let imagesHtml = '';
        if (lesson.images) {
            lesson.images.forEach(img => {
                imagesHtml += `<img src="${img}" alt="Fotografía didáctica de alta retención" onerror="this.src='https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80'">`;
            });
        }

        const allLessons = [];
        lessonModule.lessons.forEach(l => allLessons.push(l));
        const currentIndex = allLessons.findIndex(l => l.id === lessonId);
        const nextLesson = allLessons[currentIndex + 1];

        const mainContent = document.getElementById('playerMainContent');
        if (!mainContent) return;

        mainContent.innerHTML = `
            <div class="lesson-content-box animate-fade">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                    <button class="btn-outline" onclick="app.resetCourseState()">&larr; Volver al índice del curso</button>
                    <span style="color: var(--primary-green); font-weight:600;">✅ Lección completada</span>
                </div>
                <h2>${lesson.title}</h2>
                <div class="lesson-video-wrapper">
                    <video class="simulated-video" controls>
                        <source src="${lesson.videoUrl}" type="video/mp4">
                        Tu navegador no soporta reproducción de video.
                    </video>
                </div>
                <p>${lesson.text}</p>
                <h4 style="margin-top: 24px; margin-bottom: 12px; color: #fff;">Imágenes clave de alta retención:</h4>
                <div class="lesson-images-grid">
                    ${imagesHtml}
                </div>
                <div class="lesson-footer-actions">
                    <button class="btn-outline" onclick="app.resetCourseState()">Índice</button>
                    ${nextLesson ? 
                        `<button class="btn-primary" onclick="app.loadLesson('${courseId}', '${nextLesson.id}')">Siguiente lección &rarr;</button>` : 
                        (lessonModule.hasExam ? 
                            `<button class="btn-primary" style="background:var(--accent-orange)" onclick="app.startExam('module', '${courseId}', '${lessonModule.examId}')">Presentar Examen de Módulo &rarr;</button>` : 
                            `<button class="btn-primary" onclick="app.resetCourseState()">Finalizar Módulo &rarr;</button>`)
                    }
                </div>
            </div>
        `;
    }

    startExam(type, courseId, examId) {
        this.activeExam = { type, courseId, examId };
        this.examCurrentQuestion = 0;
        this.examAnswers = [];

        const questions = this.questionBanks[examId] || [];
        if (questions.length === 0) {
            alert('No hay preguntas configuradas para este examen.');
            return;
        }

        this.activeExam.questions = [...questions].sort(() => Math.random() - 0.5);
        this.navigateTo('exam');
        this.renderExamQuestion();
    }

    renderExamQuestion() {
        const body = document.getElementById('examBody');
        if (!body) return;
        const qList = this.activeExam.questions;
        const idx = this.examCurrentQuestion;
        const total = qList.length;

        if (idx >= total) {
            this.finishExam();
            return;
        }

        const currentQ = qList[idx];
        const progressPct = Math.round((idx / total) * 100);
        const fillBar = document.getElementById('examProgressBarFill');
        if (fillBar) fillBar.style.width = `${progressPct}%`;
        const titleEl = document.getElementById('examTitle');
        if (titleEl) titleEl.textContent = `Pregunta ${idx + 1} de ${total}`;

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
        const nextBtn = document.getElementById('nextExamBtn');
        if (nextBtn) nextBtn.removeAttribute('disabled');
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

        const scorePercent = Math.round((correctCount / qList.length) * 100);
        const passed = scorePercent >= 70;

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

        const fillBar = document.getElementById('examProgressBarFill');
        if (fillBar) fillBar.style.width = '100%';
        const body = document.getElementById('examBody');
        if (!body) return;

        body.innerHTML = `
            <div class="exam-results-box animate-fade">
                <h2>${passed ? '¡Felicitaciones! Has aprobado' : 'No alcanzaste el puntaje mínimo'}</h2>
                <div class="score-display">${scorePercent}%</div>
                <p>Aciertos: ${correctCount} de ${qList.length} (${passed ? 'Examen aprobado con éxito' : 'Mínimo requerido: 70%'}).</p>
                <div style="display: flex; gap: 16px; justify-content: center; margin-top: 30px;">
                    <button class="btn-outline" onclick="app.startExam('${type}', '${courseId}', '${examId}')">Reintentar examen</button>
                    ${passed && type === 'final' ? `<button class="btn-primary" onclick="app.openCertificateModal('${courseId}')">Ver certificado</button>` : ''}
                    <button class="btn-primary" onclick="app.openCourse('${courseId}')">Volver al curso</button>
                </div>
            </div>
        `;
    }

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
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML += `<div class="chat-msg user">${text}</div>`;
        input.value = '';

        setTimeout(() => {
            let botReply = '¡Excelente consulta! Recuerda seguir las proporciones exactas y usar fuego lento para asegurar grandes resultados en netacocina.';
            const lower = text.toLowerCase();
            if (lower.includes('arroz')) {
                botReply = 'Para el arroz blanco recuerda 2 tazas de agua por 1 de arroz y 15 minutos a fuego mínimo con olla tapada.';
            } else if (lower.includes('carne') || lower.includes('napolitano')) {
                botReply = 'La salsa napolitana requiere tomates triturados, ajo en aceite de oliva y albahaca fresca.';
            } else if (lower.includes('examen')) {
                botReply = 'Los exámenes requieren 70% para aprobar y desbloquear el siguiente nivel.';
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
        if (confirm('¿Seguro que deseas salir del examen?')) {
            this.navigateTo('course-player');
        }
    }

    showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
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

const app = new NetacocinaApp();
