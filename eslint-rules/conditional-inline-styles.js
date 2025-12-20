export const rules = {
    "conditional-inline-styles": {
        meta: {
            type: "suggestion",
            docs: {
                description: "Allow conditional inline styles but discourage static inline styles",
            },
            messages: {
                staticInlineStyle: "Avoid static inline styles. Use StyleSheet.create() instead. Dynamic/conditional styles are allowed.",
            },
            schema: [],
        },
        create(context) {
            function hasTrulyDynamicValue(node) {
                if (!node) return false;

                // Check for conditional expressions (ternary)
                if (node.type === "ConditionalExpression") {
                    return true;
                }

                // Check for logical expressions (&&, ||)
                if (node.type === "LogicalExpression") {
                    return true;
                }

                // Check for binary expressions (+, -, *, /, %, etc.)
                if (node.type === "BinaryExpression") {
                    return true;
                }

                // Check for unary expressions (!, -, +, etc.)
                if (node.type === "UnaryExpression") {
                    return true;
                }

                // Check for update expressions (++, --)
                if (node.type === "UpdateExpression") {
                    return true;
                }

                // Check for function calls
                if (node.type === "CallExpression") {
                    return true;
                }

                // Check for template literals with expressions
                if (node.type === "TemplateLiteral" && node.expressions.length > 0) {
                    return true;
                }

                // Recursively check array elements
                if (node.type === "ArrayExpression") {
                    return node.elements.some(element => hasTrulyDynamicValue(element));
                }

                // Recursively check object properties
                if (node.type === "ObjectExpression") {
                    return node.properties.some(prop => {
                        if (prop.type === "Property") {
                            return hasTrulyDynamicValue(prop.value);
                        }
                        return false;
                    });
                }

                // For member expressions, only allow if they're clearly dynamic
                // (accessing props, state, variables that might change)
                if (node.type === "MemberExpression") {
                    // Allow common dynamic patterns like props.x, state.x, this.x
                    if (node.object.type === "Identifier") {
                        const objName = node.object.name;
                        // Allow common dynamic variable names
                        if (['props', 'state', 'this', 'touched', 'errors', 'values', 'theme', 'colors'].includes(objName)) {
                            return true;
                        }
                    }
                    return false;
                }

                // For identifiers, only allow if they're clearly variables (not constants)
                if (node.type === "Identifier") {
                    const name = node.name;
                    // Allow common variable patterns that are likely dynamic
                    if (['touched', 'errors', 'values', 'props', 'state', 'theme', 'colors'].includes(name)) {
                        return true;
                    }
                    // Allow variables that look like they might be dynamic (camelCase, not CONSTANTS)
                    if (name !== name.toUpperCase() && name.includes('Color') || name.includes('Size') || name.includes('Value')) {
                        return true;
                    }
                    return false;
                }

                return false;
            }

            function hasAnyDynamicProperty(node) {
                if (node.type !== "ObjectExpression") return false;

                return node.properties.some(prop => {
                    if (prop.type === "Property" && !prop.computed) {
                        return hasTrulyDynamicValue(prop.value);
                    }
                    return false;
                });
            }

            return {
                JSXAttribute(node) {
                    // Only check 'style' attributes
                    if (node.name && node.name.name !== "style") {
                        return;
                    }

                    if (node.value && node.value.type === "JSXExpressionContainer") {
                        const expression = node.value.expression;

                        // Allow array expressions (multiple styles)
                        if (expression.type === "ArrayExpression") {
                            return;
                        }

                        // Allow if it's a simple identifier (likely referencing a stylesheet)
                        if (expression.type === "Identifier") {
                            return;
                        }

                        // Check if it's an object with truly dynamic values
                        if (expression.type === "ObjectExpression") {
                            // Allow single property objects (whether static or dynamic)
                            if (expression.properties.length === 1) {
                                return;
                            }

                            // For multiple properties, require at least one to be dynamic
                            if (!hasAnyDynamicProperty(expression)) {
                                context.report({
                                    node: expression,
                                    messageId: "staticInlineStyle",
                                });
                            }
                        }
                    }
                },
            };
        },
    },
};