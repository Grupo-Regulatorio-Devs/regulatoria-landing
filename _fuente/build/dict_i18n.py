# -*- coding: utf-8 -*-
"""ES -> (EN, PT) dictionary for gruporegulatorio.cl

NOT translated (left as-is):
  · acronyms and agencies: SAG, SENASA, ANVISA, IBAMA, MAPA, ICA, COFEPRIS, EPA, ECHA, EFSA
  · standards and tech    : GLP, OECD, GHS, CLP, CADRI, ISO 27001, AES-256, TLS 1.3, QSAR, RBAC
  · agent names           : COMPASS — The Navigator, etc. (already English, they are branding)
  · codes and products    : REG-CHL-2024-1021, Herbex 480 SC, OF-2024-1182…
Localization notes:
  · LMR -> EN "MRL" · PT keeps "LMR"
  · FDS -> EN "SDS" · PT "FISPQ"
"""

T = {

# ══════════════════════════ FAQ — answers ══════════════════════════
"RegulatorIA es una plataforma AI-native que automatiza el registro de agroquímicos y plaguicidas ante las autoridades regulatorias de LATAM. Combina 10 agentes de inteligencia artificial especializados —que cubren desde la estrategia regulatoria y la toxicología in silico hasta el armado del dossier y la vigilancia post-registro— con validación obligatoria de expertos regulatorios humanos antes de cada entrega.": (
 "RegulatorIA is an AI-native platform that automates the registration of agrochemicals and pesticides with LATAM regulatory authorities. It combines 10 specialised artificial intelligence agents —covering everything from regulatory strategy and in silico toxicology to dossier assembly and post-registration monitoring— with mandatory validation by human regulatory experts before every delivery.",
 "A RegulatorIA é uma plataforma AI-native que automatiza o registro de agroquímicos e agrotóxicos junto às autoridades regulatórias da América Latina. Combina 10 agentes de inteligência artificial especializados —que cobrem desde a estratégia regulatória e a toxicologia in silico até a montagem do dossiê e a vigilância pós-registro— com validação obrigatória de especialistas regulatórios humanos antes de cada entrega."),

"Una parte importante del plazo de un registro se va en preparar, revisar y corregir el expediente. RegulatorIA reduce hasta en un 80% los tiempos de esa etapa documental y de análisis: el armado del dossier, la revisión GLP/OECD y las respuestas a observaciones pasan de semanas a días. Los plazos de evaluación propios de cada autoridad no cambian, porque dependen del organismo.": (
 "A significant part of a registration timeline goes into preparing, reviewing and correcting the file. RegulatorIA cuts up to 80% of the time spent on that documentation and analysis stage: dossier assembly, GLP/OECD review and responses to objections go from weeks to days. Each authority's own evaluation timelines do not change, since they depend on the agency.",
 "Uma parte importante do prazo de um registro é gasta em preparar, revisar e corrigir o processo. A RegulatorIA reduz em até 80% os tempos dessa etapa documental e de análise: a montagem do dossiê, a revisão GLP/OECD e as respostas a exigências passam de semanas para dias. Os prazos de avaliação de cada autoridade não mudam, pois dependem do órgão."),

"La plataforma opera en Chile (SAG), Argentina (SENASA), Brasil (IBAMA/ANVISA/MAPA), Colombia (ICA), Perú (SENASA) y México (COFEPRIS/SENASICA). Además, el agente BRIDGE adapta dossiers a formatos internacionales como EPA (Estados Unidos), ECHA (Unión Europea) y ANVISA.": (
 "The platform operates in Chile (SAG), Argentina (SENASA), Brazil (IBAMA/ANVISA/MAPA), Colombia (ICA), Peru (SENASA) and Mexico (COFEPRIS/SENASICA). In addition, the BRIDGE agent adapts dossiers to international formats such as EPA (United States), ECHA (European Union) and ANVISA.",
 "A plataforma opera no Chile (SAG), Argentina (SENASA), Brasil (IBAMA/ANVISA/MAPA), Colômbia (ICA), Peru (SENASA) e México (COFEPRIS/SENASICA). Além disso, o agente BRIDGE adapta dossiês a formatos internacionais como EPA (Estados Unidos), ECHA (União Europeia) e ANVISA."),

"No. RegulatorIA funciona con un modelo HITL (Human-in-the-Loop): la IA hace el trabajo pesado de búsqueda, análisis, redacción y control de calidad, pero ningún documento se presenta ante una autoridad sin la revisión y firma de un experto regulatorio senior. El 100% de los entregables pasa por validación humana.": (
 "No. RegulatorIA runs on a HITL (Human-in-the-Loop) model: the AI does the heavy lifting of research, analysis, drafting and quality control, but no document is filed with an authority without the review and signature of a senior regulatory expert. 100% of deliverables go through human validation.",
 "Não. A RegulatorIA funciona com um modelo HITL (Human-in-the-Loop): a IA faz o trabalho pesado de pesquisa, análise, redação e controle de qualidade, mas nenhum documento é protocolado junto a uma autoridade sem a revisão e assinatura de um especialista regulatório sênior. 100% das entregas passam por validação humana."),

"RegulatorIA trabaja con los formatos y estándares exigidos en la región y fuera de ella: CADRI, GLP y directrices OECD, clasificación GHS y CLP (Reglamento CE 1272/2008), fichas de datos de seguridad (FDS/SDS) de 16 secciones, etiquetado en más de 30 idiomas, y los expedientes de SAG, SENASA, ICA, COFEPRIS, ANVISA, EPA y ECHA.": (
 "RegulatorIA works with the formats and standards required in the region and beyond: CADRI, GLP and OECD guidelines, GHS and CLP classification (EC Regulation 1272/2008), 16-section safety data sheets (SDS), labelling in over 30 languages, and the filing formats of SAG, SENASA, ICA, COFEPRIS, ANVISA, EPA and ECHA.",
 "A RegulatorIA trabalha com os formatos e padrões exigidos na região e fora dela: CADRI, GLP e diretrizes OECD, classificação GHS e CLP (Regulamento CE 1272/2008), fichas de informação de segurança (FISPQ/SDS) de 16 seções, rotulagem em mais de 30 idiomas, e os processos de SAG, SENASA, ICA, COFEPRIS, ANVISA, EPA e ECHA."),

"Los datos se manejan con seguridad de nivel enterprise: cifrado en tránsito y en reposo, aislamiento por cliente, control de acceso por roles y trazabilidad completa de cada acción sobre el expediente. La información técnica de tus moléculas y estudios no se usa para entrenar modelos ni se comparte con terceros.": (
 "Data is handled with enterprise-grade security: encryption in transit and at rest, per-client isolation, role-based access control and full traceability of every action on the file. The technical information on your molecules and studies is never used to train models nor shared with third parties.",
 "Os dados são tratados com segurança de nível enterprise: criptografia em trânsito e em repouso, isolamento por cliente, controle de acesso por perfis e rastreabilidade completa de cada ação sobre o processo. As informações técnicas das suas moléculas e estudos não são usadas para treinar modelos nem compartilhadas com terceiros."),

"Sí. Ese es precisamente el trabajo del agente BRIDGE: toma un dossier ya aprobado y lo adapta al país de destino, identificando qué estudios se pueden reciclar, cuáles hay que complementar y qué equivalencias aplican entre normativas. Esto evita repetir estudios costosos y acorta significativamente el segundo y tercer registro.": (
 "Yes. That is exactly what the BRIDGE agent does: it takes an already-approved dossier and adapts it to the destination country, identifying which studies can be reused, which need supplementing and which equivalences apply between regulations. This avoids repeating expensive studies and significantly shortens the second and third registrations.",
 "Sim. É exatamente esse o trabalho do agente BRIDGE: pega um dossiê já aprovado e o adapta ao país de destino, identificando quais estudos podem ser reaproveitados, quais precisam ser complementados e quais equivalências se aplicam entre as normas. Isso evita repetir estudos caros e encurta significativamente o segundo e o terceiro registro."),

"Existe una modalidad de servicio gestionado pensada para startups agrotech y biotech sin equipo regulatorio propio. Un equipo de expertos senior, apoyado por la plataforma, se hace cargo del registro completo: estrategia, armado del dossier, presentación ante la autoridad, respuesta a observaciones y seguimiento posterior.": (
 "There is a managed-service option designed for agrotech and biotech startups without their own regulatory team. A team of senior experts, supported by the platform, takes charge of the entire registration: strategy, dossier assembly, filing with the authority, responses to objections and ongoing follow-up.",
 "Existe uma modalidade de serviço gerenciado pensada para startups de agrotech e biotech sem equipe regulatória própria. Uma equipe de especialistas sênior, apoiada pela plataforma, assume o registro completo: estratégia, montagem do dossiê, protocolo junto à autoridade, resposta a exigências e acompanhamento posterior."),

"Puedes solicitar una demo personalizada desde el formulario de esta página. Coordinamos una sesión en vivo con un experto regulatorio en menos de 48 horas, en la que revisamos tu producto concreto y te mostramos cómo la plataforma gestionaría su registro de principio a fin.": (
 "You can request a personalised demo from the form on this page. We arrange a live session with a regulatory expert within 48 hours, where we review your specific product and show you how the platform would handle its registration end to end.",
 "Você pode solicitar uma demonstração personalizada pelo formulário desta página. Agendamos uma sessão ao vivo com um especialista regulatório em menos de 48 horas, na qual revisamos o seu produto específico e mostramos como a plataforma conduziria o registro do início ao fim."),

# ══════════════════════════ FAQ — questions ══════════════════════════
"¿Qué es RegulatorIA y para qué sirve?": ("What is RegulatorIA and what is it for?", "O que é a RegulatorIA e para que serve?"),
"¿Cuánto tiempo toma registrar un agroquímico con RegulatorIA?": ("How long does it take to register an agrochemical with RegulatorIA?", "Quanto tempo leva para registrar um agroquímico com a RegulatorIA?"),
"¿En qué países puedo registrar productos con RegulatorIA?": ("In which countries can I register products with RegulatorIA?", "Em quais países posso registrar produtos com a RegulatorIA?"),
"¿La inteligencia artificial reemplaza al experto regulatorio?": ("Does artificial intelligence replace the regulatory expert?", "A inteligência artificial substitui o especialista regulatório?"),
"¿Qué normativas, formatos y agencias soporta la plataforma?": ("Which regulations, formats and agencies does the platform support?", "Quais normas, formatos e agências a plataforma suporta?"),
"¿Cómo se protege la confidencialidad de mis dossiers y datos?": ("How is the confidentiality of my dossiers and data protected?", "Como é protegida a confidencialidade dos meus dossiês e dados?"),
"¿Puedo reutilizar un dossier aprobado en Chile para registrar en otros países?": ("Can I reuse a dossier approved in Chile to register in other countries?", "Posso reaproveitar um dossiê aprovado no Chile para registrar em outros países?"),
"¿Qué pasa si mi empresa no tiene un área regulatoria?": ("What if my company has no regulatory department?", "E se a minha empresa não tiver uma área regulatória?"),
"¿Cómo empiezo a usar RegulatorIA?": ("How do I get started with RegulatorIA?", "Como começo a usar a RegulatorIA?"),

# ══════════════════════════ Hero / nav / CTA ══════════════════════════
"El software que": ("The software that", "O software que"),
"automatiza tu registro": ("automates your registration", "automatiza o seu registro"),
"de agroquímicos.": ("of agrochemicals.", "de agroquímicos."),
"10 agentes de IA especializados gestionan el ciclo completo de registro de plaguicidas. Validados por expertos regulatorios (HITL) y protegidos con seguridad enterprise.": (
 "10 specialised AI agents manage the full pesticide registration cycle. Validated by regulatory experts (HITL) and protected with enterprise-grade security.",
 "10 agentes de IA especializados gerenciam o ciclo completo de registro de agrotóxicos. Validados por especialistas regulatórios (HITL) e protegidos com segurança enterprise."),
"Plataforma AI-Native · Chile y LATAM": ("AI-Native Platform · Chile & LATAM", "Plataforma AI-Native · Chile e América Latina"),
"Obtén tu Demo Gratis →": ("Get your Free Demo →", "Solicite sua Demo Gratuita →"),
"Solicitar Demo Gratis →": ("Request Free Demo →", "Solicitar Demo Gratuita →"),
"Obtén tu Demo": ("Get a Demo", "Solicitar Demo"),
"Ver la plataforma": ("See the platform", "Ver a plataforma"),
"Sin contratos de largo plazo": ("No long-term contracts", "Sem contratos de longo prazo"),
"Seguridad enterprise": ("Enterprise security", "Segurança enterprise"),
"Experto regulatorio incluido": ("Regulatory expert included", "Especialista regulatório incluído"),
"Agentes IA especializados": ("Specialised AI agents", "Agentes de IA especializados"),
"Fases automatizadas": ("Automated phases", "Fases automatizadas"),
"Reducción de tiempos": ("Time reduction", "Redução de prazos"),
"Validación por expertos HITL": ("HITL expert validation", "Validação por especialistas HITL"),
"Plataforma": ("Platform", "Plataforma"),
"Comparativa": ("Comparison", "Comparativo"),
"Startups": ("Startups", "Startups"),
"Seguridad": ("Security", "Segurança"),
"Cobertura": ("Coverage", "Cobertura"),
"Videos": ("Videos", "Vídeos"),
"Idioma": ("Language", "Idioma"),

# ══════════════════════════ Dashboard / platform ══════════════════════════
"La Plataforma": ("The Platform", "A Plataforma"),
"Todo tu proceso regulatorio,": ("Your entire regulatory process,", "Todo o seu processo regulatório,"),
"en un solo dashboard.": ("in a single dashboard.", "em um único painel."),
"Gestiona dossiers, monitorea estados y recibe alertas de vencimiento — todo desde una interfaz diseñada para equipos regulatorios.": (
 "Manage dossiers, track statuses and get expiry alerts — all from an interface built for regulatory teams.",
 "Gerencie dossiês, acompanhe status e receba alertas de vencimento — tudo em uma interface feita para equipes regulatórias."),
"Demo interactiva · haz clic en un agente del menú": ("Interactive demo · click an agent in the menu", "Demo interativa · clique em um agente no menu"),
"Buscar dossiers, productos, países, agentes...": ("Search dossiers, products, countries, agents...", "Buscar dossiês, produtos, países, agentes..."),
"Dashboard en tiempo real": ("Real-time dashboard", "Painel em tempo real"),
"Estado de cada registro actualizado al instante": ("Every registration status updated instantly", "Status de cada registro atualizado na hora"),
"Agentes disponibles 24/7": ("Agents available 24/7", "Agentes disponíveis 24/7"),
"Trabajan en paralelo mientras tú descansas": ("They work in parallel while you rest", "Trabalham em paralelo enquanto você descansa"),
"Alertas de vencimiento": ("Expiry alerts", "Alertas de vencimento"),
"Nunca pierdas un plazo regulatorio crítico": ("Never miss a critical regulatory deadline", "Nunca perca um prazo regulatório crítico"),
"Integración SharePoint / Drive": ("SharePoint / Drive integration", "Integração SharePoint / Drive"),
"Sube documentos desde donde ya trabajas": ("Upload documents from where you already work", "Envie documentos de onde você já trabalha"),
"Ecosistema de Agentes": ("Agent Ecosystem", "Ecossistema de Agentes"),
"Un orquestador. 10 agentes. 3 fases.": ("One orchestrator. 10 agents. 3 phases.", "Um orquestrador. 10 agentes. 3 fases."),
"La plataforma asigna automáticamente el agente correcto en cada etapa del proceso regulatorio. Tú supervisas, la IA trabaja.": (
 "The platform automatically assigns the right agent at each stage of the regulatory process. You supervise, the AI works.",
 "A plataforma atribui automaticamente o agente certo em cada etapa do processo regulatório. Você supervisiona, a IA trabalha."),
"ORQUESTADOR": ("ORCHESTRATOR", "ORQUESTRADOR"),

# ══════════════════════════ Phases ══════════════════════════
"Proceso en la plataforma": ("Process on the platform", "Processo na plataforma"),
"Tres fases. Cero fricción.": ("Three phases. Zero friction.", "Três fases. Zero atrito."),
"Desde la evaluación inicial hasta el monitoreo post-registro, la plataforma gestiona cada fase con agentes dedicados.": (
 "From initial assessment to post-registration monitoring, the platform handles every phase with dedicated agents.",
 "Da avaliação inicial ao monitoramento pós-registro, a plataforma conduz cada fase com agentes dedicados."),
"Fase I · Pre-Registro": ("Phase I · Pre-Registration", "Fase I · Pré-Registro"),
"Fase II · Registro": ("Phase II · Registration", "Fase II · Registro"),
"Fase III · Post-Registro": ("Phase III · Post-Registration", "Fase III · Pós-Registro"),
"Evaluación y preparación": ("Assessment and preparation", "Avaliação e preparação"),
"Compilación y presentación": ("Compilation and filing", "Compilação e protocolo"),
"Mantenimiento y cumplimiento": ("Maintenance and compliance", "Manutenção e conformidade"),

# ══════════════════════════ Comparison ══════════════════════════
"Comparativa por Agente": ("Comparison by Agent", "Comparativo por Agente"),
"Qué hace cada agente vs. una consultora tradicional": ("What each agent does vs. a traditional consultancy", "O que cada agente faz vs. uma consultoria tradicional"),
"Cada agente cubre un servicio del proceso regulatorio: misma calidad, una fracción del tiempo y del costo.": (
 "Each agent covers one service in the regulatory process: same quality, a fraction of the time and cost.",
 "Cada agente cobre um serviço do processo regulatório: mesma qualidade, uma fração do tempo e do custo."),
"Servicio (Agente)": ("Service (Agent)", "Serviço (Agente)"),
"Consultora Tradicional": ("Traditional Consultancy", "Consultoria Tradicional"),
"COMPASS — Requisitos Regulatorios": ("COMPASS — Regulatory Requirements", "COMPASS — Requisitos Regulatórios"),
"PREDICT — Toxicología in silico": ("PREDICT — In silico toxicology", "PREDICT — Toxicologia in silico"),
"GENESIS — Diseño de Moléculas": ("GENESIS — Molecule Design", "GENESIS — Design de Moléculas"),
"SCOUT — Inteligencia Regulatoria": ("SCOUT — Regulatory Intelligence", "SCOUT — Inteligência Regulatória"),
"BINDER — Gestión Documental": ("BINDER — Document Management", "BINDER — Gestão Documental"),
"AUDITOR — Revisión GLP/OECD": ("AUDITOR — GLP/OECD Review", "AUDITOR — Revisão GLP/OECD"),
"DEFENDER — Defensas Técnicas": ("DEFENDER — Technical Defences", "DEFENDER — Defesas Técnicas"),
"SCRIBE — SDS y Etiquetas": ("SCRIBE — SDS and Labels", "SCRIBE — FISPQ e Rótulos"),
"BRIDGE — Armonización Global": ("BRIDGE — Global Harmonisation", "BRIDGE — Harmonização Global"),
"GUARD — Vigilancia de Licencias": ("GUARD — Licence Monitoring", "GUARD — Vigilância de Licenças"),
"Consulta manual por jurisdicción": ("Manual lookup per jurisdiction", "Consulta manual por jurisdição"),
"GPS regulatorio dinámico": ("Dynamic regulatory GPS", "GPS regulatório dinâmico"),
"Estudios externos (€50k-200k)": ("External studies (€50k-200k)", "Estudos externos (€50k-200k)"),
"Predicciones QSAR automáticas": ("Automatic QSAR predictions", "Predições QSAR automáticas"),
"No existe equivalente": ("No equivalent exists", "Não existe equivalente"),
"Safe-by-Design generativo": ("Generative Safe-by-Design", "Safe-by-Design generativo"),
"Monitoreo normativo": ("Regulatory monitoring", "Monitoramento normativo"),
"Manual, periódica": ("Manual, periodic", "Manual, periódico"),
"24/7 automatizado": ("24/7 automated", "24/7 automatizado"),
"4-8 semanas compilación manual": ("4-8 weeks manual compilation", "4-8 semanas de compilação manual"),
"Dashboard completitud + Document AI": ("Completeness dashboard + Document AI", "Painel de completude + Document AI"),
"Revisión manual (2-4 semanas)": ("Manual review (2-4 weeks)", "Revisão manual (2-4 semanas)"),
"Abogados externos ($$$)": ("External lawyers ($$$)", "Advogados externos ($$$)"),
"Defensas IA ante objeciones": ("AI defences against objections", "Defesas de IA contra exigências"),
"SDS 16 secciones + CLP/GHS, 30+ idiomas": ("16-section SDS + CLP/GHS, 30+ languages", "FISPQ de 16 seções + CLP/GHS, 30+ idiomas"),
"Registro país por país (lineal)": ("Country-by-country registration (linear)", "Registro país a país (linear)"),
"Adapta dossier ANVISA/EPA/ECHA": ("Adapts dossier for ANVISA/EPA/ECHA", "Adapta dossiê para ANVISA/EPA/ECHA"),
"Revisión manual periódica": ("Periodic manual review", "Revisão manual periódica"),
"Alertas Email→SMS→Bloqueo ERP": ("Email→SMS→ERP block alerts", "Alertas E-mail→SMS→Bloqueio ERP"),
"Tiempo total por registro": ("Total time per registration", "Tempo total por registro"),
"Tasa de errores documentales": ("Documentation error rate", "Taxa de erros documentais"),
"Tiempo de revisión experto": ("Expert review time", "Tempo de revisão do especialista"),
"Escalabilidad (multi-país)": ("Scalability (multi-country)", "Escalabilidade (multipaís)"),
"Lineal: más equipo por país": ("Linear: more staff per country", "Linear: mais equipe por país"),
"Paralelo: mismos agentes": ("Parallel: same agents", "Paralelo: mesmos agentes"),

# ══════════════════════════ Managed service ══════════════════════════
"Servicio gestionado · Llave en mano": ("Managed service · Turnkey", "Serviço gerenciado · Chave na mão"),
"¿Sin equipo regulatorio?": ("No regulatory team?", "Sem equipe regulatória?"),
"Lo registramos por ti.": ("We register it for you.", "Nós registramos para você."),
"Para startups y biotech que innovan en agro pero no tienen —ni quieren montar— un área regulatoria. Nuestro equipo de expertos senior, potenciado con la IA de RegulatorIA, gestiona todo tu registro de principio a fin.": (
 "For startups and biotechs innovating in agriculture that don't have —and don't want to build— a regulatory department. Our team of senior experts, powered by RegulatorIA's AI, handles your entire registration from start to finish.",
 "Para startups e biotechs que inovam no agro mas não têm —nem querem montar— uma área regulatória. Nossa equipe de especialistas sênior, potencializada pela IA da RegulatorIA, conduz todo o seu registro do início ao fim."),
"Estrategia": ("Strategy", "Estratégia"),
"Definimos la ruta regulatoria óptima por país, con requisitos y tiempos para tu producto.": (
 "We define the optimal regulatory route per country, with requirements and timelines for your product.",
 "Definimos a rota regulatória ideal por país, com requisitos e prazos para o seu produto."),
"Dossier completo": ("Complete dossier", "Dossiê completo"),
"Armamos y validamos el expediente técnico: toxicología, eco-tox, residuos y etiqueta.": (
 "We assemble and validate the technical file: toxicology, eco-tox, residues and labelling.",
 "Montamos e validamos o processo técnico: toxicologia, eco-tox, resíduos e rotulagem."),
"Envío y gestión": ("Filing and management", "Protocolo e gestão"),
"Presentamos ante la autoridad y respondemos cada observación por ti.": (
 "We file with the authority and respond to every objection on your behalf.",
 "Protocolamos junto à autoridade e respondemos cada exigência por você."),
"Seguimiento": ("Follow-up", "Acompanhamento"),
"Monitoreamos plazos, renovaciones y cambios normativos que afecten tu registro.": (
 "We monitor deadlines, renewals and regulatory changes affecting your registration.",
 "Monitoramos prazos, renovações e mudanças normativas que afetem o seu registro."),
"Tú te enfocas en tu producto. Nosotros, en que llegue al mercado.": (
 "You focus on your product. We focus on getting it to market.",
 "Você foca no seu produto. Nós, em levá-lo ao mercado."),
"🌱 Startups agrotech": ("🌱 Agrotech startups", "🌱 Startups de agrotech"),
"🧬 Biotech sin área regulatoria": ("🧬 Biotech with no regulatory team", "🧬 Biotech sem área regulatória"),
"🚀 Tu primer registro": ("🚀 Your first registration", "🚀 Seu primeiro registro"),
"🌎 Nuevo mercado LATAM": ("🌎 New LATAM market", "🌎 Novo mercado na América Latina"),
"💬 Agenda una llamada": ("💬 Book a call", "💬 Agende uma ligação"),

# ══════════════════════════ HITL ══════════════════════════
"Human-in-the-Loop · HITL": ("Human-in-the-Loop · HITL", "Human-in-the-Loop · HITL"),
"IA supervisada por expertos regulatorios.": ("AI supervised by regulatory experts.", "IA supervisionada por especialistas regulatórios."),
"No reemplazamos a los especialistas: los potenciamos. Cada decisión crítica de la IA es revisada y validada por un experto regulatorio certificado antes de llegar a ti.": (
 "We don't replace specialists: we empower them. Every critical AI decision is reviewed and validated by a certified regulatory expert before it reaches you.",
 "Não substituímos os especialistas: nós os potencializamos. Cada decisão crítica da IA é revisada e validada por um especialista regulatório certificado antes de chegar até você."),
"Paso 1 · IA": ("Step 1 · AI", "Passo 1 · IA"),
"La IA genera": ("The AI generates", "A IA gera"),
"Los 10 agentes procesan tu producto: analizan la fórmula, predicen toxicidad, comprueban requisitos normativos y compilan el dossier técnico de forma automática.": (
 "The 10 agents process your product: they analyse the formulation, predict toxicity, check regulatory requirements and compile the technical dossier automatically.",
 "Os 10 agentes processam o seu produto: analisam a fórmula, predizem toxicidade, verificam requisitos normativos e compilam o dossiê técnico automaticamente."),
"Paso 2 · Experto": ("Step 2 · Expert", "Passo 2 · Especialista"),
"El experto valida": ("The expert validates", "O especialista valida"),
"Un especialista regulatorio certificado revisa los puntos críticos: estudios toxicológicos, datos de residuos, adecuación a requisitos GLP/OECD y coherencia del expediente.": (
 "A certified regulatory specialist reviews the critical points: toxicology studies, residue data, GLP/OECD compliance and overall consistency of the file.",
 "Um especialista regulatório certificado revisa os pontos críticos: estudos toxicológicos, dados de resíduos, adequação aos requisitos GLP/OECD e coerência do processo."),
"Paso 3 · Tú": ("Step 3 · You", "Passo 3 · Você"),
"Tú decides": ("You decide", "Você decide"),
"Recibes en tu dashboard el expediente validado, listo para presentar ante el SAG u organismo competente. Apruebas con un clic y la plataforma gestiona el seguimiento.": (
 "You receive the validated file in your dashboard, ready to file with SAG or the relevant authority. You approve with one click and the platform handles the follow-up.",
 "Você recebe no seu painel o processo validado, pronto para protocolar junto ao órgão competente. Aprova com um clique e a plataforma cuida do acompanhamento."),
"Garantía de calidad HITL": ("HITL quality guarantee", "Garantia de qualidade HITL"),
"Ningún dossier sale de la plataforma sin la revisión de un experto. Este modelo de supervisión humana no solo aumenta la tasa de aprobación regulatoria, sino que garantiza que siempre hay un profesional responsable de cada expediente.": (
 "No dossier leaves the platform without expert review. This human-supervision model not only raises the regulatory approval rate, it guarantees there is always a professional accountable for every file.",
 "Nenhum dossiê sai da plataforma sem a revisão de um especialista. Esse modelo de supervisão humana não só aumenta a taxa de aprovação regulatória, como garante que sempre há um profissional responsável por cada processo."),

# ══════════════════════════ Security ══════════════════════════
"Seguridad Enterprise": ("Enterprise Security", "Segurança Enterprise"),
"Tus datos regulatorios, protegidos al máximo nivel.": ("Your regulatory data, protected at the highest level.", "Seus dados regulatórios, protegidos no mais alto nível."),
"Los expedientes de registro contienen información técnica y comercial sensible. La plataforma fue diseñada desde el inicio con seguridad enterprise.": (
 "Registration files contain sensitive technical and commercial information. The platform was designed with enterprise-grade security from day one.",
 "Os processos de registro contêm informações técnicas e comerciais sensíveis. A plataforma foi projetada desde o início com segurança enterprise."),
"Cifrado extremo a extremo": ("End-to-end encryption", "Criptografia de ponta a ponta"),
"Cifrado de extremo a extremo. Tu información técnica no entrena modelos ni se comparte.": (
 "End-to-end encryption. Your technical information never trains models and is never shared.",
 "Criptografia de ponta a ponta. Suas informações técnicas não treinam modelos nem são compartilhadas."),
"Aislamiento de datos por cliente": ("Per-client data isolation", "Isolamento de dados por cliente"),
"Arquitectura multi-tenant con aislamiento estricto: los datos de tu empresa nunca están accesibles para otros clientes. Ambiente de producción separado del de pruebas.": (
 "Multi-tenant architecture with strict isolation: your company's data is never accessible to other clients. Production environment kept separate from testing.",
 "Arquitetura multi-tenant com isolamento rigoroso: os dados da sua empresa nunca ficam acessíveis a outros clientes. Ambiente de produção separado do de testes."),
"Control de acceso por roles (RBAC)": ("Role-based access control (RBAC)", "Controle de acesso por perfis (RBAC)"),
"Define permisos granulares por equipo: el área regulatoria ve los dossiers, el área comercial solo los estados de registro. Nadie accede a lo que no le corresponde.": (
 "Define granular permissions per team: the regulatory team sees dossiers, the commercial team only registration statuses. Nobody accesses what isn't theirs.",
 "Defina permissões granulares por equipe: a área regulatória vê os dossiês, a área comercial apenas os status de registro. Ninguém acessa o que não lhe compete."),
"Audit trail inmutable": ("Immutable audit trail", "Trilha de auditoria imutável"),
"Cada acción queda registrada: quién accedió, qué modificó y cuándo. El log es inmutable y puede exportarse para auditorías regulatorias o inspecciones de autoridades.": (
 "Every action is logged: who accessed it, what they changed and when. The log is immutable and can be exported for regulatory audits or authority inspections.",
 "Cada ação fica registrada: quem acessou, o que alterou e quando. O log é imutável e pode ser exportado para auditorias regulatórias ou inspeções das autoridades."),
"Autenticación multifactor (MFA)": ("Multi-factor authentication (MFA)", "Autenticação multifator (MFA)"),
"Acceso seguro con autenticación en dos pasos obligatoria para todos los usuarios. Compatible con TOTP (Google Authenticator, Authy) y llaves de seguridad FIDO2.": (
 "Secure access with mandatory two-step authentication for all users. Compatible with TOTP (Google Authenticator, Authy) and FIDO2 security keys.",
 "Acesso seguro com autenticação em duas etapas obrigatória para todos os usuários. Compatível com TOTP (Google Authenticator, Authy) e chaves de segurança FIDO2."),
"Alta disponibilidad y respaldo": ("High availability and backups", "Alta disponibilidade e backup"),
"Alojada en AWS con réplicas regionales y respaldos automáticos, para continuidad operativa sobre infraestructura de nivel mundial.": (
 "Hosted on AWS with regional replicas and automatic backups, for operational continuity on world-class infrastructure.",
 "Hospedada na AWS com réplicas regionais e backups automáticos, para continuidade operacional sobre infraestrutura de nível mundial."),
"Trazabilidad completa": ("Full traceability", "Rastreabilidade completa"),
"Multi-tenant seguro": ("Secure multi-tenant", "Multi-tenant seguro"),
"Mínimo privilegio": ("Least privilege", "Privilégio mínimo"),
"Trazabilidad GxP": ("GxP traceability", "Rastreabilidade GxP"),
"Trazabilidad total": ("Full traceability", "Rastreabilidade total"),
"Conformidad": ("Compliance", "Conformidade"),
"Auditoría periódica (trimestral)": ("Periodic audit (quarterly)", "Auditoria periódica (trimestral)"),
"Auditoría técnica": ("Technical audit", "Auditoria técnica"),
"Uptime 99.9%": ("99.9% uptime", "Uptime de 99,9%"),
"SLA garantizado": ("Guaranteed SLA", "SLA garantido"),
"DPA disponible": ("DPA available", "DPA disponível"),
"Trimestral": ("Quarterly", "Trimestral"),

# ══════════════════════════ Coverage ══════════════════════════
"Dónde llegamos": ("Where we operate", "Onde atuamos"),
"Registros Regulatorios": ("Regulatory Registrations", "Registros Regulatórios"),
"Operamos en los principales mercados de Latinoamérica con conocimiento profundo de cada organismo regulador. Mismos agentes, múltiples jurisdicciones.": (
 "We operate in Latin America's main markets with deep knowledge of each regulatory body. Same agents, multiple jurisdictions.",
 "Atuamos nos principais mercados da América Latina com conhecimento profundo de cada órgão regulador. Mesmos agentes, múltiplas jurisdições."),
"Organismos reguladores": ("Regulatory bodies", "Órgãos reguladores"),
"Normativas monitoreadas": ("Regulations monitored", "Normas monitoradas"),
"Países activos": ("Active countries", "Países ativos"),
"Monitoreo 24/7 automatizado": ("Automated 24/7 monitoring", "Monitoramento 24/7 automatizado"),
"País / Autoridad": ("Country / Authority", "País / Autoridade"),
"Estado": ("Status", "Status"),
"Activo": ("Active", "Ativo"),
"En preparación": ("In preparation", "Em preparação"),
"En roadmap 2026": ("On 2026 roadmap", "No roadmap 2026"),
"SAG — Servicio Agrícola y Ganadero": ("SAG — Chilean Agricultural and Livestock Service", "SAG — Serviço Agrícola e Pecuário do Chile"),
"ICA — Instituto Colombiano Agropecuario": ("ICA — Colombian Agricultural Institute", "ICA — Instituto Colombiano Agropecuário"),
"Todos los países": ("All countries", "Todos os países"),
"7 jurisdicciones": ("7 jurisdictions", "7 jurisdições"),
"mercados LATAM": ("LATAM markets", "mercados da América Latina"),

# ══════════════════════════ Videos ══════════════════════════
"Demos en video": ("Video demos", "Demos em vídeo"),
"Ve a los agentes en acción": ("See the agents in action", "Veja os agentes em ação"),
"Recorre casos reales de registro y mira cómo cada agente hace el trabajo pesado, paso a paso.": (
 "Walk through real registration cases and see how each agent does the heavy lifting, step by step.",
 "Percorra casos reais de registro e veja como cada agente faz o trabalho pesado, passo a passo."),
"Estrategia regulatoria y monitoreo de cambios normativos / LMR": (
 "Regulatory strategy and monitoring of regulatory changes / MRLs",
 "Estratégia regulatória e monitoramento de mudanças normativas / LMR"),
"Modelamiento QSAR y read-across de toxicidad": ("QSAR modelling and toxicity read-across", "Modelagem QSAR e read-across de toxicidade"),
"Generación de documentos regulatorios": ("Regulatory document generation", "Geração de documentos regulatórios"),
"Ensamblaje y validación del dossier": ("Dossier assembly and validation", "Montagem e validação do dossiê"),

# ══════════════════════════ Form / footer ══════════════════════════
"Obtén tu demo personalizada": ("Get your personalised demo", "Solicite sua demo personalizada"),
"Muéstranos tu producto y te mostramos cómo la plataforma gestiona su registro completo. Demo en vivo con un experto regulatorio en menos de 48 horas.": (
 "Show us your product and we'll show you how the platform handles its full registration. Live demo with a regulatory expert within 48 hours.",
 "Mostre-nos o seu produto e mostramos como a plataforma conduz o registro completo. Demo ao vivo com um especialista regulatório em menos de 48 horas."),
"Nombre *": ("Name *", "Nome *"),
"Cargo *": ("Job title *", "Cargo *"),
"Empresa *": ("Company *", "Empresa *"),
"Correo corporativo *": ("Work email *", "E-mail corporativo *"),
"Países": ("Countries", "Países"),
"Te contactamos en menos de 48 horas hábiles. Sin compromisos.": (
 "We'll contact you within 48 business hours. No commitment.",
 "Entramos em contato em menos de 48 horas úteis. Sem compromisso."),
"📅 Agendar demo en el calendario": ("📅 Book a demo in the calendar", "📅 Agendar demo no calendário"),
"✓ ¡Solicitud enviada! Nos comunicaremos pronto para coordinar tu demo.": (
 "✓ Request sent! We'll be in touch shortly to arrange your demo.",
 "✓ Solicitação enviada! Entraremos em contato em breve para agendar sua demo."),
"© 2026 Grupo Regulatorio SpA · info@gruporegulatorio.cl · +56 9 8144 0854": (
 "© 2026 Grupo Regulatorio SpA · info@gruporegulatorio.cl · +56 9 8144 0854",
 "© 2026 Grupo Regulatorio SpA · info@gruporegulatorio.cl · +56 9 8144 0854"),

# ══════════════════════════ FAQ section ══════════════════════════
"Preguntas frecuentes": ("Frequently asked questions", "Perguntas frequentes"),
"Lo que nos preguntan antes de empezar": ("What people ask us before getting started", "O que nos perguntam antes de começar"),
"Dudas habituales sobre plazos, países, normativas y el rol del experto humano en el proceso.": (
 "Common questions about timelines, countries, regulations and the human expert's role in the process.",
 "Dúvidas comuns sobre prazos, países, normas e o papel do especialista humano no processo."),

# ══════════════════════════ Attributes ══════════════════════════
"Plataforma AI-Native para registro de plaguicidas": ("AI-Native platform for pesticide registration", "Plataforma AI-Native para registro de agrotóxicos"),
"Análisis toxicológico automatizado con IA": ("AI-automated toxicology analysis", "Análise toxicológica automatizada com IA"),
"Expertos regulatorios validan cada decisión": ("Regulatory experts validate every decision", "Especialistas regulatórios validam cada decisão"),
"Dossiers técnicos generados automáticamente": ("Automatically generated technical dossiers", "Dossiês técnicos gerados automaticamente"),
"10 agentes de IA especializados en regulación": ("10 AI agents specialised in regulation", "10 agentes de IA especializados em regulação"),
"Campos agrícolas": ("Agricultural fields", "Campos agrícolas"),
"Laboratorio": ("Laboratory", "Laboratório"),
"Tecnología IA": ("AI technology", "Tecnologia de IA"),
"Documentación": ("Documentation", "Documentação"),
"Compliance": ("Compliance", "Compliance"),
"Abrir menú": ("Open menu", "Abrir menu"),
"Tu nombre": ("Your name", "Your name"),
"Director regulatorio...": ("Regulatory director...", "Diretor regulatório..."),
"Nombre de tu empresa": ("Your company name", "Nome da sua empresa"),
"tu@empresa.com": ("you@company.com", "voce@empresa.com"),
"Reproducir COMPASS + SCOUT": ("Play COMPASS + SCOUT", "Reproduzir COMPASS + SCOUT"),
"Reproducir PREDICT": ("Play PREDICT", "Reproduzir PREDICT"),
"Reproducir SCRIBE": ("Play SCRIBE", "Reproduzir SCRIBE"),
"Reproducir BINDER y AUDITOR": ("Play BINDER and AUDITOR", "Reproduzir BINDER e AUDITOR"),
"Demo COMPASS + SCOUT": ("COMPASS + SCOUT demo", "Demo COMPASS + SCOUT"),
"Demo PREDICT": ("PREDICT demo", "Demo PREDICT"),
"Demo SCRIBE": ("SCRIBE demo", "Demo SCRIBE"),
"Demo BINDER y AUDITOR": ("BINDER and AUDITOR demo", "Demo BINDER e AUDITOR"),

# ══════════════════════════ Agent tooltips (JS) ══════════════════════════
"Pre-Registro": ("Pre-Registration", "Pré-Registro"),
"Registro": ("Registration", "Registro"),
"Post-Registro": ("Post-Registration", "Pós-Registro"),
"Motor de requisitos regulatorios dinámicos. GPS del cumplimiento global. Selecciona Tipo Producto + País → Lista de Chequeo Oficial. Tech: Knowledge Graphs, RAG, NLP Regulatorio.": (
 "Dynamic regulatory requirements engine. A GPS for global compliance. Select Product Type + Country → Official Checklist. Tech: Knowledge Graphs, RAG, Regulatory NLP.",
 "Motor de requisitos regulatórios dinâmicos. GPS da conformidade global. Selecione Tipo de Produto + País → Checklist Oficial. Tech: Knowledge Graphs, RAG, NLP Regulatório."),
"Laboratorio virtual de toxicología in silico. Predicciones QSAR, genera QMRF automático. Tech: Graph Neural Networks, Read-Across, Ensemble Models.": (
 "Virtual in silico toxicology lab. QSAR predictions, automatic QMRF generation. Tech: Graph Neural Networks, Read-Across, Ensemble Models.",
 "Laboratório virtual de toxicologia in silico. Predições QSAR, gera QMRF automático. Tech: Graph Neural Networks, Read-Across, Ensemble Models."),
"Diseño generativo de moléculas Safe-by-Design. Tech: Diffusion Models + RL.": (
 "Generative Safe-by-Design molecule design. Tech: Diffusion Models + RL.",
 "Design generativo de moléculas Safe-by-Design. Tech: Diffusion Models + RL."),
"Inteligencia regulatoria. Monitorea bases globales, prohibiciones, nuevos requisitos. Tech: NLP + Web Scraping.": (
 "Regulatory intelligence. Monitors global databases, bans and new requirements. Tech: NLP + Web Scraping.",
 "Inteligência regulatória. Monitora bases globais, proibições e novos requisitos. Tech: NLP + Web Scraping."),
"Gestor documental inteligente. Conecta SharePoint/Drive, clasifica con Document AI, dashboard completitud. Tech: LayoutLM v3, Cross-Reference Engine.": (
 "Intelligent document manager. Connects SharePoint/Drive, classifies with Document AI, completeness dashboard. Tech: LayoutLM v3, Cross-Reference Engine.",
 "Gestor documental inteligente. Conecta SharePoint/Drive, classifica com Document AI, painel de completude. Tech: LayoutLM v3, Cross-Reference Engine."),
"Revisor automático GLP/OECD. 3 niveles: consistencia, cumplimiento, completitud. Tasa aprobación >90%. Tech: Fact-Checking, Semantic Similarity.": (
 "Automatic GLP/OECD reviewer. 3 levels: consistency, compliance, completeness. Approval rate >90%. Tech: Fact-Checking, Semantic Similarity.",
 "Revisor automático GLP/OECD. 3 níveis: consistência, conformidade, completude. Taxa de aprovação >90%. Tech: Fact-Checking, Semantic Similarity."),
"Defensas técnicas ante objeciones regulatorias. Tech: Fine-Tuned LLMs litigio.": (
 "Technical defences against regulatory objections. Tech: litigation fine-tuned LLMs.",
 "Defesas técnicas contra exigências regulatórias. Tech: LLMs de litígio ajustados."),
"SDS 16 secciones + etiquetas CLP/GHS automáticas. Motor CLP (CE 1272/2008), GHS Rev.9. 30+ idiomas. Tech: Rule-Based Engine + LLM + PDF Rendering.": (
 "16-section SDS + automatic CLP/GHS labels. CLP engine (EC 1272/2008), GHS Rev.9. 30+ languages. Tech: Rule-Based Engine + LLM + PDF Rendering.",
 "FISPQ de 16 seções + rótulos CLP/GHS automáticos. Motor CLP (CE 1272/2008), GHS Rev.9. 30+ idiomas. Tech: Rule-Based Engine + LLM + PDF Rendering."),
"Armonización global de dossiers. Recicla estudios, adapta formato ANVISA/EPA/ECHA.": (
 "Global dossier harmonisation. Reuses studies, adapts to ANVISA/EPA/ECHA formats.",
 "Harmonização global de dossiês. Reaproveita estudos, adapta ao formato ANVISA/EPA/ECHA."),
"Vigilancia perpetua de licencias. Alertas escalonadas Email→SMS→Bloqueo ERP.": (
 "Perpetual licence monitoring. Escalating alerts Email→SMS→ERP block.",
 "Vigilância perpétua de licenças. Alertas escalonados E-mail→SMS→Bloqueio ERP."),
"Ver demo →": ("View demo →", "Ver demo →"),
}

