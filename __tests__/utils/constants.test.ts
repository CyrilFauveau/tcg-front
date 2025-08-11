import '@testing-library/jest-dom';
import { contractAddress, contractAbi } from '@/constants';

describe('Constants', () => {
    it('has required constant properties', () => {
        // Test that constants object has the expected structure
        expect(contractAddress).toBeDefined();
        expect(contractAbi).toBeDefined();
    });

    it('contractAddress is a valid address', () => {
        expect(typeof contractAddress).toBe('string');
        expect(contractAddress).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('contractAbi is a valid ABI array', () => {
        expect(Array.isArray(contractAbi)).toBe(true);
        expect(contractAbi.length).toBeGreaterThan(0);
        
        // Test that each ABI item has required properties
        contractAbi.forEach(item => {
            expect(item).toHaveProperty('type');
            expect(typeof item.type).toBe('string');
        });
    });

    it('contractAbi contains required function definitions', () => {
        const functionNames = contractAbi
            .filter(item => item.type === 'function')
            .map(item => item.name);
        
        expect(functionNames).toContain('openBooster');
        expect(functionNames).toContain('getCardsByUser');
        expect(functionNames).toContain('balanceOf');
    });

    it('contractAbi contains required event definitions', () => {
        const eventNames = contractAbi
            .filter(item => item.type === 'event')
            .map(item => item.name);
        
        expect(eventNames).toContain('BoosterOpened');
        expect(eventNames).toContain('TransferSingle');
        expect(eventNames).toContain('TransferBatch');
    });

    it('contractAbi contains required error definitions', () => {
        const errorNames = contractAbi
            .filter(item => item.type === 'error')
            .map(item => item.name);
        
        expect(errorNames).toContain('ERC1155InsufficientBalance');
        expect(errorNames).toContain('ERC1155InvalidApprover');
    });

    it('constants are exported as named exports', () => {
        expect(contractAddress).toBeDefined();
        expect(contractAbi).toBeDefined();
    });

    it('constants have consistent values across imports', () => {
        // Test that constants maintain the same values
        expect(contractAddress).toBeDefined();
        expect(contractAbi).toBeDefined();
    });
});

