import React from 'react';
import classNames from 'classnames';
import { Localize } from '@deriv-com/translations';
import { Text } from '@deriv-com/ui';
import { WalletCurrencyCard, WalletListCardBadge, WalletMarketCurrencyIcon } from '../../../../../../components';
import useDevice from '../../../../../../hooks/useDevice';
import { TPlatforms } from '../../../../../../types';
import type { TAccount } from '../../types';
import './TransferFormAccountCard.scss';

type TProps = {
    account?: TAccount;
    type?: 'input' | 'modal';
};

const TransferFormAccountCard: React.FC<TProps> = ({ account, type = 'modal' }) => {
    const { isMobile } = useDevice();
    const isInput = type === 'input';
    const isModal = type === 'modal';

    return (
        <div
            className={classNames('wallets-transfer-form-account-card', {
                'wallets-transfer-form-account-card--is-input': isInput,
                'wallets-transfer-form-account-card--is-modal': isModal,
            })}
        >
            <div className='wallets-transfer-form-account-card__icon-with-badge'>
                <div className='wallets-transfer-form-account-card__icon'>
                    {account?.account_category === 'wallet' ? (
                        <WalletCurrencyCard
                            currency={account?.currencyConfig?.display_code || 'USD'}
                            isDemo={Boolean(account?.demo_account)}
                            size='sm'
                        />
                    ) : (
                        <WalletMarketCurrencyIcon
                            currency={account?.currency ?? ''}
                            isDemo={Boolean(account?.demo_account)}
                            marketType={account?.market_type}
                            platform={account?.account_type as TPlatforms.All}
                            size='xs'
                        />
                    )}
                </div>
                {isInput && isMobile && !!account?.demo_account && <WalletListCardBadge />}
            </div>

            <div className='wallets-transfer-form-account-card__content'>
                <Text as='p' size={isInput ? '2xs' : 'sm'} weight='bold'>
                    {account?.accountName}
                </Text>
                <Text size={isInput ? '2xs' : 'xs'}>
                    <Localize
                        i18n_default_text='Balance: {{balance}}'
                        values={{
                            balance: account?.displayBalance,
                        }}
                    />
                </Text>
            </div>

            {isModal && !!account?.demo_account && (
                <div className='wallets-transfer-form-account-card__modal-badge'>
                    <WalletListCardBadge />
                </div>
            )}
        </div>
    );
};

export default TransferFormAccountCard;
