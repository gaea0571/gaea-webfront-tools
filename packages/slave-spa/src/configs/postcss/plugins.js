import prefix_selector from "postcss-prefix-selector";

export default ({ master_provider, namespace }) => [
  master_provider ? prefix_selector({
    prefix: `:global(#${namespace})`,
    // transform(prefix, selector, prefixedSelector, filePath, rule) {
    //   if (filePath.match(/node_modules/)) {
    //     return selector;
    //   };
    //   return prefixedSelector;
    // }
  }) : undefined
].filter(Boolean);