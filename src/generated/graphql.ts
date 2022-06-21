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
  updateProduct: Scalars['Boolean'];
  updateProductOption: Scalars['Boolean'];
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


export type MutationUpdateProductArgs = {
  products: EditProductInput;
};


export type MutationUpdateProductOptionArgs = {
  option: EditProductOptionInput;
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
  storeId: Scalars['Int'];
};

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
  orders: Array<Order>;
  store?: Maybe<Store>;
  stores: Array<Maybe<Store>>;
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


export type StoreQuery = { __typename?: 'Query', store?: { __typename?: 'Store', products: Array<{ __typename?: 'Product', name: string }> } | null };

export type AddStoreMutationVariables = Exact<{
  name: Scalars['String'];
  code: Scalars['String'];
  address: Scalars['String'];
  phone: Scalars['String'];
}>;


export type AddStoreMutation = { __typename?: 'Mutation', addStore: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'TokenOutput', accessToken: string, refreshToken: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, email: string } };

export type SignupMutationVariables = Exact<{
  user: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'TokenOutput', accessToken: string, refreshToken: string } };


export const StoreDocument = `
    query store($id: Float!) {
  store(id: $id) {
    products {
      name
    }
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
export const SignupDocument = `
    mutation signup($user: SignupInput!) {
  signup(user: $user) {
    accessToken
    refreshToken
  }
}
    `;
export const useSignupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupMutation, TError, SignupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
      ['signup'],
      (variables?: SignupMutationVariables) => fetcher<SignupMutation, SignupMutationVariables>(client, SignupDocument, variables, headers)(),
      options
    );