# ══════════════════════════ Meta / SEO ══════════════════════════
T.update({
"RegulatorIA — Registro de Agroquímicos AI-Native": (
 "RegulatorIA — AI-Native Agrochemical Registration",
 "RegulatorIA — Registro de Agroquímicos AI-Native"),
"Plataforma AI-native para el registro de agroquímicos en Chile y LATAM. 10 agentes de IA, validación HITL por expertos y seguridad enterprise.": (
 "AI-native platform for agrochemical registration in Chile and LATAM. 10 AI agents, HITL expert validation and enterprise-grade security.",
 "Plataforma AI-native para o registro de agroquímicos no Chile e América Latina. 10 agentes de IA, validação HITL e segurança enterprise."),
"RegulatorIA — 10 agentes de IA para el registro de agroquímicos en LATAM": (
 "RegulatorIA — 10 AI agents for agrochemical registration in LATAM",
 "RegulatorIA — 10 agentes de IA para o registro de agroquímicos na América Latina"),

# ══════════════════════════ Dashboard: table headers ══════════════════════════
"COMPASS · Estrategia regulatoria por país": ("COMPASS · Regulatory strategy by country", "COMPASS · Estratégia regulatória por país"),
"PREDICT · Predicciones QSAR / read-across": ("PREDICT · QSAR / read-across predictions", "PREDICT · Predições QSAR / read-across"),
"GENESIS · Variantes moleculares menos tóxicas": ("GENESIS · Less toxic molecular variants", "GENESIS · Variantes moleculares menos tóxicas"),
"SCOUT · Cambios normativos y LMR detectados": ("SCOUT · Regulatory changes and MRLs detected", "SCOUT · Mudanças normativas e LMR detectados"),
"AUDITOR · Hallazgos de validación": ("AUDITOR · Validation findings", "AUDITOR · Achados de validação"),
"DEFENDER · Observaciones de autoridad": ("DEFENDER · Authority objections", "DEFENDER · Exigências da autoridade"),
"SCRIBE · Documentos generados": ("SCRIBE · Generated documents", "SCRIBE · Documentos gerados"),
"BRIDGE · Expansión multi-país": ("BRIDGE · Multi-country expansion", "BRIDGE · Expansão multipaís"),
"GUARD · Alertas de cartera": ("GUARD · Portfolio alerts", "GUARD · Alertas da carteira"),
"Ingrediente activo · Herbex": ("Active ingredient · Herbex", "Ingrediente ativo · Herbex"),
"Optimización multiobjetivo": ("Multi-objective optimisation", "Otimização multiobjetivo"),
"Monitoreo en vivo": ("Live monitoring", "Monitoramento ao vivo"),
"Formato CADRI": ("CADRI format", "Formato CADRI"),
"Oficios abiertos": ("Open notices", "Ofícios em aberto"),
"Plantillas regulatorias": ("Regulatory templates", "Modelos regulatórios"),
"Base: dossier Chile": ("Base: Chile dossier", "Base: dossiê do Chile"),
"Vigilancia post-registro": ("Post-registration monitoring", "Vigilância pós-registro"),
"Actualizado hace 3 min": ("Updated 3 min ago", "Atualizado há 3 min"),
"últimos 30 días": ("last 30 days", "últimos 30 dias"),
"⚙ Configuración": ("⚙ Settings", "⚙ Configurações"),
"+ Nuevo dossier": ("+ New dossier", "+ Novo dossiê"),
"Ana Araya — Regulatory Affairs ▾": ("Ana Araya — Regulatory Affairs ▾", "Ana Araya — Regulatory Affairs ▾"),

# ══════════════════════════ Dashboard: KPIs and columns ══════════════════════════
"Resumen Global": ("Global Summary", "Resumo Global"),
"Dossiers Activos": ("Active Dossiers", "Dossiês Ativos"),
"Tiempo Ahorrado": ("Time Saved", "Tempo Economizado"),
"ROI Estimado": ("Estimated ROI", "ROI Estimado"),
"Retorno sobre inversión": ("Return on investment", "Retorno sobre investimento"),
"Progreso General": ("Overall Progress", "Progresso Geral"),
"Países analizados": ("Countries analysed", "Países analisados"),
"Requisitos detectados": ("Requirements detected", "Requisitos detectados"),
"Vía óptima": ("Optimal route", "Rota ideal"),
"ruta más corta": ("shortest route", "rota mais curta"),
"Tiempo estimado": ("Estimated time", "Tempo estimado"),
"Modelos QSAR": ("QSAR models", "Modelos QSAR"),
"endpoints corridos": ("endpoints run", "endpoints executados"),
"Endpoints predichos": ("Endpoints predicted", "Endpoints preditos"),
"Análogos read-across": ("Read-across analogues", "Análogos read-across"),
"estructuras similares": ("similar structures", "estruturas similares"),
"Confianza prom.": ("Avg. confidence", "Confiança méd."),
"validación cruzada": ("cross-validation", "validação cruzada"),
"Variantes generadas": ("Variants generated", "Variantes geradas"),
"espacio químico": ("chemical space", "espaço químico"),
"Reducción tox. máx": ("Max tox. reduction", "Redução tox. máx"),
"vs. molécula base": ("vs. base molecule", "vs. molécula base"),
"Eficacia retenida": ("Efficacy retained", "Eficácia mantida"),
"Candidatos viables": ("Viable candidates", "Candidatos viáveis"),
"para síntesis": ("for synthesis", "para síntese"),
"Cambios detectados": ("Changes detected", "Mudanças detectadas"),
"Alertas de impacto": ("Impact alerts", "Alertas de impacto"),
"requieren acción": ("require action", "exigem ação"),
"LMR actualizados": ("MRLs updated", "LMR atualizados"),
"Normativas monitoreadas": ("Regulations monitored", "Normas monitoradas"),
"por jurisdicción": ("per jurisdiction", "por jurisdição"),
"Completitud": ("Completeness", "Completude"),
"del dossier": ("of the dossier", "do dossiê"),
"Documentos": ("Documents", "Documentos"),
"indexados": ("indexed", "indexados"),
"Listos para enviar": ("Ready to file", "Prontos para protocolar"),
"dossiers": ("dossiers", "dossiês"),
"Hallazgos críticos": ("Critical findings", "Achados críticos"),
"bloquean envío": ("block filing", "bloqueiam o protocolo"),
"Advertencias": ("Warnings", "Advertências"),
"revisar": ("to review", "revisar"),
"Conformidad": ("Compliance", "Conformidade"),
"reglas aplicadas": ("rules applied", "regras aplicadas"),
"Tasa de aprobación": ("Approval rate", "Taxa de aprovação"),
"Observaciones": ("Objections", "Exigências"),
"recibidas": ("received", "recebidas"),
"Respondidas": ("Answered", "Respondidas"),
"borrador IA": ("AI draft", "rascunho de IA"),
"Tasa de éxito": ("Success rate", "Taxa de sucesso"),
"aceptadas": ("accepted", "aceitas"),
"Tiempo est.": ("Est. time", "Tempo est."),
"Documentos generados": ("Documents generated", "Documentos gerados"),
"este mes": ("this month", "este mês"),
"este año": ("this year", "este ano"),
"Idiomas": ("Languages", "Idiomas"),
"Firma certificada": ("Certified signature", "Assinatura certificada"),
"Países": ("Countries", "Países"),
"expansión": ("expansion", "expansão"),
"Re-uso de dossier": ("Dossier reuse", "Reaproveitamento de dossiê"),
"menos trabajo": ("less work", "menos trabalho"),
"Traducciones": ("Translations", "Traduções"),
"Registros vigentes": ("Active registrations", "Registros vigentes"),
"en cartera": ("in portfolio", "na carteira"),
"Próx. vencimientos": ("Upcoming expiries", "Próx. vencimentos"),
"Alertas activas": ("Active alerts", "Alertas ativos"),
"Renovaciones": ("Renewals", "Renovações"),
"enviadas a tiempo": ("filed on time", "enviadas no prazo"),
"Módulos": ("Modules", "Módulos"),
"Módulo": ("Module", "Módulo"),
"Sección": ("Section", "Seção"),
"Docs": ("Docs", "Docs"),
"Hallazgo": ("Finding", "Achado"),
"Severidad": ("Severity", "Severidade"),
"Impacto": ("Impact", "Impacto"),
"Crítico": ("Critical", "Crítico"),
"Medio": ("Medium", "Médio"),
"Bajo": ("Low", "Baixo"),
"Alto": ("High", "Alto"),
"Alta": ("High", "Alta"),
"Media": ("Medium", "Média"),
"Baja": ("Low", "Baixa"),
"Documento": ("Document", "Documento"),
"Producto": ("Product", "Produto"),
"Producto / Registro": ("Product / Registration", "Produto / Registro"),
"Tipo": ("Type", "Tipo"),
"Fecha": ("Date", "Data"),
"Plazo": ("Deadline", "Prazo"),
"Método": ("Method", "Método"),
"Método analítico": ("Analytical method", "Método analítico"),
"Predicción": ("Prediction", "Predição"),
"Confianza": ("Confidence", "Confiança"),
"Endpoint": ("Endpoint", "Endpoint"),
"Toxicidad": ("Toxicity", "Toxicidade"),
"Eficacia": ("Efficacy", "Eficácia"),
"Viabilidad": ("Viability", "Viabilidade"),
"Variante": ("Variant", "Variante"),
"Cambio estructural": ("Structural change", "Mudança estrutural"),
"Normativa": ("Regulation", "Norma"),
"Cambio detectado": ("Change detected", "Mudança detectada"),
"Cambio normativo": ("Regulatory change", "Mudança normativa"),
"Cambio LMR aplicable": ("Applicable MRL change", "Mudança de LMR aplicável"),
"País / Fuente": ("Country / Source", "País / Fonte"),
"Autoridad": ("Authority", "Autoridade"),
"Oficio": ("Notice", "Ofício"),
"Vencimiento": ("Expiry", "Vencimento"),
"Progreso": ("Progress", "Progresso"),
"Equivalencia": ("Equivalence", "Equivalência"),
"Equivalencias": ("Equivalences", "Equivalências"),
"Adaptación": ("Adaptation", "Adaptação"),
"Adaptación etiqueta": ("Label adaptation", "Adaptação de rótulo"),
"Vía regulatoria": ("Regulatory route", "Rota regulatória"),
"Requisitos clave": ("Key requirements", "Requisitos-chave"),
"Estudios GLP": ("GLP studies", "Estudos GLP"),
"Datos eco-tox": ("Eco-tox data", "Dados eco-tox"),
"Eco-toxicología": ("Eco-toxicology", "Ecotoxicologia"),
"Toxicología": ("Toxicology", "Toxicologia"),
"Identidad y composición": ("Identity and composition", "Identidade e composição"),
"Identidad química": ("Chemical identity", "Identidade química"),
"Propiedades físico-químicas": ("Physicochemical properties", "Propriedades físico-químicas"),
"Residuos y LMR": ("Residues and MRLs", "Resíduos e LMR"),
"Residuos — método analítico": ("Residues — analytical method", "Resíduos — método analítico"),
"Etiqueta y FDS": ("Label and SDS", "Rótulo e FISPQ"),
"Etiqueta": ("Label", "Rótulo"),
"Etiqueta — pictogramas GHS": ("Label — GHS pictograms", "Rótulo — pictogramas GHS"),
"Etiquetas GHS": ("GHS labels", "Rótulos GHS"),
"Etiqueta GHS": ("GHS label", "Rótulo GHS"),
"Ficha de Datos de Seguridad": ("Safety Data Sheet", "Ficha de Informação de Segurança"),
"Ficha técnica": ("Technical data sheet", "Ficha técnica"),
"Fichas técnicas": ("Technical data sheets", "Fichas técnicas"),
"Resumen toxicológico": ("Toxicology summary", "Resumo toxicológico"),
"Estudio toxicidad subcrónica": ("Subchronic toxicity study", "Estudo de toxicidade subcrônica"),
"Falta declaración GLP (p.12)": ("Missing GLP statement (p.12)", "Falta declaração GLP (p.12)"),
"Falta validación estadística": ("Missing statistical validation", "Falta validação estatística"),
"LOQ no cumple LMR objetivo": ("LOQ does not meet target MRL", "LOQ não atende ao LMR alvo"),
"Pictograma GHS07 ausente": ("GHS07 pictogram missing", "Pictograma GHS07 ausente"),
"vs. guía SAG": ("vs. SAG guidance", "vs. guia SAG"),
"Análisis QSAR": ("QSAR analysis", "Análise QSAR"),
"QSAR automático": ("Automatic QSAR", "QSAR automático"),
"Chequeo normativo": ("Regulatory check", "Verificação normativa"),
"Doc. regulatorio": ("Regulatory doc.", "Doc. regulatório"),
"Dossier automático": ("Automatic dossier", "Dossiê automático"),
"Aprobación en 1 clic": ("One-click approval", "Aprovação em 1 clique"),
"Equivalencia técnica": ("Technical equivalence", "Equivalência técnica"),
"Registro por similitud": ("Registration by similarity", "Registro por similaridade"),
"Traducción + LMR local": ("Translation + local MRL", "Tradução + LMR local"),
"Registro completo": ("Full registration", "Registro completo"),
"Renovación": ("Renewal", "Renovação"),
"En curso": ("In progress", "Em andamento"),
"en curso": ("in progress", "em andamento"),
"En proceso": ("In process", "Em processo"),
"En revisión": ("Under review", "Em revisão"),
"Completo ✓": ("Complete ✓", "Completo ✓"),
"Aprobado ✓": ("Approved ✓", "Aprovado ✓"),
"Aprobado": ("Approved", "Aprovado"),
"Conforme": ("Compliant", "Conforme"),
"Generado": ("Generated", "Gerado"),
"Respondida": ("Answered", "Respondida"),
"Evaluar": ("Evaluate", "Avaliar"),
"Viable": ("Viable", "Viável"),
"Rápida": ("Rapid", "Rápida"),
"Negativo": ("Negative", "Negativo"),
"No clasificado": ("Not classified", "Não classificado"),
"No existe": ("Does not exist", "Não existe"),
"Categoría 4": ("Category 4", "Categoria 4"),
"Mutagenicidad (Ames)": ("Mutagenicity (Ames)", "Mutagenicidade (Ames)"),
"Tox. oral aguda (rata)": ("Acute oral tox. (rat)", "Tox. oral aguda (rato)"),
"Carcinogenicidad": ("Carcinogenicity", "Carcinogenicidade"),
"Daphnia magna (EC50)": ("Daphnia magna (EC50)", "Daphnia magna (EC50)"),
"Biodegradabilidad": ("Biodegradability", "Biodegradabilidade"),
"Eco-tox — Daphnia": ("Eco-tox — Daphnia", "Eco-tox — Daphnia"),
"Sustitución Cl→F": ("Cl→F substitution", "Substituição Cl→F"),
"Bioisóstero amida": ("Amide bioisostere", "Bioisóstero amida"),
"Grupo metoxi": ("Methoxy group", "Grupo metoxi"),
"Anillo saturado": ("Saturated ring", "Anel saturado"),
"Cadena ramificada": ("Branched chain", "Cadeia ramificada"),
"Restricción glifosato uso urbano": ("Glyphosate restriction, urban use", "Restrição de glifosato para uso urbano"),
"Nuevo LMR clorpirifos 0.01 mg/kg": ("New chlorpyrifos MRL 0.01 mg/kg", "Novo LMR de clorpirifós 0,01 mg/kg"),
"Reclasificación GHS deltametrina": ("GHS reclassification, deltamethrin", "Reclassificação GHS da deltametrina"),
"Nuevo requisito eco-tox abejas": ("New eco-tox requirement for bees", "Novo requisito eco-tox para abelhas"),
"Actualización LMR cobre": ("Copper MRL update", "Atualização do LMR de cobre"),
"Ficha técnica InsectoMax 20": ("InsectoMax 20 technical data sheet", "Ficha técnica InsectoMax 20"),
"21/31 registros en curso": ("21/31 registrations in progress", "21/31 registros em andamento"),
"2-3 semanas por producto": ("2-3 weeks per product", "2-3 semanas por produto"),
"2-3 semanas": ("2-3 weeks", "2-3 semanas"),
"2-4 semanas": ("2-4 weeks", "2-4 semanas"),
"4-8 semanas": ("4-8 weeks", "4-8 semanas"),
"12-24 meses": ("12-24 months", "12-24 meses"),
"3-6 meses": ("3-6 meses", "3-6 meses"),
"6 meses": ("6 months", "6 meses"),
"8 meses": ("8 months", "8 meses"),
"9 meses": ("9 months", "9 meses"),
"10 meses": ("10 months", "10 meses"),
"meses": ("months", "meses"),
"&lt; 90 días": ("&lt; 90 days", "&lt; 90 dias"),
"90% aprobación": ("90% approval", "90% de aprovação"),
"horas este mes": ("hours this month", "horas este mês"),
"listo para QC": ("ready for QC", "pronto para QC"),
"4x más rápido": ("4x faster", "4x mais rápido"),
"4x más rápido.": ("4x faster.", "4x mais rápido."),
"5x más rápido": ("5x faster", "5x mais rápido"),
"País por país": ("Country by country", "País a país"),
"Paralelo": ("Parallel", "Paralelo"),
"Tiempo total": ("Total time", "Tempo total"),
"Errores documentales": ("Documentation errors", "Erros documentais"),
"Errores": ("Errors", "Erros"),
"ES · PT · EN · FR": ("ES · PT · EN · FR", "ES · PT · EN · FR"),
"ES · PT": ("ES · PT", "ES · PT"),
"SENASA Perú": ("SENASA Peru", "SENASA Peru"),
"México": ("Mexico", "México"),
"Perú": ("Peru", "Peru"),
"Brasil": ("Brazil", "Brasil"),
"Chile": ("Chile", "Chile"),
"Colombia": ("Colombia", "Colômbia"),
"Argentina": ("Argentina", "Argentina"),
"🇨🇱 Chile · SAG": ("🇨🇱 Chile · SAG", "🇨🇱 Chile · SAG"),
"🇦🇷 Argentina · SENASA": ("🇦🇷 Argentina · SENASA", "🇦🇷 Argentina · SENASA"),
"🇧🇷 Brasil · IBAMA": ("🇧🇷 Brazil · IBAMA", "🇧🇷 Brasil · IBAMA"),
"🇧🇷 Brasil · ANVISA": ("🇧🇷 Brazil · ANVISA", "🇧🇷 Brasil · ANVISA"),
"🇧🇷 Brasil · MAPA": ("🇧🇷 Brazil · MAPA", "🇧🇷 Brasil · MAPA"),
"🇧🇷 Brasil · MAPA/IBAMA": ("🇧🇷 Brazil · MAPA/IBAMA", "🇧🇷 Brasil · MAPA/IBAMA"),
"🇨🇴 Colombia · ICA": ("🇨🇴 Colombia · ICA", "🇨🇴 Colômbia · ICA"),
"🇵🇪 Perú · SENASA": ("🇵🇪 Peru · SENASA", "🇵🇪 Peru · SENASA"),
"🇲🇽 México · COFEPRIS": ("🇲🇽 Mexico · COFEPRIS", "🇲🇽 México · COFEPRIS"),
"🇺🇾 Uruguay · MGAP": ("🇺🇾 Uruguay · MGAP", "🇺🇾 Uruguai · MGAP"),
"🇧🇷 Brasil": ("🇧🇷 Brazil", "🇧🇷 Brasil"),
"🇨🇱 Chile": ("🇨🇱 Chile", "🇨🇱 Chile"),
"🌿 Regulator.IA": ("🌿 Regulator.IA", "🌿 Regulator.IA"),
"🏠 Inicio": ("🏠 Home", "🏠 Início"),
"🔒 app.regulatoria.cl/dashboard": ("🔒 app.regulatoria.cl/dashboard", "🔒 app.regulatoria.cl/dashboard"),
"Dashboard interactivo": ("Interactive dashboard", "Painel interativo"),
"Revisión GLP/OECD": ("GLP/OECD review", "Revisão GLP/OECD"),
"Registro regulatorio,": ("Regulatory registration,", "Registro regulatório,"),
})

