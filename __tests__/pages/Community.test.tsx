import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CommunityPage from '@/app/community/page';

jest.mock('wagmi', () => ({
    useAccount: () => ({
        isConnected: false,
    }),
}));

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
});

