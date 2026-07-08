import { renderNav } from '../nav.js'

const rolEnLaSerie = {
  luffy: 'Capitán y líder de los Piratas Sombrero de Paja. Es el protagonista principal de One Piece, cuya meta es encontrar el legendario tesoro "One Piece" y convertirse en el Rey de los Piratas.',
  brook: 'Músico de la tripulación. Se unió tarde en la historia, con un pasado trágico ligado a su antigua tripulación y su promesa de reencontrarse con una ballena llamada Laboon.',
  franky: 'Carpintero de la tripulación y constructor del Thousand Sunny, el barco actual de los Mugiwara. Antes fue un famoso constructor naval en Water Seven.',
}

export default function aboutView(container, currentCharacter) {
  container.innerHTML = ''

  const header = document.createElement('header')
  header.className = 'app-header'
  renderNav(header, window.location.pathname)

  const section = document.createElement('section')
  section.className = 'about'

  const title = document.createElement('h1')
  title.textContent = 'Sobre este proyecto'

  const projectDescription = document.createElement('p')
  projectDescription.textContent = '"Chatea con tu personaje favorito" es un proyecto integrador que permite conversar con distintos personajes de One Piece usando inteligencia artificial. La aplicación combina una interfaz de chat en tiempo real con la API de Google Gemini, mediante un proxy seguro en el servidor que protege la clave de acceso. Fue desarrollado como Single Page Application con routing propio, sin frameworks externos, aplicando diseño responsive mobile-first y persistencia de conversaciones en el navegador.'

  const characterTitle = document.createElement('h2')
  characterTitle.textContent = `Sobre ${currentCharacter.nombre}`

  const characterRole = document.createElement('p')
  characterRole.textContent = rolEnLaSerie[currentCharacter.id]

  container.appendChild(header)
  section.append(title, projectDescription, characterTitle, characterRole)
  container.appendChild(section)
}