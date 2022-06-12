# SocialNetwork
Repositorio que alojará la red social de BlitzChat

# API END POINTS

### POST : /api/blitzchat/auth/login 
**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`username`      |  required    | String    |
|`password`      |  required    | String    |   

when user is logged in it generatse jwt token which expires in 3600000 and its  saved in coockies with name "access_tocken" and it also save username as "username"

**Respones**
```
// User is correct and exists in database and its not logged in yet

{
    "msg": "Login successful",
    "jtw": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbXphIiwiaWQiOiI2MmE1MjM5ZmUxYmI2MWFhNTgyMGFlZDgiLCJpYXQiOjE2NTUwNjk3NzksImV4cCI6MTY1NTA3MzM3OX0.jUCH4TpjVQfw6uAs7UYh7z0F-MHBrZKImuQJy9bfnho"
}


or 


// if user is not correct

{
    "msg": "Login failed"
}


or 


// its logged in already and token isnt expired yet

{
    "msg": "You are already logged in"
}
```
___

### POST : /api/blitzchat/auth/register

**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`username`      |  required    | String    |
|`password`      |  required    | String    |
| `nombre`       |  required    | String    |

**Respones**

```
// if username already exists

{
    "msg": "Username already exists"
}

or

// it doesnt exist and user is created

{
    "msg": "User created successfully"
}
```
___

### POST : /api/blitzchat/add_post (need jwt token to use this endpoint)

**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`text`          |  required    | String    |
|`imagen`        |  required    | String    |
| `audio`        |   required   | String    |
| `video`        |  required    | String    |

**Respones**
```
// creating post

{
    "msg": "Post created successfully"
}

```
___

### GET : /api/blitzchat/posts (need jwt token to use this endpoint)
Returns all the posts from any user

**Respones**
```
// Returns all the posts

[

    {
        "_id": "62a65d4db3c606164558c709",
        "username": "hamza",
        "text": "hola",
        "imagen": "xdd",
        "audio": "xd",
        "video": "xd",
        "__v": 0
    },

    {
        "_id": "62a65e32b3c606164558c70b",
        "username": "hamza",
        "text": "hola",
        "imagen": "xdd",
        "audio": "xd",
        "video": "xd",
        "__v": 0
    }
]
```
___
### GET : /api/blitzchat/get_posts:username (need jwt token to use this endpoint)
Returns all the post from a specific user

**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`username`      |  required    | String    |

**Respones**
```
// Returns all the posts from a specific user if exists

{
    "msg": [
        {
            "_id": "62a65d4db3c606164558c709",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a65e32b3c606164558c70b",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        }
    ]
}

or 

// if user dont exists

{
    "msg": "No posts found for this user"
}

```
___

### GET : /
Returns the index.html file
___

### GET : /api/blitzchat/get_last_ten_posts:username (need jwt token to use this endpoint)
Returns last 10 posts from a specific user

**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`username`      |  required    | String    |

**Respones**
```
// Returns only 10 posts from a specific user if exists

{
    "posts": [
        {
            "_id": "62a6702549d4c1eb3e3bcbb0",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702449d4c1eb3e3bcbae",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702449d4c1eb3e3bcbac",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702349d4c1eb3e3bcbaa",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702349d4c1eb3e3bcba8",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702249d4c1eb3e3bcba6",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702149d4c1eb3e3bcba4",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702149d4c1eb3e3bcba2",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a6702049d4c1eb3e3bcba0",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        },
        {
            "_id": "62a65e32b3c606164558c70b",
            "username": "hamza",
            "text": "hola",
            "imagen": "xdd",
            "audio": "xd",
            "video": "xd",
            "__v": 0
        }
    ]
}

or 

// if user dont exists

{
    "msg": "No posts found for this user"
}

```
___
### GET : /api/blitzchat/get_post_id (need jwt token to use this endpoint)
Returns the post with the id of current post clicked on

**Respones**

___ 

### PUT : /api/blitzchat/update_post:id (need jwt token to use this endpoint)

Update the post clicked on and need id as a parameter

**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`id`            |  required    | String    |
|`text`          |  required    | String    |
|`imagen`        |  required    | String    |
|`audio`         |  required    | String    |
|`video`         |  required    | String    |

**Respones**

___

### PUT : /api/blitzchat/update/user (need jwt token to use this endpoint)

get from coockies the username and update the user with the new information

**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`nombre`        |  required    | String    |
|`password`      |  required    | String    |

**Respones**
___

### DELETE : /api/blitzchat/delete_post:id (need jwt token to use this endpoint)

need id to delete post

**Parameters**
|Name            | Required     | Type      |
|---------------:|-------------:|-----------|
|`id`            |  required    | String    |

**Respones**
