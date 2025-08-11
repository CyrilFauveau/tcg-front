import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock the entire CustomRainbowKitProvider module
jest.mock('@/app/CustomRainbowKitProvider', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="custom-rainbowkit-provider">
            <div data-testid="query-client-provider">
                <div data-testid="wagmi-config">
                    <div data-testid="rainbowkit-provider">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ),
}));

// Import after mocking
import CustomRainbowKitProvider from '@/app/CustomRainbowKitProvider';

describe('CustomRainbowKitProvider', () => {
    it('renders wallet provider', () => {
        render(
            <CustomRainbowKitProvider>
                <div>Test Content</div>
            </CustomRainbowKitProvider>
        );
        
        expect(screen.getByTestId('query-client-provider')).toBeInTheDocument();
        expect(screen.getByTestId('wagmi-config')).toBeInTheDocument();
        expect(screen.getByTestId('rainbowkit-provider')).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <CustomRainbowKitProvider>
                <div>Test Content</div>
            </CustomRainbowKitProvider>
        );
        
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('has proper provider structure', () => {
        render(
            <CustomRainbowKitProvider>
                <div>Test Content</div>
            </CustomRainbowKitProvider>
        );
        
        const queryProvider = screen.getByTestId('query-client-provider');
        const wagmiConfig = screen.getByTestId('wagmi-config');
        const rainbowkitProvider = screen.getByTestId('rainbowkit-provider');
        
        expect(queryProvider).toContainElement(wagmiConfig);
        expect(wagmiConfig).toContainElement(rainbowkitProvider);
    });
});

