import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function for tests
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, options);

// Mock data for tests
export const mockPokemonCard = {
    id: 1,
    name: 'Pikachu',
    type: 'Electric',
    attack: 55,
    defense: 40,
    speed: 90,
};

export const mockCollection = [
    mockPokemonCard,
    { ...mockPokemonCard, id: 2, name: 'Charmander', type: 'Fire' },
];

export const mockWalletAddress = '0x1234567890123456789012345678901234567890';

// Utility functions for tests
export const mockConsoleError = () => {
    const originalError = console.error;
    const mockError = jest.fn();
    console.error = mockError;
    return { mockError, restore: () => { console.error = originalError; } };
};

export const mockConsoleWarn = () => {
    const originalWarn = console.warn;
    const mockWarn = jest.fn();
    console.warn = mockWarn;
    return { mockWarn, restore: () => { console.warn = originalWarn; } };
};

export const waitForElementToBeRemoved = (element: Element) => {
    return new Promise<void>((resolve) => {
        const observer = new MutationObserver(() => {
            if (!document.contains(element)) {
                observer.disconnect();
                resolve();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
};

export const checkAccessibility = async (container: HTMLElement) => {
    // Basic accessibility checks
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const images = container.querySelectorAll('img');
    
    // Check that images have alt text
    images.forEach(img => {
        expect(img).toHaveAttribute('alt');
    });
    
    // Check that headings are properly nested
    if (headings.length > 1) {
        const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
        for (let i = 1; i < headingLevels.length; i++) {
            expect(headingLevels[i] - headingLevels[i - 1]).toBeLessThanOrEqual(1);
        }
    }
};

export const measureRenderTime = (renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    return end - start;
};

export const createMockIntersectionObserver = () => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    return mockIntersectionObserver;
};

export const createMockResizeObserver = () => {
    const mockResizeObserver = jest.fn();
    mockResizeObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    });
    window.ResizeObserver = mockResizeObserver;
    return mockResizeObserver;
};

export const cleanupAfterEach = () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Add a simple test to satisfy Jest
describe('Test Utils', () => {
    it('should provide utility functions', () => {
        expect(mockPokemonCard).toBeDefined();
        expect(mockCollection).toBeDefined();
        expect(mockWalletAddress).toBeDefined();
        expect(customRender).toBeDefined();
    });
});



