require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const config = {
  networks: {
    mainnet: {
      host: "localhost",
      port: 8545,
      network_id: "1"
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: "3"
    },
    kovan: {
      host: "localhost",
      port: 8545,
      network_id: "42"
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4"
    },
    xdai: {
      host: "localhost",
      port: 8545,
      network_id: "100"
    },
    local: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    // BSC Testnet configuration
    bscTestnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY || process.env.MNEMONIC,
          process.env.BSC_TESTNET_RPC ||
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
        ),
      network_id: 97,
      gasPrice: 1000000000, // 1 gwei
      skipDryRun: true
    }
  },
  mocha: {
    enableTimeouts: false,
    grep: process.env.TEST_GREP,
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      excludeContracts: ["Migrations"]
    }
  },
  compilers: {
    solc: {
      version: "node_modules/solc", // Use locally installed solc from node_modules
      settings: {
        optimizer: {
          enabled: true
        }
      }
    }
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    bscscan: process.env.BSCSCAN_API_KEY
  }
};

try {
  require("chai/register-should");
  require("chai").use(require("chai-as-promised"));
} catch (e) {
  // eslint-disable-next-line no-console
  console.log("Skip setting up testing utilities");
}

try {
  const _ = require("lodash");
  _.merge(config, require("./truffle-local"));
} catch (e) {
  if (e.code === "MODULE_NOT_FOUND" && e.message.includes("truffle-local")) {
    // eslint-disable-next-line no-console
    console.log("No local truffle config found. Using all defaults...");
  } else {
    // eslint-disable-next-line no-console
    console.warn("Tried processing local config but got error:", e);
  }
}

module.exports = config;
