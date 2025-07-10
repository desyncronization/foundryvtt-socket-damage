let socket;

Hooks.once("socketlib.ready", () => {
    socket = socketlib.registerModule("koha-socket-damage");
    socket.register("doDamage", doDamage);
});

Hooks.once("ready", async () => {
    game.modules.get("koha-socket-damage").sckt=socket
});

function doDamage(sourceID, targetID, targetBodyPart, damage) {
    let source = canvas.tokens.get(sourceID);
    let target = canvas.tokens.get(targetID);

    let resultTargetHP = target.actor.system.props[targetBodyPart] - damage;

    let propToUpdate = "system." + targetBodyPart;
    target.actor.update({ propToUpdate: resultTargetHP });

    return true;
}

function setHP(targetID, targetBodyPart, finalHP) {
    let target = canvas.tokens.get(targetID);

    let propToUpdate = "system." + targetBodyPart;
    target.actor.update({ propToUpdate: finalHP });

    return true;
}


