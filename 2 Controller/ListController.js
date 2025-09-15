const ListSchema = require("../1 Model/ListModal")

let createList = async (req, res) => {
    console.log("Request Body:", req.body);

    let newList = {
        title: req.body.title,
        description: req.body.description,
        endDate: req.body.endDate,
        user: req.UserID
    };

    try {
        let CreatedList = await ListSchema.create(newList);
        if (!CreatedList) {
            return res.status(400).json({ msg: "Something went wrong during list creation." });
        }

        return res.status(200).json({ msg: "Task Created" });
    }
    catch (error) {
        if (error.code === 11000) { //it is duplication error code of mongoose
            return res.status(400).json({ msg: "Can Not Create Single Task Twise" });
        }
        console.log("Error while saving list", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


let display = async (req, res) => {
    let ID = req.UserID;

    try {

        let ListData = await ListSchema.find({ user: ID });


        if (!ListData || ListData.length === 0) {
            // console.log("No tasks found for user:", ID);
            return res.status(200).render("home", { ListData: [] });
        }

        return res.status(200).render("home", { ListData });

    } catch (err) {
        console.error("Error in retrieving data:", err);
        res.status(500).render("home", { ListData: [] });
    }
};


let deleteTask = async (req, res) => {
    let TaskID = req.params.id;

    try {
        let confirm = await ListSchema.findByIdAndDelete(TaskID);

        if (!confirm) {
            return res.status(404).json({ msg: "Task not found." });
        }

        res.status(200).json({ msg: "Task deleted" })
    }
    catch (err) {
        console.log("Error while deleting " + err)
        res.status(400).json({ msg: "Error while deleting" })
    }
};

let updateTask = async (req, res) => {
    let oldtitle = req.body.Etitle

    let data = {};
    if(req.body.title){
        data.title = req.body.title
    }
    if(req.body.description){
        data.description = req.body.description
    }
    if(req.body.endDate){
        data.endDate = req.body.endDate
    }

    try{
        let UpdatedData = await ListSchema.findOneAndUpdate({title: oldtitle}, {$set: data}, { new: true } )//new: true this return updated document 
        if(UpdatedData){
            res.status(200).json({msg: "Updated Successfully"})
        }
        else{
            res.status(400).json({msg: "Error! Not Updated"})
        }
    }
    catch(err){
        if (err.code === 11000) { //it is duplication error code of mongoose
            return res.status(400).json({ msg: "Can Not Create Single Task Twise" });
        }
        res.status(500).json({msg: "Server Error while Editing Todo"})
        console.log("Update Error" + err)
    }
}


module.exports = {
    createList: createList,
    display: display,
    deleteTask: deleteTask,
    updateTask: updateTask
}