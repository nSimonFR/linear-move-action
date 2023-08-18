/**
 * Serialize an object into an encoded user agent string
 *
 * @param seed user agent properties to serialize
 * @returns the serialized user agent string
 */
export declare function serializeUserAgent(seed: Record<string, string>): string;
/**
 * Capitalize the first character of a string
 *
 * @param str the string to capitalize
 */
export declare function capitalize(str?: string): string | undefined;
/**
 * Type safe check for non defined values
 */
export declare function nonNullable<Type>(value: Type): value is NonNullable<Type>;
/**
 * Return the key matching the value in an object
 */
export declare function getKeyByValue<Key extends string, Value>(obj: Record<Key, Value>, value: Value): Key | undefined;
//# sourceMappingURL=utils.d.ts.map