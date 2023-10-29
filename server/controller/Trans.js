const Trans = require("../model/Transaction");
const getObjectsWithinCurrentWeek = (transacationData) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const millisecondsInADay = 24 * 60 * 60 * 1000;

    // Calculate the start timestamp of the current week (Sunday)
    const startOfWeek = currentDate.getTime() - currentDay * millisecondsInADay;

    // Filter objects within the current week
    const objectsWithinCurrentWeek = transacationData.filter(item => {
        return item.date >= startOfWeek;
    });

    return objectsWithinCurrentWeek;
};
const getObjectsWithinSameDay = (transacationData) => {
  const currentDate = new Date();
  const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0).getTime();

  // Filter objects within the same day
  const objectsWithinSameDay = transacationData.filter(item => {
    return item.date >= startOfDay;
  });

  return objectsWithinSameDay;
};
const getObjectsWithinCurrentMonth = (transacationData) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0 = January, 1 = February, ..., 11 = December

  // Calculate the start timestamp of the current month (1st day of the month)
  const startOfMonth = new Date(currentYear, currentMonth, 1).getTime();

  // Calculate the end timestamp of the current month (1st day of the next month)
  const nextMonth = new Date(currentYear, currentMonth + 1, 1).getTime();

  // Filter objects within the current month
  const objectsWithinCurrentMonth = transacationData.filter(item => {
    return item.date >= startOfMonth && item.date < nextMonth;
  });

  return objectsWithinCurrentMonth;
};
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
    getTransacations: async (req,res) => {
        let coolio = await Trans.find({userId: req.params.id})
        //console.log(coolio)
        try {
            if(req.params.time === 'Daily'){
                res.send(getObjectsWithinSameDay(coolio))
            } else if(req.params.time === 'Weekly'){
                res.send(getObjectsWithinCurrentWeek(coolio))
            } else if(req.params.time === 'Monthly'){
                res.send(getObjectsWithinCurrentMonth(coolio))
            } else {
                res.send(coolio)
            }
            console.log(req.params.id)
        } catch (error) {
            console.error(error)
        }
    },
}