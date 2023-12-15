import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginState {
    token: string;
    setToken: (newToken: string) => void;
    clearToken: () => void;
}

export const useAuthStore = create<LoginState>()(
    persist(
        (set) => ({
            token: "",
            setToken: (newToken: string) => set({ token: newToken }),
            clearToken: () => set({ token: "" }),
        }),
        {
            name: "auth store",
            partialize: (state) => ({
                token: state.token,
            }),
        }
    )
);

export default { useAuthStore };
