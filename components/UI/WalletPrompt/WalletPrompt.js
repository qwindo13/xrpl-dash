// components/shared/WalletPrompt.js
import React from 'react';

const WalletPrompt = () => (
  <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4">
    <span className="text-lg font-semibold text-white text-center">Connect Wallet</span>
    <span className="text-sm font-semibold text-white text-center opacity-40">Connect your wallet to view this module.</span>
  </div>
);

export default WalletPrompt;
