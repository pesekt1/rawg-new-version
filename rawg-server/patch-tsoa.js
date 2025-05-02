const fs = require("fs");
const path = require("path");
const ROUTES = path.join(__dirname, "./routes/routes.ts");

let content = fs.readFileSync(ROUTES, "utf8");
const patch = `import { expressAuthentication } from '../middleware/expressAuthentication';
const expressAuthenticationRecasted = expressAuthentication;
// --- PATCH END ---
`;

// Remove any previous patch to avoid duplicates
content = content.replace(
  /import { expressAuthentication } from '..\/middleware\/expressAuthentication';\s*const expressAuthenticationRecasted = expressAuthentication;\s*\/\/ --- PATCH END ---\s*/g,
  ""
);

// Remove the 4th argument (response) from expressAuthenticationRecasted calls
content = content.replace(
  /expressAuthenticationRecasted\(([^,]+),([^,]+),([^,\)]+),\s*response\s*\)/g,
  "expressAuthenticationRecasted($1,$2,$3)"
);

content = patch + content;
fs.writeFileSync(ROUTES, content, "utf8");
console.log(
  "Patched routes.ts for expressAuthenticationRecasted and removed extra response argument"
);
