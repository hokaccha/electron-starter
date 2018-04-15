import { Application } from "spectron";
import path from "path";
import assert from "assert";

let app;

describe("Launch application", function() {
  this.timeout(10000);

  function appPath() {
    const distDir = path.join(__dirname, "../../tmp/test/dist");
    switch (process.platform) {
      case "linux":
        return `${distDir}/linux-unpacked/my-electron-starter`;
      case "darwin":
        return `${distDir}/mac/MyElectronStarter.app/Contents/MacOS/MyElectronStarter`;
      case "win32":
        return `${distDir}/win-unpacked/MyElectronStarter.exe`;
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
