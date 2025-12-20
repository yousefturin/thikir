export default function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // Support for absolute imports
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        "@/*": ["src/*"],
                        "@/components/*": ["components/*"],
                        "@/utils/*": ["utils/*"],
                        "@/layout/*": ["layout/*"],
                        "@/services/*": ["services/*"],
                        "@/navigation/*": ["navigation/*"],
                        "@/context/*": ["context/*"],
                        "@/hooks/*": ["hooks/*"],
                        "@/store/*": ["store/*"],
                        "@/reducer/*": ["reducer/*"],
                        "@/constant/*": ["constant/*"],
                        "@/locales/*": ["locales/*"],
                        "@/lib/*": ["lib/*"],
                        "@/styles/*": ["styles/index.ts"],
                        "@/assets/*": ["../assets/*"],
                        "@/types": ["types/index.ts"],
                        "@/types/*": ["types/*"],
                        "@/screens/*": ["screens/*"],
                        "@/config/*": ["config/*"]
                    },
                },
            ],
        ],
    };
}