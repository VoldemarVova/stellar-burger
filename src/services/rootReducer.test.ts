import { rootReducer } from './store';
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlices';
import userSlice from './slices/userSlice';
import feedSlice from './slices/feedSlice';
import orderSlice from './slices/orderSlice';

describe('rootReducer', () => {
  it('должен корректно инициализироваться', () => {
    const expectedReducer = combineReducers({
      ingredients: ingredientsSlice,
      user: userSlice,
      feeds: feedSlice,
      order: orderSlice
    });

    expect(rootReducer(undefined, { type: 'INIT' })).toEqual(
      expectedReducer(undefined, { type: 'INIT' })
    );
  });

  it('должен возвращать начальное состояние при неизвестном экшене', () => {
    const initialState = {
      ingredients: ingredientsSlice(undefined, { type: 'INIT' }),
      user: userSlice(undefined, { type: 'INIT' }),
      feeds: feedSlice(undefined, { type: 'INIT' }),
      order: orderSlice(undefined, { type: 'INIT' })
    };

    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
});
