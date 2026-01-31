import { Router } from "express";
import { runSmokeTest } from "../tests/runSmokeTest.js";

const router = Router();

router.get("/smoke", async (req, res) => {
  const result = await runSmokeTest();

  if (!result.ok) {
    return res.status(500).json({
      status: "FAIL",
      ...result
    });
  }

  res.status(200).json({
    status: "OK",
    ...result
  });
});

export default router;
