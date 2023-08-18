import { LinearGraphQLClient } from "./graphql-client";
import { LinearClientOptions, LinearClientParsedOptions } from "./types";
import { LinearSdk } from "./_generated_sdk";
/**
 * Create a Linear API client
 *
 * @param options request options to pass to the LinearGraphQLClient
 */
export declare class LinearClient extends LinearSdk {
    options: LinearClientParsedOptions;
    client: LinearGraphQLClient;
    constructor(options: LinearClientOptions);
}
//# sourceMappingURL=client.d.ts.map