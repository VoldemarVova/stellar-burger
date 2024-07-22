import FeedSlice, { fetchFeeds, initialState } from '../feedSlice';

const feedsData = {
  success: true,
  orders: [
    {
      _id: '669c0900119d45001b4fa5be',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-07-20T18:59:12.757Z',
      updatedAt: '2024-07-20T18:59:13.213Z',
      number: 46610
    },
    {
      _id: '669c07dd119d45001b4fa5bd',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-07-20T18:54:21.488Z',
      updatedAt: '2024-07-20T18:54:21.941Z',
      number: 46609
    },
    {
      _id: '669c066c119d45001b4fa5aa',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-07-20T18:48:12.431Z',
      updatedAt: '2024-07-20T18:48:12.827Z',
      number: 46608
    }
  ],
  total: 46236,
  totalToday: 103
};

describe('Тест работы слайса ленты заказов', () => {
  it('Должен иметь начальное состояние', () => {
    const currentState = FeedSlice(undefined, { type: 'unknown' });
    expect(currentState).toEqual(initialState);
  });

  it('Должен обновить состояние после успешного выполнения fetchFeeds', () => {
    const currentState = FeedSlice(
      { ...initialState },
      fetchFeeds.fulfilled(feedsData, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      feeds: feedsData,
      isLoading: false,
      error: null
    });
  });

  it('Должен обработать ошибку при запросе данных', () => {
    const errorMessage = 'ошибка';
    const currentState = FeedSlice(
      { ...initialState },
      fetchFeeds.rejected(new Error(errorMessage), '')
    );

    expect(currentState).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage
    });
  });

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.log as jest.Mock).mockRestore();
  });
});
