let socket;

Hooks.once("socketlib.ready", () => {
    socket = socketlib.registerModule("koha-socket-damage");
    socket.register("doDamage", doDamage);
});

Hooks.once("ready", async () => {
    game.modules.get("koha-socket-damage").sckt=socket
});

function doDamage(sourceID, targetID, targetBodyPart,damage) {
    let source = canvas.tokens.get(sourceID);
    let target = canvas.tokens.get(targetID);

    let chatMSG = `<p>${source.document.name} pizdanul po (${targetBodyPart}) ${target.document.name} na ${damage}</p>`;

    let resultTargetHP = target.actor.system.props[targetBodyPart] - damage;
    
    chatMSG += `<p>HP ${target.document.name} (${targetBodyPart}) bilo ${target.actor.system.props[targetBodyPart]}, stanet ${resultTargetHP}</p>`;

    let propToUpdate = 'system.'+targetBodyPart
    target.actor.update({propToUpdate:resultTargetHP})

    ChatMessage.create({
        content: chatMSG,
    });
    return true;
}


