interface NxStatic {
  $api: any;
  $client: import('@tanstack/react-query').QueryClient;
  getQueryData: (queryKey: string | any[]) => any;
  useQuery: (key: string | AnyObject, opts?) => NxUseQueryResult;
  useMutation: (key: string | AnyObject, opts?) => any;
  invalidateQuery: (key: string | string[]) => any;
}
