const projeto = {
  id: 1,
  descricao: 'Alura Tracker 3.0'
}

// primeiro arg é o target
// segundo é o handler/manipulador
const proxy = new Proxy(projeto, {
  get(objetoOriginal, chave) {
    console.log(`Alguém pediu a chave ${chave} do projeto`)
    return objetoOriginal[chave]
  },
  set(objetoOriginal, chave, valor) {
    console.log(`Alguém alterou a chave ${chave} do projeto para o valor ${valor}`)
    objetoOriginal[chave] = valor
  }
})

proxy.descricao = 'Novo valor'

console.log(proxy.descricao)