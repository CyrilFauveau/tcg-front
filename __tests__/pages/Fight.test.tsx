import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FightPage from '@/app/fight/page';

jest.mock('wagmi', () => ({
    useAccount: () => ({
        isConnected: false,
    }),
}));

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
});

