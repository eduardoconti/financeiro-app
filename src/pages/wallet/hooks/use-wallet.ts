import { SuccessResponseData } from "@api/http-request/dto";
import { WalletRequestDTO, WalletResponseDTO } from "@api/wallet/dto";
import { UpdateWalletRequestDTO } from "@api/wallet/dto/update-wallet-request.dto";
import { WalletService } from "@api/wallet/service";
import create from "zustand";

const service = new WalletService();
export interface IUseWallet {
  wallets: WalletResponseDTO[];
  fetchWallets: () => void;
  insertWallet: (
    walletRequest: WalletRequestDTO
  ) => Promise<SuccessResponseData<WalletResponseDTO>>;
  updateWallet: (
    walletRequest: UpdateWalletRequestDTO
  ) => Promise<SuccessResponseData<WalletResponseDTO>>;
  deleteWallet: (id: number) => Promise<SuccessResponseData<any>>;
}
export const useWallet = create<IUseWallet>((set) => ({
  wallets: [],
  fetchWallets: async () => {
    const { data } = await service.getAll();
    set({ wallets: data });
  },
  insertWallet: async (walletRequest: WalletRequestDTO) => {
    const data = await service.insert(walletRequest);
    set((state) => ({
      wallets: [...state.wallets, data.data].sort((a, b) =>
        a.descricao > b.descricao ? 1 : b.descricao > a.descricao ? -1 : 0
      ),
    }));
    return data;
  },
  updateWallet: async (walletRequest: UpdateWalletRequestDTO) => {
    const data = await service.update(walletRequest);
    set((state) => {
      const index = state.wallets.findIndex(
        (wallet) => wallet.id === walletRequest.id
      );
      const newWallets = [...state.wallets];
      newWallets[index] = data.data;
      return { wallets: newWallets };
    });
    return data;
  },
  deleteWallet: async (id: number) => {
    const data = await service.delete(id);
    set((state) => ({
      wallets: state.wallets.filter((wallet) => wallet.id !== id),
    }));
    return data;
  },
}));
