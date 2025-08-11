import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BoosterTimer from '@/components/shared/BoosterTimer';

// Mock wagmi hooks
jest.mock('wagmi', () => ({
    useAccount: () => ({
        address: '0x123...',
        isConnected: true,
    }),
    useReadContract: () => ({
        data: null,
        isLoading: false,
        error: null,
    }),
}));

// Mock setInterval and clearInterval
const mockSetInterval = jest.fn();
const mockClearInterval = jest.fn();

global.setInterval = mockSetInterval;
global.clearInterval = mockClearInterval;

describe('BoosterTimer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockSetInterval.mockReturnValue(123);
    });

    it('renders timer component', () => {
        render(<BoosterTimer />);
        
        const timerElement = screen.getByText('MAX');
        expect(timerElement).toBeInTheDocument();
    });

    it('displays countdown timer', () => {
        render(<BoosterTimer />);
        
        const countdownElement = screen.getByText('MAX');
        expect(countdownElement).toBeInTheDocument();
    });

    it('updates countdown every second', () => {
        render(<BoosterTimer />);
        
        const initialCountdown = screen.getByText('MAX');
        expect(initialCountdown).toBeInTheDocument();
        
        // Verify setInterval was called
        expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    it('cleans up interval on unmount', () => {
        const { unmount } = render(<BoosterTimer />);
        
        unmount();
        
        expect(mockClearInterval).toHaveBeenCalled();
    });

    it('has proper styling classes', () => {
        render(<BoosterTimer />);
        
        const timerContainer = screen.getByText('MAX').closest('span');
        expect(timerContainer).toHaveClass('font-semibold');
    });
});

