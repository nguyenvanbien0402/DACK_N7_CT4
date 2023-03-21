const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()

const router = jsonServer.router('./db.json')

const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))

const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;


server.use(middlewares);


server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

const SECRET_KEY = '123456789'
const expiresIn = '1h'

function createToken(payload) {
    return jwt.sign(
        payload, 
        SECRET_KEY, 
        {expiresIn})
}

function verifyToken(token) {
    return jwt.verify(
        token, 
        SECRET_KEY,  
        (err, decode) => decode !== undefined ?  decode : err)
}

function isAuthenticated({phone, password}){
    return db.users.findIndex(user => user.phone === phone && user.password === password) !== -1
}

server.post('/register', (req, res) => {
  const {username, phone, password} = req.body;

  exist_user = db.users.findIndex(x => x.phone === phone)
  if(exist_user !== -1) {
    return res.status(401).json({
      status: 401,
      message: "Số điện thoại đã đăng ký",
    })
  }

  const new_user = {
    'id': db.users.length+1,
    username,
    phone,
    password
  }

  db.users.push(new_user);
  fs.writeFileSync('./db.json', JSON.stringify(db), () => {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
  })
  res.status(201).json({
    status: 201,
    message: "Success",
    data: new_user
  })
})

//login
server.post('/login', (req, res) => {
    // const {email, password} = req.body
    const phone = req.body.phone
    const password = req.body.password

    if (isAuthenticated({phone, password}) === false) {
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    }
    const access_token = createToken({phone, password})
    res.status(200).json({
      status: 200,
      message: "Success",
      data: {
        access_token
      }
    })
})

server.use('/auth',(req, res, next) => {
  if (req.headers.authorization == undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

     if (verifyTokenResult instanceof Error) {
       const status = 401
       const message = 'Error: access_token is not valid'
       res.status(status).json({status, message})
       return
     }
     next()
  } catch (err) {
    const status = 401
    const message = 'Token đã hết hạn'
    res.status(status).json({status, message})
  }
})


//view all users
server.get('/auth/users', (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      "users" : db.users
    }
  })
})

//Xem thông tin user theo email
server.get('/auth/users/:phone', ((req, res)=> {
  //let userdb = JSON.parse(fs.readFileSync('./database.json', 'UTF-8'));
	const phone = req.params.phone;
 
	const exist_email = db.users.findIndex(user =>  user.phone == phone)
	const result = db.users.filter(user =>  user.phone == phone)
	if (exist_email !== -1)
	{
		const status = 200
		return res.status(status).json({status, result})
	} else {
    return res.status(401).json({
      status: 401,
      message: "số phone is not found!!",
    })
}}))

//delete user by email
server.delete('/auth/users/:phone', (req, res) => {
  const phone = req.params.phone

  const exist_email = db.users.findIndex(user =>  user.phone == phone)
  if(exist_email !== -1) {
    db.users.splice(exist_email, 1);

    fs.writeFileSync('./db.json', JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    })

    return res.status(200).json({
        status: 200,
        message: "Success"
      
      })
  } else {
    return res.status(401).json({
      status: 401,
      message: "Email is not found!!",
    })
  }

})

//view all orders
server.get('/auth/orders', (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: {
      "orders" : db.orders
    }
  })
})

//view order by id
server.get('/auth/orders/:id', (req, res) => {
  const order_id = req.params.id

  const exist_order = db.orders.findIndex(order => order.id == order_id)
  if(exist_order !== -1) {
      res.status(200).json({
            status: 200,
            data: {
              'orders': db.orders[exist_order]
            }
          })
    } else {
      return res.status(401).json({
        status: 401,
        message: "Order not found!!",
      })
    }
  })

//add new order
server.post('/auth/orders', (req, res) => {
  const {productId, customerName,address} = req.body
  const exist_book_id = db.products.findIndex(product => product.id === productId)

  if(exist_book_id === -1) {
    return res.status(401).json({
      status: 401,
      message: "Book not found!!",
    })
  }

  const order_book = db.products[exist_book_id]
  if(order_book.available) {
    const new_order = {
      'id': db.orders.length+1,
      productId,
      customerName,
      address,
      "quantity": 1,
      "timestamp": new Date().getTime()
    }
  
    db.orders.push(new_order);
    fs.writeFileSync('./db.json', JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    })
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: new_order
    })
  } else {
    return res.status(401).json({
      status: 401,
      message: "Book is out of stock!!",
    })
  }
})

//delete order by id
server.delete('/auth/orders/:id', (req, res) => {
  const order_id = req.params.id

  const exist_order = db.orders.findIndex(order => order.id == order_id)
  if(exist_order !== -1) {
    db.orders.splice(exist_order, 1);

    fs.writeFileSync('./db.json', JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    })

    return res.status(200).json({
        status: 200,
        message: "Success"
      
      })
  } else {
    return res.status(401).json({
      status: 401,
      message: "Order not found!!",
    })
  }

})

//update username
server.patch('/auth/orders/:id', (req, res) => {
  const order_id = req.params.id
  const address = req.body.address

  const exist_order = db.orders.findIndex(order => order.id == order_id)
  if(exist_order !== -1) {
    db.orders[exist_order].address = address

    fs.writeFileSync('./db.json', JSON.stringify(db), () => {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    })

    res.status(200).json({
      status: 200,
      message: "Success",
      data: {
        'orders': db.orders[exist_order]
      }
    })
  } else {
    res.status(401).json({
      status: 401,
      message: "Order not found!!",
    })
  }

})

server.use(router)

server.listen(PORT, () => {
  console.log('Run Auth API Server')
})