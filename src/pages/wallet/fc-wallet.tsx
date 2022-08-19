import { useEffect } from "react";
import CorpoCarteiras from "./fc-wallet-body";
import { useWallet } from "./hooks/use-wallet";

export default function FcWallet() {
  const init = useWallet((state) => state.fetchWallets);
  useEffect(() => {
    const start = async () => {
      await init();
    }
    start();
  }, [init]);

  return (
      <CorpoCarteiras />
  );
}
