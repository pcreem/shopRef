const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const productController = require('../controllers/productController.js')
const orderController = require('../controllers/orderController.js')
const cartController = require('../controllers/cartController.js')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }

  const authenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.isAdmin) { return next() }
      return res.redirect('/')
    }
    res.redirect('/signin')
  }

  // // 如果使用者訪問首頁，就導向 /restaurants 的頁面
  // app.get('/', authenticated, (req, res) => res.redirect('restaurants'))
  // app.get('/restaurants', authenticated, restController.getRestaurants)

  // // 連到 /admin 頁面就轉到 /admin/restaurants
  // app.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))
  // app.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
  // app.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
  // app.post('/admin/restaurants', authenticatedAdmin, upload.single('image'), adminController.postRestaurant)
  // app.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)
  // app.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
  // app.put('/admin/restaurants/:id', authenticatedAdmin, upload.single('image'), adminController.putRestaurant)
  // app.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant)

  app.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/products', productController.getProducts)


  app.get('/cart', cartController.getCart)
  app.post('/cart', cartController.postCart)
  app.post('/cartItem/:id/add', cartController.addCartItem)
  app.post('/cartItem/:id/sub', cartController.subCartItem)
  app.delete('/cartItem/:id', cartController.deleteCartItem)

  app.get('/orders', orderController.getOrders)
  app.post('/order', orderController.postOrder)
  app.post('/order/:id/cancel', orderController.cancelOrder)

  app.get('/order/:id/payment', orderController.getPayment)
  app.post('/spgateway/callback', orderController.spgatewayCallback)

  app.get('/signup', userController.signUpPage)
  app.post('/signup', userController.signUp)

  app.get('/signin', userController.signInPage)
  app.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
  app.get('/logout', userController.logout)
}
