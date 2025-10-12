import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import '@testing-library/jest-dom';

test('renders RegisterForm and fills minimal tenant data', () => {
  render(<RegisterForm />);

  // Fill only required tenant fields
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'Test Tenant' },
  });

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'tenant@test.com' },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'tenant123' },
  });

  fireEvent.change(screen.getByLabelText(/civil id/i), {
    target: { value: '123456789012' },
  });

  fireEvent.change(screen.getByLabelText(/age/i), {
    target: { value: '30' },
  });

  fireEvent.change(screen.getByLabelText(/nationality/i), {
    target: { value: 'AnyNationality' },
  });

  fireEvent.change(screen.getByLabelText(/role/i), {
    target: { value: 'tenant' },
  });

  fireEvent.click(screen.getByLabelText(/i agree to the/i));

  // Submit
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  // Expect the register button is still in the document
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});
