const Trans = require("../model/Transaction");

module.exports = {
    postTransactions: async (req,res) => {
        try{
            let transObj = {
                userId: req.body.id,
                cost: req.body.cost,
                merchant: req.body.merchant,
                catagory: req.body.catagory,
                date: req.bodybody.date
            }
           const createTransaction =  await Trans.create(Trans)
            if (!createTransaction) {
            return res.status(404).json({ error: 'Transaction not posted' });
        }

        return res.status(200).json(createTransaction);
        } catch(err){
            console.error(err)
        }
    },
}