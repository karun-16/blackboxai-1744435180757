document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const connectWalletBtn = document.getElementById('connectWallet');
    const walletAddressText = document.getElementById('walletAddress');
    const mintBadgeBtns = document.querySelectorAll('.mint-badge');
    const mintingModal = document.getElementById('mintingModal');
    const closeMintingModalBtn = document.getElementById('closeMintingModal');
    const mintingStatus = document.getElementById('mintingStatus');

    let wallet = null;
    let account = null;

    // Initialize Aptos wallet connection
    async function initializeWallet() {
        try {
            if ("aptos" in window) {
                wallet = window.aptos;
                try {
                    account = await wallet.connect();
                    const accountAddress = account.address;
                    updateWalletStatus(true, accountAddress);
                } catch (error) {
                    console.error("Failed to connect wallet:", error);
                    updateWalletStatus(false);
                }
            } else {
                console.error("Aptos wallet not found");
                alert("Please install the Petra Wallet extension to mint NFT badges.");
            }
        } catch (error) {
            console.error("Error initializing wallet:", error);
            updateWalletStatus(false);
        }
    }

    // Update wallet connection status
    function updateWalletStatus(connected, address = null) {
        if (connected && address) {
            connectWalletBtn.classList.add('hidden');
            walletAddressText.classList.remove('hidden');
            walletAddressText.textContent = `Connected: ${formatAddress(address)}`;
            enableMintButtons();
        } else {
            connectWalletBtn.classList.remove('hidden');
            walletAddressText.classList.add('hidden');
            walletAddressText.textContent = '';
            disableMintButtons();
        }
    }

    // Format wallet address for display
    function formatAddress(address) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    // Enable mint buttons
    function enableMintButtons() {
        mintBadgeBtns.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
        });
    }

    // Disable mint buttons
    function disableMintButtons() {
        mintBadgeBtns.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
        });
    }

    // Show minting modal
    function showMintingModal() {
        mintingModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Hide minting modal
    function hideMintingModal() {
        mintingModal.classList.add('hidden');
        document.body.style.overflow = '';
        mintingStatus.innerHTML = `
            <p class="text-gray-400">Preparing to mint your skill badge...</p>
            <div class="mt-4 flex items-center justify-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        `;
    }

    // Update minting status
    function updateMintingStatus(status, success = true) {
        mintingStatus.innerHTML = `
            <div class="text-center">
                <div class="mb-4">
                    <i class="fas ${success ? 'fa-check-circle text-green-500' : 'fa-times-circle text-red-500'} text-4xl"></i>
                </div>
                <p class="${success ? 'text-green-500' : 'text-red-500'}">${status}</p>
            </div>
        `;
    }

    // Mint NFT badge
    async function mintNFTBadge(skill) {
        showMintingModal();

        try {
            if (!wallet || !account) {
                throw new Error("Wallet not connected");
            }

            // Example transaction payload for minting NFT
            const payload = {
                type: "entry_function_payload",
                function: "0x1::nft::mint",
                type_arguments: [],
                arguments: [
                    skill,
                    "Web3 Skill Badge",
                    `Professional ${skill} expertise verified on the blockchain`,
                    "https://example.com/metadata.json"
                ]
            };

            // Simulate actual minting process with a delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, we'll simulate a successful mint
            // In a real implementation, you would:
            // 1. Submit the transaction to Aptos blockchain
            // 2. Wait for transaction confirmation
            // 3. Update UI based on transaction status

            updateMintingStatus(`Successfully minted ${skill} badge!`, true);

            // Store minted badge in local storage
            const mintedBadges = JSON.parse(localStorage.getItem('mintedBadges') || '[]');
            mintedBadges.push({
                skill,
                timestamp: new Date().toISOString(),
                transactionHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
            });
            localStorage.setItem('mintedBadges', JSON.stringify(mintedBadges));

        } catch (error) {
            console.error("Error minting NFT:", error);
            updateMintingStatus(`Failed to mint badge: ${error.message}`, false);
        }
    }

    // Event Listeners
    connectWalletBtn.addEventListener('click', initializeWallet);

    closeMintingModalBtn.addEventListener('click', hideMintingModal);

    mintBadgeBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const skill = btn.getAttribute('data-skill');
            await mintNFTBadge(skill);
        });
    });

    // Close modal when clicking outside
    mintingModal.addEventListener('click', (e) => {
        if (e.target === mintingModal) {
            hideMintingModal();
        }
    });

    // Initialize wallet connection status
    disableMintButtons();

    // Check if wallet was previously connected
    if ("aptos" in window) {
        initializeWallet();
    }

    // Handle wallet account changes
    if (window.aptos) {
        window.aptos.onAccountChange(async (newAccount) => {
            if (newAccount) {
                account = newAccount;
                updateWalletStatus(true, newAccount.address);
            } else {
                account = null;
                updateWalletStatus(false);
            }
        });
    }
});
