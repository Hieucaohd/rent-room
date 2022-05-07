export class ErrorResult {
  __typename
  errorCode
  message;
}

export class EmailDuplicateError extends ErrorResult {
  __typename = 'EmailDuplicateError';
  errorCode = 'EMAIL_DUPLICATE_ERROR';
  message = 'EMAIL_DUPLICATE_ERROR';
  constructor(
  ) {
    super();
  }
}

export class EmailIncorrectError extends ErrorResult {
  __typename = 'EmailIncorrectError';
  errorCode = 'EMAIL_INCORRECT_ERROR';
  message = 'EMAIL_INCORRECT_ERROR';
  constructor(
  ) {
    super();
  }
}

export class InstanceNotExistError extends ErrorResult {
  __typename = 'InstanceNotExistError';
  errorCode = 'INSTANCE_NOT_EXIST_ERROR';
  message = 'INSTANCE_NOT_EXIST_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordIncorrectError extends ErrorResult {
  __typename = 'PasswordIncorrectError';
  errorCode = 'PASSWORD_INCORRECT_ERROR';
  message = 'PASSWORD_INCORRECT_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordInvalidError extends ErrorResult {
  __typename = 'PasswordInvalidError';
  errorCode = 'PASSWORD_INVALID_ERROR';
  message = 'PASSWORD_INVALID_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PermissionDeninedError extends ErrorResult {
  __typename = 'PermissionDeninedError';
  errorCode = 'PERMISSION_DENINED_ERROR';
  message = 'PERMISSION_DENINED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class UserNotAuthenticatedError extends ErrorResult {
  __typename = 'UserNotAuthenticatedError';
  errorCode = 'USER_NOT_AUTHENTICATED_ERROR';
  message = 'USER_NOT_AUTHENTICATED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class UserNotRentedHomeError extends ErrorResult {
  __typename = 'UserNotRentedHomeError';
  errorCode = 'USER_NOT_RENTED_HOME_ERROR';
  message = 'USER_NOT_RENTED_HOME_ERROR';
  constructor(
  ) {
    super();
  }
}


const errorTypeNames = new Set(['EmailDuplicateError', 'EmailIncorrectError', 'InstanceNotExistError', 'PasswordIncorrectError', 'PasswordInvalidError', 'PermissionDeninedError', 'UserNotAuthenticatedError', 'UserNotRentedHomeError']);
function isGraphQLError(input) {
  return input instanceof ErrorResult || errorTypeNames.has(input.__typename);
}

export const errorOperationTypeResolvers = {
  HomeCreateResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'Home';
    },
  },
  CreateHomeCommentResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'HomeComment';
    },
  },
  RoomCreateResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'Room';
    },
  },
  HomeDeleteResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'AfterDelete';
    },
  },
  DeleteHomeCommentResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'AfterDelete';
    },
  },
  RoomDeleteResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'AfterDelete';
    },
  },
  LogoutResponse: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'LogoutStatus';
    },
  },
  NativeRegisterResponse: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'User';
    },
  },
  HomeUpdateResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'Home';
    },
  },
  UpdateHomeCommentResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'HomeComment';
    },
  },
  RoomUpdateResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'Room';
    },
  },
  UserUpdateResult: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'User';
    },
  },
  NativeAuthResponse: {
    __resolveType(obj) {
      return isGraphQLError(obj) ? obj.__typename : 'User';
    },
  },
};