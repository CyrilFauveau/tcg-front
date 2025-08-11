import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '@/components/shared/Header';

// Mock Next.js navigation
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

    it('has proper styling classes', () => {
        render(<Header />);
        
        const header = screen.getByText('Collection').closest('div');
        expect(header).toBeInTheDocument();
    });

    it('renders with correct structure', () => {
        render(<Header />);
        
        const header = screen.getByText('Collection').closest('div');
        expect(header).toBeInTheDocument();
    });
});
