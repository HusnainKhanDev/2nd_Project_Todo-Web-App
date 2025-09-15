const ListSchema = require("../1 Model/ListModal")
const crons = require("node-cron");

crons.schedule('* 5 * * *', async () => {
    
    let CurrentDate = new Date().toISOString().split('T')[0]; //ISO format ko string ma tor raha han
    try{
        let deleted = await ListSchema.deleteMany({endDate:{$lt: CurrentDate}})        
    }
    catch(err){
        console.log("server error Error while Deleteion")
        res.status(500).json({ msg: "Error while cleaning up expired tasks." });
    }
})