T.update({f"Análogo G-{n}": (f"Analogue G-{n}", f"Análogo G-{n}")
          for n in ("02", "05", "07", "11", "14")})

# ══ Third block: strings without accents or function words that the first
#    coverage check missed (caught by the node-by-node ES/EN comparison).
T.update({
"GPS regulatorio": ("Regulatory GPS", "GPS regulatório"),
"Post-registro": ("Post-registration", "Pós-registro"),
"Escalabilidad": ("Scalability", "Escalabilidade"),
"Validaciones": ("Validations", "Validações"),
"regulatorias": ("regulatory", "regulatórias"),
"Advertencia": ("Warning", "Advertência"),
"Defensas IA": ("AI defences", "Defesas de IA"),
"Agentes IA": ("AI agents", "Agentes de IA"),
"predicha": ("predicted", "predita"),
"dossiers": ("dossiers", "dossiês"),
"documentos": ("documents", "documentos"),
"conformes": ("compliant", "conformes"),
"Eficacia local": ("Local efficacy", "Eficácia local"),
"LMR + etiqueta": ("MRL + label", "LMR + rótulo"),
"LMR cultivo": ("Crop MRL", "LMR da cultura"),
"Abogados ($$$)": ("Lawyers ($$$)", "Advogados ($$$)"),
"€50k-200k estudios": ("€50k-200k in studies", "€50k-200k em estudos"),
"Identidad + 5 lotes": ("Identity + 5 batches", "Identidade + 5 lotes"),
"Tox + eco-tox + residuos": ("Tox + eco-tox + residues", "Tox + eco-tox + resíduos"),
"tox + eco-tox": ("tox + eco-tox", "tox + eco-tox"),
"CLP/GHS 30+ idiomas": ("CLP/GHS 30+ languages", "CLP/GHS 30+ idiomas"),
"Confidencialidad de datos técnicos": ("Technical data confidentiality", "Confidencialidade dos dados técnicos"),
"Etiqueta Herbex 480 SC": ("Herbex 480 SC label", "Rótulo Herbex 480 SC"),
"Etiqueta FungiPro 250 EW": ("FungiPro 250 EW label", "Rótulo FungiPro 250 EW"),
"BINDER · Dossier Herbex 480 SC — Chile / SAG": (
 "BINDER · Herbex 480 SC dossier — Chile / SAG",
 "BINDER · Dossiê Herbex 480 SC — Chile / SAG"),
"↑ +6 vs. mes anterior": ("↑ +6 vs. last month", "↑ +6 vs. mês anterior"),
"-90% errores": ("-90% errors", "-90% erros"),
"-80% costo": ("-80% cost", "-80% custo"),
"−40% tiempo": ("−40% time", "−40% tempo"),
"∞ escalable": ("∞ scalable", "∞ escalável"),
"3-6 meses": ("3-6 months", "3-6 meses"),
"5 meses": ("5 months", "5 meses"),
"Re-uso": ("Reuse", "Reaproveitamento"),
"Colombia": ("Colombia", "Colômbia"),
"Tradicional": ("Traditional", "Tradicional"),
"Consulta manual": ("Manual lookup", "Consulta manual"),
})

