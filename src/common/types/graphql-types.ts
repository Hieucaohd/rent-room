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

export type AllHomeCommentsInHomeQuery = {
  home: Scalars['ID'];
};

export enum ArrangeType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type CleaningPriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};

export type CreateHomeCommentResult = HomeComment | UserNotRentedHomeError;

export type DeleteHomeCommentResult = AfterDelete | InstanceNotExistError | PermissionDeninedError;

export type ElectricityPriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};

export type EmailDuplicateError = ErrorResult & {
  __typename?: 'EmailDuplicateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type EmailIncorrectError = ErrorResult & {
  __typename?: 'EmailIncorrectError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum ErrorCode {
  EmailDuplicateError = 'EMAIL_DUPLICATE_ERROR',
  EmailIncorrectError = 'EMAIL_INCORRECT_ERROR',
  InstanceNotExistError = 'INSTANCE_NOT_EXIST_ERROR',
  PasswordIncorrectError = 'PASSWORD_INCORRECT_ERROR',
  PasswordInvalidError = 'PASSWORD_INVALID_ERROR',
  PermissionDeninedError = 'PERMISSION_DENINED_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
  UserNotAuthenticatedError = 'USER_NOT_AUTHENTICATED_ERROR',
  UserNotRentedHomeError = 'USER_NOT_RENTED_HOME_ERROR'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type FilterRoomInput = {
  address?: InputMaybe<AddressConditionInput>;
  createdAt?: InputMaybe<ArrangeType>;
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

export type GetHomeByIdResult = Home | InstanceNotExistError;

export type GetHomeCommentByIdResult = HomeComment | InstanceNotExistError;

export type GetRoomByIdResult = InstanceNotExistError | Room;

export type Home = Node & Timestamps & {
  __typename?: 'Home';
  _id?: Maybe<Scalars['ID']>;
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
  maxPrice?: Maybe<Scalars['Int']>;
  minPrice?: Maybe<Scalars['Int']>;
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
  paginatorOptions?: InputMaybe<PaginatorOptionsInput>;
};

export type HomeComment = Node & Timestamps & {
  __typename?: 'HomeComment';
  _id?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  home?: Maybe<Home>;
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  rateStar?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
};

export type HomeCommentCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  home: Scalars['ID'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  rateStar?: InputMaybe<Scalars['Int']>;
};

export type HomeCommentPaginator = PaginatorResult & {
  __typename?: 'HomeCommentPaginator';
  docs?: Maybe<Array<Maybe<HomeComment>>>;
  paginator?: Maybe<Paginator>;
};

export type HomeCommentUpdateInput = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  rateStar?: InputMaybe<Scalars['Int']>;
};

export type HomeCreateInput = {
  cleaningPrice?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  detailAddress?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['Int']>;
  electricityPrice?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internetPrice?: InputMaybe<Scalars['Int']>;
  liveWithOwner?: InputMaybe<Scalars['Boolean']>;
  maxPrice?: InputMaybe<Scalars['Int']>;
  minPrice?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<PositionInput>;
  province?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  totalRooms?: InputMaybe<Scalars['Int']>;
  ward?: InputMaybe<Scalars['Int']>;
  waterPrice?: InputMaybe<Scalars['Int']>;
};

export type HomeCreateResult = Home | PermissionDeninedError;

export type HomeDeleteResult = AfterDelete | InstanceNotExistError | PermissionDeninedError;

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
  id: Scalars['ID'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  internetPrice?: InputMaybe<Scalars['Int']>;
  liveWithOwner?: InputMaybe<Scalars['Boolean']>;
  maxPrice?: InputMaybe<Scalars['Int']>;
  minPrice?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<PositionInput>;
  province?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  totalRooms?: InputMaybe<Scalars['Int']>;
  ward?: InputMaybe<Scalars['Int']>;
  waterPrice?: InputMaybe<Scalars['Int']>;
};

export type HomeUpdateResult = Home | InstanceNotExistError | PermissionDeninedError;

export type InstanceNotExistError = ErrorResult & {
  __typename?: 'InstanceNotExistError';
  errorCode: ErrorCode;
  message: Scalars['String'];
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

export type LogoutResponse = LogoutStatus | UserNotAuthenticatedError;

export type LogoutStatus = {
  __typename?: 'LogoutStatus';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']>;
  createHome: HomeCreateResult;
  createHomeComment: CreateHomeCommentResult;
  createRoom: RoomCreateResult;
  deleteHome: HomeDeleteResult;
  deleteHomeComment: DeleteHomeCommentResult;
  deleteRoom: RoomDeleteResult;
  logout: LogoutResponse;
  register: NativeRegisterResponse;
  updateHome: HomeUpdateResult;
  updateHomeComment: UpdateHomeCommentResult;
  updateRoom: RoomUpdateResult;
  updateUser: UserUpdateResult;
};


export type MutationCreateHomeArgs = {
  input: HomeCreateInput;
};


export type MutationCreateHomeCommentArgs = {
  input: HomeCommentCreateInput;
};


export type MutationCreateRoomArgs = {
  input: RoomCreateInput;
};


export type MutationDeleteHomeArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteHomeCommentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoomArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  input: UserCreateInput;
};


export type MutationUpdateHomeArgs = {
  input: HomeUpdateInput;
};


export type MutationUpdateHomeCommentArgs = {
  input: HomeCommentUpdateInput;
};


export type MutationUpdateRoomArgs = {
  input: RoomUpdateInput;
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
};

export type NativeAuthResponse = EmailIncorrectError | PasswordIncorrectError | User;

export type NativeRegisterResponse = EmailDuplicateError | PasswordInvalidError | User;

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

export type PaginatorOptionsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<SortOption>>>;
};

