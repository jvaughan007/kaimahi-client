export const ContextDataWithUserInformation = {
    currentUser: {
      accessToken: 'mockToken',
      id: 'mockId',
      name: 'mockName',
      email: 'email@gmail.com'
    },
    setCurrentUser: jest.fn()
};

export const ContextDataWithOutUserInformation = {
    currentUser: {},
    setCurrentUser: jest.fn()
};

