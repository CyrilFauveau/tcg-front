import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotConnected from '@/components/shared/NotConnected';

describe('NotConnected', () => {
    it('renders not connected message', () => {
        render(<NotConnected />);
        expect(screen.getByText(/Please connect your wallet/i)).toBeInTheDocument();
    });

    it('displays wallet icon', () => {
        render(<NotConnected />);
        
        const icon = document.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });

    it('has proper structure', () => {
        render(<NotConnected />);
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
    });
});

