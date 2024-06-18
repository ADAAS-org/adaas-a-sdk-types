type NestedObject = { [key: string]: any };

export class A_SDK_CommonHelper {


    static delay(ms = 1000) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    static resolve() {
        return new Promise<undefined>((resolve) => resolve(undefined));
    }

    static omitArrayProperties<T, S extends string>(array: Array<T>, fields: string[]): Omit<T, S>[] {

        return array;
    }

    static sanitizeHTML(html: string): string {
        // Define the regular expression pattern to match all tags except <span>
        const regex = /<(?!\/?span(?=>|\s.*>))\/?.*?>/g;

        // Replace all matched tags with an empty string
        return html.replace(regex, '');
    }



    static omitProperties<T, S extends string>(
        input: T,
        paths: string[]

    ): Omit<T, S> {

        // Deep clone the input object or array
        const result = JSON.parse(JSON.stringify(input));

        // Helper function to recursively remove properties
        function removeProperties(obj: NestedObject | any[], currPath: string[]) {
            const currKey = currPath[0];
            if (currPath.length === 1) {
                // If current path has only one key, delete the property
                delete obj[currKey];
            } else if (obj[currKey] !== undefined && typeof obj[currKey] === 'object') {
                // If current key exists and is an object, recursively call removeProperties
                removeProperties(obj[currKey], currPath.slice(1));
            }
        }

        // Iterate through each path and remove corresponding properties from the result
        paths.forEach(path => {
            const pathKeys = path.split('.');
            removeProperties(result, pathKeys);
        });

        return result as Omit<T, S>;
    }


    static formatWithLeadingZeros(number, maxZeros = 10) {
        const formattedNumber = String(number).padStart(maxZeros + 1, '0');
        return formattedNumber.slice(-maxZeros);
    }

    static removeLeadingZeros(formattedNumber) {
        return String(Number(formattedNumber)); // Convert to number and back to string to remove leading zeros
    }


    static generateASEID(props: {
        namespace?: string,
        entity: string
        id: number | string
    }): string {
        const namespace = props.namespace || process.env.ADAAS_NAMESPACE;

        return `${namespace}@${props.entity}:${typeof props.id === 'number'
            ? this.formatWithLeadingZeros(props.id)
            : props.id
            }`;
    }


    static extractASEID(identity: string): {
        namespace: string,
        entity: string
        id: number | string
    } {
        const [namespace, entity, id] = identity.split('@')[1].split(':');
        return {
            namespace,
            entity,
            id: isNaN(parseInt(id)) ? id : parseInt(id)
        }
    }
}