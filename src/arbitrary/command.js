"use strict";
const jsc = require('jsverify');
const lazyseq = require("lazy-seq");

var arbNullTuple = function(arbsArray) {
    if (arbsArray.length === 0) {
        return jsc.bless({
            generator: size => [],
            shrink: lazyseq.nil,
            show: t => "empty"
        });
    }
    return jsc.tuple(arbsArray);
};

var arbCommand = function(TypeName, ...arbs) {
    var arbParameters = arbNullTuple(arbs);
    var build = function(parameters) {
        return {
            command: new TypeName(...parameters),
            parameters: parameters,
            shrink: () => arbParameters.shrink(parameters).map(build)
        };
    };

    return jsc.bless({
        generator: size => build(arbParameters.generator(size)),
        shrink: cmd => cmd.shrink(),
        show: cmd => cmd.command.toString()
    });
};

module.exports = {
    command: arbCommand
};
