const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config(); // config file env
const PORT = process.env.PORT; // config file env

app.use(express.json()); //middleware

app.get("/api", (req, res) => {
  res.send("Hello World"); // response from server
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.post("/products", async (req, res) => {
    const newProductData = req.body; // ini request body

    const products = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            image: newProductData.image,
            price: newProductData.price
        }
    });
    
    res.status(201).send("Created Product Successfully"); // ini response from server
});

app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id; //String

    await prisma.product.delete({
        where: {id: parseInt(productId)},
    });

    res.send("Product Deleted Successfully");
});

app.listen(PORT, () => {
  console.log("Express API running on port: " + PORT);
});
