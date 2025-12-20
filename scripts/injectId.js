import fs from "fs";
import path from "path";
import vm from "vm";

const INPUT_FILE = path.resolve("/Users/yusefturin/ReactNative/thikir/src/db/GetDataEn.js");
const OUTPUT_FILE = path.resolve("/Users/yusefturin/ReactNative/thikir/src/db/GetDataEnNew.js");

let parentId = 1;

/**
 * Adds ids to top-level items and resets ids for subItems
 */
function addParentIds(items) {
    return items.map((item) => {
        const parent = {
            id: parentId++,
            ...item,
        };

        if (Array.isArray(parent.subItems)) {
            let childId = 1;

            parent.subItems = parent.subItems.map((sub) => ({
                id: childId++,
                ...sub,
            }));
        }

        return parent;
    });
}

/**
 * Safely load JS file
 */
function loadJsFile(filePath) {
    const code = fs.readFileSync(filePath, "utf8");

    const sandbox = {};
    vm.createContext(sandbox);

    vm.runInContext(
        code.replace(/export\s+/g, "") + "\nthis.__DATA__ = items;",
        sandbox
    );

    return sandbox.__DATA__;
}

// ---- RUN ----
const items = loadJsFile(INPUT_FILE);
const itemsWithIds = addParentIds(items);

const output = `export const items = ${JSON.stringify(itemsWithIds, null, 2)};\n`;

fs.writeFileSync(OUTPUT_FILE, output, "utf8");

console.log("✅ Parent IDs are global");
console.log("✅ subItems IDs reset per parent");
console.log(`📄 Output: ${OUTPUT_FILE}`);
