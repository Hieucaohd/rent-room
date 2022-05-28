# Table of content

- [Getting started](#getting-started)
  - [What this graph is all about ?](#what-this-graph-is-all-about)
  - [Accessing the graph](#accessing-the-graph)
- [Authentication](#authentication)
  - [How to register to this graph ?](#how-to-register-to-this-graph)
  - [How to authenticate to this graph ?](#how-to-authenticate-to-this-graph)
  - [How to logout ?](#how-to-logout)
  - [Get profile](#get-profile)
- [Running operations](#running-operations)
  - [Get the list](#get-the-list)
    - [List homes](#)
    - [List rooms](#)
  - [Get the item](#get-the-item)
  - [Basic CRUD for home and room](#basic-CRUD-for-home-and-room)
    - [Home](#home)
    - [Room](#room)
- [For developer in this project (developer only)](#for-developer-in-this-project)
  - [Needfully schemas for this project](#needfully-schemas-for-this-project)
  - [Common feature](#common-feature)
  - [Front-end developer](#front-end-developer)
  - [Back-end developer](#back-end-developer)
- [Report for teacher](#report-for-teacher)
- [Getting help with this graph](#getting-help-with-this-graph)

# Getting started

Welcome to the **{{ graph.name }}** API! 🎉 Get familiar with available objects in the [Schema Reference]({{ graph.url.reference }}), or try querying this graph using [Explorer]({{ graph.url.explorer }}).

Note: beside [Explorer]({{ graph.url.explorer }}) which not support upload file, you can use Altair app for test api, this app support test upload file to server: download app for chrome [here]({{ altair.url.download }}).

# What this graph is all about

Describle how to implement api of rent-room backend app🦄🌌✨.

You can find the schema of database [here]({{ database.url.schema }}).

# Accessing the graph

🛰 You can send operations to this graph at `{{ graph.url.endpoint }}` by using whatever app like [postman]({{ postman.url.download }}), [altair]({{ altair.url.download }}) or default [Explorer]({{ graph.url.explorer }}) .
📇 The Apollo Registry holds the canonical location of your schema. In the registry, this graph is referred to by its “graph ref”, which is: **{{ graph.ref }}**.

*(Note: you can [download Rover](https://www.apollographql.com/docs/rover/getting-started/), the Apollo CLI tool for working with your schema locally.)*

# Authentication

## How to register to this graph

Go to [Explorer]({{ graph.url.explorer }}) and type.🔐 👀

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

Go to [Explorer]({{ graph.url.explorer }}) and type.🔐 👀

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

Go to [Postman]({{ postman.url.download }}) app or app that support cookie (not the [Explorer]({{ graph.url.explorer }}) because it doesn't not support cookie) and type.🔐 👀

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

This operator will check tokens in cookies of req to get user.

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

*(Note: try this query in [Explorer]({{ graph.url.explorer }}), [Altair]({{ altair.url.download }}) or [Postman]({{ postman.url.download }}))*

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

*(Note: some varibale that has '$' prefix is a variable of input. In [Explorer]({{ graph.url.explorer }}) you must pass this varibale to variable-part)*

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

I) Schema of database at [here]({{ database.url.schema }}).

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

- Thiết kế: [figma]({{ design.url.figma }})
- File env: [.env.local]({{ front-end.url.file-env }})

## Back-end developer:

- File env: [.env]({{ back-end.url.file-env }})

# Report
- Link: [report]({{ report.url }})

# Getting help with this graph

For support working with this graph, contact the Graph Admin via [gmail]({{ admin.gmail }}) or [messenger]({{ admin.url.messenger }}).
