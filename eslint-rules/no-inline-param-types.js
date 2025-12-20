export const rules = {
    "no-inline-param-types": {
        meta: {
            type: "problem",
            docs: {
                description:
                    "Require named types/interfaces for function parameters and disallow inline object types",
            },
            messages: {
                noInline:
                    "Do not define inline object types in function parameters. Declare a separate 'type' or 'interface' instead.",
                requireType:
                    "Arrow function parameters must have a type annotation using a named type or interface.",
            },
            schema: [],
        },
        create(context) {

            function isReactForwardRefWithTypes(node) {
                // Check if this is React.forwardRef call
                if (node.type === "CallExpression" && node.callee) {
                    const isForwardRefCall = (
                        (node.callee.type === "MemberExpression" &&
                            node.callee.object && node.callee.object.name === "React" &&
                            node.callee.property && node.callee.property.name === "forwardRef") ||
                        (node.callee.type === "Identifier" && node.callee.name === "forwardRef")
                    );

                    if (isForwardRefCall) {
                        // Debug: Log the node structure

                        // Check if the CallExpression has type arguments (generics)
                        if (node.typeParameters && node.typeParameters.params && node.typeParameters.params.length > 0) {
                            return true;
                        }

                        // Check for typeArguments (different parsers might use different names)
                        if (node.typeArguments && node.typeArguments.params && node.typeArguments.params.length > 0) {
                            return true;
                        }

                        // Also check if the parent of CallExpression is a VariableDeclarator with type annotation
                        if (node.parent && node.parent.type === "VariableDeclarator" &&
                            node.parent.id && node.parent.id.typeAnnotation) {
                            return true;
                        }
                    }
                }
                return false;
            }

            function checkParamType(param, isArrowFunction = false, arrowFunctionNode = null) {
                // For arrow functions, check if the variable declaration has a type annotation
                if (isArrowFunction && param.type === "ObjectPattern" && !param.typeAnnotation) {
                    // Check if this arrow function is part of a variable declaration with type annotation
                    if (arrowFunctionNode && arrowFunctionNode.parent) {
                        const parent = arrowFunctionNode.parent;

                        // Check if the arrow function is inside JSX (render prop pattern)
                        function isInsideJSX(node) {
                            let current = node;
                            while (current) {
                                if (current.type === "JSXExpressionContainer" ||
                                    current.type === "JSXElement" ||
                                    current.type === "JSXFragment") {
                                    return true;
                                }
                                current = current.parent;
                            }
                            return false;
                        }

                        if (isInsideJSX(arrowFunctionNode)) {
                            return; // Skip error - arrow function is inside JSX (render prop pattern)
                        }

                        // Check if parent is VariableDeclarator with type annotation
                        if (parent.type === "VariableDeclarator" && parent.id && parent.id.typeAnnotation) {
                            return; // Skip error - variable has type annotation
                        }

                        // Check if parent is AssignmentExpression with typed left side
                        if (parent.type === "AssignmentExpression" && parent.left && parent.left.typeAnnotation) {
                            return; // Skip error - assignment target has type annotation
                        }

                        // Check for React.forwardRef pattern - the arrow function is directly inside forwardRef
                        if (parent.type === "CallExpression" && isReactForwardRefWithTypes(parent)) {
                            return; // Skip error - forwardRef has type information
                        }

                        // Check if the arrow function is nested inside a forwardRef call (first argument)
                        if (parent.type === "CallExpression" && parent.arguments && parent.arguments[0] === arrowFunctionNode) {
                            if (isReactForwardRefWithTypes(parent)) {
                                return; // Skip error - forwardRef has type information
                            }
                        }
                    }
                    context.report({ node: param, messageId: "requireType" });
                    return;
                }

                // Check existing type annotations
                if (param.typeAnnotation && param.typeAnnotation.typeAnnotation) {
                    const typeAnn = param.typeAnnotation.typeAnnotation;
                    // Inline object type
                    if (typeAnn.type === "TSTypeLiteral") {
                        context.report({ node: param, messageId: "noInline" });
                    }
                    // Inline union type
                    if (typeAnn.type === "TSUnionType") {
                        context.report({ node: param, messageId: "noInline" });
                    }
                    // Inline intersection type
                    if (typeAnn.type === "TSIntersectionType") {
                        context.report({ node: param, messageId: "noInline" });
                    }
                    // For object patterns, only allow TSTypeReference (named type/interface)
                    if (param.type === "ObjectPattern" && typeAnn.type !== "TSTypeReference") {
                        context.report({ node: param, messageId: "noInline" });
                    }
                }
            }

            return {
                TSParameterProperty(node) {
                    const typeAnnotation = node.parameter.typeAnnotation;
                    if (
                        typeAnnotation &&
                        typeAnnotation.typeAnnotation &&
                        typeAnnotation.typeAnnotation.type === "TSTypeLiteral"
                    ) {
                        context.report({ node, messageId: "noInline" });
                    }
                },
                FunctionDeclaration(node) {
                    node.params.forEach((param) => checkParamType(param, false, null));
                },
                ArrowFunctionExpression(node) {
                    node.params.forEach((param) => checkParamType(param, true, node));
                },
            };
        },
    },
};
