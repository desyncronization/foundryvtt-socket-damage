socketlib.registerModule("koha-socket-damage");

let socket;

Hooks.once("socketlib.ready", () => {
    socket = socketlib.registerModule("my-module");
    socket.register("hello", showHelloMessage);
    socket.register("doDamage", doDamage);
});

// Hooks.once("ready", async () => {
//     // Let's send a greeting to all other connected users.
//     // Functions can either be called by their given name...
//     socket.executeForEveryone("hello", game.user.name);
//     // ...or by passing in the function that you'd like to call.
//     socket.executeForEveryone(showHelloMessage, game.user.name);
//     // The following function will be executed on a GM client.
//     // The return value will be sent back to us.
//     const result = await socket.executeAsGM("add", 5, 3);
//     console.log(`The GM client calculated: ${result}`);
// });

async function sendDamageRequest(source,target,damage){
    const result = await socket.executeAsGM("doDamage", 'tipa_damager', 'tipa_target', 100500);
    console.log(`GM response: ${result}`);
}

function showHelloMessage(userName) {
    console.log(`User ${userName} says hello!`);
}

function doDamage(source, target, damage) {
    return `${source} pizdanul po ${target} na ${damage}`;
}