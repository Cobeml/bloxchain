import { Token } from "./utils/crypto";


type TokenWidgetProps = {
    tokens: Token;
    real: boolean;
    showEditWindow: (name: string, value: number) => void;
};

export default function TokenWidget({ tokens, real, showEditWindow }: TokenWidgetProps) {
    return (
        <div className="flex flex-row justify-center items-center gap-2">
            {Array.from(tokens.tokens).map(([name, token], i) => {
                return (
                    <div
                        key={i}
                        className="relative w-24 flex flex-col justify-center items-center gap-2 aspect-square rounded-lg border border-gray-400 bg-gray-600 hover:brightness-90 active:brightness-75"
                        onClick={() => showEditWindow(name, tokens.tokens.get(name)?.amount || 0)}
                    >
                        <p>{name}</p>
                        <p>{token.amount}</p>
                    </div>
                );
            })}
        </div>
    );
}