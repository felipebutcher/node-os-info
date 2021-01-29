const os = require("os");

function cpuAverage() {
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
    for (var i = 0, len = cpus.length; i < len; i++) {
        var cpu = cpus[i];
        for (type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    }
    return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

const arrAvg = function (arr) {
    if (arr && arr.length >= 1) {
        const sumArr = arr.reduce((a, b) => a + b, 0)
        return sumArr / arr.length;
    }
};

function getCPULoadAVG(avgTime = 1000, delay = 100) {
    return new Promise((resolve, reject) => {
        const n = ~~(avgTime / delay);
        if (n <= 1) {
            reject('Error: interval to small');
        }
        let i = 0;
        let samples = [];
        const avg1 = cpuAverage();
        let interval = setInterval(() => {
            if (i >= n) {
                clearInterval(interval);
                resolve(~~((arrAvg(samples) * 100)));
            }
            const avg2 = cpuAverage();
            const totalDiff = avg2.total - avg1.total;
            const idleDiff = avg2.idle - avg1.idle;
            samples[i] = (1 - idleDiff / totalDiff);
            i++;
        }, delay);
    });
}

exports.cpuPercent = callback => {
    getCPULoadAVG(1000, 100).then((avg) => {
        callback(avg);
    });
}

exports.cpuPercentAverage = (seconds, callback) => {
    getCPULoadAVG(seconds * 1000, 100).then((avg) => {
        callback(avg);
    });
}



