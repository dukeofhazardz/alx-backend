const express = require('express');
const app = express();
const port = 1245;

import { createClient } from 'redis';
const client = createClient();

const listProducts = [
    {'Id': 1, 'name': 'Suitcase 250', 'price': 50, 'stock': 4},
    {'Id': 2, 'name': 'Suitcase 450', 'price': 100, 'stock': 10},
    {'Id': 3, 'name': 'Suitcase 650', 'price': 350, 'stock': 2},
    {'Id': 4, 'name': 'Suitcase 1050', 'price': 550, 'stock': 5},
];

function getItemById(id) {
    return listProducts.find(product => product.Id === id);
}

function reserveStockById(itemId, stock) {
    const key = `item.${itemId}`;
    client.set(key, stock);
}

async function getCurrentReservedStockById(itemId) {
    return new Promise((resolve, reject) => {
        const key = `item.${itemId}`;
        client.get(key, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result ? parseInt(result) : 0);
            }
        });
    });
}

app.get('/list_products', (req, res) => {
    res.json(listProducts.map(product => ({
        itemId: product.Id,
        itemName: product.name,
        price: product.price,
        initialAvailableQuantity: product.stock,
    })));
});

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);

    if (!product) {
        res.json({status: 'Product not found'});
    } else {
        const currentQuantity = await getCurrentReservedStockById(itemId);
        res.json({
            itemId: product.Id,
            itemName: product.name,
            price: product.price,
            initialAvailableQuantity: product.stock,
            currentQuantity: currentQuantity,
        });
    }
});

app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = getItemById(itemId);

    if (!product) {
        res.json({status: 'Product not found'});
    } else {
        const currentQuantity = await getCurrentReservedStockById(itemId);
        if (currentQuantity >= product.initialAvailableQuantity) {
            res.json({status: 'Not enough stock available', itemId: itemId});
        } else {
            reserveStockById(itemId, currentQuantity + 1);
            res.json({ status: 'Reservation confirmed', itemId: itemId });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});