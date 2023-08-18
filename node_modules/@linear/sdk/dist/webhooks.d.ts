/// <reference types="node" />
export declare const LINEAR_WEBHOOK_SIGNATURE_HEADER = "linear-signature";
export declare const LINEAR_WEBHOOK_TS_FIELD = "webhookTimestamp";
/**
 * Provides helper functions to work with Linear webhooks
 */
export declare class LinearWebhooks {
    private secret;
    constructor(secret: string);
    /**
     * Verify the webhook signature
     * @param rawBody The webhook request raw body.
     * @param signature The signature to verify.
     * @param timestamp The `webhookTimestamp` field from the request parsed body.
     */
    verify(rawBody: Buffer, signature: string, timestamp?: number): boolean;
}
//# sourceMappingURL=webhooks.d.ts.map