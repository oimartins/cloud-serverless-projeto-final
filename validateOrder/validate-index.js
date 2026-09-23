exports.validateOrder = (req, res) => {

    const order = req.body;

    console.log(JSON.stringify({
        service: "validateOrder",
        action: "validation_started",
        orderId: order?.id
    }));

    if (!order || !order.id) {

        console.error(JSON.stringify({
            service: "validateOrder",
            action: "validation_failed",
            reason: "missing_order_id"
        }));

        return res.status(400).json({
            success: false,
            message: "Pedido inválido"
        });
    }

    return res.status(200).json({
        success: true,
        orderId: order.id,
        amount: order.amount
    });

};