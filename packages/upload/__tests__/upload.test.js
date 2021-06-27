import { expect, jest } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { sleep, mockGetFile } from "@lin-view-ui/test-utils";
import { request, splitFileChunk, caculateFileHash } from "@lin-view-ui/utils";

import Upload from "../index.js";

const SUCCESSURL = "http://127.0.0.1/success";

const ERRORURL = "http://127.0.0.1/error";

jest.mock("@lin-view-ui/utils");

splitFileChunk.mockReturnValue(["test"]);

caculateFileHash.mockResolvedValue(Math.random().toString(16));

request.mockImplementation(({ url }) => {
  if (url === SUCCESSURL) {
    return Promise.resolve({ message: "success" });
  } else if (url === ERRORURL) {
    return Promise.reject(new Error("fail"));
  }
  return Promise.resolve();
});
// request.mockResolvedValue({ message: "success" });
// request.mockRejectedValue({ message: "fail" });

describe("Upload", () => {
  test("render", () => {
    const wrapper = mount(Upload, {
      propsData: {
        text: "上传",
        uploadUrl: SUCCESSURL
      }
    });

    expect(wrapper.find(".lin-upload").exists()).toBeTruthy();
    expect(wrapper.text()).toContain("上传");
    expect(wrapper.find(".lin-upload-input").exists()).toBeTruthy();
  });

  test("common upload success", async () => {
    const beforeUpload = jest.fn(() => Promise.resolve());
    const wrapper = mount(Upload, {
      propsData: {
        uploadUrl: SUCCESSURL,
        beforeUpload
      }
    });
    const fileList = [new File(["content"], "test-file.txt")];
    mockGetFile(wrapper.find(".lin-upload-input").element, fileList);
    await wrapper.find(".lin-upload-input").trigger("change");
    expect(beforeUpload).toHaveBeenCalled();
    expect(wrapper.vm.selectedFile).toBe(fileList[0]);
    await sleep(100);
    expect(wrapper.emitted().uploadSuccess).toBeTruthy();
  });

  test("common upload fail", async () => {
    const wrapper = mount(Upload, {
      propsData: {
        uploadUrl: ERRORURL
      }
    });
    mockGetFile(wrapper.find(".lin-upload-input").element);
    await wrapper.find(".lin-upload-input").trigger("change");
    await sleep(100);
    expect(wrapper.emitted().uploadFail).toBeTruthy();
  });

  // 切片上传
  test("isSlice upload success", async () => {
    const beforeUpload = jest.fn(() => false);
    const wrapper = mount(Upload, {
      propsData: {
        uploadUrl: SUCCESSURL,
        isSlice: true,
        beforeUpload,
        mergeUrl: SUCCESSURL
      }
    });
    mockGetFile(wrapper.find(".lin-upload-input").element);
    await wrapper.find(".lin-upload-input").trigger("change");
    await sleep(100);
    expect(wrapper.emitted().uploadChunkSuccess).toBeTruthy();
    expect(wrapper.emitted().mergeFileSuccess).toBeTruthy();
  });

  test("breakpoint upload success", async () => {
    const wrapper = mount(Upload, {
      propsData: {
        uploadUrl: SUCCESSURL,
        breakpoint: true,
        mergeUrl: SUCCESSURL
      }
    });
    mockGetFile(wrapper.find(".lin-upload-input").element);
    await wrapper.find(".lin-upload-input").trigger("change");
    await sleep(100);
    expect(wrapper.emitted().caculateFileHashSuccess).toBeTruthy();
    expect(wrapper.emitted().uploadChunkSuccess).toBeTruthy();
    expect(wrapper.emitted().mergeFileSuccess).toBeTruthy();
  });

  test("breakpoint upload custom", async () => {
    const getFileHash = jest.fn(() =>
      Promise.resolve(Math.random().toString(16))
    );
    const requestMergeFileFn = jest.fn(() =>
      Promise.resolve({ message: "success" })
    );
    const wrapper = mount(Upload, {
      propsData: {
        uploadUrl: SUCCESSURL,
        breakpoint: true,
        mergeUrl: SUCCESSURL,
        caculateFileHash: getFileHash,
        requestMergeFileFn
      }
    });
    mockGetFile(wrapper.find(".lin-upload-input").element);
    await wrapper.find(".lin-upload-input").trigger("change");
    await sleep(100);
    expect(getFileHash).toHaveBeenCalled();
    expect(requestMergeFileFn).toHaveBeenCalled();
  });
});
