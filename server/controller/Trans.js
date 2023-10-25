const Trans = require("../model/Transaction");

module.exports = {
    postTransactions: async (req,res) => {
        try{
            let transObj = {
                userId: req.body.userId,
                cost: req.body.cost,
                merchant: req.body.merchant,
                category: req.body.category,
                date: req.body.date
            }
           const createTransaction =  await Trans.create(transObj)
            if (!createTransaction) {
            return res.status(404).json({ error: 'Transaction not posted' });
        }

        return res.status(200).json(createTransaction);
        } catch(err){
            console.error(err)
        }
    },
}