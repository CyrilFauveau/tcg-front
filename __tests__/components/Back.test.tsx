import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Back from '@/components/shared/Back';

const mockBack = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        back: mockBack,
    }),
}));

describe('Back Component', () => {
    beforeEach(() => {
        mockBack.mockClear();
    });

    describe('Rendering', () => {
        it('renders back arrow icon', () => {
            render(<Back />);
            const icon = screen.getByTestId('back-button').querySelector('svg');
            
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('lucide', 'lucide-corner-down-left');
        });
    });

    describe('Interaction', () => {
        it('calls router.back when clicked', () => {
            render(<Back />);
            const backButton = screen.getByTestId('back-button');
            
            fireEvent.click(backButton);
            expect(mockBack).toHaveBeenCalledTimes(1);
        });

        it('has proper accessibility attributes', () => {
            render(<Back />);
            const backButton = screen.getByTestId('back-button');
            
            expect(backButton).toHaveAttribute('data-testid', 'back-button');
        });
    });
});



