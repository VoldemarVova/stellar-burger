import orderReducer, { orderSlice, initialState } from '../orderSlice';
import { TConstructorIngredient } from '@utils-types';

// Подготовка данных для тестов
const ingredient1: TConstructorIngredient = {
  id: '1',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const ingredient2: TConstructorIngredient = {
  id: '2',
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('orderSlice reducer', () => {
  it('должен вернуть начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'INIT' })).toEqual(initialState);
  });

  it('должен обработать addIngredient', () => {
    const nextState = orderReducer(
      initialState,
      orderSlice.actions.addIngredient(ingredient1)
    );
    expect(nextState.constructorItems.ingredients).toEqual([ingredient1]);
  });

  it('должен обработать deleteIngredient', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1]
      }
    };

    const nextState = orderReducer(
      stateWithIngredient,
      orderSlice.actions.deleteIngredient({ index: 0 })
    );
    expect(nextState.constructorItems.ingredients).toEqual([]);
  });

  it('должен обработать moveUpIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const nextState = orderReducer(
      stateWithIngredients,
      orderSlice.actions.moveUpIngredient({ index: 1 })
    );
    expect(nextState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });

  it('должен обработать moveDownIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const nextState = orderReducer(
      stateWithIngredients,
      orderSlice.actions.moveDownIngredient({ index: 0 })
    );

    expect(nextState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });
});