export type PaginatorResult = {
  docs?: Maybe<Array<Maybe<Node>>>;
  paginator?: Maybe<Paginator>;
};

export type PasswordIncorrectError = ErrorResult & {
  __typename?: 'PasswordIncorrectError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type PasswordInvalidError = ErrorResult & {
  __typename?: 'PasswordInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type PermissionDeninedError = ErrorResult & {
  __typename?: 'PermissionDeninedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
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
  allHomeCommentsInHome?: Maybe<HomeCommentPaginator>;
  allHomes?: Maybe<HomePaginator>;
  allRooms?: Maybe<RoomPaginator>;
  filterRoom?: Maybe<RoomPaginator>;
  getHomeById?: Maybe<GetHomeByIdResult>;
  getHomeCommentById?: Maybe<GetHomeCommentByIdResult>;
  getRoomById?: Maybe<GetRoomByIdResult>;
  login: NativeAuthResponse;
  profile?: Maybe<Profile>;
};


export type QueryAllHomeCommentsInHomeArgs = {
  paginatorOptions: PaginatorOptionsInput;
  query: AllHomeCommentsInHomeQuery;
};


export type QueryAllHomesArgs = {
  paginatorOptions?: InputMaybe<PaginatorOptionsInput>;
};


export type QueryAllRoomsArgs = {
  paginatorOptions?: InputMaybe<PaginatorOptionsInput>;
};


export type QueryFilterRoomArgs = {
  conditions: FilterRoomInput;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetHomeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetHomeCommentByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetRoomByIdArgs = {
  id: Scalars['ID'];
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
  amenities?: Maybe<Array<Maybe<Scalars['Int']>>>;
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

export type RoomCreateInput = {
  amenities?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  description?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['Int']>;
  home: Scalars['ID'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isRented?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Int']>;
  roomNumber?: InputMaybe<Scalars['Int']>;
  square?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};

export type RoomCreateResult = PermissionDeninedError | Room;

export type RoomDeleteResult = AfterDelete | InstanceNotExistError | PermissionDeninedError;

export type RoomPaginator = PaginatorResult & {
  __typename?: 'RoomPaginator';
  docs?: Maybe<Array<Maybe<Room>>>;
  paginator?: Maybe<Paginator>;
};

export type RoomUpdateInput = {
  amenities?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  description?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isRented?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Int']>;
  roomNumber?: InputMaybe<Scalars['Int']>;
  square?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};

export type RoomUpdateResult = InstanceNotExistError | PermissionDeninedError | Room;

export type Scope = {
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type SortOption = {
  arrange: ArrangeType;
  field: Scalars['String'];
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

export type UpdateHomeCommentResult = HomeComment | InstanceNotExistError | PermissionDeninedError;

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
  paginatorOptions?: InputMaybe<PaginatorOptionsInput>;
};

export type UserCreateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['Int']>;
  email: Scalars['String'];
  fullname?: InputMaybe<Scalars['String']>;
  numberPhone?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  province?: InputMaybe<Scalars['Int']>;
  userType: UserType;
  ward?: InputMaybe<Scalars['Int']>;
};

export type UserNotAuthenticatedError = ErrorResult & {
  __typename?: 'UserNotAuthenticatedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type UserNotRentedHomeError = ErrorResult & {
  __typename?: 'UserNotRentedHomeError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum UserType {
  Host = 'HOST',
  Tenant = 'TENANT'
}

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  district?: InputMaybe<Scalars['Int']>;
  fullname?: InputMaybe<Scalars['String']>;
  numberPhone?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['Int']>;
  ward?: InputMaybe<Scalars['Int']>;
};

export type UserUpdateResult = InstanceNotExistError | PermissionDeninedError | User;

export type WaterPriceConditionInput = {
  arrange?: InputMaybe<ArrangeType>;
  scope?: InputMaybe<Scope>;
};
