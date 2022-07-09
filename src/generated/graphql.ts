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

export type AddOrderInput = {
  products: Array<OrderProductInput>;
  storeId: Scalars['Int'];
  type: OrderType;
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
  addOrder: Scalars['Int'];
  addProductOptions: Scalars['Boolean'];
  addProducts: Array<Scalars['Int']>;
  addStore: Scalars['Boolean'];
  addUser: Scalars['Boolean'];
  login: TokenOutput;
  removeProductOptions: Scalars['Boolean'];
  removeProducts: Scalars['Boolean'];
  removeStore: Scalars['Boolean'];
  signup: TokenOutput;
  toggleProductIsAvailable: Scalars['Boolean'];
  toggleStoreIsAvailable: Scalars['Boolean'];
  updateOrderStatus: Scalars['Boolean'];
  updateProduct: Scalars['Boolean'];
  updateProductOption: Scalars['Boolean'];
  updateStore: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
  withdraw: Scalars['Boolean'];
};


export type MutationAddOrderArgs = {
  order: AddOrderInput;
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


export type MutationToggleProductIsAvailableArgs = {
  id: Scalars['Float'];
};


export type MutationToggleStoreIsAvailableArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['Int'];
  status: OrderStatusType;
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
  orderProducts: Array<OrderProduct>;
  price: Scalars['Int'];
  products: Array<Product>;
  status: OrderStatusType;
  storeId: Scalars['Int'];
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  amount: Scalars['Int'];
  id: Scalars['ID'];
  orderId: Scalars['Int'];
  productId: Scalars['Int'];
  productOptionIds: Array<Scalars['Int']>;
};

export type OrderProductInput = {
  amount: Scalars['Int'];
  productId: Scalars['Int'];
  productOptionIds: Array<Scalars['Int']>;
};

export enum OrderStatusType {
  Canceled = 'CANCELED',
  Complete = 'COMPLETE',
  Done = 'DONE',
  Ready = 'READY'
}

export enum OrderType {
  Go = 'GO',
  Here = 'HERE'
}

export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  isAvailable: Scalars['Boolean'];
  name: Scalars['String'];
  options: Array<Option>;
  price: Scalars['Int'];
  storeId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  loginByRefreshToken: TokenOutput;
  me: User;
  myStores: Array<Store>;
  orders: Array<Order>;
  productIsAvailable: Scalars['Boolean'];
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


export type QueryProductIsAvailableArgs = {
  id: Scalars['Float'];
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
  orders: Array<Order>;
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

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', myStores: Array<{ __typename?: 'Store', id: string, products: Array<{ __typename?: 'Product', id: string, name: string, price: number, options: Array<{ __typename?: 'Option', id: string, name: string }> }>, orders: Array<{ __typename?: 'Order', id: string, number: number, price: number, storeId: number, status: OrderStatusType, orderProducts: Array<{ __typename?: 'OrderProduct', orderId: number, productId: number, amount: number, productOptionIds: Array<number> }> }> }> };

export type GetProductsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetProductsQuery = { __typename?: 'Query', store?: { __typename?: 'Store', id: string, products: Array<{ __typename?: 'Product', id: string, name: string, price: number, imageUrl?: string | null, description?: string | null, isAvailable: boolean, options: Array<{ __typename?: 'Option', id: string, name: string }> }> } | null };

export type AddProductsMutationVariables = Exact<{
  products: Array<AddProductInput> | AddProductInput;
}>;


export type AddProductsMutation = { __typename?: 'Mutation', addProducts: Array<number> };

export type UpdateProductMutationVariables = Exact<{
  products: EditProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: boolean };

export type RemoveProductsMutationVariables = Exact<{
  productIds: RemoveProductInput;
}>;


export type RemoveProductsMutation = { __typename?: 'Mutation', removeProducts: boolean };

export type ToggleProductIsAvailableMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ToggleProductIsAvailableMutation = { __typename?: 'Mutation', toggleProductIsAvailable: boolean };

export type AddProductOptionsMutationVariables = Exact<{
  option: Array<AddProductOptionInput> | AddProductOptionInput;
}>;


export type AddProductOptionsMutation = { __typename?: 'Mutation', addProductOptions: boolean };

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

export type ToggleStoreIsAvailableMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ToggleStoreIsAvailableMutation = { __typename?: 'Mutation', toggleStoreIsAvailable: boolean };

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

export type SignupMutationVariables = Exact<{
  user: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'TokenOutput', accessToken: string, refreshToken: string } };


