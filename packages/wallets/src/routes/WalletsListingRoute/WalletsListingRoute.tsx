import React, { useEffect, useMemo } from 'react';
import {
    DesktopWalletsList,
    WalletsAddMoreCarousel,
    WalletsCarousel,
    WalletsResetMT5Password,
    WalletTourGuide,
} from '../../components';
import { useModal } from '../../components/ModalProvider';
import { CFD_PLATFORMS } from '../../features/cfd/constants';
import ResetMT5PasswordHandler from '../../features/cfd/ResetMT5PasswordHandler';
import { getActionFromUrl } from '../../helpers/urls';
import useDevice from '../../hooks/useDevice';
import { TPlatforms } from '../../types';
import './WalletsListingRoute.scss';

const WalletsListingRoute: React.FC = () => {
    const { isMobile } = useDevice();
    const { show } = useModal();
    const resetTradingPlatformActionParams = getActionFromUrl();

    const platformMapping: Record<string, Exclude<TPlatforms.All, 'ctrader'>> = useMemo(
        () => ({
            trading_platform_dxtrade_password_reset: CFD_PLATFORMS.DXTRADE,
            trading_platform_mt5_password_reset: CFD_PLATFORMS.MT5,
        }),
        []
    );

    useEffect(() => {
        const platformKey = resetTradingPlatformActionParams ? platformMapping[resetTradingPlatformActionParams] : null;
        if (platformKey) {
            const verificationCode = localStorage.getItem(
                `verification_code.trading_platform_${platformKey}_password_reset`
            );

            if (verificationCode) {
                show(
                    <WalletsResetMT5Password
                        actionParams={resetTradingPlatformActionParams ?? ''}
                        platform={platformKey}
                        verificationCode={verificationCode}
                    />,
                    { defaultRootId: 'wallets_modal_root' }
                );
            }
        }
    }, [platformMapping, resetTradingPlatformActionParams, show]);

    return (
        <div className='wallets-listing-route'>
            {isMobile ? <WalletsCarousel /> : <DesktopWalletsList />}
            <WalletsAddMoreCarousel />
            {!isMobile && <WalletTourGuide />}
            <ResetMT5PasswordHandler />
        </div>
    );
};

export default WalletsListingRoute;
