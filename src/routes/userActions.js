import Router from "koa-router";
import { jwt } from "../middleware/jwt";

import {
  signup,
  authenticate,
  refreshAccessToken,
  invalidateAllRefreshTokens,
  invalidateRefreshToken,
  forgot,
  checkPasswordResetToken,
  reset,
  privateArea,
} from "../controllers/UserActionController";

export const router = new Router();
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET });

router.post("/api/v1/user/signup", signup);
router.post("/api/v1/user/authenticate", authenticate);
router.post("/api/v1/user/refreshAccessToken", refreshAccessToken);
router.post(
  "/api/v1/user/invalidateAllRefreshTokens",
  jwtMiddleware,
  invalidateAllRefreshTokens,
);
router.post(
  "/api/v1/user/invalidateRefreshToken",
  jwtMiddleware,
  invalidateRefreshToken,
);
router.post("/api/v1/user/forgot", forgot);
router.post("/api/v1/user/checkPasswordResetToken", checkPasswordResetToken);
router.post("/api/v1/user/reset", reset);
router.post("/api/v1/user/private", jwtMiddleware, privateArea);
