"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const PostRouter_1 = __importDefault(require("./router/PostRouter"));
const CommentRouter_1 = __importDefault(require("./router/CommentRouter"));
const CategoryRouter_1 = __importDefault(require("./router/CategoryRouter"));
const PollRouter_1 = __importDefault(require("./router/PollRouter"));
const NewsletterRouter_1 = __importDefault(require("./router/NewsletterRouter"));
require("reflect-metadata");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const port = String(process.env.PORT) || 3030;
// Set up your routes and middleware here
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb' }));
// Run MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/backend-bettisport`);
const connection = mongoose_1.default.connection;
connection.once('open', () => { console.log('Database running Successfully'); });
app.use("/auth", UserRouter_1.default);
app.use("/posts", PostRouter_1.default);
app.use("/comment", CommentRouter_1.default);
app.use("/category", CategoryRouter_1.default);
app.use("/polls", PollRouter_1.default);
app.use("/news-letter", NewsletterRouter_1.default);
//render the html fil
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Bettisports API",
            version: "0.1.0",
            description: "This is the docs for all APIs for Bettisports",
        },
        servers: [
            {
                url: "https://bettisports-backend.onrender.com",
            },
        ],
    },
    apis: ["./src/docs/*.ts"],
};
const specs = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, { explorer: true,
    customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
}));
// Run Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
