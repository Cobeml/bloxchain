/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { User, UserInterface } from "../../contracts/User";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserData",
    outputs: [
      {
        internalType: "string[]",
        name: "userKeys",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "userKeys",
        type: "string[]",
      },
    ],
    name: "initializeUserData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "string[]",
        name: "userKeys",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "updateUserData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506109ca806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806316480f6714610046578063327342571461005b57806386a2138014610085575b600080fd5b6100596100543660046104f5565b610098565b005b61006e61006936600461057e565b610132565b60405161007c92919061060a565b60405180910390f35b610059610093366004610698565b6102e4565b60005b83811015610129578282828181106100b5576100b56106e3565b60008a8152602081815260408083206001600160a01b038d1684528252909120910292909201359190508686848181106100f1576100f16106e3565b905060200281019061010391906106f9565b60405161011192919061073f565b9081526040519081900360200190205560010161009b565b50505050505050565b60008281526001602090815260408083208054825181850281018501909352808352606094859484015b8282101561020857838290600052602060002001805461017b9061074f565b80601f01602080910402602001604051908101604052809291908181526020018280546101a79061074f565b80156101f45780601f106101c9576101008083540402835291602001916101f4565b820191906000526020600020905b8154815290600101906020018083116101d757829003601f168201915b50505050508152602001906001019061015c565b50505050915081516001600160401b0381111561022757610227610789565b604051908082528060200260200182016040528015610250578160200160208202803683370190505b50905060005b82518110156102dc576000858152602081815260408083206001600160a01b038816845290915290208351849083908110610293576102936106e3565b60200260200101516040516102a8919061079f565b9081526020016040518091039020548282815181106102c9576102c96106e3565b6020908102919091010152600101610256565b509250929050565b806001600160401b038111156102fc576102fc610789565b60405190808252806020026020018201604052801561032f57816020015b606081526020019060019003908161031a5790505b506000848152600160209081526040909120825161035393919291909101906103c9565b5060005b818110156103c357828282818110610371576103716106e3565b905060200281019061038391906106f9565b60008681526001602052604090208054849081106103a3576103a36106e3565b9060005260206000200191826103ba929190610821565b50600101610357565b50505050565b82805482825590600052602060002090810192821561040f579160200282015b8281111561040f57825182906103ff90826108db565b50916020019190600101906103e9565b5061041b92915061041f565b5090565b8082111561041b576000610433828261043c565b5060010161041f565b5080546104489061074f565b6000825580601f10610458575050565b601f0160209004906000526020600020908101906104769190610479565b50565b5b8082111561041b576000815560010161047a565b80356001600160a01b03811681146104a557600080fd5b919050565b60008083601f8401126104bc57600080fd5b5081356001600160401b038111156104d357600080fd5b6020830191508360208260051b85010111156104ee57600080fd5b9250929050565b6000806000806000806080878903121561050e57600080fd5b8635955061051e6020880161048e565b945060408701356001600160401b038082111561053a57600080fd5b6105468a838b016104aa565b9096509450606089013591508082111561055f57600080fd5b5061056c89828a016104aa565b979a9699509497509295939492505050565b6000806040838503121561059157600080fd5b823591506105a16020840161048e565b90509250929050565b60005b838110156105c55781810151838201526020016105ad565b50506000910152565b60008151808452602080850194506020840160005b838110156105ff578151875295820195908201906001016105e3565b509495945050505050565b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561067957878603605f190185528151805180885261065a81868a018785016105aa565b601f01601f191696909601830195509382019390820190600101610633565b50508584038187015250505061068f81856105ce565b95945050505050565b6000806000604084860312156106ad57600080fd5b8335925060208401356001600160401b038111156106ca57600080fd5b6106d6868287016104aa565b9497909650939450505050565b634e487b7160e01b600052603260045260246000fd5b6000808335601e1984360301811261071057600080fd5b8301803591506001600160401b0382111561072a57600080fd5b6020019150368190038213156104ee57600080fd5b8183823760009101908152919050565b600181811c9082168061076357607f821691505b60208210810361078357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b600082516107b18184602087016105aa565b9190910192915050565b601f821115610807576000816000526020600020601f850160051c810160208610156107e45750805b601f850160051c820191505b81811015610803578281556001016107f0565b5050505b505050565b600019600383901b1c191660019190911b1790565b6001600160401b0383111561083857610838610789565b61084c83610846835461074f565b836107bb565b6000601f84116001811461087a57600085156108685750838201355b610872868261080c565b8455506108d4565b600083815260209020601f19861690835b828110156108ab578685013582556020948501946001909201910161088b565b50868210156108c85760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b81516001600160401b038111156108f4576108f4610789565b61090881610902845461074f565b846107bb565b602080601f83116001811461093757600084156109255750858301515b61092f858261080c565b865550610803565b600085815260208120601f198616915b8281101561096657888601518255948401946001909101908401610947565b50858210156109845787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220610ee64bff148948f845c10de3a1281b3ca1335c4d0fdde1b1c7d2d5b1cf5e4c64736f6c63430008180033";

type UserConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UserConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class User__factory extends ContractFactory {
  constructor(...args: UserConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      User & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): User__factory {
    return super.connect(runner) as User__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UserInterface {
    return new Interface(_abi) as UserInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): User {
    return new Contract(address, _abi, runner) as unknown as User;
  }
}
