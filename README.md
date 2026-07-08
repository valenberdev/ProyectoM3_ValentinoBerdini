# Chatea con tu personaje favorito 🏴‍☠️

Single Page Application que permite conversar con personajes de **One Piece** usando inteligencia artificial (Google Gemini), integrada de forma segura mediante Vercel Serverless Functions. Proyecto integrador desarrollado con JavaScript vanilla, sin frameworks.

🔗 **Aplicación desplegada:** [https://chat-onepiece.vercel.app/home](https://chat-onepiece.vercel.app/home) 

---

## Sobre el personaje elegido

La aplicación permite elegir entre **tres personajes** de la tripulación de los Piratas Sombrero de Paja:

| Personaje | Rol | Personalidad |
|---|---|---|
| 👒 **Monkey D. Luffy** | Capitán de la tripulación | Simple, directo, entusiasta, obsesionado con la comida y la aventura. Habla en oraciones cortas y no piensa demasiado antes de actuar. |
| 💀 **Soul King Brook** | Músico de la tripulación | Elegante, con modales de caballero de otra época, y un humor constante basado en chistes de esqueleto. Debajo del humor hay una melancolía de haber vivido más de un siglo. |
| 🤖 **Franky** | Carpintero / cyborg | Ruidoso, excéntrico, extremadamente orgulloso de sus inventos, y sorprendentemente sentimental. Su palabra favorita es "SÚPER". |

Cada personaje tiene su propio **system prompt** diseñado para mantener su personalidad, tono y límites de conocimiento (su mundo es el universo de One Piece, no el mundo real), con instrucciones explícitas para dar respuestas cortas y apropiadas para un chat.

---

## Funcionalidades

- **SPA con routing propio** (Home / Chat / Info) usando History API, sin recargas de página.
- **Chat en tiempo real** con historial de conversación, estados de carga ("escribiendo...") y manejo de errores.
- **Integración segura con Gemini AI** mediante una Vercel Serverless Function — la API key nunca se expone en el frontend.
- **Diseño responsive mobile-first**, con navegación adaptada a cada tamaño de pantalla (bottom bar en mobile, integrada al header en tablet/desktop).
- **Persistencia con localStorage**: historial de conversación por personaje, personaje activo, y preferencia de tema.
- **Galería de selección de personajes**, con tarjetas individuales y system prompts únicos por personaje.
- **Funcionalidades extra**: timestamps en los mensajes, botón para copiar respuestas al portapapeles, y modo claro/oscuro.
- **Tests unitarios** con Vitest, cubriendo lógica de datos, transformación de mensajes y persistencia (con mocking de `localStorage`).

---

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Vercel CLI](https://vercel.com/docs/cli) instalado globalmente:
  ```bash
  npm install -g vercel
  ```
- Una API key de Google Gemini, obtenida desde [Google AI Studio](https://aistudio.google.com/)

---

## Instalación y ejecución local

1. **Cloná el repositorio:**
   ```bash
   git clone https://github.com/valenberdev/ProyectoM3_ValentinoBerdini
   cd ProyectoM3_ValentinoBerdini
   ```

2. **Instalá las dependencias:**
   ```bash
   npm install
   ```

3. **Configurá las variables de entorno:**

   Creá un archivo `.env` en la raíz del proyecto (junto a `package.json`), basado en `.env.example`:
   ```
   GEMINI_API_KEY=tu_api_key_real_aca
   ```
   > ⚠️ El archivo `.env` nunca debe subirse al repositorio (ya está excluido en `.gitignore`).

4. **Ejecutá el proyecto en modo desarrollo:**
   ```bash
   vercel dev
   ```
   Esto levanta tanto el frontend como la serverless function de `/api/gemini`, necesaria para que el chat funcione localmente.

5. Abrí la URL que indique la terminal (por defecto `http://localhost:3000`).

---

## Cómo ejecutar los tests

El proyecto usa [Vitest](https://vitest.dev/) para los tests unitarios.

```bash
npx vitest run
```

Esto corre la suite completa una sola vez y muestra el resultado. Los tests cubren:

- `characters.js` — búsqueda de personajes por id.
- `storage.js` — persistencia de historial en `localStorage` (con mocking).
- `utils.js` — transformación de mensajes al formato de la API de Gemini, y parseo de respuestas.

---

## Cómo desplegar a Vercel

1. Conectá el repositorio a un proyecto de Vercel (vía [vercel.com](https://vercel.com) o con `vercel` desde la CLI).
2. En el dashboard del proyecto, andá a **Settings → Environment Variables** y agregá:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** tu API key real
   - **Environment:** Production (y opcionalmente Preview/Development)
3. Hacé un deploy (automático con cada `git push` si el repo ya está conectado, o manual con `vercel --prod`).
4. Verificá que el chat funcione correctamente en la URL pública — probá el flujo completo (elegir personaje → enviar mensaje → recibir respuesta).

---

## Capturas de pantalla

*(Agregar acá las capturas de la aplicación funcionando: galería de personajes, chat con respuesta real de la IA, vista de información — en al menos 3 tamaños: mobile, tablet y desktop)*

| Vista | Mobile | Tablet | Desktop |
|---|---|---|---|
| Galería (Home) | ![captura_mobile](/src/assets/Captura%20de%20pantalla%202026-07-08%20144550.png) | ![captura_tablet](/src/assets/Captura%20de%20pantalla%202026-07-08%20145003.png) | ![captura_desktop](/src/assets/Captura%20de%20pantalla%202026-07-08%20145102.png) |
| Chat | ![captura_mobile](/src/assets/Captura%20de%20pantalla%202026-07-08%20144931.png) | ![captura_tablet](/src/assets/Captura%20de%20pantalla%202026-07-08%20145021.png) | ![captura_desktop](/src/assets/Captura%20de%20pantalla%202026-07-08%20145123.png) |
| Info (About) | ![captura_mobile](/src/assets/Captura%20de%20pantalla%202026-07-08%20144943.png) | ![captura_tablet](/src/assets/Captura%20de%20pantalla%202026-07-08%20145036.png) | ![captura_desktop](/src/assets/Captura%20de%20pantalla%202026-07-08%20145140.png) |

---

## Estructura del proyecto

```
proyecto/
├── api/
│   └── gemini.js              # Serverless function — proxy seguro a Gemini
├── src/
│   ├── assets/                # Imágenes de los personajes
│   ├── index.html
│   ├── styles.css
│   ├── app.js                 # Punto de entrada
│   ├── router.js               # Routing SPA (History API)
│   ├── characters.js          # Datos de personajes (incl. system prompts)
│   ├── storage.js             # Persistencia en localStorage
│   ├── utils.js                # Transformación/parseo de datos para Gemini
│   ├── chat.js                 # Lógica de envío/renderizado de mensajes
│   ├── nav.js                  # Navegación global y toggle de tema
│   └── views/
│       ├── home.js             # Galería de personajes
│       ├── chatView.js         # Vista de chat
│       └── about.js            # Información del proyecto
├── tests/
│   ├── characters.test.js
│   ├── storage.test.js
│   └── utils.test.js
├── .env.example
├── vercel.json
└── package.json
```

---

## Registro de uso de IA en el proyecto

Este proyecto fue desarrollado con la asistencia de **Claude** (Anthropic) a lo largo de todo el proceso, utilizado como herramienta de aprendizaje guiado, no como generador automático de código. La metodología de trabajo consistió en: yo proponía decisiones de diseño y escribía el código, y Claude actuaba como revisor crítico — señalando errores, inconsistencias, huecos de accesibilidad o de lógica, y explicando el porqué antes de darme una solución, en vez de resolver directamente por mí.

**Principales usos y decisiones influenciadas:**

- **Planificación inicial**: análisis de la consigna, la guía de desarrollo y la rúbrica para identificar tensiones entre el alcance mínimo y los extra credits elegidos (por ejemplo, la contradicción entre "historial solo en sesión" del alcance base y la persistencia con `localStorage` del extra credit).
- **Arquitectura de carpetas**: decisión de separar `characters.js` (datos), `storage.js` (persistencia) y `utils.js` (transformación de datos para la API), en vez de la estructura más simple sugerida por la guía, justificada por cohesión y facilidad de testeo.
- **Diseño de UI/UX**: layout mobile-first del chat y la galería de personajes, patrón de selector de personaje (sidebar/drawer en mobile, integrado en tablet+), y navegación global (bottom bar en mobile, integrada al header en tablet+) — todas estas decisiones fueron tomadas por mí, con Claude señalando trade-offs de accesibilidad, rendimiento y consistencia visual antes de implementarlas.
- **Corrección de errores**: Claude identificó y explicó bugs reales durante el desarrollo, entre ellos: un layout roto en tablet+ por falta de un wrapper de contenido, pérdida de atributos de accesibilidad (`aria-controls`) al convertir HTML estático a generación por JavaScript, un bug de acumulación de event listeners al cambiar de personaje, y un error de orden de declaración de variables que rompía el indicador de "escribiendo...".
- **Integración con la API de Gemini**: verificación del formato real de request/response de la API mediante búsqueda de documentación oficial (evitando asumir formatos desactualizados), y diagnóstico de un problema de facturación de la cuenta de Google (créditos prepago agotados) que inicialmente parecía un error de código — se descartó esa hipótesis comparando múltiples implementaciones (fetch nativo, dos SDKs distintos de Google) contra la misma cuenta, confirmando que el problema era de configuración de cuenta y no de la integración.
- **Testing**: guía paso a paso para escribir tests con Vitest, incluyendo el mockeo de `localStorage` para testear `storage.js` sin depender del entorno del navegador.
- **Redacción de contenido**: los tres *system prompts* de los personajes y las descripciones de personalidad fueron redactados con asistencia de Claude, revisados y ajustados por mí.
- **Prompts para asistente de código (VSCode)**: para tareas de implementación más mecánicas (ajustes de CSS, integración de assets, correcciones puntuales), utilicé prompts estructurados —redactados con ayuda de Claude— para dirigir a un asistente de código dentro de VSCode, siempre revisando el resultado antes de aceptarlo como válido.

En ningún momento se aceptó código generado sin revisión: cada archivo fue verificado línea por línea contra lo acordado antes de continuar, y varios intentos de "ya está listo" resultaron tener errores reales que se corrigieron en el proceso — reflejando una metodología de control de calidad activo, no de aceptación automática de sugerencias de IA.