let socket;

Hooks.once("socketlib.ready", () => {
    socket = socketlib.registerModule("koha-socket-damage");
    socket.register("doDamage", doDamage);
});

Hooks.once("ready", async () => {
    game.modules.get("koha-socket-damage").api=macroApi
});


async function sendDamageRequest(source,target,damage){
    const result = await socket.executeAsGM("doDamage", 'tipa_damager', 'tipa_target', 100500);
    console.log(`GM response: ${result}`);
}

function doDamage(source, target, damage) {
    ChatMessage.create({
        content: `${source} pizdanul po ${target} na ${damage}`,
    });
    return true;
}

const macroApi = {
    sendDamageRequest: async(source, target, damage) => {
        const result = await socket.executeAsGM(
            "doDamage",
            "tipa_damager",
            "tipa_target",
            100500
        );
        console.log(`GM response: ${result}`);
    }
};

