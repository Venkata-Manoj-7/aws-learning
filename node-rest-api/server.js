const express = require("express");

const app = express();
app.use(express.json());
let orders = [
    {
        id: 1,
        product: "Laptop",
        quantity: 1
    },
    {
        id: 2,
        product: "Mouse",
        quantity: 2
    }
];

app.get("/", (req, res) => {
    res.send("Hello! Our Node.js REST API is running.");
});

app.get("/orders",(req,res)=>{
    res.json(orders);
})
app.get("/orders/:id",(req,res)=>{
    const reqId = req.params.id;
 
     const order  = orders.find(order=> order.id==reqId);
     if(!order){
        return res.status(404).json({
            message:"order not found"
        });
     }
     res.json(order);

});
app.get("/products",(req,res)=>{
    res.send("here are all products");
})

app.post("/orders",(req,res)=>{
  
    if (
    typeof req.body.product !== "string" ||
    req.body.product.trim() === "" ||
    !Number.isInteger(req.body.quantity) ||
    req.body.quantity <= 0
) {
    return res.status(400).json({
        message: "Invalid order data"
    });
}
    const newOrder ={
        id:orders.length+1,
        product:req.body.product,
        quantity:req.body.quantity
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);

});

app.patch("/orders/:id",(req,res)=>{
  
    const orderId=req.params.id;
    const order = orders.find(order=>order.id===Number(orderId));
     if(!order){
        return res.status(404).json({
            message:"order not found"
        });
     }

         if (!Number.isInteger(req.body.quantity) || req.body.quantity <= 0) {
    return res.status(400).json({
        message: "Invalid quantity"
    });
}
     order.quantity=req.body.quantity;

   return res.status(200).json(order);
    

});

app.delete("/orders/:id",(req,res)=>{
    const orderId = req.params.id;
    const index = orders.findIndex(
        item => item.id===Number(orderId)
    );
    if(index<0) {
      return   res.status(404).json({
            message:"Item is not found"
        })
    }

    orders.splice(index,1);
    return res.status(200).json({
        message: "Order deleted successfully"
    });

});

app.put("/orders/:id", (req, res) => {
    const orderId = req.params.id;
    const index = orders.findIndex(
        item => item.id===Number(orderId)
    );
    if(index<0) {
      return   res.status(404).json({
            message:"Item is not found"
        })
    }
if (
    typeof req.body.product !== "string" ||
    req.body.product.trim() === "" ||
    !Number.isInteger(req.body.quantity) ||
    req.body.quantity <= 0
) {
    return res.status(400).json({
        message: "Invalid order data"
    });
}
    
    const newOrder = {
        id :  Number(orderId),
        product:req.body.product,
        quantity:req.body.quantity,

    }
    orders[index]=newOrder;

    return res.status(200).json(newOrder);
});


// fallback 404 error
app.use((req, res) => {
    return res.status(404).json({
        message: "API endpoint not found"
    });
});
// internal programming error
app.use((err, req, res, next) => {
    console.error(err.stack);

    return res.status(500).json({
        message: "Internal server error"
    });
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

