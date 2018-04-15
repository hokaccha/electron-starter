import { Application } from "spectron";
import path from "path";
import assert from "assert";

let app;

describe("Launch application", function() {
  this.timeout(10000);

  function appPath() {
    switch (process.platform) {
      case "linux":
        return path.join(__dirname, "../../tmp/test/dist/linux-unpacked/MyElectronStarter");
      case "darwin":
        return path.join(__dirname, "../../tmp/test/dist/mac/MyElectronStarter.app/Contents/MacOS/MyElectronStarter");
      case "win32":
        return path.join(__dirname, "../../tmp/test/dist/win-unpacked/MyElectronStarter.exe");
      default:
        throw new Error("Path to the built binary needs to be defined for this platform in test/index.js");
    }
  }

  before(() => {
    app = new Application({ path: appPath() });
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
