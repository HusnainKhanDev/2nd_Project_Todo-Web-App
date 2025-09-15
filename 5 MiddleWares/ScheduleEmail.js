const crons = require("node-cron");
const ListSchema = require("../1 Model/ListModal");
const UserSchema = require("../1 Model/UserModel");
const SendEmail = require("./SendEmail");

//5 * in it represent minute, hour, days, month, weeks 0 0 means start of the day 12AM 0 represent start
crons.schedule('* 5 * * *', async () => {
    
    console.log("Ya chal raha ha ")
    const upcomingDate = new Date();
    upcomingDate.setDate(upcomingDate.getDate() + 1);
    const upcomingDateFormatted = upcomingDate.toISOString().split('T')[0]; //spliting tha date from ISO format line bearer token

    try {

        let todos = await ListSchema.find({ endDate: upcomingDateFormatted });

        if (!todos || todos.length === 0) {
            console.log("No tasks found expiring tomorrow.");
            return;
        }

        //set remove dublicate values and ... make it array / extracting user Object ID 
        let UserObjID = [...new Set(todos.map((items) => items.user.toString()))];

        const users = [];

        for (const id of UserObjID) {
            try {
                const user = await UserSchema.findOne({ _id: id });
                users.push(user); // Store the result of each query
            } catch (error) {
                console.log(`Error finding user with ID ${id}:`, error);
                users.push(null); // Push null or some fallback value if an error occurs
            }
        }


        // filter removes null values and map extract emails from user object 
        const emails = users.filter((user) => user).map((user) => user.Email);

        for (const email of emails) { // sending mail one by one 
            await SendEmail.sendEmailNotification(email);
        }

        console.log("Email notifications sent successfully.");
    } catch (err) {
        console.log("Something went wrong while getting emails or sending notifications:", err);
    }
});
