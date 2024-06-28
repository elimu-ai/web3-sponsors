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

```shell
rm .\ignition\deployments\
npx hardhat ignition deploy .\ignition\modules\SponsorshipQueue.ts --network base_sepolia --verify
```
