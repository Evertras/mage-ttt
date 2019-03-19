// I REALLY don't like putting this here as a duplicate definition, but do it until we figure out TS adventures
declare interface IPlayerData {
    Wins: number;
    Losses: number;
}

declare interface IGameMeta {
    gameId: string;
    playerX: string;
    playerO: string;
}

declare module 'mage-sdk-js' {
    function setEndpoint(endpoint: string): void;
    function configure(cb: (err: Error) => Promise<void>): void;
    function setupModule(name: string, module: any): void;

    module players {
        function register(username: string, password: string): Promise<any>;
        function login(username: string, password: string): Promise<any>;
        function getData(): Promise<IPlayerData>;
    }

    module game {
        function create(name?: string): Promise<any>;
        function getOpen(): Promise<IGameMeta[]>;
    }

    module session {
        function getActorId(): string;
    }
}