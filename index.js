
const discord = require("discord.js")
let request = require('request');
let app = new discord.Client()
let readline = require('readline');

// used for reading line
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//defining input function
function input(prompt, callback) {
    rl.question(prompt, function (x) {
        rl.close();
        callback(x);
    });
}

app.on("ready", () => {
	app.user.setActivity("taking a break from discord")
	console.log(`Logged in as ${app.user.tag}!`)
})

// Checks every message in every channel!
app.on("message", message => {
	
	// for debugging purposes...
	// console.log(message.content)
    var mesg_tokens = message.content.split(" ");
    for (i = 0; i < mesg_tokens.length; i++)
    {
        console.log(mesg_tokens[i]);
        if (mesg_tokens[i].includes("https://lichess.org/" )) {

            // if the message is not from the bot!
            if (!message.author.bot){

                // get the redirected link!
                let r = request.get(mesg_tokens[i], function (err, res, body) {

                    // if res exists
                    if (res) {
                        // use lichess gif api
                        console.log(res.request.uri.href.split(' ')[0])
                        let rr = res.request.uri.href.split(' ')[0].replace("https://lichess.org/","").replace("/black","").replace("/white","")

                        // send the message to the channel
                        message.channel.send("https://lichess1.org/game/export/gif/" + rr + '.gif')
                    }
                });

            }
        }
    }
})

// get the API token from the user
let token = input("Enter your discord bot token here: ", (user_input) => {app.login(user_input)});

