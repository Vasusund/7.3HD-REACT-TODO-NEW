import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './components/Login';

// Test for App – no BrowserRouter wrapping needed
test('renders login heading', () => {
  render(<App />); // App already has Router
  const heading = screen.getByRole('heading', { name: /login/i });
  expect(heading).toBeInTheDocument();
});

// Test for Login component – wrap only this one
import { BrowserRouter } from 'react-router-dom';
test('login button exists', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});
