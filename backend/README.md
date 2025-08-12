# Backend

Compiling:

```shell
npm install
npx hardhat clean
npx hardhat compile
```

Testing:

```shell
npx hardhat test
npx hardhat coverage
npx istanbul check-coverage --lines 80
```

Deployment:

Hardhat (`localhost`)
```shell
npx hardhat ignition deploy ./ignition/modules/SponsorshipQueue.ts --network hardhat
npx hardhat ignition deploy ./ignition/modules/DistributionQueue.ts --network hardhat
```

Ethereum Sepolia (`Chain ID 11155111`)
```shell
npx hardhat ignition deploy ./ignition/modules/SponsorshipQueue.ts --network sepolia --reset --verify
npx hardhat ignition deploy ./ignition/modules/DistributionQueue.ts --network sepolia --reset --verify
```
[`./ignition/deployments/chain-11155111/deployed_addresses.json`](./ignition/deployments/chain-11155111/deployed_addresses.json)

Ethereum Mainnet (`Chain ID 1`)
```shell
npx hardhat ignition deploy ./ignition/modules/SponsorshipQueue.ts --network mainnet --reset --verify
```
[`./ignition/deployments/chain-1/deployed_addresses.json`](./ignition/deployments/chain-1/deployed_addresses.json)
