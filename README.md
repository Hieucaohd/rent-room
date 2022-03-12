# Getting started

Welcome to the **rent-room-app** API! 🎉 Get familiar with available objects in the [Schema Reference](https://studio.apollographql.com/graph/rent-room-app/schema/reference?variant=current), or try querying this graph using [Explorer](https://studio.apollographql.com/graph/rent-room-app/explorer?variant=current).

***We recommend you read documents at [apollo-studio-documents](https://studio.apollographql.com/graph/rent-room-app/home?variant=current) because this docs is not usually updated. To read, let create an account and contact to admin via [hieucao-email](mailto:hieucaohd@gmail.com) or [hieucao-messenger](https://www.messenger.com/t/100057157604437/) to add you to project members.***

## What this graph is all about

Describle how to implement api of rent-room backend app🦄🌌✨

You can find the schema of database [here](https://app.diagrams.net/#G1HPKnnqHcs13XUuZdTuJdzJj2-0pGCA00).

## Accessing the graph

🛰 You can send operations to this graph at `https://rent-room-app.onrender.com/graphql` by using whatever apps like [postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi), [altair](https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja) or default [Explorer](https://studio.apollographql.com/graph/rent-room-app/explorer?variant=current).

📇 The Apollo Registry holds the canonical location of your schema. In the registry, this graph is referred to by its “graph ref”, which is: **rent-room-app@current**.

*(Note: you can [download Rover](https://www.apollographql.com/docs/rover/getting-started/), the Apollo CLI tool for working with your schema locally.)*


## How to register to this graph 🔐👀

Go to [Explorer](https://studio.apollographql.com/graph/rent-room-app/explorer?variant=current) and type:

```gql
mutation REGISTER {
    register(newUser: {
        email: "your email here",
        password: "your password here",
        fullname: "your fullname"
    }) {
        user {
            _id
            email
        }
        token
    }
}
```

## How to authenticate to this graph 🔐👀

Go to [Explorer](https://studio.apollographql.com/graph/rent-room-app/explorer?variant=current) and type:

```gql
query LOGIN {
    login(email: "your email here", password: "your password here") {
        user {
            _id
            email
        }
        token
    }
}
```

## Running operations

Some basic operations you can try:

*(Note: try this query in [Explorer](https://studio.apollographql.com/graph/rent-room-app/explorer?variant=current), [Altair](https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja) or [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=vi))*

> Get all homes information:

```gql
query GET_ALL_HOME {
  allHomes(page: 1, limit: 1) {
    docs {
      _id
      owner {
        email
        fullname
      }
      province
      district
      ward
      liveWithOwner
      electricityPrice
      waterPrice
      images
      totalRooms
      listRooms(page: 1, limit: 1) {
        docs {
          price
        }
      }
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

> Get all rooms information:
```gql
query GET_ALL_ROOM{
  allRooms(page: 1, limit: 1) {
    docs {
      _id
      home {
        province
        district
      }
      price
      square
      isRented
      floor
      images
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

### Getting help with this graph

For support working with this graph, contact the Graph Admin via [hieucaohd@gmail.com](mailto:hieucaohd@gmail.com) or [hieucao-messenger](https://www.messenger.com/t/100057157604437/).