# ══ featureList and offers: they live ONLY inside the JSON-LD (not visible
#    text, which is why they did not show up in the HTML extraction). ══
T.update({
"Estrategia regulatoria automatizada por país (COMPASS)": (
 "Automated regulatory strategy by country (COMPASS)",
 "Estratégia regulatória automatizada por país (COMPASS)"),
"Toxicología in silico y predicciones QSAR (PREDICT)": (
 "In silico toxicology and QSAR predictions (PREDICT)",
 "Toxicologia in silico e predições QSAR (PREDICT)"),
"Diseño generativo de moléculas Safe-by-Design (GENESIS)": (
 "Generative Safe-by-Design molecule design (GENESIS)",
 "Design generativo de moléculas Safe-by-Design (GENESIS)"),
"Monitoreo de cambios normativos y LMR (SCOUT)": (
 "Monitoring of regulatory changes and MRLs (SCOUT)",
 "Monitoramento de mudanças normativas e LMR (SCOUT)"),
"Armado y gestión documental del dossier (BINDER)": (
 "Dossier assembly and document management (BINDER)",
 "Montagem e gestão documental do dossiê (BINDER)"),
"Revisión automática GLP/OECD (AUDITOR)": (
 "Automatic GLP/OECD review (AUDITOR)",
 "Revisão automática GLP/OECD (AUDITOR)"),
"Defensas técnicas ante observaciones de la autoridad (DEFENDER)": (
 "Technical defences against authority objections (DEFENDER)",
 "Defesas técnicas contra exigências da autoridade (DEFENDER)"),
"Generación de FDS y etiquetas GHS/CLP (SCRIBE)": (
 "SDS and GHS/CLP label generation (SCRIBE)",
 "Geração de FISPQ e rótulos GHS/CLP (SCRIBE)"),
"Armonización de dossiers multi-país (BRIDGE)": (
 "Multi-country dossier harmonisation (BRIDGE)",
 "Harmonização de dossiês multipaís (BRIDGE)"),
"Vigilancia de vencimientos y renovaciones (GUARD)": (
 "Expiry and renewal monitoring (GUARD)",
 "Vigilância de vencimentos e renovações (GUARD)"),
"Demo personalizada sin costo con un experto regulatorio": (
 "Free personalised demo with a regulatory expert",
 "Demo personalizada gratuita com um especialista regulatório"),
})

