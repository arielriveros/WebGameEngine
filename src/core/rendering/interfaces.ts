/**
 * (location, size, offset)
 */
export interface AttributeInformation {
    /**
     * Location of the attribute.
     */
    location: number;
    /**
     * Number of elements in this attribute. If Vector2 then = 2, Vector3 = 3 and so on.
     */
    size: number;
    /**
     * Number of elements starting from the beggining of the buffer.
     */
    offset: number;
}
