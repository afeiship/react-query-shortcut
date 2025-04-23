import { useMutation, useQuery } from '@tanstack/react-query';

const useNxQuery = (inKey: string | AnyObject, inOptions?: any) => {
  const opts =
    typeof inKey === 'object'
      ? inKey
      : {
          queryKey: [inKey],
          queryFn: nx.$api[inKey],
          ...inOptions
        };
  return useQuery<any>(opts);
};

const useNxMutation = (inKey: string | AnyObject, inOptions?) => {
  const opts =
    typeof inKey === 'object'
      ? inKey
      : {
        mutationKey: [inKey],
        mutationFn: nx.$api[inKey],
        ...inOptions
      };
  return useMutation<any>(opts);
};

const getQueryData = (queryKey: string | string[]) => {
  const key = typeof queryKey === 'string' ? [queryKey] : queryKey;
  return nx.$client.getQueryData(key) as any;
};

const invalidateQuery = (key: string | string[]) => {
  const args = typeof key ==='string'? [key] : key;
  return nx.$client.invalidateQueries({ queryKey: args });
};


nx.useQuery = useNxQuery;
nx.getQueryData = getQueryData;
nx.useMutation = useNxMutation;
nx.invalidateQuery = invalidateQuery;

export { useNxQuery, useNxMutation, getQueryData, invalidateQuery };
