const os = require("os");
const si = require('systeminformation');
const disk = require('diskusage');
const rootPath = os.platform() === 'win32' ? 'c:' : '/';

const cpuAverage = () => {
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

const arrAvg = (arr) => {
    if (arr && arr.length >= 1) {
        const sumArr = arr.reduce((a, b) => a + b, 0)
        return sumArr / arr.length;
    }
};

const getCPULoadAVG = (avgTime = 1000, delay = 100) => {
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

exports.cpu = (callback) => {
    getCPULoadAVG(1000, 100).then((avg) => {
        callback(avg / 100);
    });
}

exports.mem = (callback) => {
    si.mem((mem) => {
        let memoryUsage = mem.active / mem.total;
        callback(
            Math.round(memoryUsage * 100) / 100
        );
    });
}

exports.disk = (callback) => {
    disk.check(rootPath, function (err, info) {
        if (err) {
            console.log(err);
            callback(-1);
        } else {
            let used = info.total - info.free;
            let diskUsage = used / info.total;
            callback(Math.round(diskUsage * 100) / 100);
        }
    });
}


