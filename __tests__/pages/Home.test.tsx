import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('wagmi', () => ({
    useAccount: () => ({
        isConnected: true,
    }),
}));

jest.mock('@/app/home/Booster', () => ({
    __esModule: true,
    default: () => <div data-testid="booster-component">Booster Component</div>,
}));

describe('Home', () => {
    it('renders home page', () => {
        render(<Home />);
        
        const homePage = screen.getByTestId('booster-component');
        expect(homePage).toBeInTheDocument();
    });

    it('has proper page structure', () => {
        render(<Home />);
        
        const boosterComponent = screen.getByTestId('booster-component');
        expect(boosterComponent).toBeInTheDocument();
    });

    it('displays booster component when connected', () => {
        render(<Home />);
        
        expect(screen.getByTestId('booster-component')).toBeInTheDocument();
    });
});

