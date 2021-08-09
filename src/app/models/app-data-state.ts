import { DataStateEnum } from './data-state-enum';

export interface AppDataState<T> {
  dataState?: DataStateEnum,
  data?: T,
  errorMessage?: string
}
