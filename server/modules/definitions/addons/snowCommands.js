const commandKey = '/';

module.exports = ({ Events }) => {
    Events.on('chatMessage', ({ message, socket, preventDefault }) => {
        // Exit if not a command
        if (message.indexOf(commandKey) !== 0) return;

        // Disable drawing of the text
        preventDefault();

        let perms = socket.permissions,
            player = socket.player,
            body = player.body,
            id = body.id,
            target = body.target;

        if (!perms || !perms.operator) {
            console.log(socket);
            socket.talk('m', 'You cannot execute commands.');
            return;
        }

        // Parse command
        let commandPlaintext = message.substr(1).split(' '),
            commandCode,
            commandTarget,
            commandOpts;
        switch (commandPlaintext.length) {
            case 0:
                socket.talk('m', 'Invalid command.');
                return;
            case 1:
                commandCode = commandPlaintext[0];
                commandTarget = body;
                commandOpts = '';
                break;
            case 2:
                commandCode = commandPlaintext[0];
                commandTarget = body;
                commandOpts = commandPlaintext[1];
                break;
            case 3:
                commandCode = commandPlaintext[0];
                commandTarget = global.entities.filter(e => e.id === commandPlaintext[1]);
                if (!commandTarget.length) {
                    socket.talk('m', 'Invalid target.');
                    return;
                }
                commandTarget = commandTarget[0];
                commandOpts = commandPlaintext.subarray(2).join(' ');
                break;
        }
        commandCode = commandCode.toLowerCase();

        const parseToNum = (s) => {
            let num;
            try {
                num = JSON.parse(s);
            } catch {
                return 'invalid';
            }
            if (typeof num !== 'number') return 'invalid';
            return num;
        }

        const validatePerms = (minimumOp) => {
            if (!perms || perms.operator < minimumOp) {
                socket.talk('m', 'You cannot execute this command.');
                return false;
            }
            return true;
        }

        const validateLength = (length) => {
            if (commandPlaintext.length < length) {
                socket.talk('m', 'Invalid command.');
                return false;
            }
            return true;
        }

        // Process command
        switch (commandCode) {
            case 'id':
            case 'getid':
                if (!validatePerms(1)) return;

                socket.talk('m', 'ID: ' + commandTarget.id);
                break;
            case 'score':
                if (!validatePerms(1)) return;
                if (!validateLength(2)) return;

                let setScore = parseToNum(commandOpts)
                if (setScore === 'invalid') {
                    socket.talk('m', 'Invalid score.');
                    return;
                }
                commandTarget.skill.reset();
                commandTarget.skill.score = setScore;
                commandTarget.refreshBodyAttributes();
                break;
            case 'define':
                if (!validatePerms(2)) return;
                if (!validateLength(2)) return;

                let type = commandOpts;
                if (type in Class) {
                    commandTarget.define({ RESET_UPGRADES: true, BATCH_UPGRADES: false });
                    commandTarget.define(type);
                } else {
                    socket.talk('m', 'Invalid class.');
                    return;
                }
                break;
        }
        
        socket.talk('m', 'Command executed successfully.');
    });

    console.log('[snowCommands.js] SnowCommands active.');
}