T.update({"Inicio": ("Home", "Início")})

# ══ Hero with agent orbit (Claude Design 1a, 2026-08-01) ══
# Short labels under each orbit node
T.update({
"tu registro de agroquímicos.": ("your agrochemical registration.", "o seu registro de agroquímicos."),
"Estrategia regulatoria": ("Regulatory strategy", "Estratégia regulatória"),
"Toxicología in-silico": ("In-silico toxicology", "Toxicologia in-silico"),
"Moléculas safe-by-design": ("Safe-by-design molecules", "Moléculas safe-by-design"),
"Vigilancia 24/7": ("24/7 monitoring", "Vigilância 24/7"),
"Armado del dossier": ("Dossier assembly", "Montagem do dossiê"),
"Validación GLP/OECD": ("GLP/OECD validation", "Validação GLP/OECD"),
"Defensa técnica": ("Technical defence", "Defesa técnica"),
"FDS y etiquetas GHS": ("SDS and GHS labels", "FISPQ e rótulos GHS"),
"Armonización multi-país": ("Multi-country harmonisation", "Harmonização multipaís"),
"Vigilancia de licencias": ("Licence monitoring", "Vigilância de licenças"),
"Asigna el agente correcto": ("Assigns the right agent", "Atribui o agente certo"),
"en cada etapa": ("at every stage", "em cada etapa"),
})

