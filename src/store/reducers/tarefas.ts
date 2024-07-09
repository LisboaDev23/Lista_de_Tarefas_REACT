import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enumns from '../../utils/enums/tarefa'

const tarefaSlice = createSlice({
  name: 'tarefas',
  initialState: {
    itens: [
      new Tarefa(
        'estudar javascript',
        enumns.Prioridade.IMPORTANTE,
        enumns.Status.PENDENTE,
        '',
        1
      ),
      new Tarefa(
        'estudar typescript',
        enumns.Prioridade.NORMAL,
        enumns.Status.PENDENTE,
        'Rever módulo projeto',
        2
      ),
      new Tarefa(
        'estudar java',
        enumns.Prioridade.URGENTE,
        enumns.Status.CONCLUIDA,
        'estudar apis',
        3
      )
    ]
  },
  reducers: {
    //esse state está fazendo referência ao array de tarefas chamado itens no initialState
    //já o action é o acão em forma de objeto e o seu payload é o dado no qual está sendo transferido
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexTarefa >= 0) {
        state.itens[indexTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )
      if (tarefaExiste) {
        return alert('Já existe uma tarefa com esse nome!')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]

        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexTarefa >= 0) {
        state.itens[indexTarefa].status = action.payload.finalizado
          ? enumns.Status.CONCLUIDA
          : enumns.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefaSlice.actions

export default tarefaSlice.reducer
