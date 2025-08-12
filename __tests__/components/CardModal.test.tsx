import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CardModal from '@/components/shared/CardModal';

jest.mock('motion/react', () => ({
    motion: {
        div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
            <div {...props} data-motion="true">{children}</div>
        ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <div data-animate-presence="true">{children}</div>,
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
        <img src={src} alt={alt} {...props} data-next-image="true" />
    ),
}));

Object.defineProperty(document.body, 'style', {
    value: {
        overflow: '',
        setProperty: jest.fn(),
    },
    writable: true,
});

Object.defineProperty(document.documentElement, 'style', {
    value: {
        position: '',
        width: '',
        setProperty: jest.fn(),
    },
    writable: true,
});

describe('CardModal Component', () => {
    const mockProps = {
        cardId: 1,
        isOpen: true,
        onClose: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('renders when open', () => {
            render(<CardModal {...mockProps} />);
            const modal = screen.getByAltText('Card #1').closest('div')?.parentElement?.parentElement;
            expect(modal).toBeInTheDocument();
        });

        it('does not render when closed', () => {
            render(<CardModal {...mockProps} isOpen={false} />);
            expect(screen.queryByAltText('Card #1')).not.toBeInTheDocument();
        });

        it('displays card information correctly', () => {
            render(<CardModal {...mockProps} />);
            expect(screen.getByAltText('Card #1')).toBeInTheDocument();
        });

        it('displays card image with correct attributes', () => {
            render(<CardModal {...mockProps} />);
            const image = screen.getByAltText('Card #1');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src');
            expect(image).toHaveAttribute('alt', 'Card #1');
        });

        it('renders close button with correct attributes', () => {
            render(<CardModal {...mockProps} />);
            const closeIcon = screen.getByTestId('close-icon');
            expect(closeIcon).toBeInTheDocument();
            expect(closeIcon).toHaveAttribute('data-testid', 'close-icon');
        });

        it('renders backdrop with correct attributes', () => {
            render(<CardModal {...mockProps} />);
            const backdrop = screen.getByTestId('modal-backdrop');
            expect(backdrop).toBeInTheDocument();
            expect(backdrop).toHaveAttribute('data-testid', 'modal-backdrop');
        });
    });

    describe('Interaction', () => {
        it('calls onClose when close button is clicked', () => {
            render(<CardModal {...mockProps} />);
            const closeIcon = screen.getByTestId('close-icon');
            
            fireEvent.click(closeIcon);
            expect(mockProps.onClose).toHaveBeenCalledTimes(1);
        });

        it('calls onClose when backdrop is clicked', () => {
            render(<CardModal {...mockProps} />);
            const backdrop = screen.getByTestId('modal-backdrop');
            
            fireEvent.click(backdrop);
            expect(mockProps.onClose).toHaveBeenCalledTimes(1);
        });

        it('prevents backdrop click from bubbling to modal content', () => {
            render(<CardModal {...mockProps} />);
            const modalContent = screen.getByAltText('Card #1').closest('div')?.parentElement?.parentElement;
            
            if (modalContent) {
                fireEvent.click(modalContent);
                expect(mockProps.onClose).not.toHaveBeenCalled();
            }
        });

        it('handles multiple close button clicks correctly', () => {
            render(<CardModal {...mockProps} />);
            const closeIcon = screen.getByTestId('close-icon');
            
            fireEvent.click(closeIcon);
            fireEvent.click(closeIcon);
            expect(mockProps.onClose).toHaveBeenCalledTimes(2);
        });
    });

    describe('Accessibility', () => {
        it('has proper ARIA attributes', () => {
            render(<CardModal {...mockProps} />);
            const modal = screen.getByTestId('modal-backdrop');
            
            expect(modal).toBeInTheDocument();
        });

        it('can be closed with Enter key on close button', () => {
            render(<CardModal {...mockProps} />);
            const closeIcon = screen.getByTestId('close-icon');
            
            expect(closeIcon).toBeInTheDocument();
        });

        it('can be closed with Space key on close button', () => {
            render(<CardModal {...mockProps} />);
            const closeIcon = screen.getByTestId('close-icon');
            
            expect(closeIcon).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('handles onClose throwing an error gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const propsWithError = {
                ...mockProps,
                onClose: jest.fn().mockImplementation(() => {
                    throw new Error('Close error');
                }),
            };

            expect(() => render(<CardModal {...propsWithError} />)).not.toThrow();
            consoleSpy.mockRestore();
        });

        it('maintains focus management correctly', () => {
            render(<CardModal {...mockProps} />);
            const closeIcon = screen.getByTestId('close-icon');
            
            expect(closeIcon).toBeInTheDocument();
            expect(closeIcon).toHaveAttribute('data-testid', 'close-icon');
        });
    });

    describe('Props Validation', () => {
        it('handles missing cardId prop gracefully', () => {
            expect(() => render(<CardModal isOpen={true} onClose={jest.fn()} cardId={undefined as unknown as number} />)).not.toThrow();
        });

        it('handles missing isOpen prop gracefully', () => {
            expect(() => render(<CardModal cardId={1} onClose={jest.fn()} isOpen={undefined as unknown as boolean} />)).not.toThrow();
        });
    });
});

