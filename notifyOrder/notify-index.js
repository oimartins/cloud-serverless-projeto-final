exports.notifyOrder = (req, res) => {

    const order = req.body;

    console.log(JSON.stringify({
        service: "notifyOrder",
        action: "notification_sent",
        orderId: order.orderId,
        riskLevel: order.riskLevel
    }));

    return res.status(200).json({
        success: true,
        message: "Pedido processado com sucesso"
    });

};