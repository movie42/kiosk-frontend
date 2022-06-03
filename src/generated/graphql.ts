import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import { useQuery, UseQueryOptions } from "react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"],
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
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
  description?: InputMaybe<Scalars["String"]>;
  imageUrl?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  price: Scalars["Int"];
  storeId: Scalars["Int"];
};

export type AddProductOptionInput = {
  name: Scalars["String"];
  productId: Scalars["Int"];
};

export type AddStoreInput = {
  address: Scalars["String"];
  code: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
};

export type AddUserInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type EditProductInput = {
  description?: InputMaybe<Scalars["String"]>;
  imageUrl?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Int"]>;
  productId: Scalars["Int"];
};

export type EditProductOptionInput = {
  name: Scalars["String"];
  optionId: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  addProductOptions: Scalars["Boolean"];
  addProducts: Scalars["Boolean"];
  addStore: Scalars["Boolean"];
  addUser: Scalars["Boolean"];
  removeProductOptions: Scalars["Boolean"];
  removeProducts: Scalars["Boolean"];
  removeStore: Scalars["Boolean"];
  signup: TokenOutput;
  updateProduct: Scalars["Boolean"];
  updateProductOption: Scalars["Boolean"];
  updateUser: Scalars["Boolean"];
  withdraw: Scalars["Boolean"];
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

export type MutationRemoveProductOptionsArgs = {
  optionIds: RemoveProductOptionInput;
};

export type MutationRemoveProductsArgs = {
  productIds: RemoveProductInput;
};

export type MutationRemoveStoreArgs = {
  id: Scalars["Float"];
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
  name: Scalars["String"];
  userId: Scalars["Int"];
};

export type Option = {
  __typename?: "Option";
  id: Scalars["ID"];
  name: Scalars["String"];
  productId: Scalars["Int"];
};

export type Order = {
  __typename?: "Order";
  id: Scalars["ID"];
  number: Scalars["Int"];
  price: Scalars["Int"];
  products: Array<Product>;
  storeId: Scalars["Int"];
};

export type Product = {
  __typename?: "Product";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  imageUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  options: Array<Option>;
  price: Scalars["Int"];
  storeId: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  login: TokenOutput;
  orders: Array<Order>;
  store?: Maybe<Store>;
  stores: Array<Maybe<Store>>;
  users: Array<Maybe<User>>;
};

export type QueryLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type QueryOrdersArgs = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type QueryStoreArgs = {
  id: Scalars["Float"];
};

export type SignupInput = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type Store = {
  __typename?: "Store";
  address: Scalars["String"];
  code: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
  ownerId: Scalars["Int"];
  phone: Scalars["String"];
  products: Array<Product>;
};

export type TokenOutput = {
  __typename?: "TokenOutput";
  accessToken: Scalars["String"];
  refreshToken: Scalars["String"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RemoveProductInput = {
  productIds: Array<Scalars["Int"]>;
};

export type RemoveProductOptionInput = {
  OptionIds: Array<Scalars["Int"]>;
};

export type LoginQueryVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginQuery = {
  __typename?: "Query";
  login: {
    __typename?: "TokenOutput";
    accessToken: string;
    refreshToken: string;
  };
};

export const LoginDocument = `
    query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export const useLoginQuery = <TData = LoginQuery, TError = unknown>(
  client: GraphQLClient,
  variables: LoginQueryVariables,
  options?: UseQueryOptions<LoginQuery, TError, TData>,
  headers?: RequestInit["headers"],
) =>
  useQuery<LoginQuery, TError, TData>(
    ["login", variables],
    fetcher<LoginQuery, LoginQueryVariables>(
      client,
      LoginDocument,
      variables,
      headers,
    ),
    options,
  );
