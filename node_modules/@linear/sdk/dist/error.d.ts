import { LinearErrorRaw, LinearErrorType, LinearGraphQLErrorRaw } from "./types";
/**
 * One of potentially many graphql errors returned by the Linear API
 *
 * @error the raw graphql error returned on the error response
 */
export declare class LinearGraphQLError {
    /** The type of this graphql error */
    type: LinearErrorType;
    /** A friendly error message */
    message: string;
    /** If this error is caused by the user input */
    userError?: boolean;
    /** The path to the graphql node at which the error occured */
    path?: string[];
    constructor(error?: LinearGraphQLErrorRaw);
}
/**
 * An error from the Linear API
 *
 * @param error a raw error returned from the LinearGraphQLClient
 */
export declare class LinearError extends Error {
    /** The type of the first error returned by the Linear API */
    type?: LinearErrorType;
    /** A list of graphql errors returned by the Linear API */
    errors?: LinearGraphQLError[];
    /** The graphql query that caused this error */
    query?: string;
    /** The graphql variables that caused this error */
    variables?: Record<string, unknown>;
    /** Any data returned by this request */
    data?: unknown;
    /** The http status of this request */
    status?: number;
    /** The raw LinearGraphQLClient error */
    raw?: LinearErrorRaw;
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[], type?: LinearErrorType);
}
export declare class FeatureNotAccessibleLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class InvalidInputLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class RatelimitedLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class NetworkLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class AuthenticationLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class ForbiddenLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class BootstrapLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class UnknownLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class InternalLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class OtherLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class UserLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class GraphqlLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare class LockTimeoutLinearError extends LinearError {
    constructor(error?: LinearErrorRaw, errors?: LinearGraphQLError[]);
}
export declare function parseLinearError(error?: LinearErrorRaw | LinearError): LinearError;
//# sourceMappingURL=error.d.ts.map