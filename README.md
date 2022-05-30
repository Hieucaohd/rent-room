# Getting started

Welcome to the **rent-room-connect** API! 🎉 Get familiar with available objects in the [Schema Reference](https://studio.apollographql.com/graph/rent-room-connect/schema/reference?variant=current), or try querying this graph using [Explorer](https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current).

Note: beside [Explorer](https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current) which not support upload file, you can use Altair app for test api, this app support test upload file to server: download app for chrome [here](https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja).

# What this graph is all about

Describle how to implement api of rent-room backend app🦄🌌✨.

You can find the schema of database [here](https://app.diagrams.net/#G1HPKnnqHcs13XUuZdTuJdzJj2-0pGCA00).

# Accessing the graph

🛰 You can send operations to this graph at `https://rent-room.vercel.app/graphql` by using whatever app like [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi), [altair](https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja) or default [Explorer](https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current) .
📇 The Apollo Registry holds the canonical location of your schema. In the registry, this graph is referred to by its “graph ref”, which is: **rent-room-connect@current**.

*(Note: you can [download Rover](https://www.apollographql.com/docs/rover/getting-started/), the Apollo CLI tool for working with your schema locally.)*

# Authentication

## How to register to this graph

Go to [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi) app or app that support cookie (not the [Explorer](https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current) because it doesn't not support cookie) and type. Server will generate a cookie that save access token and refresh token in http-only cookie.

```gql
mutation Register($input: UserCreateInput!) {
  register(input: $input) {
    ... on User {
      _id
      email
      fullname
      numberPhone
      province
      district
      ward
      provinceName
      districtName
      wardName
      avatar
      userType
      role
      createdAt
      updatedAt
    }
    ... on EmailDuplicateError {
      errorCode
      message
    }
    ... on PasswordInvalidError {
      errorCode
      message
    }
  }
}
```

```
{
  "input": {
    "email": "test2@gmail.com",
    "password": "1234",
    "fullname": "Cao Trung Hiếu",
    "numberPhone": "0977157490",
    "province": 1,
    "district": 2,
    "ward": 3,
    "avatar": null,
    "userType": "TENANT"
  }
}
```

## How to authenticate to this graph

Go to [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi) app or app that support cookie (not the [Explorer](https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current) because it doesn't not support cookie) and type. Server will generate a cookie that save access token and refresh token in http-only cookie.

```gql
query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ... on User {
      _id
      email
      fullname
      numberPhone
      province
      district
      ward
      provinceName
      districtName
      wardName
      avatar
      userType
      role
      createdAt
      updatedAt
    }
    ... on EmailNotRegisterError {
      errorCode
      message
    }
    ... on PasswordIncorrectError {
      errorCode
      message
    }
  }
}
```

```
{  
  "email": "test21@gmail.com",
  "password": "1234"
}
```

## How to logout

Go to [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi) app or app that support cookie (not the [Explorer](https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current) because it doesn't not support cookie) and type. Server will delete cookie in http-only cookie.

```gql
mutation Logout {
  logout {
    ... on UserNotAuthenticatedError {
      errorCode
      message
    }
    ... on LogoutStatus {
      success
    }
  }
}
```

## Get profile

This operator will check access token and refresh token in cookies of request to get current user.

```gql
query Profile {
  profile {
    user {
      _id
      email
      fullname
      numberPhone
      province
      district
      ward
      provinceName
      districtName
      wardName
      avatar
      userType
      role
      createdAt
      updatedAt
    }
    isAuth
  }
}
```


# Running operations

Some basic operations you can try:

*(Note: try this query in [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi) because it support cookie)*

## Get the list

> Get all homes information:

```gql
query AllHomes($paginatorOptions: PaginatorOptionsInput) {
  allHomes(paginatorOptions: $paginatorOptions) {
    docs {
      _id
      owner {
        email
        _id
      }
      province
      district
      ward
      provinceName
      districtName
      wardName
      liveWithOwner
      electricityPrice
      waterPrice
      internetPrice
      cleaningPrice
      images
      totalRooms
      listRooms {
        docs {
          _id
        }
      }
      position {
        x
        y
        lng
        lat
      }
      description
      detailAddress
      title
      minPrice
      maxPrice
      createdAt
      updatedAt
    }
    paginator {
      totalDocs
      limit
      page
      nextPage
      prevPage
      totalPages
      pagingCounter
      hasPrevPage
      hasNextPage
    }
  }
}
```

```
{
  "paginatorOptions": {
    "page": 1,
    "limit": 10,
    "sort": [
      {
        "field": "createdAt",
        "arrange": "ASC"
      }
    ]
  }
}
```

> Get all rooms information:

```gql
query AllRooms($paginatorOptions: PaginatorOptionsInput) {
  allRooms(paginatorOptions: $paginatorOptions) {
    docs {
      _id
      home {
        _id
      }
      price
      square
      isRented
      floor
      images
      description
      roomNumber
      title
      amenities
      createdAt
      updatedAt
    }
    paginator {
      totalDocs
      limit
      page
      nextPage
      prevPage
      totalPages
      pagingCounter
      hasPrevPage
      hasNextPage
    }
  }
}
```

```
{
  "paginatorOptions": {
    "page": 1,
    "limit": 10,
    "sort": [
      {
        "field": "createdAt",
        "arrange": "ASC"
      }
    ]
  }
}
```

Basically, homes_list and rooms_list implement interface PaginatorResult that have two fields: docs and paginator, that for pagination.

```gql
interface PaginatorResult {
    docs: [Result]
    paginator: Paginator
}
```

## Get the item:

> Get a home by home_id:

```gql
query GetHomeById($getHomeByIdId: ID!) {
  getHomeById(id: $getHomeByIdId) {
    ... on Home {
      _id
      owner {
        _id
      }
      province
      district
      ward
      provinceName
      districtName
      wardName
      liveWithOwner
      electricityPrice
      waterPrice
      internetPrice
      cleaningPrice
      images
      totalRooms
      listRooms {
        docs {
          _id
        }
      }
      description
      detailAddress
      title
      minPrice
      maxPrice
      createdAt
      updatedAt
      position {
        x
        y
        lng
        lat
      }
    }
    ... on InstanceNotExistError {
      errorCode
      message
    }
  }
}
```

```
{
  "getHomeByIdId": "id"
}
```

> Get a room by room_id:

```gql
query GetRoomById($getRoomByIdId: ID!) {
  getRoomById(id: $getRoomByIdId) {
    ... on Room {
      _id
      home {
        _id
      }
      price
      square
      isRented
      floor
      images
      description
      roomNumber
      title
      amenities
      createdAt
      updatedAt
    }
    ... on InstanceNotExistError {
      errorCode
      message
    }
  }
}
```

```
{
  "getRoomByIdId": "id"
}
```

## Basic CRUD for home and room:

*(Note: some varibale that has '$' prefix is a variable of input. In [Explorer](https://studio.apollographql.com/graph/rent-room-connect/explorer?variant=current) you must pass this varibale to variable-part)*

### Home

> Create a home:

```gql
mutation CreateHome($input: HomeCreateInput!) {
  createHome(input: $input) {
    ... on Home {
      _id
      owner {
        _id
      }
      province
      district
      ward
      provinceName
      districtName
      wardName
      liveWithOwner
      electricityPrice
      waterPrice
      internetPrice
      cleaningPrice
      images
      totalRooms
      listRooms {
        docs {
          _id
        }
      }
      position {
        x
        y
        lng
        lat
      }
      description
      detailAddress
      title
      minPrice
      maxPrice
      createdAt
      updatedAt
    }
    ... on PermissionDeninedError {
      errorCode
      message
    }
  }
}
```

```
{
  "input": {
    "province": null,
    "district": null,
    "ward": null,
    "liveWithOwner": null,
    "electricityPrice": null,
    "waterPrice": null,
    "internetPrice": null,
    "cleaningPrice": null,
    "images": null,
    "totalRooms": null,
    "position": {
      "x": null,
      "y": null,
      "lng": null,
      "lat": null
    },
    "detailAddress": null,
    "description": null,
    "title": null,
    "minPrice": null,
    "maxPrice": null
  }
}
```

> Update a home:

```gql
mutation UpdateHome($input: HomeUpdateInput!) {
  updateHome(input: $input) {
    ... on Home {
      _id
      owner {
        _id
      }
      province
      district
      ward
      provinceName
      districtName
      wardName
      liveWithOwner
      electricityPrice
      waterPrice
      internetPrice
      cleaningPrice
      images
      totalRooms
      position {
        x
        y
        lng
        lat
      }
      description
      detailAddress
      title
      minPrice
      maxPrice
      createdAt
      updatedAt
    }
    ... on InstanceNotExistError {
      errorCode
      message
    }
    ... on PermissionDeninedError {
      errorCode
      message
    }
  }
}
```

```
{
  "input": {
    "id": null,
    "province": null,
    "district": null,
    "ward": null,
    "liveWithOwner": null,
    "electricityPrice": null,
    "waterPrice": null,
    "internetPrice": null,
    "cleaningPrice": null,
    "images": null,
    "totalRooms": null,
    "position": {
      "x": null,
      "y": null,
      "lng": null,
      "lat": null
    },
    "detailAddress": null,
    "description": null,
    "title": null,
    "minPrice": null,
    "maxPrice": null
  }
}
```

> Delete a home:

```gql
mutation DeleteHome($deleteHomeId: ID!) {
  deleteHome(id: $deleteHomeId) {
    ... on AfterDelete {
      id
      success
    }
    ... on InstanceNotExistError {
      errorCode
      message
    }
    ... on PermissionDeninedError {
      errorCode
      message
    }
  }
}
```

```
{
  "deleteHomeId": "id"
}
```

### Room

> Create a room:

```gql
mutation CreateRoom($input: RoomCreateInput!) {
  createRoom(input: $input) {
    ... on Room {
      _id
      home {
        _id
      }
      price
      square
      isRented
      floor
      images
      description
      roomNumber
      title
      amenities
      createdAt
      updatedAt
    }
    ... on PermissionDeninedError {
      errorCode
      message
    }
  }
}
```

```
{
  "input": {
    "home": null,
    "price": null,
    "square": null,
    "isRented": null,
    "floor": null,
    "images": null,
    "description": null,
    "roomNumber": null,
    "title": null,
    "amenities": null
  }
}
```

> Update a room:

```gql
mutation UpdateRoom($input: RoomUpdateInput!) {
  updateRoom(input: $input) {
    ... on Room {
      _id
      home {
        _id
      }
      price
      square
      isRented
      floor
      images
      description
      roomNumber
      title
      amenities
      createdAt
      updatedAt
    }
    ... on InstanceNotExistError {
      errorCode
      message
    }
    ... on PermissionDeninedError {
      errorCode
      message
    }
  }
}
```

```
{
  "input": {
    "id": null,
    "price": null,
    "square": null,
    "isRented": null,
    "floor": null,
    "images": null,
    "description": null,
    "roomNumber": null,
    "title": null,
    "amenities": null
  }
}
```

> Delete a room

```gql
mutation DeleteRoom($deleteRoomId: ID!) {
  deleteRoom(id: $deleteRoomId) {
    ... on AfterDelete {
      id
      success
    }
    ... on InstanceNotExistError {
      errorCode
      message
    }
    ... on PermissionDeninedError {
      errorCode
      message
    }
  }
}
```

```
{
  "deleteRoomId": "id"
}
```

# For developer in this project

## Needfully schemas for this project

I) Schema of database at [here](https://app.diagrams.net/#G1HPKnnqHcs13XUuZdTuJdzJj2-0pGCA00).

II) Schema of cookie httponly authentication at [here](https://drive.google.com/file/d/198nPjzB9y_PctgxzDojZeUZOPvG1F0w7/view?usp=sharing). 

## Common feature:

### 1) Phần xác thực người dùng:

- [x] Đăng nhập, đăng kí bằng email.
- [ ] Gửi email xác nhận đăng kí.
- [ ] Đăng nhập, đăng kí bằng tài khoản facebook.
- [ ] Đăng nhập, đăng kí bằng tài khoản google.
- [ ] Đăng nhập, đăng kí bằng số điện thoại.
- [ ] Gửi mã kích hoạt khi đăng kí bằng số điện thoại.
- [ ] Đăng nhập, đăng kí bằng tài khoản zalo.
- [x] Xác thực user bằng jsonwebtoken được lưu trong cookie httponly.
- [x] Đăng xuất.
- [ ] Lấy lại mật khẩu bằng email.
- [ ] Gửi email xác nhận lấy lại mật khẩu.

### 2) Phần tính năng chính: 

- CRUD:

  - [x] Thêm, sửa, xóa home.
  - [x] Thêm, sửa, xóa room.

- Map:

  - [x] Hiển thị vị trí của các home trên maps.
  - [x] Hiển thị vị trí của các room trên maps.
  - [ ] Hiển thị vị trí của bạn bè trên maps. 
  - [ ] Hiển thị ví trí của các tiện ích trên maps như: siêu thị, chợ, xe bus,...

- Tìm kiếm:

  - **Lọc theo giá tiền:**
    - [x] Sắp xếp theo giá tiền tăng
    - [x] Sắp xếp theo giá tiền giảm
    - [x] Lấy các phòng trong một khoảng giá

  - **Lọc theo diện tích của phòng:**
    - [x] Sắp xếp theo diện tích tăng, giảm
    - [x] Lấy các phòng trong một khoảng diện tích
    
  - **Lọc theo vị trí:**
    - [x] Lọc theo tỉnh (quận), huyện (thị xã), xã (phường), ...

  - **Lọc theo cấu tạo của phòng:**
    - [ ] phòng khách
    - [ ] gác xếp
    - [ ] phòng ngủ
    - [ ] Lọc theo số lượng phòng ngủ
    - [ ] nhà bếp
    - [ ] nhà vệ sinh
    - [ ] Nhà vệ sinh khép kín 
    - [ ] Nhà vệ sinh dùng chung với phòng khác
  
  - **Lọc theo đặc điểm của phòng:**
    - [x] Lấy các phòng từ tầng này đến tầng kia.
  
  - **Lọc theo đặc điểm của home:**
    - [x] Có sống với chủ trọ không?

  - **Lọc theo quy định của home:**
    - [ ] Giờ đóng cổng
    - [ ] Giờ mở cổng
  
  - **Lọc theo an ninh của home:**
    - [ ] Có camera an ninh không?
    - [ ] Có bảo vệ không?
    - [ ] Có khóa vân tay cửa ra vào home hay không?

  - **Lọc theo tiện ích:**
    - *Đồ đạc có sẵn trong của phòng:* 
      - [ ] điều hòa
      - [ ] nóng lạnh
      - [ ] bếp
      - [ ] giường
      - [ ] bàn ghế làm việc
      - [ ] tủ quần áo
      - [ ] quạt trần
      - [ ] máy giặt
      - [ ] kệ treo đồ
      - [ ] tủ giày
      
    - *Tiện ích chung:*
      - [ ] máy giặt chung
      - [ ] thang máy
      - [ ] chỗ để xe
      - [ ] người dọn vệ sinh
      - [ ] khu phơi quần áo

  - **Tiện ích bên ngoài home:**
      - [ ] Có gần bến xe bus không?
      - [ ] Có gần chợ không?
      - [ ] Có gần siêu thị không?
  
  - **Lọc theo loại nước sinh hoạt:**
    - [ ] Nước máy
    - [ ] Nước giếng khoan
    - [ ] Nước bình

  - **Lọc theo phụ giá:**
    - [ ] Tiền nước tính theo khối.
    - [ ] Tiền nước tính cố định theo đầu người trên tháng.
    - [ ] Tiền điện giá nhà nước.
    - [ ] internet
    - [x] Lọc theo tiền điện giảm dần, tăng dần, trong một khoảng.
    - [x] Lọc theo tiền nước giảm dần, tăng dần, trong một khoảng.
    - [x] Lọc theo tiền internet giảm dần, tăng dần, trong một khoảng.
    - [x] Lọc theo tiền vệ sinh giảm dần, tăng dần, trong một khoảng.
  
  - **Lọc theo phương thức thanh toán:**
    - [ ] Đưa tiền mặt
    - [ ] Chuyển khoản ngân hàng
    - [ ] Trả dần trong tháng

- Đánh giá:

  - [ ] Đánh giá về home của user từng ở home đó.
  - [ ] Đánh giá về room của user từng ở room đó.

- Thanh toán:

  Tùy lựa chọn của người dùng hoặc thỏa thuận với chủ nhà, có thể thanh toán qua app hoặc trực tiếp, phần thanh toán có chức năng chính ghi lại giao dịch và đảm bảo hợp đồng thuê nhà.

  - [ ] Thanh toán qua các ngân hàng.
  - [ ] Thanh toán qua zalo pay.
  - [ ] Thanh toán qua ví momo.

### 3) Gợi ý:

- [ ] Cho người dùng chọn các vị trí và hiển thị các home gần vị trí đó.
- [ ] Hiển thị vị trí của bạn bè.

### 4) Tính năng khác:

- [ ] Kết bạn.
- [ ] Thêm các phòng quan tâm.

### 5) Tính năng nâng cao;

- [ ] Xem hình ảnh 3D phòng.

### 6) Thông báo:

- [ ] Thông báo có phòng tại khu vực quan tâm.
- [ ] Thông báo qua email các thông tin quan tâm.

### 7) Quảng cáo:

- [ ] Quảng cáo trên facebook.
- [ ] Quảng cáo trên zalo.
- [ ] Quảng cáo trên youtube.
- [ ] Quảng cáo trên tiktok.

## Front-end developer:

- Thiết kế: [figma](https://www.figma.com/file/3svxQsJdXgbaEBdHJ5OgIO/Trang-Chu?node-id=0%3A1)
- File env: [.env.local](https://docs.google.com/document/d/175Povc8vTWOlZBUQwN5SzCnV-kqmHoKNGVygVBE3Ygw/edit?usp=sharing)

## Back-end developer:

- File env: [.env](https://docs.google.com/document/d/175Povc8vTWOlZBUQwN5SzCnV-kqmHoKNGVygVBE3Ygw/edit?usp=sharing)

# Report
- Link: [report](https://docs.google.com/document/d/12CulRqyRkyUyxH4miCjrD89NyYfUqAgRoK-ev88MVh0/edit?usp=sharing)

# Getting help with this graph

For support working with this graph, contact the Graph Admin via [gmail](mailto:hieucaohd@gmail.com) or [messenger](https://www.messenger.com/t/100057157604437/).
