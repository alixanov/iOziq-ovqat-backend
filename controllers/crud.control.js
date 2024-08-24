const OziqOvqat = require("../module/oziq-ovqat")
const SoldProduct = require("../module/sold-product")
const jwt = require("jsonwebtoken")
const addProduct = async (req, res) => {
     try {
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode } = req.body
          const newProduct = new OziqOvqat({ nomi, kelgannarxi, sotishnarxi, soni, barcode })
          await newProduct.save();
          res.status(201).json(newProduct)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при добавлении продукта", error })
     }
}

const getAllProduct = async (req, res) => {
     try {
          const products = await OziqOvqat.find()
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении продуктов", error })
     }
}


const deleteProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const deletedProduct = await OziqOvqat.findByIdAndDelete(id);
          if (!deletedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }
          res.status(200).json({ message: "Продукт успешно удален" });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при удалении продукта", error });
     }
};

const updateProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode } = req.body;

          const updatedProduct = await OziqOvqat.findByIdAndUpdate(
               id,
               { nomi, kelgannarxi, sotishnarxi, soni, barcode },
               { new: true } // Вернуть обновленный документ
          );

          if (!updatedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }

          res.status(200).json(updatedProduct);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при обновлении продукта", error });
     }
};

const sellProduct = async (req, res) => {
     try {
          const { items, total, saleDate } = req.body;

          const soldProducts = [];

          for (let i = 0; i < items.length; i++) {
               const { _id, nomi, kelgannarxi, sotishnarxi, quantity } = items[i];

               // Найти продукт по _id и обновить количество
               const product = await Product.findById(_id);
               if (!product) {
                    return res.status(404).json({ message: `Товар с id ${_id} не найден` });
               }

               if (product.soni < quantity) {
                    return res.status(400).json({ message: `Недостаточное количество товара ${nomi} на складе` });
               }

               product.soni -= quantity;
               await product.save();

               // Сохранить информацию о проданном товаре
               const newSoldProduct = new SoldProduct({
                    nomi,
                    kelgannarxi,
                    sotishnarxi,
                    soni: quantity,
                    barcode: product.barcode,
                    saleDate,
               });
               await newSoldProduct.save();

               soldProducts.push(newSoldProduct);
          }

          res.status(201).json({ message: 'Продажа успешно завершена', soldProducts, total });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при завершении продажи", error });
     }
};

const getSoldItems = async (req, res) => {
     try {
          const soldItems = await SoldProduct.find();
          res.status(200).json(soldItems);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении проданных товаров", error });
     }
};

loginAdmin = async (req, res) => {
     const { login, password } = req.body;

     let role;
     if (login === 'admin' && password === 'admin') {
          role = 'admin';
     } else if (login === 'user' && password === 'user') {
          role = 'user';
     } else {
          return res.status(401).json({ message: 'Login yoki parol noto\'g\'ri' });
     }

     const secretKey = 'banan';
     const token = jwt.sign({ role }, secretKey, { expiresIn: '7d' });

     return res.status(200).json({ token });
};

checkToken = (req, res) => {
     const token = req.headers.authorization?.split(' ')[1];
     const secretKey = 'banan';

     if (!token) {
          return res.status(401).json({ message: 'Token topilmadi' });
     }

     try {
          const decoded = jwt.verify(token, secretKey);
          return res.status(200).json({ role: decoded.role });
     } catch (err) {
          return res.status(401).json({ message: 'Token yaroqsiz' });
     }
};


module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct, sellProduct, getSoldItems, loginAdmin, checkToken }