import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FightPage from '@/app/fight/page';

// Mock wagmi hooks
jest.mock('wagmi', () => ({
    useAccount: () => ({
        isConnected: false,
    }),
}));

// Mock NotConnected component
jest.mock('@/components/shared/NotConnected', () => ({
    __esModule: true,
    default: () => <div data-testid="not-connected">Not Connected Component</div>,
}));

describe('Fight Page', () => {
    it('renders fight page', () => {
        render(<FightPage />);
        
        const pageContainer = screen.getByTestId('not-connected').closest('div');
        expect(pageContainer).toBeInTheDocument();
    });

    it('shows not connected component when wallet not connected', () => {
        render(<FightPage />);
        
        expect(screen.getByTestId('not-connected')).toBeInTheDocument();
    });

    it('has proper page structure', () => {
        render(<FightPage />);
        
        // Find the page container by looking for the div that contains the NotConnected component
        const notConnectedComponent = screen.getByTestId('not-connected');
        const pageContainer = notConnectedComponent.parentElement;
        expect(pageContainer).toHaveClass('container', 'mx-auto');
    });

    it('displays not connected information', () => {
        render(<FightPage />);
        
        expect(screen.getByTestId('not-connected')).toBeInTheDocument();
    });
});

