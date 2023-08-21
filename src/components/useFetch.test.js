import { renderHook } from '@testing-library/react';
import useFetch from './useFetch'; 

describe('useFetch', () => {
  it('fetches and processes data from multiple branches', async () => {
    const branches = [1, 2, 3];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            branchId: 'b1',
            products: [
              {
                id: '000',
                name: 'Product 1',
                unitPrice: 10,
                sold: 5,
              },
            ],
          }),
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useFetch(branches));
    expect(global.fetch).toHaveBeenCalledTimes(branches.length);
    expect(result.current.error).toBe(null);
  });
});
