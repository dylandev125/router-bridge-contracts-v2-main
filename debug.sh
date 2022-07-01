npx hardhat deposit-executes --chain 1 --count 500 --start 300 --network bsc
npx hardhat deposit-executes --chain 2 --count 500 --start 300 --network polygon
npx hardhat merge-reports --chain1 2 --chain2 1