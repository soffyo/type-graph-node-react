import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: User;
  addUser: User;
  deleteUser: User;
  initUsers: Scalars['String'];
  purgeUsers: Scalars['String'];
  updateUser: User;
};


export type MutationActivateUserArgs = {
  email: Scalars['String'];
};


export type MutationAddUserArgs = {
  email: Scalars['String'];
  info?: InputMaybe<UserInfoInput>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  email: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email: Scalars['String'];
  info?: InputMaybe<UserInfoInput>;
  newpassword?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  argTest: Scalars['String'];
  user: User;
  users: Array<User>;
};


export type QueryArgTestArgs = {
  arg?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  email: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Root = 'ROOT',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean'];
  bio?: Maybe<Scalars['String']>;
  birthdate?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  joindate: Scalars['Float'];
  lastname?: Maybe<Scalars['String']>;
  passwordhash: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  role: Role;
  username: Scalars['String'];
};

export type UserInfoInput = {
  bio?: InputMaybe<Scalars['String']>;
  birthdate?: InputMaybe<Scalars['Float']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', username: string, email: string, role: Role }> };


export const TestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"test"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<TestQuery, TestQueryVariables>;