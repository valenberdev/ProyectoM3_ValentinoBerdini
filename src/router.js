import homeView from './views/home.js'
import chatView from './views/chat.js'
import aboutView from './views/about.js'
import characters, { getCharacterById } from './characters.js'


const routes = {
  '/home': homeView,
  '/chat': chatView,
  '/about': aboutView,
}


function renderRoute(path) {
  const view = routes[path] || routes['/home']
  const container = document.getElementById('app')

  if (path === '/chat') {
    const activeId = localStorage.getItem('activeCharacter')
    const currentCharacter = getCharacterById(activeId)

    if (!currentCharacter) {
      navigate('/home')
      return
    }

    chatView(container, currentCharacter, characters)
    return
  }

  view(container)
}
function navigate(path) {
  // ¿Qué dos cosas tenés que hacer acá? (pensá: cambiar la URL sin recargar + actualizar lo que se ve)
}

// Interceptar clicks en links internos
document.addEventListener('click', (e) => {
  // ¿Cómo detectás que el click fue en un <a> de navegación interna,
  // y no en cualquier otro elemento de la página?
  // Pista: buscá el <a> más cercano al elemento clickeado (closest)
})

// Manejar back/forward del navegador
window.addEventListener('popstate', () => {
  // ¿Qué función ya definida arriba te sirve acá?
})

// Render inicial al cargar la página
// ¿Qué tenés que ejecutar apenas carga el script, para que la vista
// correcta se muestre incluso si el usuario entra directo por URL (sin click)?