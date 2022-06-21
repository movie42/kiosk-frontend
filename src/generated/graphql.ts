import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddProductInput = {
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  storeId: Scalars['Int'];
};

export type AddProductOptionInput = {
  name: Scalars['String'];
  productId: Scalars['Int'];
};

export type AddStoreInput = {
  address: Scalars['String'];
  code: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type AddUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type EditProductInput = {
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  productId: Scalars['Int'];
};

export type EditProductOptionInput = {
  name: Scalars['String'];
  optionId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductOptions: Scalars['Boolean'];
  addProducts: Scalars['Boolean'];
  addStore: Scalars['Boolean'];
  addUser: Scalars['Boolean'];
  login: TokenOutput;
  removeProductOptions: Scalars['Boolean'];
  removeProducts: Scalars['Boolean'];
  removeStore: Scalars['Boolean'];
  signup: TokenOutput;
  updateOrderStatus: Scalars['Boolean'];
  updateProduct: Scalars['Boolean'];
  updateProductOption: Scalars['Boolean'];
  updateStore: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
  withdraw: Scalars['Boolean'];
};


export type MutationAddProductOptionsArgs = {
  option: Array<AddProductOptionInput>;
};


export type MutationAddProductsArgs = {
  products: Array<AddProductInput>;
};


export type MutationAddStoreArgs = {
  store: AddStoreInput;
};


export type MutationAddUserArgs = {
  user: AddUserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveProductOptionsArgs = {
  optionIds: RemoveProductOptionInput;
};


export type MutationRemoveProductsArgs = {
  productIds: RemoveProductInput;
};


export type MutationRemoveStoreArgs = {
  id: Scalars['Float'];
};


export type MutationSignupArgs = {
  user: SignupInput;
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['Int'];
  status: OrderStatusInput;
};


export type MutationUpdateProductArgs = {
  products: EditProductInput;
};


export type MutationUpdateProductOptionArgs = {
  option: EditProductOptionInput;
};


export type MutationUpdateStoreArgs = {
  id: Scalars['Float'];
  store: UpdateStoreInput;
};


export type MutationUpdateUserArgs = {
  name: Scalars['String'];
  userId: Scalars['Int'];
};

export type Option = {
  __typename?: 'Option';
  id: Scalars['ID'];
  name: Scalars['String'];
  productId: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  number: Scalars['Int'];
  price: Scalars['Int'];
  products: Array<Product>;
  status: OrderStatusType;
  storeId: Scalars['Int'];
};

export type OrderStatusInput = {
  status: OrderStatusType;
};

export enum OrderStatusType {
  Canceled = 'CANCELED',
  Complete = 'COMPLETE',
  Done = 'DONE',
  Ready = 'READY'
}

export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  options: Array<Option>;
  price: Scalars['Int'];
  storeId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  myStores: Array<Store>;
  orders: Array<Order>;
  store?: Maybe<Store>;
  storeIsAvailable: Scalars['Boolean'];
  stores: Array<Store>;
  users: Array<Maybe<User>>;
};


export type QueryOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  storeId: Scalars['Int'];
};


export type QueryStoreArgs = {
  id: Scalars['Float'];
};


export type QueryStoreIsAvailableArgs = {
  id: Scalars['Float'];
};

export type SignupInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Store = {
  __typename?: 'Store';
  address: Scalars['String'];
  code: Scalars['String'];
  id: Scalars['ID'];
  isAvailable: Scalars['Boolean'];
  name: Scalars['String'];
  ownerId: Scalars['Int'];
  phone: Scalars['String'];
  products: Array<Product>;
};

