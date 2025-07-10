let socket;

Hooks.once("socketlib.ready", () => {
    socket = socketlib.registerModule("koha-socket-damage");
    socket.register("doDamage", doDamage);
    socket.register("setHP", setHP);
});

Hooks.once("ready", async () => {
    game.modules.get("koha-socket-damage").sckt=socket
});

function doDamage(sourceID='zaloopa', targetID, targetBodyPart, damage) {
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


