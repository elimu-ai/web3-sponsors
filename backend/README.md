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
npx hardhat ignition deploy ./ignition/modules/DistributionVerifier.ts --network hardhat
npx hardhat ignition deploy ./ignition/modules/QueueHandler.ts --network hardhat
```

Ethereum Sepolia (Chain ID `11155111`)

```shell
rm -rf ./ignition/deployments/chain-11155111/artifacts/
```

```shell
npx hardhat ignition deploy ./ignition/modules/SponsorshipQueue.ts --network sepolia --reset --verify
npx hardhat ignition deploy ./ignition/modules/DistributionQueue.ts --network sepolia --verify
npx hardhat ignition deploy ./ignition/modules/DistributionVerifier.ts --network sepolia --verify
npx hardhat ignition deploy ./ignition/modules/QueueHandler.ts --network sepolia --verify
```
[`./ignition/deployments/chain-11155111/deployed_addresses.json`](./ignition/deployments/chain-11155111/deployed_addresses.json)

Ethereum Mainnet (Chain ID `1`)

```shell
rm -rf ./ignition/deployments/chain-1/artifacts/
```

```shell
npx hardhat ignition deploy ./ignition/modules/SponsorshipQueue.ts --network mainnet --reset --verify
npx hardhat ignition deploy ./ignition/modules/DistributionQueue.ts --network mainnet --verify
npx hardhat ignition deploy ./ignition/modules/DistributionVerifier.ts --network mainnet --verify
npx hardhat ignition deploy ./ignition/modules/QueueHandler.ts --network mainnet --verify
```
[`./ignition/deployments/chain-1/deployed_addresses.json`](./ignition/deployments/chain-1/deployed_addresses.json)
