while true; do
  npx hardhat run scripts/delegate_selfdestruct.ts --network astraTestnet &
  sleep 150
  kill $!
done