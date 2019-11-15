import todos, { TodosModel } from './todos';

export interface StoreModel {
  todos: TodosModel;
}

const model: StoreModel = {
  todos,
};

export default model;
