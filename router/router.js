
const { Router } = require("express")
const router = Router()
const { addProduct, getAllProduct, deleteProduct, updateProduct, sellProduct, getSoldItems, loginAdmin, checkToken } = require("../controllers/crud.control")

router.post("/add", addProduct)
router.get("/getall", getAllProduct)
router.delete("/delete/:id", deleteProduct); // New route for deleting a product
router.put("/update/:id", updateProduct); // Новый маршрут для обновления

router.post("/sell", sellProduct);
router.get("/sold-items", getSoldItems);
router.post('/login', loginAdmin);
router.get('/getRole', checkToken);


module.exports = router