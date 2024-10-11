import reducer, { setUser, setEmail, TUser } from '@/features/user/userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const mockUser: TUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
    };
    const previousState = { user: { name: 'Old Name' } };
    const expectedState = { user: { ...mockUser, name: 'Old Name' } };

    expect(reducer(previousState, setUser(mockUser))).toEqual(expectedState);
  });

  it('should handle setEmail', () => {
    const mockEmail = 'newemail@example.com';
    const previousState = { user: { name: 'Old Name', email: 'test@example.com' } };
    const expectedState = {
      user: { name: mockEmail, email: 'test@example.com' },
    };

    expect(reducer(previousState, setEmail(mockEmail))).toEqual(expectedState);
  });
});