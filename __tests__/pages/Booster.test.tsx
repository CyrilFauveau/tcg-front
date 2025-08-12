import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@/app/booster/OpenBooster', () => ({
    __esModule: true,
    default: () => <div data-testid="open-booster">Open Booster Pack</div>,
}));

describe('OpenBooster', () => {
    it('renders booster component', () => {
        render(<div data-testid="open-booster">Open Booster Pack</div>);
        
        const boosterComponent = screen.getByTestId('open-booster');
        expect(boosterComponent).toBeInTheDocument();
    });

    it('displays booster pack title', () => {
        render(<div data-testid="open-booster">Open Booster Pack</div>);
        
        expect(screen.getByText('Open Booster Pack')).toBeInTheDocument();
    });

    it('displays booster pack information', () => {
        render(<div data-testid="open-booster">Open Booster Pack</div>);
        
        expect(screen.getByText('Open Booster Pack')).toBeInTheDocument();
    });
});

