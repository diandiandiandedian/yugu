import { UniPassTheme } from "@unipasswallet/popup-types";
import { initializeConnector } from "@web3-react/core";
import { UniPass } from "@unipasswallet/web3-react";

export const [uniPassWallet, hooks] = initializeConnector(
    (actions) =>
        new UniPass({
            actions,
            options: {
                chainId: 80001,
                returnEmail: true,
                appSettings: {
                    appName: "web3-react test for unipass",
                    theme: UniPassTheme.DARK,
                },
            },
        })
);
