function choice(choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

module.exports = { choice };