# Cards for the panel shown on hover (they live in the JS)
T.update({
"El Navegante": ("The Navigator", "O Navegante"),
"El Laboratorio": ("The Lab", "O Laboratório"),
"El Arquitecto": ("The Architect", "O Arquiteto"),
"El Espía": ("The Spy", "O Espião"),
"El Organizador": ("The Organizer", "O Organizador"),
"El Revisor": ("The Reviewer", "O Revisor"),
"El Abogado": ("The Lawyer", "O Advogado"),
"El Publicador": ("The Publisher", "O Publicador"),
"El Globalizador": ("The Globalizer", "O Globalizador"),
"El Centinela": ("The Sentinel", "O Sentinela"),
"El Orquestador": ("The Orchestrator", "O Orquestrador"),
"Los 10 agentes": ("All 10 agents", "Os 10 agentes"),
"Define la estrategia regulatoria y arma el mapa de requisitos exigidos por cada autoridad.": (
 "Defines the regulatory strategy and maps the requirements demanded by each authority.",
 "Define a estratégia regulatória e monta o mapa de requisitos exigidos por cada autoridade."),
"Toxicología in-silico con QSAR y read-across antes de encargar un solo ensayo.": (
 "In-silico toxicology with QSAR and read-across before commissioning a single study.",
 "Toxicologia in-silico com QSAR e read-across antes de encomendar um único ensaio."),
"Propone variantes moleculares safe-by-design sobre el ingrediente activo.": (
 "Proposes safe-by-design molecular variants of the active ingredient.",
 "Propõe variantes moleculares safe-by-design sobre o ingrediente ativo."),
"Monitorea 24/7 cambios regulatorios y de LMR en los mercados donde registras.": (
 "Monitors regulatory and MRL changes 24/7 across the markets where you register.",
 "Monitora 24/7 mudanças regulatórias e de LMR nos mercados onde você registra."),
"Arma el dossier completo con Document AI y un panel de completitud por sección.": (
 "Assembles the full dossier with Document AI and a per-section completeness panel.",
 "Monta o dossiê completo com Document AI e um painel de completude por seção."),
"Valida contra GLP/OECD en tres niveles automáticos antes de que el dossier salga.": (
 "Validates against GLP/OECD across three automatic levels before the dossier goes out.",
 "Valida contra GLP/OECD em três níveis automáticos antes de o dossiê sair."),
"Redacta la defensa técnica de las observaciones que levanta la autoridad.": (
 "Drafts the technical defence for the objections raised by the authority.",
 "Redige a defesa técnica das exigências levantadas pela autoridade."),
"Genera FDS y etiquetas GHS/CLP en más de 30 idiomas, listas para imprenta.": (
 "Generates SDS and GHS/CLP labels in over 30 languages, print-ready.",
 "Gera FISPQ e rótulos GHS/CLP em mais de 30 idiomas, prontos para impressão."),
"Reutiliza el dossier aprobado y lo armoniza para el siguiente país.": (
 "Reuses the approved dossier and harmonises it for the next country.",
 "Reaproveita o dossiê aprovado e o harmoniza para o país seguinte."),
"Vigila licencias vigentes y avisa de vencimientos y renovaciones a tiempo.": (
 "Watches active licences and flags expiries and renewals in time.",
 "Vigia licenças vigentes e avisa de vencimentos e renovações a tempo."),
"Rutea cada tarea al agente que corresponde y mantiene al experto humano validando lo crítico.": (
 "Routes each task to the right agent and keeps the human expert validating what matters.",
 "Roteia cada tarefa ao agente certo e mantém o especialista humano validando o crítico."),
"9 países · 15+ autoridades": ("9 countries · 15+ authorities", "9 países · 15+ autoridades"),
"Menos ensayos preliminares": ("Fewer preliminary studies", "Menos ensaios preliminares"),
"Diseño safe-by-design": ("Safe-by-design engineering", "Design safe-by-design"),
"Registro multi-país": ("Multi-country registration", "Registro multipaís"),
"100% validación HITL": ("100% HITL validation", "100% validação HITL"),
})

# The new hero headline is split across three nodes: «El software que» +
# <span>automatiza</span> + «tu registro de agroquímicos.». The standalone word
# needs its own entry.
T.update({"automatiza": ("automates", "automatiza")})
