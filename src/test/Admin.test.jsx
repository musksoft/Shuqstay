import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';
import '@testing-library/jest-dom';

test('renders RegisterForm and fills minimal admin data', () => {
  render(<RegisterForm />);

  // Select role "admin" first to reveal admin code input
  fireEvent.change(screen.getByLabelText(/role/i), {
    target: { value: 'admin' },
  });

  // Fill required admin fields
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'Admin User' },
  });

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'admin@test.com' },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'adminpass' },
  });

  fireEvent.change(screen.getByLabelText(/civil id/i), {
    target: { value: '123456789012' },
  });

  fireEvent.change(screen.getByLabelText(/age/i), {
    target: { value: '40' },
  });

  fireEvent.change(screen.getByLabelText(/nationality/i), {
    target: { value: 'Any' },
  });

  // Fill admin access code
  fireEvent.change(screen.getByLabelText(/admin access code/i), {
    target: { value: 'shuqstay@admin' },
  });

  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /register/i }));

  // Check register button still in the document (basic sanity check)
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});
