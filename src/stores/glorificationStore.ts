import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorage } from '../utils/zustandAsyncStorage';

export interface Glorification {
    id: string;
    text: string;
    count: number;
    target?: number;
    createdAt: Date;
}

interface GlorificationStore {
    glorifications: Glorification[];
    selectedGlorificationId: string | null;

    // Actions
    addGlorification: (text: string, target?: number) => void;
    updateGlorificationCount: (id: string, increment?: number) => void;
    setSelectedGlorification: (id: string) => void;
    removeGlorification: (id: string) => void;
    resetGlorificationCount: (id: string) => void;
    resetAllCounts: () => void;

    // Getters
    getSelectedGlorification: () => Glorification | null;
    getCurrentCount: () => number;
}

export const useGlorificationStore = create<GlorificationStore>()(
    persist(
        (set, get) => ({
            glorifications: [],
            selectedGlorificationId: null,

            addGlorification: (text: string, target?: number) => {
                const newGlorification: Glorification = {
                    id: Date.now().toString(),
                    text,
                    count: 0,
                    target,
                    createdAt: new Date(),
                };

                set((state) => ({
                    glorifications: [...state.glorifications, newGlorification],
                    selectedGlorificationId: newGlorification.id,
                }));
            },

            updateGlorificationCount: (id: string, increment: number = 1) => {
                set((state) => ({
                    glorifications: state.glorifications.map((glorification) =>
                        glorification.id === id
                            ? { ...glorification, count: Math.max(0, glorification.count + increment) }
                            : glorification
                    ),
                }));
            },

            setSelectedGlorification: (id: string) => {
                set({ selectedGlorificationId: id });
            },

            removeGlorification: (id: string) => {
                set((state) => ({
                    glorifications: state.glorifications.filter((g) => g.id !== id),
                    selectedGlorificationId: state.selectedGlorificationId === id ? null : state.selectedGlorificationId,
                }));
            },

            resetGlorificationCount: (id: string) => {
                set((state) => ({
                    glorifications: state.glorifications.map((glorification) =>
                        glorification.id === id
                            ? { ...glorification, count: 0 }
                            : glorification
                    ),
                }));
            },

            resetAllCounts: () => {
                set((state) => ({
                    glorifications: state.glorifications.map((glorification) => ({
                        ...glorification,
                        count: 0,
                    })),
                }));
            },

            getSelectedGlorification: () => {
                const state = get();
                return state.glorifications.find(g => g.id === state.selectedGlorificationId) || null;
            },

            getCurrentCount: () => {
                const selected = get().getSelectedGlorification();
                return selected ? selected.count : 0;
            },
        }),
        {
            name: 'glorification-storage',
            storage: createJSONStorage(() => zustandAsyncStorage),
        }
    )
);