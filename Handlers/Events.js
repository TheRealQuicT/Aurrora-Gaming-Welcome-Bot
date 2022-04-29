const {  Events } = require("./Validation/EventNames");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const ascii = require("ascii-table");
const AsciiTable = require("ascii-table/ascii-table");

module.exports = async (client) => {
    const Table = new AsciiTable("Events Loaded");

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `⛔ Event name is either invalid or missing: ${L[6] + `/` + L[7]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "✔ SUCCESSFUL")
    });

    console.log(Table.toString());
}