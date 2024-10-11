import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import UnAuthorize from '@/pages/unAuthorizePage/unAuthorize';
import { RootState } from '@/app/store';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('@/config/url', () => ({
  urlConfig: [
    {
      children: [
        { pageId: 1, href: '/page1' },
        { pageId: 2, href: '/page2' },
      ],
    },
  ],
}));

const mockStore = configureStore([]);

describe('UnAuthorize', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    const initialState: RootState = {
      user: {
        user: {
          groups: [1, 2], 
        },
      },
    } as RootState;

    store = mockStore(initialState);
  });

  it('should render unauthorized message', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UnAuthorize />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("You're UnAuthorize.")).toBeInTheDocument();
  });

  it('should navigate to the correct link based on user roles', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UnAuthorize />
        </MemoryRouter>
      </Provider>
    );

    const link = '/page1';
    expect(navigate).toHaveBeenCalledWith(link);
  });
});