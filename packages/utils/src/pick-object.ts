const pickObject = (object: Record<string, any>, keys: string[]) => {
  const ret: Record<string, any> = {};
  keys.forEach((key) => {
    if (key in object) {
      ret[key] = object[key];
    }
  });
  return ret;
};

export default pickObject;