export const GetOrdersDocument = `
    query getOrders {
  myStores {
    id
    products {
      id
      name
      price
      options {
        id
        name
      }
    }
    orders {
      id
      number
      price
      storeId
      status
      orderProducts {
        orderId
        productId
        amount
        productOptionIds
      }
    }
  }
}
    `;
export const useGetOrdersQuery = <
      TData = GetOrdersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetOrdersQueryVariables,
      options?: UseQueryOptions<GetOrdersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetOrdersQuery, TError, TData>(
      variables === undefined ? ['getOrders'] : ['getOrders', variables],
      fetcher<GetOrdersQuery, GetOrdersQueryVariables>(client, GetOrdersDocument, variables, headers),
      options
    );
export const GetProductsDocument = `
    query getProducts($id: Float!) {
  store(id: $id) {
    id
    products {
      id
      name
      price
      imageUrl
      description
      isAvailable
      options {
        id
        name
      }
      isAvailable
    }
  }
}
    `;
export const useGetProductsQuery = <
      TData = GetProductsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetProductsQueryVariables,
      options?: UseQueryOptions<GetProductsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetProductsQuery, TError, TData>(
      ['getProducts', variables],
      fetcher<GetProductsQuery, GetProductsQueryVariables>(client, GetProductsDocument, variables, headers),
      options
    );
export const AddProductsDocument = `
    mutation addProducts($products: [AddProductInput!]!) {
  addProducts(products: $products)
}
    `;
export const useAddProductsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddProductsMutation, TError, AddProductsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddProductsMutation, TError, AddProductsMutationVariables, TContext>(
      ['addProducts'],
      (variables?: AddProductsMutationVariables) => fetcher<AddProductsMutation, AddProductsMutationVariables>(client, AddProductsDocument, variables, headers)(),
      options
    );
export const UpdateProductDocument = `
    mutation updateProduct($products: EditProductInput!) {
  updateProduct(products: $products)
}
    `;
export const useUpdateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>(
      ['updateProduct'],
      (variables?: UpdateProductMutationVariables) => fetcher<UpdateProductMutation, UpdateProductMutationVariables>(client, UpdateProductDocument, variables, headers)(),
      options
    );
export const RemoveProductsDocument = `
    mutation removeProducts($productIds: removeProductInput!) {
  removeProducts(productIds: $productIds)
}
    `;
export const useRemoveProductsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RemoveProductsMutation, TError, RemoveProductsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RemoveProductsMutation, TError, RemoveProductsMutationVariables, TContext>(
      ['removeProducts'],
      (variables?: RemoveProductsMutationVariables) => fetcher<RemoveProductsMutation, RemoveProductsMutationVariables>(client, RemoveProductsDocument, variables, headers)(),
      options
    );
export const ToggleProductIsAvailableDocument = `
    mutation toggleProductIsAvailable($id: Float!) {
  toggleProductIsAvailable(id: $id)
}
    `;
export const useToggleProductIsAvailableMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ToggleProductIsAvailableMutation, TError, ToggleProductIsAvailableMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ToggleProductIsAvailableMutation, TError, ToggleProductIsAvailableMutationVariables, TContext>(
      ['toggleProductIsAvailable'],
      (variables?: ToggleProductIsAvailableMutationVariables) => fetcher<ToggleProductIsAvailableMutation, ToggleProductIsAvailableMutationVariables>(client, ToggleProductIsAvailableDocument, variables, headers)(),
      options
    );
export const AddProductOptionsDocument = `
    mutation addProductOptions($option: [AddProductOptionInput!]!) {
  addProductOptions(option: $option)
}
    `;
export const useAddProductOptionsMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddProductOptionsMutation, TError, AddProductOptionsMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddProductOptionsMutation, TError, AddProductOptionsMutationVariables, TContext>(
      ['addProductOptions'],
      (variables?: AddProductOptionsMutationVariables) => fetcher<AddProductOptionsMutation, AddProductOptionsMutationVariables>(client, AddProductOptionsDocument, variables, headers)(),
      options
    );
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
export const ToggleStoreIsAvailableDocument = `
    mutation toggleStoreIsAvailable($id: Float!) {
  toggleStoreIsAvailable(id: $id)
}
    `;
export const useToggleStoreIsAvailableMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ToggleStoreIsAvailableMutation, TError, ToggleStoreIsAvailableMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ToggleStoreIsAvailableMutation, TError, ToggleStoreIsAvailableMutationVariables, TContext>(
      ['toggleStoreIsAvailable'],
      (variables?: ToggleStoreIsAvailableMutationVariables) => fetcher<ToggleStoreIsAvailableMutation, ToggleStoreIsAvailableMutationVariables>(client, ToggleStoreIsAvailableDocument, variables, headers)(),
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