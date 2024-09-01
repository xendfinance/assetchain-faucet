# Asset Chain Faucet

This repository contains all resources for organizing the node-sales for Asset Chain, including smart contracts, interfaces for the main website, and dashboards for purchasing nodes and tracking rewards.

## Table of Contents
- [Getting Started](#getting-started)
- [How to Run the App](#how-to-run-the-app)
- [Project Structure](#project-structure)
- [Using the faucet-config.yaml](#using-the-faucet-configyaml)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Getting Started
To get started, follow the steps below:

1. **Clone this repository:**
   ```bash
   git clone https://github.com/xendfinance/assetchain-faucet.git
   ```

2. **Navigate into the desired project directory:**
   ```bash
   cd faucet-client
   ```

3. **Install the project's dependencies:**
   ```bash
   npm install
   ```

4. **Start development:**
   ```bash
   npm start
   ```

## How to Run the App
To run the application, you need to follow these steps:

1. **Build the Client:**
   Navigate to the `faucet-client` directory and build the client application:
   ```bash
   cd faucet-client
   npm run build-client
   ```

2. **Start the Server:**
   After building the client, navigate back to the root directory and start the server:
   ```bash
   cd ..
   npm start
   ```

3. **Access the Application:**
   Open your web browser and go to `http://localhost:{{port from the faucet-config.yaml}}` to access the application.



## Project Structure
- **faucet-client/**: Contains the client-side code for the faucet application, including Webpack configuration and utility scripts.
- **faucet-wasm/**: Contains WebAssembly modules for cryptographic functions.
- **static/**: Contains static files such as HTML, CSS, and images for the web application.
- **src/**: Contains source files for components, styles, and other resources.
- **faucet-config.yaml**: Configuration file for the faucet, defining its behavior and settings.

## Using the faucet-config.yaml
The `faucet-config.yaml` file is crucial for configuring the behavior of the faucet. Below are the key sections and their purposes:

### Key Sections
1. **faucetHomeHtml**: This section allows you to define additional HTML content that will be displayed on the start page of the faucet. You can customize the information presented to users about the faucet.

   Example:
   ```yaml
   faucetHomeHtml: |
     <div class='pow-info'>
       <h5>What is a PoW Faucet?</h5>
       This is an $RWA Faucet running on the Xend Testnet.<br>
       To prevent malicious actors from exhausting all available funds or accumulating enough $RWA to mount long running spam attacks, this faucet requires some mining work to be done in exchange for free testnet funds.
     </div>
   ```

2. **faucetSecret**: A random secret string used by the faucet to sign session data. This is critical for maintaining session integrity and should be kept confidential.

3. **ethRpcHost**: The Ethereum RPC host that the faucet will connect to. This is necessary for interacting with the Ethereum blockchain.

4. **ethWalletKey**: The private key for the faucet wallet. This key should be kept secure and not shared publicly.

5. **faucetCoinType**: Defines the type of coin that can be mined. Options include:
   - `native`: Native coin (ETH)
   - `erc20`: ERC20 token
   - `both`: Both ERC20 and native coin

6. **ethTxGasLimit**: Sets the transaction gas limit for the faucet. This is important for ensuring that transactions do not exceed the specified limit.

7. **lowFundsWarning**: A message that will be displayed when the faucet balance is low. This helps inform users about the status of the faucet.

### Example Configuration
Here’s an example of a complete `faucet-config.yaml` file:

## Contributing
We welcome contributions to the project! To contribute, please follow these steps:

1. **Fork the Repository:**
   Click on the "Fork" button at the top right of the repository page to create your own copy of the repository.

2. **Clone Your Fork:**
   Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/xendfinance/assetchain-faucet.git
   ```

3. **Create a New Branch:**
   Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes:**
   Make the necessary changes to the codebase.

5. **Commit Your Changes:**
   Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add your message here"
   ```

6. **Push to Your Fork:**
   Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**
   Go to the original repository and create a pull request from your forked repository.

8. **Follow the Contribution Guidelines:**
   Please ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
[![License: GPL v3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or suggestions, just say Hi on [Telegram](https://t.me/xendfinancedevs).  
We're always glad to help.