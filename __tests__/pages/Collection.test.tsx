import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DisplayCollection from '@/app/collection/DisplayCollection';

// Mock wagmi hooks
jest.mock('wagmi', () => ({
    useAccount: () => ({
        address: '0x123...',
        isConnected: true,
    }),
    useReadContract: () => ({
        data: [[1, 2, 3], [1, 1, 1]], // Mock collection data
        isLoading: false,
        error: null,
    }),
}));

// Mock motion/react
jest.mock('motion/react', () => ({
    motion: {
        div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock Next.js Image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => <img src={src} alt={alt} {...props} />,
}));

// Mock CardModal component
jest.mock('@/components/shared/CardModal', () => ({
    __esModule: true,
    default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => isOpen ? (
        <div data-testid="card-modal" onClick={onClose}>
            <button onClick={onClose}>Close</button>
        </div>
    ) : null,
}));

describe('DisplayCollection', () => {
    it('renders collection component', () => {
        render(<DisplayCollection />);
        
        const toggleButton = screen.getByRole('button');
        expect(toggleButton).toBeInTheDocument();
    });

    it('shows toggle button', () => {
        render(<DisplayCollection />);
        
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has proper page structure', () => {
        render(<DisplayCollection />);
        
        const toggleButton = screen.getByRole('button');
        const container = toggleButton.closest('div');
        expect(container).toBeInTheDocument();
    });

    it('displays collection information', () => {
        render(<DisplayCollection />);
        
        const toggleButton = screen.getByRole('button');
        expect(toggleButton).toBeInTheDocument();
        
        // Check for card grid
        const cardGrid = screen.getByRole('list');
        expect(cardGrid).toBeInTheDocument();
    });
});

