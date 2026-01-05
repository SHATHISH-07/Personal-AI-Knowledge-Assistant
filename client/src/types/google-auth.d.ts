export { };

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (config: {
                        client_id: string;
                        callback: (response: GoogleCredentialResponse) => void;
                    }) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

export interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
}
