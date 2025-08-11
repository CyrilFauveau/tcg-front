import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CommunityPage from '@/app/community/page';

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

describe('Community Page', () => {
    it('renders community page', () => {
        render(<CommunityPage />);
        
        const pageContainer = screen.getByTestId('not-connected').closest('div');
        expect(pageContainer).toBeInTheDocument();
    });

    it('shows not connected component when wallet not connected', () => {
        render(<CommunityPage />);
        
        expect(screen.getByTestId('not-connected')).toBeInTheDocument();
    });

    it('has proper page structure', () => {
        render(<CommunityPage />);
        
        // Find the page container by looking for the div that contains the NotConnected component
        const notConnectedComponent = screen.getByTestId('not-connected');
        const pageContainer = notConnectedComponent.parentElement;
        expect(pageContainer).toHaveClass('container', 'mx-auto');
    });

    it('displays not connected information', () => {
        render(<CommunityPage />);
        
        expect(screen.getByTestId('not-connected')).toBeInTheDocument();
    });
});

