import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DisplayCollection from '@/app/collection/DisplayCollection';

jest.mock('wagmi', () => ({
    useAccount: () => ({
        address: '0x123...',
        isConnected: true,
    }),
    useReadContract: () => ({
        data: [[1, 2, 3], [1, 1, 1]],
        isLoading: false,
        error: null,
    }),
}));

jest.mock('motion/react', () => ({
    motion: {
        div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => <img src={src} alt={alt} {...props} />,
}));

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

    it('displays collection information', () => {
        render(<DisplayCollection />);
        
        const toggleButton = screen.getByRole('button');
        expect(toggleButton).toBeInTheDocument();
        
        const cardGrid = screen.getByRole('list');
        expect(cardGrid).toBeInTheDocument();
    });
});

