const { Client } = require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../../config.json")


module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log("Bot is online")
        client.user.setActivity("Aurora Gaming Server", {type: "WATCHING"})

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the Database.")
        }).catch((err) => {
            console.log(err)
        });
    }
}