import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '@/components/shared/Header';

jest.mock('next/navigation', () => ({
    usePathname: () => '/collection',
}));

describe('Header', () => {
    it('renders header component', () => {
        render(<Header />);
        
        const header = screen.getByText('Collection').closest('div');
        expect(header).toBeInTheDocument();
    });

    it('displays correct title based on pathname', () => {
        render(<Header />);
        
        expect(screen.getByText('Collection')).toBeInTheDocument();
    });
});
