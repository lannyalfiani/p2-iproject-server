## Endpoints

List of Available Endpoints:
1. `POST /register`
2. `POST /login`
3. `GET /categories`
4. `POST /payments`
5. `GET /reports`
6. `PATCH /premium/:id`
7. `GET /expenses`
8. `POST /expenses`
9. `DELETE /expenses/:id`
10. `PATCH /expenses/:id`
11. `GET /news`
12. `GET /pie`

<!-- POST REGISTER -->
## 1. POST /register
### Description
- Register for an account

#### Request

- Body
    ```json
      {
        "username": String,
        "email": String,
        "password": String
      }
    ```


#### Response
_Response 201 - Created_
- Body
    ```json
      {
          "id": Integer,
          "email": String,
          "status": String,
      }
  ```

_Response 400 - Bad Request_
- Body
  ```json
    {
        "message": [
            String,
            ....
        ]
    }
    ```


 <br> 

---

 <br> 

 <!-- POST LOGIN -->
## 2. POST /login
### Description
- Login to the registered account

#### Request

- Body
    ```json
      {
        "email": String,
        "password": String
      }
    ```


#### Response
_200 - OK_
- Body
    ```json
      {
        "access_token": String,
        "userData": {
            "id": Integer,
            "username": String,
            "email": String,
            "status": String,
        }
    ```

_400 - Bad Request_
- Body
    ```json
      {
          "message": String
      }
    ```

 <br> 

---

 <br> 

  <!-- GET CATEGORIES -->
## 3. GET /categories
### Description
- Get available expense categories

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "name": String
        },
        ...
    ]
    ```


 <br> 

---

 <br> 

## 4. POST /payments
### Description
- Initiate premium account purchase

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    
    {
        "message": String
    }
    ```

 <br> 

---

 <br> 

 ## 5. GET /reports
### Description
- Get payment invoice as PDF

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


#### Response
_200 - OK_
- Body: PDF

 <br> 

---

 <br> 

## 6. PATCH /premium/:id
### Description
- Change user status to premium upon successful payment

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    
    {
        "message": String
    }
    ```

 <br> 

---

 <br> 

## 7. GET /expenses
### Description
- Get expenses per user from database

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "name": String,
            "amount": Integer,
            "date": String,
            "UserId": Integer,
            "Category": {
                "id": Integer,
                "name": String
            }
        },
        ...
    ]
    ```



 <br> 

---

 <br> 


## 8. POST /expenses
### Description
- Add expense to database based on logged in user

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```

- Body 
    ```json
    {
        "name": String,
        "amount": Integer,
        "date": String,
        "CategoryId": Integer,
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    {
        "id": Integer,
        "name": String,
    }
    ```

 <br> 

---

 <br> 

## 9. DELETE /expenses/:id
### Description
- Delete expense of logged in user

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    {
        "message": String,
    }
    ```

 <br> 

---

 <br> 

## 10. PATCH /expenses/:id
### Description
- Edit logged in user's expense

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```
- Body
    ```json
    {
      "name": String,
      "amount": Integer,
      "date": String,
      "CategoryId": Integer,
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    {
        "message": String,
    }
    ```


 <br> 

---

 <br> 

### 11. GET /news

#### Response
_200 - OK_
- Body
    ```json
    [
        {
            "id": Integer,
            "name": String
        },
        ...
    ]
    ```


 <br> 

---

 <br> 


## 10. GET /pie
### Description
- Get sum of total expense based on category

#### Request

- Headers
    ```json
    {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


#### Response
_200 - OK_
- Body
    ```json
    {
        "Category Name": String,
        "Category Name": String,
        ....
    }
    ```


 <br> 

---

 <br> 

## Global Error
#### Response
_500 - Internal Server Error_
- Body
    ```json
    {
        "message": "Internal Server Error"
    }
    ```

_401 - Unauthorized_
- Body
    ```json
      {
          "message": String
      }
    ```