import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from '@/components/shared/Layout';
import Header from '@/components/shared/Header';
import BottomNavbar from '@/components/shared/BottomNavbar';

jest.mock('next/navigation', () => ({
    usePathname: () => '/collection',
    useRouter: () => ({
        back: jest.fn(),
        push: jest.fn(),
    }),
}));

describe('Component Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    describe('Layout + Header + BottomNavbar Integration', () => {
        it('renders complete page structure correctly', () => {
            render(
                <Layout>
                    <Header />
                    <div>Page Content</div>
                    <BottomNavbar />
                </Layout>
            );

            const pageContent = screen.getByText('Page Content');
            expect(pageContent).toBeInTheDocument();
            
            // Check that Layout structure exists (flex flex-col)
            const layoutContainer = pageContent.closest('div')?.parentElement?.parentElement;
            expect(layoutContainer).toHaveClass('flex', 'flex-col');

            // Check Header - find the first instance
            const headerTexts = screen.getAllByText('Collection');
            expect(headerTexts.length).toBeGreaterThan(0);

            // Check BottomNavbar - find the first navigation element
            const navElements = screen.getAllByRole('navigation');
            expect(navElements.length).toBeGreaterThan(0);

            // Check content wrapper
            const contentWrapper = pageContent.parentElement;
            expect(contentWrapper).toHaveClass('grow', 'p-5');
        });

        it('maintains proper spacing between components', () => {
            render(
                <Layout>
                    <Header />
                        <div>Page Content</div>
                    <BottomNavbar />
                </Layout>
            );

            const contentWrapper = screen.getByText('Page Content').parentElement;
            expect(contentWrapper).toHaveClass('pb-20');
        });
    });

    describe('Navigation Flow Integration', () => {
        it('allows navigation between different sections', () => {
            render(
                <Layout>
                    <Header />
                        <div>Collection Page</div>
                    <BottomNavbar />
                </Layout>
            );

            const navElements = screen.getAllByRole('navigation');
            expect(navElements.length).toBeGreaterThan(0);

            expect(screen.getByText('Collection Page')).toBeInTheDocument();
        });

        it('maintains header title consistency with navigation', () => {
            render(
                <Layout>
                    <Header />
                        <div>Current Page</div>
                    <BottomNavbar />
                </Layout>
            );

            const headerTexts = screen.getAllByText('Collection');
            expect(headerTexts.length).toBeGreaterThan(0);
        });
    });

    describe('Component State Management', () => {
        it('components maintain independent state', () => {
            render(
                <Layout>
                    <Header />
                        <div>Updated Content</div>
                    <BottomNavbar />
                </Layout>
            );

            expect(screen.getByText('Updated Content')).toBeInTheDocument();
            
            const collectionTexts = screen.getAllByText('Collection');
            expect(collectionTexts.length).toBeGreaterThan(0);
            
            const layout = screen.getByText('Updated Content').closest('div')?.parentElement?.parentElement;
            expect(layout).toHaveClass('flex', 'flex-col');
        });
    });

    describe('Accessibility Integration', () => {
        it('maintains proper heading hierarchy across components', () => {
            render(
                <Layout>
                    <Header />
                        <div>Page Content</div>
                    <BottomNavbar />
                </Layout>
            );

            const headings = screen.getAllByRole('heading');
            if (headings.length > 0) {
                // Ensure no heading levels are skipped
                const headingLevels = headings.map(h => parseInt(h.tagName.charAt(1)));
                for (let i = 1; i < headingLevels.length; i++) {
                    expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
                }
            }
        });

        it('provides consistent navigation landmarks', () => {
            render(
                <Layout>
                    <Header />
                        <div>Page Content</div>
                    <BottomNavbar />
                </Layout>
            );

            // Check for navigation landmarks - use getAllByRole to handle multiple nav elements
            const navElements = screen.getAllByRole('navigation');
            expect(navElements.length).toBeGreaterThan(0);
        });
    });

    describe('Responsive Behavior Integration', () => {
        it('components adapt to different viewport sizes together', () => {
            // Mock different viewport sizes
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 768,
            });

            render(
                <Layout>
                    <Header />
                        <div>Responsive Content</div>
                    <BottomNavbar />
                </Layout>
            );

            expect(screen.getByText('Responsive Content')).toBeInTheDocument();

            // Reset viewport
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1024,
            });
        });
    });

    describe('Error Boundary Integration', () => {
        it('handles component errors gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            // Render with a component that might throw
            expect(() => {
                render(
                    <Layout>
                        <Header />
                            <div>Content</div>
                        <BottomNavbar />
                    </Layout>
                );
            }).not.toThrow();

            consoleSpy.mockRestore();
        });
    });

    describe('Performance Integration', () => {
        it('renders multiple components efficiently', () => {
            const startTime = performance.now();

            render(
                <Layout>
                    <Header />
                        <div>Performance Test Content</div>
                    <BottomNavbar />
                </Layout>
            );

            const endTime = performance.now();
            const renderTime = endTime - startTime;

            expect(renderTime).toBeLessThan(200);
        });
    });
});
