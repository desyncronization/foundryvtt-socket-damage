let socket;

Hooks.once("socketlib.ready", () => {
    socket = socketlib.registerModule("koha-socket-damage");
    socket.register("doDamage", doDamage);
});

Hooks.once("ready", async () => {
    game.modules.get("koha-socket-damage").sckt=socket
});

function doDamage(source, target, damage) {
    ChatMessage.create({
        content: `${source} pizdanul po ${target} na ${damage}`,
    });
    return true;
}


