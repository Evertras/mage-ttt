declare module 'mage-sdk-js' {
    function setEndpoint(endpoint: string): void;
    function configure(cb: (err: Error) => Promise<void>): void;
    function setupModule(name: string, module: any): void;

    module players {
        function register(username: string, password: string): Promise<any>;
    }

    module session {
        function getActorId(): string;
    }
}