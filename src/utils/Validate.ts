class Validate {

    static Input(dataParam: unknown): boolean {
        if (!dataParam
            || dataParam === undefined
            || dataParam === null
            || dataParam === ''
            || Number.isNaN(dataParam)
            || typeof dataParam === 'undefined'
            || typeof dataParam === "function"
            || (typeof dataParam === 'number' && !isFinite(dataParam))
            || (Array.isArray(dataParam) && dataParam.length === 0)
            || (typeof dataParam === 'object' && Object.keys(dataParam).length === 0)
            || (typeof dataParam === 'boolean' && dataParam === false)
        ) { return false; }
        return true;
    }
}
export default Validate