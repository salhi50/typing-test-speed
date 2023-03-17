export const ADD_TEST = 'ADD_TEST';
export const UPDATE_TEST = 'UPDATE_TEST';

export const testReducer = (state, action) => {
  switch(action.type) {
    case ADD_TEST:
      return [...state, action.payload];
    case UPDATE_TEST:
      return state.map(test => test.id === action.payload.id? {...test, ...action.payload.updated} : test);
  }
}