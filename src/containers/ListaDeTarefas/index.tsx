import { useSelector } from 'react-redux'

import Tarefa from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  //adicionar o seletor para usarmos os dados armazenados na store passando o estado que é do tipo Array de tarefas
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens //inicialmente as tarefas filtradas serão todos os itens
    if (termo !== undefined) {
      //caso tenha termo digitados, o resultado das tarefas filtradas será a lista do filter dos itens
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      //se tiver termos digitados e se o criterio escolhido for prioridade
      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          //filre as tarefas que estiverem com a propriedade prioridade marcada
          (item) => item.prioridade === valor
        )
      } //se não se, caso o criterio escolhido seja status
      else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          //filtre todas as tarefas que estiverem com a propriedade status marcada
          (item) => item.status === valor
        )
      }
      return tarefasFiltradas
    } else {
      //caso não tenha termos digitados, então retorne todos os itens da lista
      return itens
    }
  }
  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''
    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontradas como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontradas como: "${`${criterio} = ${valor}`}" ${complementacao}`
    }
    return mensagem
  }

  const tarefas = filtraTarefas()
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {tarefas.map((t) => (
          //nos itens armazenados na store, fazemos um map para retornar todos as tarefas (t) da lista com todos os seus respectivos atributos
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              titulo={t.titulo}
              status={t.status}
              prioridade={t.prioridade}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
