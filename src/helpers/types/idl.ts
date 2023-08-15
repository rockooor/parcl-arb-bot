export type ParclV2Core = {
  version: "0.0.3";
  name: "parcl_v2_core";
  constants: [
    {
      name: "POOL_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"pool"';
    },
    {
      name: "LIQUIDITY_TOKEN_MINT_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"liquidity_token_mint"';
    },
    {
      name: "LIQUIDITY_TOKEN_VAULT_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"liquidity_token_vault"';
    },
    {
      name: "COLLATERAL_VAULT_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"collateral_vault"';
    },
    {
      name: "UNSETTLED_COLLATERAL_VAULT_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"unsettled_collateral_vault"';
    },
    {
      name: "PROTOCOL_FEE_VAULT_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"protocol_fee_vault"';
    },
    {
      name: "POSITION_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"position"';
    },
    {
      name: "UNSETTLED_COLLATERAL_ACCOUNT_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"unsettled_collateral_account"';
    },
    {
      name: "SETTLEMENT_EVENT_PREFIX";
      type: {
        defined: "&[u8]";
      };
      value: 'b"settlement_event"';
    },
    {
      name: "MIN_LEVERAGE";
      type: "u8";
      value: "1";
    },
    {
      name: "MAX_LEVERAGE";
      type: "u8";
      value: "10";
    },
    {
      name: "MIN_TRADE_FEE_RATE";
      type: "u16";
      value: "1";
    },
    {
      name: "MAX_TRADE_FEE_RATE";
      type: "u16";
      value: "10_00";
    },
    {
      name: "PROTOCOL_FEE_RATE";
      type: "u16";
      value: "40_00";
    },
    {
      name: "MIN_LIQUIDATION_FEE_RATE";
      type: "u16";
      value: "1";
    },
    {
      name: "MAX_LIQUIDATION_FEE_RATE";
      type: "u16";
      value: "1_00";
    },
    {
      name: "MIN_LIQUIDATION_THRESHOLD";
      type: "u16";
      value: "1_00";
    },
    {
      name: "MAX_LIQUIDATION_THRESHOLD";
      type: "u16";
      value: "50_00";
    },
    {
      name: "SECONDS_PER_DAY";
      type: "i128";
      value: "86_400";
    },
    {
      name: "SECONDS_PER_YEAR";
      type: "i128";
      value: "31_536_000";
    },
    {
      name: "MAX_ANNUAL_FUNDING_RATE";
      type: "i128";
      value: "25_00";
    },
    {
      name: "FUNDING_RATE_PRECISION";
      type: "i32";
      value: "- 9";
    },
    {
      name: "LOWEST_MAX_NEGATIVE_SKEW_IMPACT";
      type: "u64";
      value: "1_000_000";
    },
    {
      name: "CONFIDENCE_LIMIT";
      type: "u16";
      value: "500";
    },
    {
      name: "STALE_PRICE_LIMIT";
      type: "u64";
      value: "240";
    }
  ];
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "state";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collateralMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "unsettledCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "setAdmin";
      accounts: [
        {
          name: "state";
          isMut: true;
          isSigner: false;
        },
        {
          name: "newAdmin";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "pause";
      accounts: [
        {
          name: "state";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "unpause";
      accounts: [
        {
          name: "state";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [];
    },
    {
      name: "setIsPermissionless";
      accounts: [
        {
          name: "state";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "isPermissionless";
          type: "bool";
        }
      ];
    },
    {
      name: "collectProtocolFees";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "protocolFeeVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "setSettlementDelay";
      accounts: [
        {
          name: "state";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "admin";
          isMut: false;
          isSigner: true;
        }
      ];
      args: [
        {
          name: "settlementDelay";
          type: "u32";
        }
      ];
    },
    {
      name: "createPool";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "priceFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "collateralMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "liquidityTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidityTokenVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "protocolFeeVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "creator";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "CreatePoolParams";
          };
        }
      ];
    },
    {
      name: "createLiquidityTokenMetadata";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "liquidityTokenMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "creator";
          isMut: false;
          isSigner: true;
        },
        {
          name: "metadataProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "TokenMetadata";
          };
        }
      ];
    },
    {
      name: "updateLiquidityTokenMetadata";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadata";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "creator";
          isMut: false;
          isSigner: true;
        },
        {
          name: "metadataProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "TokenMetadata";
          };
        }
      ];
    },
    {
      name: "addLiquidity";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "liquidityTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "unsettledCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "unsettledCollateralAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "liquidityProvider";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "unsettledAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "removeLiquidity";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "liquidityTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "unsettledCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "settlementEvent";
          isMut: true;
          isSigner: false;
        },
        {
          name: "unsettledCollateralAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "source";
          isMut: true;
          isSigner: false;
        },
        {
          name: "destination";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "liquidityProvider";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "id";
          type: "u64";
        }
      ];
    },
    {
      name: "allocatePosition";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "position";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "owner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "id";
          type: "u64";
        }
      ];
    },
    {
      name: "deallocatePosition";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: false;
          isSigner: false;
        },
        {
          name: "position";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "owner";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "openPosition";
      accounts: [
        {
          name: "modifyPositionAccounts";
          accounts: [
            {
              name: "state";
              isMut: false;
              isSigner: false;
            },
            {
              name: "pool";
              isMut: true;
              isSigner: false;
            },
            {
              name: "position";
              isMut: true;
              isSigner: false;
            },
            {
              name: "liquidityTokenMint";
              isMut: true;
              isSigner: false;
            },
            {
              name: "liquidityTokenVault";
              isMut: true;
              isSigner: false;
            },
            {
              name: "collateralVault";
              isMut: true;
              isSigner: false;
            },
            {
              name: "protocolFeeVault";
              isMut: true;
              isSigner: false;
            },
            {
              name: "ownerTokenAccount";
              isMut: true;
              isSigner: false;
            },
            {
              name: "priceFeed";
              isMut: false;
              isSigner: false;
            },
            {
              name: "payer";
              isMut: true;
              isSigner: true;
            },
            {
              name: "signer";
              isMut: false;
              isSigner: true;
            },
            {
              name: "tokenProgram";
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: "unsettledCollateralAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "unsettledCollateralVault";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "OpenPositionIxParams";
          };
        }
      ];
    },
    {
      name: "closePosition";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "position";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidityTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidityTokenVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "protocolFeeVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "ownerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "priceFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "signer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "partialClosePosition";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "pool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "position";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidityTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "liquidityTokenVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "protocolFeeVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "ownerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "priceFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "signer";
          isMut: false;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "liquidate";
      accounts: [
        {
          name: "modifyPositionAccounts";
          accounts: [
            {
              name: "state";
              isMut: false;
              isSigner: false;
            },
            {
              name: "pool";
              isMut: true;
              isSigner: false;
            },
            {
              name: "position";
              isMut: true;
              isSigner: false;
            },
            {
              name: "liquidityTokenMint";
              isMut: true;
              isSigner: false;
            },
            {
              name: "liquidityTokenVault";
              isMut: true;
              isSigner: false;
            },
            {
              name: "collateralVault";
              isMut: true;
              isSigner: false;
            },
            {
              name: "protocolFeeVault";
              isMut: true;
              isSigner: false;
            },
            {
              name: "ownerTokenAccount";
              isMut: true;
              isSigner: false;
            },
            {
              name: "priceFeed";
              isMut: false;
              isSigner: false;
            },
            {
              name: "payer";
              isMut: true;
              isSigner: true;
            },
            {
              name: "signer";
              isMut: false;
              isSigner: true;
            },
            {
              name: "tokenProgram";
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: "liquidatorDestination";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createUnsettledCollateralAccount";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "unsettledCollateralAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "owner";
          isMut: false;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "processSettlementEvents";
      accounts: [
        {
          name: "state";
          isMut: false;
          isSigner: false;
        },
        {
          name: "unsettledCollateralVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "pool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "version";
            type: "u8";
          },
          {
            name: "bumpSeed";
            type: {
              array: ["u8", 1];
            };
          },
          {
            name: "tradeFeeRateSeed";
            type: {
              array: ["u8", 2];
            };
          },
          {
            name: "liquidationFeeRateSeed";
            type: {
              array: ["u8", 2];
            };
          },
          {
            name: "liquidationThresholdSeed";
            type: {
              array: ["u8", 2];
            };
          },
          {
            name: "minLeverageSeed";
            type: {
              array: ["u8", 1];
            };
          },
          {
            name: "maxLeverageSeed";
            type: {
              array: ["u8", 1];
            };
          },
          {
            name: "maxNegativeSkewImpactSeed";
            type: {
              array: ["u8", 8];
            };
          },
          {
            name: "oracleType";
            type: "u8";
          },
          {
            name: "minLeverage";
            type: "u8";
          },
          {
            name: "maxLeverage";
            type: "u8";
          },
          {
            name: "tradeFeeRate";
            type: "u16";
          },
          {
            name: "liquidationFeeRate";
            type: "u16";
          },
          {
            name: "liquidationThreshold";
            type: "u16";
          },
          {
            name: "state";
            type: "publicKey";
          },
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "priceFeed";
            type: "publicKey";
          },
          {
            name: "liquidityTokenMint";
            type: "publicKey";
          },
          {
            name: "liquidityTokenVault";
            type: "publicKey";
          },
          {
            name: "collateralMint";
            type: "publicKey";
          },
          {
            name: "collateralVault";
            type: "publicKey";
          },
          {
            name: "protocolFeeVault";
            type: "publicKey";
          },
          {
            name: "skewManager";
            type: {
              defined: "SkewManager";
            };
          },
          {
            name: "reserved0";
            type: "u128";
          },
          {
            name: "reserved1";
            type: "u128";
          },
          {
            name: "reserved2";
            type: "publicKey";
          },
          {
            name: "reserved3";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "position";
      type: {
        kind: "struct";
        fields: [
          {
            name: "version";
            type: "u8";
          },
          {
            name: "leverage";
            type: "u8";
          },
          {
            name: "direction";
            type: "bool";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "id";
            type: "u64";
          },
          {
            name: "collateralAmount";
            type: "u64";
          },
          {
            name: "liquidityTokenAmount";
            type: "u64";
          },
          {
            name: "entryPrice";
            type: {
              defined: "Price";
            };
          },
          {
            name: "entryFundingRate";
            type: "i128";
          },
          {
            name: "pool";
            type: "publicKey";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "reserved0";
            type: "u64";
          },
          {
            name: "reserved1";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "settlementEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "version";
            type: "u8";
          },
          {
            name: "id";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "destination";
            type: "publicKey";
          },
          {
            name: "reserved0";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "unsettledCollateralAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "version";
            type: "u8";
          },
          {
            name: "pendingAmount";
            type: "u64";
          },
          {
            name: "usedAmount";
            type: "u64";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "reserved0";
            type: "u64";
          },
          {
            name: "reserved1";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "state";
      type: {
        kind: "struct";
        fields: [
          {
            name: "paused";
            type: "bool";
          },
          {
            name: "isPermissionless";
            type: "bool";
          },
          {
            name: "bumpSeed";
            type: {
              array: ["u8", 1];
            };
          },
          {
            name: "settlementDelay";
            type: "u32";
          },
          {
            name: "unsettledCollateralVault";
            type: "publicKey";
          },
          {
            name: "collateralMint";
            type: "publicKey";
          },
          {
            name: "admin";
            type: "publicKey";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "TokenMetadata";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isMutable";
            type: {
              option: "bool";
            };
          },
          {
            name: "name";
            type: {
              option: "string";
            };
          },
          {
            name: "symbol";
            type: {
              option: "string";
            };
          },
          {
            name: "uri";
            type: {
              option: "string";
            };
          }
        ];
      };
    },
    {
      name: "CreatePoolParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "oracleType";
            type: "u8";
          },
          {
            name: "minLeverage";
            type: {
              option: "u8";
            };
          },
          {
            name: "maxLeverage";
            type: {
              option: "u8";
            };
          },
          {
            name: "tradeFeeRate";
            type: "u16";
          },
          {
            name: "liquidationFeeRate";
            type: "u16";
          },
          {
            name: "liquidationThreshold";
            type: "u16";
          },
          {
            name: "maxNegativeSkewImpact";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "OpenPositionIxParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "direction";
            type: "bool";
          },
          {
            name: "leverage";
            type: "u8";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "unsettledAmount";
            type: "u64";
          },
          {
            name: "maxSkewImpactFee";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "SkewManager";
      type: {
        kind: "struct";
        fields: [
          {
            name: "maxNegativeSkewImpact";
            type: "u64";
          },
          {
            name: "lastTimestamp";
            type: "i64";
          },
          {
            name: "cumulativeFundingRate";
            type: "i128";
          },
          {
            name: "openInterestLong";
            type: "u128";
          },
          {
            name: "openInterestShort";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "Price";
      type: {
        kind: "struct";
        fields: [
          {
            name: "expo";
            type: "i32";
          },
          {
            name: "price";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "OracleType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Pyth";
          }
        ];
      };
    },
    {
      name: "ModifyLiquidityDirection";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Add";
          },
          {
            name: "Remove";
          }
        ];
      };
    },
    {
      name: "PositionDirection";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Long";
          },
          {
            name: "Short";
          }
        ];
      };
    },
    {
      name: "PnL";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Positive";
            fields: [
              {
                defined: "T";
              }
            ];
          },
          {
            name: "Negative";
            fields: [
              {
                defined: "T";
              }
            ];
          },
          {
            name: "Neutral";
          }
        ];
      };
    },
    {
      name: "TokenInstruction";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Transfer";
          },
          {
            name: "Mint";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "IntegerOverflow";
      msg: "Integer overflow";
    },
    {
      code: 6001;
      name: "InvalidTypeConversion";
      msg: "Invalid type conversion";
    },
    {
      code: 6002;
      name: "Paused";
      msg: "Smart contract is paused. Only admin can unpause.";
    },
    {
      code: 6003;
      name: "DivideByZero";
      msg: "Divide by zero";
    },
    {
      code: 6004;
      name: "GetBumpFailed";
      msg: "Get bump failed";
    },
    {
      code: 6005;
      name: "AccountBorrowFailed";
      msg: "Failed to borrow a reference to account data, already borrowed";
    },
    {
      code: 6006;
      name: "InvalidInputAmount";
      msg: "Input amount must be greater than zero";
    },
    {
      code: 6007;
      name: "InvalidTimestamp";
      msg: "Invalid timestamp";
    },
    {
      code: 6008;
      name: "TokenAccountOwnerMismatch";
      msg: "Mismatch between token account's owner and signer";
    },
    {
      code: 6009;
      name: "TokenAccountMintMismatch";
      msg: "Mismatch between token account's mint and target mint";
    },
    {
      code: 6010;
      name: "MaxNegativeSkewImpactBelowMinimum";
      msg: "Max negative skew impact is below the minimum.";
    },
    {
      code: 6011;
      name: "CreatePoolIsNotPermissionless";
      msg: "Create pool is not permissionless";
    },
    {
      code: 6012;
      name: "InvalidCollateralMint";
      msg: "Invalid collateral mint";
    },
    {
      code: 6013;
      name: "InvalidTradeFeeRate";
      msg: "Invalid trade fee rate";
    },
    {
      code: 6014;
      name: "InvalidLiquidationFeeRate";
      msg: "Invalid liquidation fee rate";
    },
    {
      code: 6015;
      name: "InvalidLiquidationThreshold";
      msg: "Invalid liquidation threshold";
    },
    {
      code: 6016;
      name: "MinLeverageNotLessThanMax";
      msg: "Min leverage must be less than max leverage";
    },
    {
      code: 6017;
      name: "InvalidLeverage";
      msg: "Invalid leverage for pool creation";
    },
    {
      code: 6018;
      name: "InvalidTokenMetadata";
      msg: "Invalid token metadata";
    },
    {
      code: 6019;
      name: "PositionOwnerMismatch";
      msg: "Signer does not match position owner";
    },
    {
      code: 6020;
      name: "CannotDeallocatePosition";
      msg: "Cannot deallocate position";
    },
    {
      code: 6021;
      name: "PositionAlreadyOpen";
      msg: "Position is already open";
    },
    {
      code: 6022;
      name: "InvalidPositionLeverage";
      msg: "Invalid position leverage";
    },
    {
      code: 6023;
      name: "InvalidPartialClosePositionAmount";
      msg: "Partial close position amount must be less than or equal to position's collateral amount";
    },
    {
      code: 6024;
      name: "InvalidLiquidationFee";
      msg: "Liquidation fee cannot be a None variant";
    },
    {
      code: 6025;
      name: "CannotCloseUnhealthyPosition";
      msg: "Cannot close unhealthy position";
    },
    {
      code: 6026;
      name: "CannotLiquidateHealthyPosition";
      msg: "Cannot liquidate a healthy position";
    },
    {
      code: 6027;
      name: "InvalidTokenAccountingForLiquidation";
      msg: "Invalid liquidation token accounting";
    },
    {
      code: 6028;
      name: "ZeroCollateralAfterFees";
      msg: "Cannot open a position with zero collateral amount after fees";
    },
    {
      code: 6029;
      name: "SkewImpactFeeExceedsMaxAmount";
      msg: "Skew impact fee exceeds max amount set by client";
    },
    {
      code: 6030;
      name: "LiquidationOwnerTokenAccountMustBeAta";
      msg: "Liquidation owner token account must be an associated token account";
    },
    {
      code: 6031;
      name: "SettlementEventHasNotReachedMaturity";
      msg: "Settlement event has not reached maturity";
    },
    {
      code: 6032;
      name: "InvalidUnsettledAmount";
      msg: "Invalid unsettled amount. Unsettled amount is greater than available balance.";
    },
    {
      code: 6033;
      name: "FailedToFindAccountInRemainingAccounts";
      msg: "Failed to find account in remaining accounts";
    },
    {
      code: 6034;
      name: "FailedToDeserializeAccountFromRemainingAccounts";
      msg: "Failed to deserialize account from remaining accounts";
    },
    {
      code: 6035;
      name: "UnsupportedOracleType";
      msg: "Unsupported oracle type";
    },
    {
      code: 6036;
      name: "PythPriceFeedAggPriceCannotBeNegative";
      msg: "Pyth price feed aggregate price cannot be negative";
    },
    {
      code: 6037;
      name: "InvalidPythPriceFeedConfidence";
      msg: "Invalid Pyth price feed confidence";
    },
    {
      code: 6038;
      name: "InvalidPythPriceType";
      msg: "Invalid Pyth price type";
    },
    {
      code: 6039;
      name: "InvalidPythPriceAccountData";
      msg: "Failed to convert account into a Pyth Price account";
    },
    {
      code: 6040;
      name: "PythEmaPriceMustBeGreaterThanZero";
      msg: "Pyth Ema price must be greater than zero";
    },
    {
      code: 6041;
      name: "PythPriceMustBeGreaterThanZero";
      msg: "Pyth price must be greater than zero";
    },
    {
      code: 6042;
      name: "InvalidPythPriceStatus";
      msg: "Invalid Pyth price status";
    },
    {
      code: 6043;
      name: "PythPriceFeedIsStale";
      msg: "Price feed is stale";
    }
  ];
};

export const IDL: ParclV2Core = {
  version: "0.0.3",
  name: "parcl_v2_core",
  constants: [
    {
      name: "POOL_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"pool"',
    },
    {
      name: "LIQUIDITY_TOKEN_MINT_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"liquidity_token_mint"',
    },
    {
      name: "LIQUIDITY_TOKEN_VAULT_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"liquidity_token_vault"',
    },
    {
      name: "COLLATERAL_VAULT_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"collateral_vault"',
    },
    {
      name: "UNSETTLED_COLLATERAL_VAULT_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"unsettled_collateral_vault"',
    },
    {
      name: "PROTOCOL_FEE_VAULT_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"protocol_fee_vault"',
    },
    {
      name: "POSITION_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"position"',
    },
    {
      name: "UNSETTLED_COLLATERAL_ACCOUNT_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"unsettled_collateral_account"',
    },
    {
      name: "SETTLEMENT_EVENT_PREFIX",
      type: {
        defined: "&[u8]",
      },
      value: 'b"settlement_event"',
    },
    {
      name: "MIN_LEVERAGE",
      type: "u8",
      value: "1",
    },
    {
      name: "MAX_LEVERAGE",
      type: "u8",
      value: "10",
    },
    {
      name: "MIN_TRADE_FEE_RATE",
      type: "u16",
      value: "1",
    },
    {
      name: "MAX_TRADE_FEE_RATE",
      type: "u16",
      value: "10_00",
    },
    {
      name: "PROTOCOL_FEE_RATE",
      type: "u16",
      value: "40_00",
    },
    {
      name: "MIN_LIQUIDATION_FEE_RATE",
      type: "u16",
      value: "1",
    },
    {
      name: "MAX_LIQUIDATION_FEE_RATE",
      type: "u16",
      value: "1_00",
    },
    {
      name: "MIN_LIQUIDATION_THRESHOLD",
      type: "u16",
      value: "1_00",
    },
    {
      name: "MAX_LIQUIDATION_THRESHOLD",
      type: "u16",
      value: "50_00",
    },
    {
      name: "SECONDS_PER_DAY",
      type: "i128",
      value: "86_400",
    },
    {
      name: "SECONDS_PER_YEAR",
      type: "i128",
      value: "31_536_000",
    },
    {
      name: "MAX_ANNUAL_FUNDING_RATE",
      type: "i128",
      value: "25_00",
    },
    {
      name: "FUNDING_RATE_PRECISION",
      type: "i32",
      value: "- 9",
    },
    {
      name: "LOWEST_MAX_NEGATIVE_SKEW_IMPACT",
      type: "u64",
      value: "1_000_000",
    },
    {
      name: "CONFIDENCE_LIMIT",
      type: "u16",
      value: "500",
    },
    {
      name: "STALE_PRICE_LIMIT",
      type: "u64",
      value: "240",
    },
  ],
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "unsettledCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setAdmin",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "newAdmin",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "pause",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "unpause",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "setIsPermissionless",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "isPermissionless",
          type: "bool",
        },
      ],
    },
    {
      name: "collectProtocolFees",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "protocolFeeVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "setSettlementDelay",
      accounts: [
        {
          name: "state",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "settlementDelay",
          type: "u32",
        },
      ],
    },
    {
      name: "createPool",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "priceFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "collateralMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "liquidityTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidityTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "protocolFeeVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "creator",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreatePoolParams",
          },
        },
      ],
    },
    {
      name: "createLiquidityTokenMetadata",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "liquidityTokenMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "creator",
          isMut: false,
          isSigner: true,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "TokenMetadata",
          },
        },
      ],
    },
    {
      name: "updateLiquidityTokenMetadata",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "creator",
          isMut: false,
          isSigner: true,
        },
        {
          name: "metadataProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "TokenMetadata",
          },
        },
      ],
    },
    {
      name: "addLiquidity",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "liquidityTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "unsettledCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "unsettledCollateralAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "liquidityProvider",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "unsettledAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "removeLiquidity",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "liquidityTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "unsettledCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "settlementEvent",
          isMut: true,
          isSigner: false,
        },
        {
          name: "unsettledCollateralAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "source",
          isMut: true,
          isSigner: false,
        },
        {
          name: "destination",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "liquidityProvider",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "id",
          type: "u64",
        },
      ],
    },
    {
      name: "allocatePosition",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "id",
          type: "u64",
        },
      ],
    },
    {
      name: "deallocatePosition",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "owner",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "openPosition",
      accounts: [
        {
          name: "modifyPositionAccounts",
          accounts: [
            {
              name: "state",
              isMut: false,
              isSigner: false,
            },
            {
              name: "pool",
              isMut: true,
              isSigner: false,
            },
            {
              name: "position",
              isMut: true,
              isSigner: false,
            },
            {
              name: "liquidityTokenMint",
              isMut: true,
              isSigner: false,
            },
            {
              name: "liquidityTokenVault",
              isMut: true,
              isSigner: false,
            },
            {
              name: "collateralVault",
              isMut: true,
              isSigner: false,
            },
            {
              name: "protocolFeeVault",
              isMut: true,
              isSigner: false,
            },
            {
              name: "ownerTokenAccount",
              isMut: true,
              isSigner: false,
            },
            {
              name: "priceFeed",
              isMut: false,
              isSigner: false,
            },
            {
              name: "payer",
              isMut: true,
              isSigner: true,
            },
            {
              name: "signer",
              isMut: false,
              isSigner: true,
            },
            {
              name: "tokenProgram",
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: "unsettledCollateralAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "unsettledCollateralVault",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "OpenPositionIxParams",
          },
        },
      ],
    },
    {
      name: "closePosition",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidityTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidityTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "protocolFeeVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ownerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "priceFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "signer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "partialClosePosition",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidityTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "liquidityTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "protocolFeeVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ownerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "priceFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "signer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "liquidate",
      accounts: [
        {
          name: "modifyPositionAccounts",
          accounts: [
            {
              name: "state",
              isMut: false,
              isSigner: false,
            },
            {
              name: "pool",
              isMut: true,
              isSigner: false,
            },
            {
              name: "position",
              isMut: true,
              isSigner: false,
            },
            {
              name: "liquidityTokenMint",
              isMut: true,
              isSigner: false,
            },
            {
              name: "liquidityTokenVault",
              isMut: true,
              isSigner: false,
            },
            {
              name: "collateralVault",
              isMut: true,
              isSigner: false,
            },
            {
              name: "protocolFeeVault",
              isMut: true,
              isSigner: false,
            },
            {
              name: "ownerTokenAccount",
              isMut: true,
              isSigner: false,
            },
            {
              name: "priceFeed",
              isMut: false,
              isSigner: false,
            },
            {
              name: "payer",
              isMut: true,
              isSigner: true,
            },
            {
              name: "signer",
              isMut: false,
              isSigner: true,
            },
            {
              name: "tokenProgram",
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: "liquidatorDestination",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createUnsettledCollateralAccount",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "unsettledCollateralAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "processSettlementEvents",
      accounts: [
        {
          name: "state",
          isMut: false,
          isSigner: false,
        },
        {
          name: "unsettledCollateralVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "pool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "bumpSeed",
            type: {
              array: ["u8", 1],
            },
          },
          {
            name: "tradeFeeRateSeed",
            type: {
              array: ["u8", 2],
            },
          },
          {
            name: "liquidationFeeRateSeed",
            type: {
              array: ["u8", 2],
            },
          },
          {
            name: "liquidationThresholdSeed",
            type: {
              array: ["u8", 2],
            },
          },
          {
            name: "minLeverageSeed",
            type: {
              array: ["u8", 1],
            },
          },
          {
            name: "maxLeverageSeed",
            type: {
              array: ["u8", 1],
            },
          },
          {
            name: "maxNegativeSkewImpactSeed",
            type: {
              array: ["u8", 8],
            },
          },
          {
            name: "oracleType",
            type: "u8",
          },
          {
            name: "minLeverage",
            type: "u8",
          },
          {
            name: "maxLeverage",
            type: "u8",
          },
          {
            name: "tradeFeeRate",
            type: "u16",
          },
          {
            name: "liquidationFeeRate",
            type: "u16",
          },
          {
            name: "liquidationThreshold",
            type: "u16",
          },
          {
            name: "state",
            type: "publicKey",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "priceFeed",
            type: "publicKey",
          },
          {
            name: "liquidityTokenMint",
            type: "publicKey",
          },
          {
            name: "liquidityTokenVault",
            type: "publicKey",
          },
          {
            name: "collateralMint",
            type: "publicKey",
          },
          {
            name: "collateralVault",
            type: "publicKey",
          },
          {
            name: "protocolFeeVault",
            type: "publicKey",
          },
          {
            name: "skewManager",
            type: {
              defined: "SkewManager",
            },
          },
          {
            name: "reserved0",
            type: "u128",
          },
          {
            name: "reserved1",
            type: "u128",
          },
          {
            name: "reserved2",
            type: "publicKey",
          },
          {
            name: "reserved3",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "position",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "leverage",
            type: "u8",
          },
          {
            name: "direction",
            type: "bool",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "id",
            type: "u64",
          },
          {
            name: "collateralAmount",
            type: "u64",
          },
          {
            name: "liquidityTokenAmount",
            type: "u64",
          },
          {
            name: "entryPrice",
            type: {
              defined: "Price",
            },
          },
          {
            name: "entryFundingRate",
            type: "i128",
          },
          {
            name: "pool",
            type: "publicKey",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "reserved0",
            type: "u64",
          },
          {
            name: "reserved1",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "settlementEvent",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "id",
            type: "u64",
          },
          {
            name: "timestamp",
            type: "i64",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "destination",
            type: "publicKey",
          },
          {
            name: "reserved0",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "unsettledCollateralAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "version",
            type: "u8",
          },
          {
            name: "pendingAmount",
            type: "u64",
          },
          {
            name: "usedAmount",
            type: "u64",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "reserved0",
            type: "u64",
          },
          {
            name: "reserved1",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "state",
      type: {
        kind: "struct",
        fields: [
          {
            name: "paused",
            type: "bool",
          },
          {
            name: "isPermissionless",
            type: "bool",
          },
          {
            name: "bumpSeed",
            type: {
              array: ["u8", 1],
            },
          },
          {
            name: "settlementDelay",
            type: "u32",
          },
          {
            name: "unsettledCollateralVault",
            type: "publicKey",
          },
          {
            name: "collateralMint",
            type: "publicKey",
          },
          {
            name: "admin",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "TokenMetadata",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isMutable",
            type: {
              option: "bool",
            },
          },
          {
            name: "name",
            type: {
              option: "string",
            },
          },
          {
            name: "symbol",
            type: {
              option: "string",
            },
          },
          {
            name: "uri",
            type: {
              option: "string",
            },
          },
        ],
      },
    },
    {
      name: "CreatePoolParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "oracleType",
            type: "u8",
          },
          {
            name: "minLeverage",
            type: {
              option: "u8",
            },
          },
          {
            name: "maxLeverage",
            type: {
              option: "u8",
            },
          },
          {
            name: "tradeFeeRate",
            type: "u16",
          },
          {
            name: "liquidationFeeRate",
            type: "u16",
          },
          {
            name: "liquidationThreshold",
            type: "u16",
          },
          {
            name: "maxNegativeSkewImpact",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "OpenPositionIxParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "direction",
            type: "bool",
          },
          {
            name: "leverage",
            type: "u8",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "unsettledAmount",
            type: "u64",
          },
          {
            name: "maxSkewImpactFee",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "SkewManager",
      type: {
        kind: "struct",
        fields: [
          {
            name: "maxNegativeSkewImpact",
            type: "u64",
          },
          {
            name: "lastTimestamp",
            type: "i64",
          },
          {
            name: "cumulativeFundingRate",
            type: "i128",
          },
          {
            name: "openInterestLong",
            type: "u128",
          },
          {
            name: "openInterestShort",
            type: "u128",
          },
        ],
      },
    },
    {
      name: "Price",
      type: {
        kind: "struct",
        fields: [
          {
            name: "expo",
            type: "i32",
          },
          {
            name: "price",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "OracleType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Pyth",
          },
        ],
      },
    },
    {
      name: "ModifyLiquidityDirection",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Add",
          },
          {
            name: "Remove",
          },
        ],
      },
    },
    {
      name: "PositionDirection",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Long",
          },
          {
            name: "Short",
          },
        ],
      },
    },
    {
      name: "PnL",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Positive",
            fields: [
              {
                defined: "T",
              },
            ],
          },
          {
            name: "Negative",
            fields: [
              {
                defined: "T",
              },
            ],
          },
          {
            name: "Neutral",
          },
        ],
      },
    },
    {
      name: "TokenInstruction",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Transfer",
          },
          {
            name: "Mint",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "IntegerOverflow",
      msg: "Integer overflow",
    },
    {
      code: 6001,
      name: "InvalidTypeConversion",
      msg: "Invalid type conversion",
    },
    {
      code: 6002,
      name: "Paused",
      msg: "Smart contract is paused. Only admin can unpause.",
    },
    {
      code: 6003,
      name: "DivideByZero",
      msg: "Divide by zero",
    },
    {
      code: 6004,
      name: "GetBumpFailed",
      msg: "Get bump failed",
    },
    {
      code: 6005,
      name: "AccountBorrowFailed",
      msg: "Failed to borrow a reference to account data, already borrowed",
    },
    {
      code: 6006,
      name: "InvalidInputAmount",
      msg: "Input amount must be greater than zero",
    },
    {
      code: 6007,
      name: "InvalidTimestamp",
      msg: "Invalid timestamp",
    },
    {
      code: 6008,
      name: "TokenAccountOwnerMismatch",
      msg: "Mismatch between token account's owner and signer",
    },
    {
      code: 6009,
      name: "TokenAccountMintMismatch",
      msg: "Mismatch between token account's mint and target mint",
    },
    {
      code: 6010,
      name: "MaxNegativeSkewImpactBelowMinimum",
      msg: "Max negative skew impact is below the minimum.",
    },
    {
      code: 6011,
      name: "CreatePoolIsNotPermissionless",
      msg: "Create pool is not permissionless",
    },
    {
      code: 6012,
      name: "InvalidCollateralMint",
      msg: "Invalid collateral mint",
    },
    {
      code: 6013,
      name: "InvalidTradeFeeRate",
      msg: "Invalid trade fee rate",
    },
    {
      code: 6014,
      name: "InvalidLiquidationFeeRate",
      msg: "Invalid liquidation fee rate",
    },
    {
      code: 6015,
      name: "InvalidLiquidationThreshold",
      msg: "Invalid liquidation threshold",
    },
    {
      code: 6016,
      name: "MinLeverageNotLessThanMax",
      msg: "Min leverage must be less than max leverage",
    },
    {
      code: 6017,
      name: "InvalidLeverage",
      msg: "Invalid leverage for pool creation",
    },
    {
      code: 6018,
      name: "InvalidTokenMetadata",
      msg: "Invalid token metadata",
    },
    {
      code: 6019,
      name: "PositionOwnerMismatch",
      msg: "Signer does not match position owner",
    },
    {
      code: 6020,
      name: "CannotDeallocatePosition",
      msg: "Cannot deallocate position",
    },
    {
      code: 6021,
      name: "PositionAlreadyOpen",
      msg: "Position is already open",
    },
    {
      code: 6022,
      name: "InvalidPositionLeverage",
      msg: "Invalid position leverage",
    },
    {
      code: 6023,
      name: "InvalidPartialClosePositionAmount",
      msg: "Partial close position amount must be less than or equal to position's collateral amount",
    },
    {
      code: 6024,
      name: "InvalidLiquidationFee",
      msg: "Liquidation fee cannot be a None variant",
    },
    {
      code: 6025,
      name: "CannotCloseUnhealthyPosition",
      msg: "Cannot close unhealthy position",
    },
    {
      code: 6026,
      name: "CannotLiquidateHealthyPosition",
      msg: "Cannot liquidate a healthy position",
    },
    {
      code: 6027,
      name: "InvalidTokenAccountingForLiquidation",
      msg: "Invalid liquidation token accounting",
    },
    {
      code: 6028,
      name: "ZeroCollateralAfterFees",
      msg: "Cannot open a position with zero collateral amount after fees",
    },
    {
      code: 6029,
      name: "SkewImpactFeeExceedsMaxAmount",
      msg: "Skew impact fee exceeds max amount set by client",
    },
    {
      code: 6030,
      name: "LiquidationOwnerTokenAccountMustBeAta",
      msg: "Liquidation owner token account must be an associated token account",
    },
    {
      code: 6031,
      name: "SettlementEventHasNotReachedMaturity",
      msg: "Settlement event has not reached maturity",
    },
    {
      code: 6032,
      name: "InvalidUnsettledAmount",
      msg: "Invalid unsettled amount. Unsettled amount is greater than available balance.",
    },
    {
      code: 6033,
      name: "FailedToFindAccountInRemainingAccounts",
      msg: "Failed to find account in remaining accounts",
    },
    {
      code: 6034,
      name: "FailedToDeserializeAccountFromRemainingAccounts",
      msg: "Failed to deserialize account from remaining accounts",
    },
    {
      code: 6035,
      name: "UnsupportedOracleType",
      msg: "Unsupported oracle type",
    },
    {
      code: 6036,
      name: "PythPriceFeedAggPriceCannotBeNegative",
      msg: "Pyth price feed aggregate price cannot be negative",
    },
    {
      code: 6037,
      name: "InvalidPythPriceFeedConfidence",
      msg: "Invalid Pyth price feed confidence",
    },
    {
      code: 6038,
      name: "InvalidPythPriceType",
      msg: "Invalid Pyth price type",
    },
    {
      code: 6039,
      name: "InvalidPythPriceAccountData",
      msg: "Failed to convert account into a Pyth Price account",
    },
    {
      code: 6040,
      name: "PythEmaPriceMustBeGreaterThanZero",
      msg: "Pyth Ema price must be greater than zero",
    },
    {
      code: 6041,
      name: "PythPriceMustBeGreaterThanZero",
      msg: "Pyth price must be greater than zero",
    },
    {
      code: 6042,
      name: "InvalidPythPriceStatus",
      msg: "Invalid Pyth price status",
    },
    {
      code: 6043,
      name: "PythPriceFeedIsStale",
      msg: "Price feed is stale",
    },
  ],
};