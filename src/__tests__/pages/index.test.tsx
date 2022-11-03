import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Home', () => {
  it('should render the Homepage', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  });

  it('should be able to fetch data and show on the screen', () => {
    const apiResponse = {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        }
      },
    };

    apiMock.onGet('users').reply(200, apiResponse);

  });
});
