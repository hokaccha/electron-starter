import { Application } from "spectron";
import path from "path";
import assert from "assert";

let app;

describe("Launch application", function() {
  this.timeout(10000);

  before(() => {
    const rootDir = path.join(__dirname, "..", "..");
    let appPath = path.join(rootDir, "node_modules", ".bin", "electron");
    if (process.platform === "win32") {
      appPath += ".cmd";
    }
    app = new Application({
      path: appPath,
      args: [path.join(rootDir, "tmp", "app")],
      env: { APP_ENV: "test" }
    });
    return app.start();
  });

  after(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it("launch app", async () => {
    const appEnv = await app.client.getText("#AppEnv");
    assert.strictEqual(appEnv, "test");
  });
});
