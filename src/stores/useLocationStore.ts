import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandSecureStorage } from "@/utils/zustandAsyncStorage";

export type LocationState = {
    latitude: number;
    longitude: number;
    isPermissionGranted: boolean;
    canAskForPermission: boolean;
    isLocationEnabled: boolean;

    setLocation: (latitude: number, longitude: number) => void;
    setCanAskForPermission: (canAsk: boolean) => void;
    setIsPermissionGranted: (isGranted: boolean) => void;
    setIsLocationEnabled: (isEnabled: boolean) => void;
    requestLocation: () => Promise<{ latitude: number; longitude: number; canAskForPermission: boolean; isPermissionGranted: boolean }>;
    reset: () => void;
}

export const useLocationStore = create<LocationState>()(
    persist(
        (set) => ({
            latitude: 0,
            longitude: 0,
            isPermissionGranted: false,
            canAskForPermission: true,
            isLocationEnabled: false,

            reset: () => {
                set({
                    latitude: 0,
                    longitude: 0,
                    isPermissionGranted: false,
                    canAskForPermission: true,
                    isLocationEnabled: false,
                });
            },
            setLocation: (latitude, longitude) => set({ latitude, longitude }),
            setIsLocationEnabled: (isEnabled) => set({ isLocationEnabled: isEnabled }),
            setCanAskForPermission: (canAsk) => set({ canAskForPermission: canAsk }),
            setIsPermissionGranted: (isGranted) => set({ isPermissionGranted: isGranted }),
            requestLocation: async () => {
                const { status, canAskAgain } = await requestForegroundPermissionsAsync();
                // Case 1: Permission denied or undetermined and cannot ask again
                if ((status === "denied" || status === "undetermined") && !canAskAgain) {
                    set({
                        isPermissionGranted: false,
                        canAskForPermission: false,
                        isLocationEnabled: false,
                        latitude: 0,
                        longitude: 0,
                    });
                    return {
                        latitude: 0,
                        longitude: 0,
                        canAskForPermission: false,
                        isPermissionGranted: false,
                    };
                }

                // Case 2: Permission granted
                if (status === "granted") {
                    const location = await getCurrentPositionAsync({});
                    set({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        canAskForPermission: canAskAgain,
                        isPermissionGranted: true,
                        isLocationEnabled: true,
                    });
                    return {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        isPermissionGranted: true,
                        canAskForPermission: canAskAgain,
                    };
                }

                // Case 3: Can ask again, try to request again
                if (canAskAgain) {
                    const retry = await requestForegroundPermissionsAsync();
                    // If after retry, cannot ask again, always return canAskForPermission: false
                    if (retry.status === "granted") {
                        const location = await getCurrentPositionAsync({});
                        set({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            canAskForPermission: retry.canAskAgain,
                            isPermissionGranted: true,
                            isLocationEnabled: true,
                        });
                        return {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            isPermissionGranted: true,
                            canAskForPermission: retry.canAskAgain,
                        };
                    } else {
                        // If cannot ask again after retry, set and return false
                        set({
                            isPermissionGranted: false,
                            canAskForPermission: retry.canAskAgain,
                            isLocationEnabled: false,
                            latitude: 0,
                            longitude: 0,
                        });
                        return {
                            latitude: 0,
                            longitude: 0,
                            isPermissionGranted: false,
                            canAskForPermission: retry.canAskAgain,
                        };
                    }
                }

                // Fallback: cannot ask again
                set({
                    isPermissionGranted: false,
                    canAskForPermission: false,
                    isLocationEnabled: false,
                    latitude: 0,
                    longitude: 0,
                });
                return {
                    latitude: 0,
                    longitude: 0,
                    isPermissionGranted: false,
                    canAskForPermission: false,
                };
            }
        }), {
        name: "location-storagev2",
        storage: createJSONStorage(() => zustandSecureStorage),
        partialize: (state) => ({
            latitude: state.latitude,
            longitude: state.longitude,
            isPermissionGranted: state.isPermissionGranted,
            canAskForPermission: state.canAskForPermission,
            isLocationEnabled: state.isLocationEnabled,
        }),
    }
    )
)