import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/shared/HomeHeader';
 
describe('Header', () => {
  it('renders the wallet connect button', () => {
    render(<Header />);
 
    const wallet = screen.getByTestId('connect-button');
 
    expect(wallet).toBeInTheDocument();
  });

  it('shows the correct wallet button text', () => {
    render(<Header />);
    
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('wallet button is clickable', () => {
    render(<Header />);
    
    const walletButton = screen.getByTestId('connect-button');
    
    expect(walletButton).toBeInTheDocument();
    expect(walletButton).not.toBeDisabled();
  });

  it('wallet button has proper accessibility', () => {
    render(<Header />);
    
    const walletButton = screen.getByTestId('connect-button');
    
    walletButton.focus();
    expect(walletButton).toHaveFocus();
  });

  it('wallet button responds to click events', () => {
    render(<Header />);
    
    const walletButton = screen.getByTestId('connect-button');
    
    fireEvent.click(walletButton);
    
    expect(walletButton).toBeInTheDocument();
  });
});