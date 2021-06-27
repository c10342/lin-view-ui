export default function mockGetFile(element, files) {
  if (!files) {
    files = [new File(["content"], "test-file.txt")];
  }
  Object.defineProperty(element, "files", {
    get() {
      return files;
    }
  });
}