export type TokenOutput = {
  __typename?: 'TokenOutput';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UpdateStoreInput = {
  address: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type RemoveProductInput = {
  productIds: Array<Scalars['Int']>;
};

export type RemoveProductOptionInput = {
  OptionIds: Array<Scalars['Int']>;
};

export type StoreQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type StoreQuery = { __typename?: 'Query', store?: { __typename?: 'Store', id: string, name: string, code: string, phone: string, address: string, isAvailable: boolean } | null };

export type StoresQueryVariables = Exact<{ [key: string]: never; }>;


export type StoresQuery = { __typename?: 'Query', stores: Array<{ __typename?: 'Store', id: string, name: string, code: string, phone: string, address: string, isAvailable: boolean }> };

export type MyStoresQueryVariables = Exact<{ [key: string]: never; }>;


export type MyStoresQuery = { __typename?: 'Query', myStores: Array<{ __typename?: 'Store', id: string, name: string, code: string, address: string, phone: string, isAvailable: boolean }> };

export type StoreIsAvailableQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type StoreIsAvailableQuery = { __typename?: 'Query', storeIsAvailable: boolean };

export type AddStoreMutationVariables = Exact<{
  name: Scalars['String'];
  code: Scalars['String'];
  address: Scalars['String'];
  phone: Scalars['String'];
}>;


export type AddStoreMutation = { __typename?: 'Mutation', addStore: boolean };

export type RemoveStoreMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RemoveStoreMutation = { __typename?: 'Mutation', removeStore: boolean };

export type UpdateStoreMutationVariables = Exact<{
  id: Scalars['Float'];
  name: Scalars['String'];
  address: Scalars['String'];
  phone: Scalars['String'];
}>;


export type UpdateStoreMutation = { __typename?: 'Mutation', updateStore: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenOutput', accessToken: string, refreshToken: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, email: string } };


export const StoreDocument = `
    query store($id: Float!) {
  store(id: $id) {
    id
    name
    code
    phone
    address
    isAvailable
  }
}
    `;
export const useStoreQuery = <
      TData = StoreQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: StoreQueryVariables,
      options?: UseQueryOptions<StoreQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StoreQuery, TError, TData>(
      ['store', variables],
      fetcher<StoreQuery, StoreQueryVariables>(client, StoreDocument, variables, headers),
      options
    );
export const StoresDocument = `
    query stores {
  stores {
    id
    name
    code
    phone
    address
    isAvailable
  }
}
    `;
export const useStoresQuery = <
      TData = StoresQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: StoresQueryVariables,
      options?: UseQueryOptions<StoresQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StoresQuery, TError, TData>(
      variables === undefined ? ['stores'] : ['stores', variables],
      fetcher<StoresQuery, StoresQueryVariables>(client, StoresDocument, variables, headers),
      options
    );
export const MyStoresDocument = `
    query myStores {
  myStores {
    id
    name
    code
    address
    phone
    isAvailable
  }
}
    `;
export const useMyStoresQuery = <
      TData = MyStoresQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MyStoresQueryVariables,
      options?: UseQueryOptions<MyStoresQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MyStoresQuery, TError, TData>(
      variables === undefined ? ['myStores'] : ['myStores', variables],
      fetcher<MyStoresQuery, MyStoresQueryVariables>(client, MyStoresDocument, variables, headers),
      options
    );
export const StoreIsAvailableDocument = `
    query storeIsAvailable($id: Float!) {
  storeIsAvailable(id: $id)
}
    `;
export const useStoreIsAvailableQuery = <
      TData = StoreIsAvailableQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: StoreIsAvailableQueryVariables,
      options?: UseQueryOptions<StoreIsAvailableQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StoreIsAvailableQuery, TError, TData>(
      ['storeIsAvailable', variables],
      fetcher<StoreIsAvailableQuery, StoreIsAvailableQueryVariables>(client, StoreIsAvailableDocument, variables, headers),
      options
    );
export const AddStoreDocument = `
    mutation addStore($name: String!, $code: String!, $address: String!, $phone: String!) {
  addStore(store: {name: $name, code: $code, address: $address, phone: $phone})
}
    `;
export const useAddStoreMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddStoreMutation, TError, AddStoreMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddStoreMutation, TError, AddStoreMutationVariables, TContext>(
      ['addStore'],
      (variables?: AddStoreMutationVariables) => fetcher<AddStoreMutation, AddStoreMutationVariables>(client, AddStoreDocument, variables, headers)(),
      options
    );
export const RemoveStoreDocument = `
    mutation removeStore($id: Float!) {
  removeStore(id: $id)
}
    `;
export const useRemoveStoreMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RemoveStoreMutation, TError, RemoveStoreMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RemoveStoreMutation, TError, RemoveStoreMutationVariables, TContext>(
      ['removeStore'],
      (variables?: RemoveStoreMutationVariables) => fetcher<RemoveStoreMutation, RemoveStoreMutationVariables>(client, RemoveStoreDocument, variables, headers)(),
      options
    );
export const UpdateStoreDocument = `
    mutation updateStore($id: Float!, $name: String!, $address: String!, $phone: String!) {
  updateStore(id: $id, store: {name: $name, address: $address, phone: $phone})
}
    `;
export const useUpdateStoreMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateStoreMutation, TError, UpdateStoreMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateStoreMutation, TError, UpdateStoreMutationVariables, TContext>(
      ['updateStore'],
      (variables?: UpdateStoreMutationVariables) => fetcher<UpdateStoreMutation, UpdateStoreMutationVariables>(client, UpdateStoreDocument, variables, headers)(),
      options
    );
export const LoginDocument = `
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const MeDocument = `
    query me {
  me {
    id
    name
    email
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['me'] : ['me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );