import UserState, {
  initialState,
  checkUserAuth,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  getUser
} from '../userSlice';

const testUser = {
  success: true,
  user: {
    email: '123@example.com',
    name: 'Test User'
  }
};

const testLoginUser = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2RhOGZjODU2Nzc3MDAxYmIxZTRkNyIsImlhdCI6MTcyMTQwNjU1NSwiZXhwIjo5OTk5OTk5OTk5fQ.MdFRq5SNYSZWZ2EBoKfRD-SxWD9a5Wo-VIaxQUa3hUQ',
  refreshToken: '0',
  user: {
    email: '123@example.com',
    name: 'Test User'
  }
};

describe('Тестирование работы слайса пользователя', () => {
  it('Тест сохранения данных пользователя при успешном выполнении loginUser', () => {
    const currentState = UserState(
      {
        ...initialState
      },
      loginUser.fulfilled(testLoginUser, '', {
        email: '123@example.com',
        password: 'password'
      })
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testLoginUser.user,
      isAuthenticated: true,
      isAuthChecked: true
    });
  });

  it('Тест загрузки данных о пользователе при успешном выполнении checkUserAuth', () => {
    const currentState = UserState(
      {
        ...initialState
      },
      checkUserAuth.fulfilled(testUser, '')
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testUser.user,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  it('Тест сохранения данных при успешном выполнении registerUser', () => {
    const currentState = UserState(
      {
        ...initialState
      },
      registerUser.fulfilled(testLoginUser, '', {
        email: '123@example.com',
        password: 'password',
        name: 'Test User'
      })
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testLoginUser.user,
      isAuthenticated: true,
      isAuthChecked: true
    });
  });

  it('Тест сохранения данных пользователя при успешном выполнении updateUser', () => {
    const currentState = UserState(
      {
        ...initialState
      },
      updateUser.fulfilled(testUser, '', {
        email: '123@example.com',
        password: 'password',
        name: 'Test User'
      })
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testUser.user
    });
  });

  it('Тест очистки данных пользователя при успешном выполнении logoutUser', () => {
    const currentState = UserState(
      {
        ...initialState
      },
      logoutUser.fulfilled(undefined, '', undefined)
    );

    expect(currentState).toEqual({
      ...initialState,
      user: { email: '', name: '' },
      isAuthenticated: false,
      isAuthChecked: false
    });
  });

  it('Тест загрузки данных о пользователе при успешном выполнении getUser', () => {
    const currentState = UserState(
      {
        ...initialState
      },
      getUser.fulfilled(testUser, '', undefined)
    );

    expect(currentState).toEqual({
      ...initialState,
      user: testUser.user,
      isAuthChecked: true
    });
  });
});
