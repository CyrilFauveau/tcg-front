import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Back from '@/components/shared/Back';

// Mock next/navigation
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
        it('renders back button with correct styling', () => {
            render(<Back />);
            const backButton = screen.getByTestId('back-button');
            
            expect(backButton).toBeInTheDocument();
            expect(backButton).toHaveClass('bg-white', 'rounded-full', 'p-3', 'w-fit', 'm-auto', 'mt-2', 'absolute', 'top-1');
        });

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

    describe('Styling', () => {
        it('applies custom shadow styling', () => {
            render(<Back />);
            const backButton = screen.getByTestId('back-button');
            
            expect(backButton).toHaveStyle('box-shadow: 0 0 10px rgba(0,0,0,0.2)');
        });

        it('has correct positioning classes', () => {
            render(<Back />);
            const backButton = screen.getByTestId('back-button');
            
            expect(backButton).toHaveClass('absolute', 'top-1');
        });
    });
});



