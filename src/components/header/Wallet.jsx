import React , { useState, useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { DefaultNetwork } from '../../constant';
import { useEagerConnect } from '../../hooks/useEagerConnect';
import { useInactiveListener } from '../../hooks/useInactiveListener';
import { changeNetwork, shortAddress } from '../../utils';

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [DefaultNetwork],
});

export const Wallet = () => {
    
    const { error,  activate,  connector, active, account } = useWeb3React();

    const [wrongNetwork, setWrongNetwork] = useState(false);
    const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
    const [activatingConnector, setActivatingConnector] = useState();

    useEffect(() => {
        console.log(wrongNetwork);
        if (wrongNetwork) changeNetwork();
    }, [wrongNetwork]);
    useEffect(() => {
        setWrongNetwork(isUnsupportedChainIdError);
    }, [isUnsupportedChainIdError]);
    
    const connectMetamask = async () => {
        try {
            await activate(injectedConnector);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined);
        }
    }, [activatingConnector, connector]);
    
    const triedEager = useEagerConnect();
    useInactiveListener(!triedEager || !!activatingConnector);

    return active ?
        <div className="sc-button header-slider style style-1 wallet fl-button pri-1"> <span>{shortAddress(account)}</span></div>
        : wrongNetwork ?
        <button className="sc-button header-slider style style-1 wallet fl-button pri-1" onClick={changeNetwork}><span>Switch Network</span></button>
        : <button className="sc-button header-slider style style-1 wallet fl-button pri-1" onClick={connectMetamask}><span>Wallet connect</span></button>
}