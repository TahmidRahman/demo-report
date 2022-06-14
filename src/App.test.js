import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { GATEWAY_URL, PROJECT_URL, REPORT_URL, USER_URL } from './contants';

const server = setupServer(
  rest.post(REPORT_URL, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        data: [
          {
            paymentId: '6149cf567833e57669e60455',
            amount: 2663.69,
            projectId: 'ERdPQ',
            gatewayId: 'i6ssp',
            userIds: ['rahej'],
            modified: '2021-09-20',
            created: '2021-04-11'
          },
          {
            paymentId: '6149cf56625a7464b7ec345a',
            amount: 327.72,
            projectId: 'bgYhx',
            gatewayId: 'GzFF8',
            userIds: ['rahej'],
            modified: '2021-04-17',
            created: '2021-04-21'
          }
        ]
      })
    );
  }),
  rest.get(USER_URL, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        data: [
          {
            userId: 'rahej',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'john.doe@email.com'
          }
        ]
      })
    );
  }),
  rest.get(PROJECT_URL, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        data: [
          {
            projectId: 'bgYhx',
            userIds: ['rahej'],
            rule: 'Manual Selection',
            gatewayIds: ['gDJ2s'],
            structure: 'Sole proprietorship',
            industry: 'IT',
            website: 'https://mvpmatch.co/',
            description:
              'Sit amet luctus venenatis lectus magna fringilla urna porttitor.',
            image: 'https://mvpmatch.co/images/logo.svg',
            name: 'Project 1'
          },
          {
            projectId: 'ERdPQ',
            userIds: ['rahej'],
            rule: 'Manual Selection',
            gatewayIds: ['WU50G'],
            structure: 'Partnership',
            industry: 'IT',
            website: 'https://mvpmatch.co/',
            description:
              'Sit amet luctus venenatis lectus magna fringilla urna porttitor.',
            image: 'https://mvpmatch.co/images/logo.svg',
            name: 'Project 2'
          }
        ]
      })
    );
  }),
  rest.post(REPORT_URL, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        data: [
          {
            paymentId: '6149cf567833e57669e60455',
            amount: 2663.69,
            projectId: 'ERdPQ',
            gatewayId: 'i6ssp',
            userIds: ['rahej'],
            modified: '2021-09-20',
            created: '2021-04-11'
          },
          {
            paymentId: '6149cf56625a7464b7ec345a',
            amount: 327.72,
            projectId: 'bgYhx',
            gatewayId: 'GzFF8',
            userIds: ['rahej'],
            modified: '2021-04-17',
            created: '2021-04-21'
          }
        ]
      })
    );
  }),
  rest.get(GATEWAY_URL, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(
      ctx.json({
        data: [
          {
            gatewayId: 'i6ssp',
            userIds: ['rahej'],
            name: 'Gateway 1',
            type: 'Stripe',
            apiKey: 'sk_test_6eC49HqLyjWDarjtT1zdp7dc',
            secondaryApiKey: '',
            description:
              'Sit amet luctus venenatis lectus magna fringilla urna porttitor.'
          },
          {
            gatewayId: 'GzFF8',
            userIds: ['rahej'],
            name: 'Gateway 2',
            type: 'Stripe',
            apiKey: 'sk_test_6eC49HqLyVsDarUjT1zdp2hz',
            secondaryApiKey: '',
            description:
              'Pulvinar elementum integer enim neque volutpat ac tincidunt vitae.'
          }
        ]
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders all projects all gateways dropdowns', () => {
  render(<App />);
  const dropdownProject = screen.getByText(/All projects/i);
  const dropdownGateway = screen.getByText(/All gateways/i);
  expect(dropdownProject).toBeInTheDocument();
  expect(dropdownGateway).toBeInTheDocument();
});

test('renders user name', async () => {
  render(<App />);
  await waitFor(() => screen.getByText(/Jane Doe/));
});

test('renders empty content if no data found', async () => {
  server.use(
    rest.post(REPORT_URL, (req, res, ctx) => {
      return res(
        ctx.json({
          data: []
        })
      );
    })
  );
  render(<App />);
  const button = screen.getByText(/Generate report/);
  fireEvent.click(button);
  await waitFor(() => screen.getByText(/No reports/));
});

test('renders table data total group by project', async () => {
  render(<App />);
  const button = screen.getByText(/Generate report/);
  fireEvent.click(button);
  await waitFor(() => screen.getByText(/Project 1/));
  await waitFor(() => screen.getByText(/Project 2/));
  await waitFor(() => screen.getByText(/Total amount: 2663.69/));
});
