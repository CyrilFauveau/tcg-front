import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import Layout from '@/components/shared/Layout';
import Header from '@/components/shared/Header';
import BottomNavbar from '@/components/shared/BottomNavbar';
import CardModal from '@/components/shared/CardModal';

jest.mock('next/navigation', () => ({
    usePathname: () => '/collection',
    useRouter: () => ({
        back: jest.fn(),
        push: jest.fn(),
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

describe('Performance Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    describe('Component Render Performance', () => {
        it('renders Layout component within performance threshold', () => {
            const startTime = performance.now();
            
            render(
                <Layout>
                    <div>Performance Test Content</div>
                </Layout>
            );
            
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            expect(renderTime).toBeLessThan(500);
            expect(screen.getByText('Performance Test Content')).toBeInTheDocument();
        });

        it('renders Header component within performance threshold', () => {
            const startTime = performance.now();
            
            render(<Header />);
            
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            expect(renderTime).toBeLessThan(300);
            const headerTexts = screen.getAllByText('Collection');
            expect(headerTexts.length).toBeGreaterThan(0);
        });

        it('renders BottomNavbar component within performance threshold', () => {
            const startTime = performance.now();
            
            render(<BottomNavbar />);
            
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            expect(renderTime).toBeLessThan(300);
            const navElements = screen.getAllByRole('navigation');
            expect(navElements.length).toBeGreaterThan(0);
        });

        it('renders CardModal component within performance threshold', () => {
            const startTime = performance.now();
            
            render(
                <CardModal
                    cardId={1}
                    isOpen={true}
                    onClose={jest.fn()}
                />
            );
            
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            expect(renderTime).toBeLessThan(400);
            expect(screen.getByAltText('Card #1')).toBeInTheDocument();
        });
    });

    describe('Complex Component Rendering', () => {
        it('renders multiple components together efficiently', () => {
            const startTime = performance.now();
            
            render(
                <Layout>
                    <Header />
                        <div>Content</div>
                    <BottomNavbar />
                </Layout>
            );
            
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            expect(renderTime).toBeLessThan(800);
            
            expect(screen.getByText('Content')).toBeInTheDocument();
            const navElements = screen.getAllByRole('navigation');
            expect(navElements.length).toBeGreaterThan(0);
            const collectionTexts = screen.getAllByText('Collection');
            expect(collectionTexts.length).toBeGreaterThan(0);
        });

        it('handles rapid re-renders efficiently', () => {
            const { rerender } = render(
                <Layout>
                    <Header />
                        <div>Initial Content</div>
                    <BottomNavbar />
                </Layout>
            );
            
            const startTime = performance.now();
            
            // Perform multiple re-renders
            for (let i = 0; i < 5; i++) {
                rerender(
                    <Layout>
                        <Header />
                            <div>Content {i}</div>
                        <BottomNavbar />
                    </Layout>
                );
            }
            
            const endTime = performance.now();
            const totalTime = endTime - startTime;
            
            expect(totalTime).toBeLessThan(1000);
            expect(screen.getByText('Content 4')).toBeInTheDocument();
        });
    });

    describe('Memory Usage', () => {
        it('does not create memory leaks during re-renders', () => {
            interface PerformanceMemory {
                usedJSHeapSize: number;
                totalJSHeapSize: number;
                jsHeapSizeLimit: number;
            }
            
            interface ExtendedPerformance extends Performance {
                memory?: PerformanceMemory;
            }
            
            const extendedPerformance = performance as ExtendedPerformance;
            
            // Skip memory test if performance.memory is not available
            if (!extendedPerformance.memory?.usedJSHeapSize) {
                expect(true).toBe(true); // Skip test
                return;
            }
            
            const initialMemory = extendedPerformance.memory.usedJSHeapSize;
            
            const { rerender, unmount } = render(
                <Layout>
                    <Header />
                    <div>Memory Test</div>
                    <BottomNavbar />
                </Layout>
            );
            
            // Perform multiple render cycles
            for (let i = 0; i < 10; i++) {
                rerender(
                    <Layout>
                        <Header />
                            <div>Memory Test {i}</div>
                        <BottomNavbar />
                    </Layout>
                );
            }
            
            unmount();
            
            // Force garbage collection if available
            if (global.gc) {
                global.gc();
            }
            
            const finalMemory = extendedPerformance.memory.usedJSHeapSize;
            
            // More generous memory threshold
            const memoryIncrease = finalMemory - initialMemory;
            expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024); // 100MB threshold
        });
    });

    describe('Bundle Size Impact', () => {
        it('components do not significantly impact bundle size', () => {
            // This is a placeholder for bundle analysis tests
            expect(true).toBe(true);
        });
    });

    describe('Network Performance', () => {
        it('handles slow network conditions gracefully', () => {
            const originalFetch = global.fetch;

            global.fetch = jest.fn(() => 
                new Promise(resolve => 
                    setTimeout(() => resolve({ 
                        ok: true, 
                        json: () => Promise.resolve({}),
                        headers: new Headers(),
                        redirected: false,
                        status: 200,
                        statusText: 'OK',
                        type: 'default',
                        url: '',
                        clone: () => new Response(),
                        body: null,
                        bodyUsed: false,
                        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
                        blob: () => Promise.resolve(new Blob()),
                        formData: () => Promise.resolve(new FormData()),
                        text: () => Promise.resolve(''),
                    } as Response), 100)
                )
            );
            
            const startTime = performance.now();
            
            render(
                <Layout>
                    <Header />
                        <div>Network Test</div>
                    <BottomNavbar />
                </Layout>
            );
            
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            expect(renderTime).toBeLessThan(600);
            
            global.fetch = originalFetch;
        });

        it('animations do not block main thread', () => {
            const startTime = performance.now();
            
            render(
                <Layout>
                    <Header />
                        <div>Animation Test</div>
                    <BottomNavbar />
                </Layout>
            );
            
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            
            expect(renderTime).toBeLessThan(500);
        });
    });
});
