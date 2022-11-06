import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const apiResponse1 = [
  {
    address: "Kulas Light, Apt. 556 - 92998-3874 Gwenborough",
    company: "Romaguera-Crona",
    email: "Sincere@april.biz",
    id: 1,
    name: "Leanne Graham",
    phone: "1-770-736-8031 x56442",
    username: "Bret",
    website: "hildegard.org"
  }
];

const apiResponse2 = [
  {
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
  }
];

const userResponse = rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
  return res(ctx.json(apiResponse1));
});

const postResponse = rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
  return res(ctx.json(apiResponse2));
});


const handler = [userResponse, postResponse];

const server = setupServer(...handler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('should render the Homepage', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('shouldn\'t be able to fetch data and show error on the screen', async () => {

    server.use(
      rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    const { getByText } = render(<Home />);
    const buttonElement = getByText('Click to get data');
    expect(buttonElement).toBeTruthy();

    fireEvent.click(buttonElement);

    const errorMessage = await waitFor(() => getByText('Reload page and try again'));
    
    expect(errorMessage).toBeTruthy();    
  });

  it('should be able to fetch data and show new button text on the screen', async () => {

    const { getByText } = render(<Home />);
    const buttonElement = getByText('Click to get data');
    expect(buttonElement).toBeTruthy();

    fireEvent.click(buttonElement);

    const buttonElement2 = await waitFor(() => getByText('Click to remove data'));
    
    expect(buttonElement2).toBeTruthy();    
  });

  it('should be able to fetch data and show data on the screen. When button is clicked again, the data should be removed', async () => {

    const { getByText } = render(<Home />);
    const buttonElement = getByText('Click to get data');
    expect(buttonElement).toBeTruthy();

    fireEvent.click(buttonElement);

    const buttonElement2 = await waitFor(() => getByText('Click to remove data'));
    
    expect(buttonElement2).toBeTruthy();

    fireEvent.click(buttonElement2);

    await waitFor(() => getByText('Click to get data'));
    expect(buttonElement).toBeTruthy();
  });
});
