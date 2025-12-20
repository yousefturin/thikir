import { rules as conditionalInlineStylesRules } from "./conditional-inline-styles.js";
import { rules as noInlineParamTypesRules } from "./no-inline-param-types.js";

export const rules = {
    ...conditionalInlineStylesRules,
    ...noInlineParamTypesRules,
};