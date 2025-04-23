import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import nx from '@jswork/next';
import { useNxQuery, useNxMutation, getQueryData, invalidateQuery } from '../src';


describe('react-query-shortcut', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    nx.$client = queryClient;
    nx.$api = {
      'users/list': () => Promise.resolve(['user1', 'user2']),
      'users/create': (data) => Promise.resolve({ id: 1, ...data })
    };
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe('useNxQuery', () => {
    it('should work with string key', async () => {
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useNxQuery('users/list'), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(['user1', 'user2']);
    });

    it('should work with object config', async () => {
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(
        () =>
          useNxQuery({
            queryKey: ['custom-key'],
            queryFn: () => Promise.resolve('custom-data')
          }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBe('custom-data');
    });
  });

  describe('useNxMutation', () => {
    it('should work with string key', async () => {
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(() => useNxMutation('users/create'), { wrapper });

      const userData = { name: 'John' };
      result.current.mutate(userData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual({ id: 1, name: 'John' });
    });

    it('should work with object config', async () => {
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );

      const { result } = renderHook(
        () =>
          useNxMutation({
            mutationFn: (data) => Promise.resolve({ success: true, data })
          }),
        { wrapper }
      );

      result.current.mutate({ test: true });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual({ success: true, data: { test: true } });
    });
  });

  describe('getQueryData', () => {
    it('should get query data with string key', () => {
      queryClient.setQueryData(['test-key'], 'test-data');
      expect(getQueryData('test-key')).toBe('test-data');
    });

    it('should get query data with array key', () => {
      queryClient.setQueryData(['parent', 'child'], 'nested-data');
      expect(getQueryData(['parent', 'child'])).toBe('nested-data');
    });
  });

  describe('invalidateQuery', () => {
    it('should invalidate query with string key', async () => {
      queryClient.setQueryData(['test-key'], 'old-data');
      await invalidateQuery('test-key');
      expect(queryClient.getQueryData(['test-key'])).toBeUndefined();
    });

    it('should invalidate query with array key', async () => {
      queryClient.setQueryData(['parent', 'child'], 'old-data');
      await invalidateQuery(['parent', 'child']);
      expect(queryClient.getQueryData(['parent', 'child'])).toBeUndefined();
    });
  });
});
