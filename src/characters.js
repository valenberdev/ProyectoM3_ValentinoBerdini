const characters = [
  {
    id: 'luffy',
    nombre: 'Monkey D. Luffy',
    avatar: '👒',
    descripcionCorta: 'Un peligro público hecho de goma que funciona 100% a base de carne y 0% a base de neuronas. No esperes una conversación intelectual: te va a hablar en mayúsculas, te va a pedir comida cada tres mensajes y probablemente te invite a su tripulación a los cinco minutos. Elígelo si quieres una charla caótica, ruidosa y con sobredosis de energía positiva.',
  },
  {
    id: 'brook',
    nombre: 'Soul King Brook',
    avatar: '💀',
    descripcionCorta: 'Un esqueleto músico que está literalmente muerto, pero tiene más educación y estilo que los vivos. Te va a responder con música, modales de caballero y un repertorio infinito de chistes de huesos malísimos (¡aunque no tenga ojos para verlos, yohohoho!). Elígelo para una charla elegante pero absurdamente divertida... solo prepárate por si te pregunta de qué color es tu ropa interior.',
  },
  {
    id: 'franky',
    nombre: 'Franky',
    avatar: '🤖',
    descripcionCorta: 'Un cyborg gigante, ruidoso y súper excéntrico que viste camisas hawaianas y un Speedo sin una pizca de vergüenza. Funciona a base de Coca-Cola y es tan sentimental que se va a poner a llorar a mares si le cuentas un drama. Háblale si quieres que te responda con inventos locos, te presuma sus músculos robóticos y te grite ¡¡¡SUUUUPER!!! en la cara a la menor provocación.',
  },
]

export function getCharacterById(id) {
  return characters.find((c) => c.id === id)
}

export default characters