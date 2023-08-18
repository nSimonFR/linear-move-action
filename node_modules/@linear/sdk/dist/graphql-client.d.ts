import { DocumentNode } from "graphql/language/ast";
import { GraphQLRequestContext, LinearRawResponse } from "./types";
/**
 * Identical class to graphql-request ClientError
 * Ensures parseLinearError is compatible with custom graphql-request clients
 *
 * @param response the raw response from the Linear API
 * @param request information about the request resulting in the error
 */
export declare class GraphQLClientError<Data, Variables extends Record<string, unknown>> extends Error {
    response: LinearRawResponse<Data>;
    request: GraphQLRequestContext<Variables>;
    constructor(response: LinearRawResponse<Data>, request: GraphQLRequestContext<Variables>);
    private static extractMessage;
}
/**
 * Create an isomorphic GraphQL client
 * Originally forked from graphql-request to remove the external dependency
 *
 * @param url base url to send the request to
 * @param options the request options
 */
export declare class LinearGraphQLClient {
    private url;
    private options;
    constructor(url: string, options?: RequestInit);
    rawRequest<Data, Variables extends Record<string, unknown>>(query: string, variables?: Variables, requestHeaders?: RequestInit["headers"]): Promise<LinearRawResponse<Data>>;
    /**
     * Send a GraphQL document to the server.
     */
    request<Data, Variables extends Record<string, unknown>>(document: DocumentNode | string, variables?: Variables, requestHeaders?: RequestInit["headers"]): Promise<Data>;
    setHeaders(headers: RequestInit["headers"]): LinearGraphQLClient;
    /**
     * Attach a header to the client. All subsequent requests will have this header.
     */
    setHeader(key: string, value: string): LinearGraphQLClient;
}
//# sourceMappingURL=graphql-client.d.ts.map