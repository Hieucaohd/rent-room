// tslint:disable
export type Maybe<T> = T;
export type InputMaybe<T> = T;
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
  /** Date custom scalar type */
  Date: any;
  Upload: any;
};

export type AddressConditionInput = {
  district?: InputMaybe<Scalars['Int']>;
  province?: InputMaybe<Scalars['Int']>;
  ward?: InputMaybe<Scalars['Int']>;
};

export type AfterDelete = {
  __typename?: 'AfterDelete';
  id: Scalars['ID'];
  success?: Maybe<Scalars['Boolean']>;
};

export enum ArrangeType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  user?: Maybe<User>;
};

export type CleaningPriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};

export type ElectricityPriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};

export type FilterRoomInput = {
  address?: InputMaybe<AddressConditionInput>;
  floor?: InputMaybe<FloorConditionInput>;
  homeId?: InputMaybe<Scalars['ID']>;
  liveWithOwner?: InputMaybe<Scalars['Boolean']>;
  livingExpenses?: InputMaybe<LivingExpensesConditionInput>;
  price?: InputMaybe<PriceConditionInput>;
  square?: InputMaybe<SquareConditionInput>;
};

export type FloorConditionInput = {
  scope?: InputMaybe<Scope>;
};

export type Home = Node & Timestamps & {
  __typename?: 'Home';
  _id: Scalars['ID'];
  cleaningPrice?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  detailAddress?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['Int']>;
  districtName?: Maybe<Scalars['String']>;
  electricityPrice?: Maybe<Scalars['Int']>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  internetPrice?: Maybe<Scalars['Int']>;
  listRooms?: Maybe<RoomPaginator>;
  liveWithOwner?: Maybe<Scalars['Boolean']>;
  owner?: Maybe<User>;
  position?: Maybe<Position>;
  province?: Maybe<Scalars['Int']>;
  provinceName?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  totalRooms?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  ward?: Maybe<Scalars['Int']>;
  wardName?: Maybe<Scalars['String']>;
  waterPrice?: Maybe<Scalars['Int']>;
};


export type HomeListRoomsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type HomeInput = {
  cleaningPrice?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  detailAddress?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['Int']>;
  electricityPrice?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internetPrice?: InputMaybe<Scalars['Int']>;
  liveWithOwner?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<PositionInput>;
  province?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  totalRooms?: InputMaybe<Scalars['Int']>;
  ward?: InputMaybe<Scalars['Int']>;
  waterPrice?: InputMaybe<Scalars['Int']>;
};

export type HomePaginator = PaginatorResult & {
  __typename?: 'HomePaginator';
  docs?: Maybe<Array<Maybe<Home>>>;
  paginator?: Maybe<Paginator>;
};

export type HomeUpdateInput = {
  cleaningPrice?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  detailAddress?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['Int']>;
  electricityPrice?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internetPrice?: InputMaybe<Scalars['Int']>;
  liveWithOwner?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<PositionInput>;
  province?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  totalRooms?: InputMaybe<Scalars['Int']>;
  ward?: InputMaybe<Scalars['Int']>;
  waterPrice?: InputMaybe<Scalars['Int']>;
};

export type InternetPriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};

export type LivingExpensesConditionInput = {
  cleaningCondition?: InputMaybe<CleaningPriceConditionInput>;
  electricityCondition?: InputMaybe<ElectricityPriceConditionInput>;
  internetCondition?: InputMaybe<InternetPriceConditionInput>;
  waterCondition?: InputMaybe<WaterPriceConditionInput>;
};

export type LogoutStatus = {
  __typename?: 'LogoutStatus';
  status: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']>;
  createNewHome?: Maybe<Home>;
  createNewRoom: Room;
  deleteHome: Scalars['ID'];
  deleteRoom: Scalars['ID'];
  logout: LogoutStatus;
  register: AuthResponse;
  updateHome: Home;
  updateRoom: Room;
  updateUser: User;
};


export type MutationCreateNewHomeArgs = {
  newHome: HomeInput;
};


export type MutationCreateNewRoomArgs = {
  homeId: Scalars['ID'];
  newRoom: RoomInput;
};


export type MutationDeleteHomeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoomArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  newUser: UserInput;
};


export type MutationUpdateHomeArgs = {
  id: Scalars['ID'];
  updatedHome: HomeUpdateInput;
};


export type MutationUpdateRoomArgs = {
  id: Scalars['ID'];
  updatedRoom: RoomInput;
};


export type MutationUpdateUserArgs = {
  updateInfo: UpdateUserInput;
};

export type Node = {
  _id?: Maybe<Scalars['ID']>;
};

export type Paginator = {
  __typename?: 'Paginator';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPrevPage?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  nextPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  pagingCounter?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  totalDocs?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type PaginatorResult = {
  docs?: Maybe<Array<Maybe<Node>>>;
  paginator?: Maybe<Paginator>;
};

export type Position = {
  __typename?: 'Position';
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
};

export type PositionInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type PriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};

export type Profile = {
  __typename?: 'Profile';
  isAuth?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']>;
  allHomes?: Maybe<HomePaginator>;
  allRooms?: Maybe<RoomPaginator>;
  filterRoom?: Maybe<RoomPaginator>;
  getHomeById?: Maybe<Home>;
  getRoomById?: Maybe<Room>;
  login: AuthResponse;
  profile?: Maybe<Profile>;
};


export type QueryAllHomesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryAllRoomsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryFilterRoomArgs = {
  conditions: FilterRoomInput;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetHomeByIdArgs = {
  homeId: Scalars['ID'];
};


export type QueryGetRoomByIdArgs = {
  roomId: Scalars['ID'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Viewer = 'VIEWER'
}

export type Room = Node & Timestamps & {
  __typename?: 'Room';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['Int']>;
  home?: Maybe<Home>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  isRented?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['Int']>;
  roomNumber?: Maybe<Scalars['Int']>;
  square?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type RoomInput = {
  description?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isRented?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Int']>;
  roomNumber?: InputMaybe<Scalars['Int']>;
  square?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};

export type RoomPaginator = PaginatorResult & {
  __typename?: 'RoomPaginator';
  docs?: Maybe<Array<Maybe<Room>>>;
  paginator?: Maybe<Paginator>;
};

export type Scope = {
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type SquareConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['String']>;
};

export type Timestamps = {
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  numberPhone?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['Int']>;
  userType?: InputMaybe<UserType>;
  ward?: InputMaybe<Scalars['Int']>;
};

export type User = Node & Timestamps & {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  defaultHome?: Maybe<Home>;
  district?: Maybe<Scalars['Int']>;
  districtName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  listHomes?: Maybe<HomePaginator>;
  numberPhone?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['Int']>;
  provinceName?: Maybe<Scalars['String']>;
  role?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['Date']>;
  userType?: Maybe<Scalars['String']>;
  ward?: Maybe<Scalars['Int']>;
  wardName?: Maybe<Scalars['String']>;
};


export type UserListHomesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type UserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['Int']>;
  email: Scalars['String'];
  fullname: Scalars['String'];
  numberPhone?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  province?: InputMaybe<Scalars['Int']>;
  userType?: InputMaybe<UserType>;
  ward?: InputMaybe<Scalars['Int']>;
};

export enum UserType {
  Host = 'HOST',
  Tenant = 'TENANT'
}

export type WaterPriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};
