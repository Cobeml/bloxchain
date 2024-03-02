/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { GameToken, GameTokenInterface } from "../../contracts/GameToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_supply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "abbr",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000cf038038062000cf08339810160408190526200003491620002c5565b8383600362000044838262000416565b50600462000053828262000416565b5050506200006881866200008860201b60201c565b600562000076838262000416565b505050600692909255506200050a9050565b6001600160a01b038216620000b85760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b620000c660008383620000ca565b5050565b6001600160a01b038316620000f9578060026000828254620000ed9190620004e2565b909155506200016d9050565b6001600160a01b038316600090815260208190526040902054818110156200014e5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401620000af565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166200018b57600280548290039055620001aa565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001f091815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200022557600080fd5b81516001600160401b0380821115620002425762000242620001fd565b604051601f8301601f19908116603f011681019082821181831017156200026d576200026d620001fd565b81604052838152602092508660208588010111156200028b57600080fd5b600091505b83821015620002af578582018301518183018401529082019062000290565b6000602085830101528094505050505092915050565b600080600080600060a08688031215620002de57600080fd5b855160208701519095506001600160401b0380821115620002fe57600080fd5b6200030c89838a0162000213565b955060408801519150808211156200032357600080fd5b6200033189838a0162000213565b945060608801519150808211156200034857600080fd5b50620003578882890162000213565b608088015190935090506001600160a01b03811681146200037757600080fd5b809150509295509295909350565b600181811c908216806200039a57607f821691505b602082108103620003bb57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000411576000816000526020600020601f850160051c81016020861015620003ec5750805b601f850160051c820191505b818110156200040d57828155600101620003f8565b5050505b505050565b81516001600160401b03811115620004325762000432620001fd565b6200044a8162000443845462000385565b84620003c1565b602080601f831160018114620004825760008415620004695750858301515b600019600386901b1c1916600185901b1785556200040d565b600085815260208120601f198616915b82811015620004b35788860151825594840194600190910190840162000492565b5085821015620004d25787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156200050457634e487b7160e01b600052601160045260246000fd5b92915050565b6107d6806200051a6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063313ce56711610071578063313ce5671461011d57806370a082311461012c5780637284e4161461015557806395d89b411461015d578063a9059cbb14610165578063dd62ed3e1461017857600080fd5b8063047fc9aa146100ae57806306fdde03146100ca578063095ea7b3146100df57806318160ddd1461010257806323b872dd1461010a575b600080fd5b6100b760065481565b6040519081526020015b60405180910390f35b6100d261018b565b6040516100c191906105ea565b6100f26100ed366004610655565b61021d565b60405190151581526020016100c1565b6002546100b7565b6100f261011836600461067f565b610237565b604051601281526020016100c1565b6100b761013a3660046106bb565b6001600160a01b031660009081526020819052604090205490565b6100d261025b565b6100d26102e9565b6100f2610173366004610655565b6102f8565b6100b76101863660046106dd565b610306565b60606003805461019a90610710565b80601f01602080910402602001604051908101604052809291908181526020018280546101c690610710565b80156102135780601f106101e857610100808354040283529160200191610213565b820191906000526020600020905b8154815290600101906020018083116101f657829003601f168201915b5050505050905090565b60003361022b818585610331565b60019150505b92915050565b600033610245858285610343565b61025085858561039f565b506001949350505050565b6005805461026890610710565b80601f016020809104026020016040519081016040528092919081815260200182805461029490610710565b80156102e15780601f106102b6576101008083540402835291602001916102e1565b820191906000526020600020905b8154815290600101906020018083116102c457829003601f168201915b505050505081565b60606004805461019a90610710565b60003361022b81858561039f565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b61033e83838360016103fe565b505050565b600061034f8484610306565b90506000198114610399578181101561038a57828183604051637dc7a0d960e11b81526004016103819392919061074a565b60405180910390fd5b610399848484840360006103fe565b50505050565b6001600160a01b0383166103c9576000604051634b637e8f60e11b8152600401610381919061076b565b6001600160a01b0382166103f357600060405163ec442f0560e01b8152600401610381919061076b565b61033e8383836104d3565b6001600160a01b03841661042857600060405163e602df0560e01b8152600401610381919061076b565b6001600160a01b038316610452576000604051634a1406b160e11b8152600401610381919061076b565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561039957826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516104c591815260200190565b60405180910390a350505050565b6001600160a01b0383166104fe5780600260008282546104f3919061077f565b9091555061055d9050565b6001600160a01b0383166000908152602081905260409020548181101561053e5783818360405163391434e360e21b81526004016103819392919061074a565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661057957600280548290039055610598565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516105dd91815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b81811015610618578581018301518582016040015282016105fc565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461065057600080fd5b919050565b6000806040838503121561066857600080fd5b61067183610639565b946020939093013593505050565b60008060006060848603121561069457600080fd5b61069d84610639565b92506106ab60208501610639565b9150604084013590509250925092565b6000602082840312156106cd57600080fd5b6106d682610639565b9392505050565b600080604083850312156106f057600080fd5b6106f983610639565b915061070760208401610639565b90509250929050565b600181811c9082168061072457607f821691505b60208210810361074457634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b039390931683526020830191909152604082015260600190565b6001600160a01b0391909116815260200190565b8082018082111561023157634e487b7160e01b600052601160045260246000fdfea2646970667358221220ddeb7f505ce4b519256f0557a242fb988e6de850f07ae6a63f6bae5a7ffac19e64736f6c63430008180033";

type GameTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GameTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GameToken__factory extends ContractFactory {
  constructor(...args: GameTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _supply: BigNumberish,
    name: string,
    abbr: string,
    _description: string,
    to: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _supply,
      name,
      abbr,
      _description,
      to,
      overrides || {}
    );
  }
  override deploy(
    _supply: BigNumberish,
    name: string,
    abbr: string,
    _description: string,
    to: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _supply,
      name,
      abbr,
      _description,
      to,
      overrides || {}
    ) as Promise<
      GameToken & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): GameToken__factory {
    return super.connect(runner) as GameToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GameTokenInterface {
    return new Interface(_abi) as GameTokenInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): GameToken {
    return new Contract(address, _abi, runner) as unknown as GameToken;
  }
}