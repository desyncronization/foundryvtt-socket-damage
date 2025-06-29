let socket;

Hooks.once("socketlib.ready", () => {
    socket = socketlib.registerModule("koha-socket-damage");
    socket.register("doDamage", doDamage);
});

Hooks.once("ready", async () => {
    game.modules.get("koha-socket-damage").sckt=socket
});

function doDamage(sourceID, targetID, damage) {
    let source = canvas.tokens.get(sourceID);
    let target = canvas.tokens.get(targetID);

    ChatMessage.create({
        content: `${source.document.name} pizdanul po ${target.document.name} na ${damage}`,
    });

    let resultTargetHP = target.actor.system.props.HP - damage;
    ChatMessage.create({
        content: `HP ${target.document.name} bilo ${target.actor.system.props.HP}, stanet ${resultTargetHP}`,
    });
    return true;
}


