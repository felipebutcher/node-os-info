# node-os-info
When I needed to get memory, cpu and disk information on NodeJS, I ended up looking for answers on stackoverflow and using multiple packages with some code. I am putting all together here.

The values that this package show are the same as in htop, which were what I was looking for.


## Code from others
This project uses [this code](https://gist.github.com/GaetanoPiazzolla/c40e1ebb9f709d091208e89baf9f4e00) for CPU calculation.     
We also use [NodeJS OS](https://nodejs.org/api/os.html) module.  
The packages [systeminformation](https://github.com/sebhildebrandt/systeminformation) and
[check-disk-space](https://github.com/Alex-D/check-disk-space) are used for memory and disk calculation.


## Installation
```bash
npm install @felipebutcher/node-os-info
```

## Usage
All the three variables (memory, cpu and disk) are a number between 0 and 1, representing the percentage of use of each resource.

```node
const osInfo = require("@felipebutcher/node-os-info");

osInfo.mem(memory => {
    console.log("Memory: " + Math.round(memory * 100) + "%");
});

osInfo.cpu(cpu => {
    console.log("CPU: " + Math.round(cpu * 100) + "%");
});

osInfo.disk(disk => {
    console.log("Disk: " + Math.round(disk * 100) + "%");
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
There's no license, do what you want.