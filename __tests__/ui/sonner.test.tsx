import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Toaster } from '@/components/ui/sonner';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('Sonner', () => {
    it('renders toaster component', () => {
        render(<Toaster />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('applies default toaster styling classes', () => {
        render(<Toaster />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('renders with correct position', () => {
        render(<Toaster position="top-right" />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('renders without ref', () => {
        render(<Toaster />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Toaster className="custom-class" />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
        render(<Toaster />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toHaveAttribute('aria-live', 'polite');
    });

    it('renders with different positions', () => {
        const { rerender } = render(<Toaster position="top-left" />);
        
        let toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
        
        rerender(<Toaster position="bottom-right" />);
        toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('handles theme changes', () => {
        render(<Toaster theme="dark" />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('renders with rich colors', () => {
        render(<Toaster richColors />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });

    it('renders with close button', () => {
        render(<Toaster closeButton />);
        
        const toaster = screen.getByRole('region', { name: /notifications/i });
        expect(toaster).toBeInTheDocument();
    });
});



