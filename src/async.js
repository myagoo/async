function handleYield(generator, yielded) {
  if (yielded.done) {
    return yielded.value;
  } else {
    return yielded.value.then((result) => handleYield(generator, generator.next(result)), (error) => handleYield(generator, generator.throw(error)))
  }
}

export default (generatorFunction) => (...args) => handleYield(generatorFunction(...args).next());
