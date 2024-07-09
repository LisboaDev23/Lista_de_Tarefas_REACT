import { configureStore } from '@reduxjs/toolkit'

import tarefasReducer from './reducers/tarefas'
import filtroReducer from './reducers/filtro'

const store = configureStore({
  reducer: {
    //antes de criar o reducer, precisamos aplicar a tipagem para o typescript reconhecer o reducer
    tarefas: tarefasReducer,
    filtro: filtroReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>

export default store
