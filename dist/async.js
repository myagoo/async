"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function handleYield(generator, yielded) {
  if (yielded.done) {
    return yielded.value;
  } else {
    return yielded.value.then(function (result) {
      return handleYield(generator, generator.next(result));
    }, function (error) {
      return handleYield(generator, generator.throw(error));
    });
  }
}

exports.default = function (generatorFunction) {
  return function () {
    return handleYield(generatorFunction.apply(undefined, arguments).next());
  };
};
