function parseTime(ms) {
    let h, m, s;
    h = Math.floor(ms/1000/60/60);
    m = Math.floor((ms/1000/60/60 - h) * 60);
    s = Math.floor(((ms/1000/60/60 - h) * 60 - m) * 60);

    return {h, m, s}
}

module.exports = { parseTime }