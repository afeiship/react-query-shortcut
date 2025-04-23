# react-query-shortcut
> A lightweight wrapper for TanStack Query that simplifies API integration with a unified interface.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## Installation
```bash
yarn add @jswork/react-query-shortcut
```

## Features
- 🚀 Simplified API integration with TanStack Query
- 🎯 String-based query keys for easier management
- 🔄 Unified interface for queries and mutations
- 🛠 Built-in utilities for data management

## Basic Setup
```typescript
import { QueryClient } from '@tanstack/react-query';

// Initialize your API endpoints
nx.$api = {
  'users/list': () => fetch('/api/users').then(res => res.json()),
  'users/create': (data) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
};

// Set up QueryClient
const queryClient = new QueryClient();
nx.$client = queryClient;
```

## Usage

### useNxQuery
Simplified query hook for fetching data:

```typescript
const { data, isLoading } = nx.useQuery('users/list');

// Using object config
const { data, isLoading } = nx.useQuery({
  queryKey: ['custom-key'],
  queryFn: () => fetchCustomData()
});
```

### useNxMutation
Streamlined mutation hook for data updates:

```typescript
const { mutate } = nx.useMutation('users/create');

// Handle user creation
const handleCreate = () => {
  mutate({ name: 'John Doe' });
};

// Using object config
const { mutate } = nx.useMutation({
  mutationFn: (data) => updateCustomData(data)
});
```

### Data Management Utilities

#### getQueryData
Retrieve cached query data:

```typescript
// Get data with string key
const userData = nx.getQueryData('users/list');

// Get data with array key
const nestedData = nx.getQueryData(['parent', 'child']);
```

#### invalidateQuery
Invalidate and refetch queries:

```typescript
// Invalidate with string key
await nx.invalidateQuery('users/list');

// Invalidate with array key
await nx.invalidateQuery(['parent', 'child']);
```

## License
Code released under [the MIT license](https://github.com/afeiship/react-query-shortcut/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-query-shortcut
[version-url]: https://npmjs.org/package/@jswork/react-query-shortcut

[license-image]: https://img.shields.io/npm/l/@jswork/react-query-shortcut
[license-url]: https://github.com/afeiship/react-query-shortcut/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-query-shortcut
[size-url]: https://github.com/afeiship/react-query-shortcut/blob/master/dist/react-query-shortcut.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-query-shortcut
[download-url]: https://www.npmjs.com/package/@jswork/react-query-shortcut
