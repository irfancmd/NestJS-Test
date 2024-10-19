import { registerAs } from "@nestjs/config";

/*
 * This is an example of a Configuration Namespace. Namespaces allow us to have module specififc
 * configurations.
 */
export default registerAs('coffees', () => ({
    foo: 'bar'
}));