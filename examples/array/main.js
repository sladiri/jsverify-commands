const assert = require('assert');

const jsc = require('jsverify');
const jscCommands = require('../../src/jscCommands');

const PopCommand = require('./commands/PopCommand');
const PushCommand = require('./commands/PushCommand');

describe('Array', function() {
    it('should confirm commands', function(done) {
        var commands = jscCommands.commands(
            jscCommands.command(PopCommand),
            jscCommands.command(PushCommand, jsc.nat));
        var warmup = () => new Object({state: [], model: {numEntries: 0}});
        var teardown = () => {};

        jsc.assert(jscCommands.forall(commands, warmup, teardown))
            .then(val => val ? done(val) : done())
            .catch(error => done(error));
    });
});
