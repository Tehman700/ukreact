import classnames from "classnames";

type OptionsObj = Record<string, any>;
type Options = string | OptionsObj;

export const getGlobalClassName = (rootClass: string, options: Options) => {
  if (typeof options === "string") {
    return `${rootClass}-${options}`;
  }

  const mappedOptions: OptionsObj = {};
  for (const option in options) {
    mappedOptions[`${rootClass}--${option}`] = options[option];
  }

  return classnames({
    [rootClass]: true,
    ...mappedOptions,
  });
};

export const getClassNameFactory =
  (
    rootClass: string,
    styles: Record<string, string>,
    config: { baseClass?: string } = { baseClass: "" }
  ) =>
  (options: Options = {}) => {
    if (typeof options === "string") {
      const descendant = options;
      const style = styles[`${rootClass}-${descendant}`];

      if (style) {
        return `${config.baseClass ?? ""}${style}`;
      }

      return "";
    }

    if (options && typeof options === "object") {
      const modifiers = options;
      const prefixedModifiers: OptionsObj = {};

      for (const modifier in modifiers) {
        const mappedModifier = styles[`${rootClass}--${modifier}`];
        if (mappedModifier) {
          prefixedModifiers[mappedModifier] = modifiers[modifier];
        }
      }

      const baseClass = styles[rootClass];

      return (
        (config.baseClass ?? "") +
        classnames({
          [baseClass]: !!baseClass,
          ...prefixedModifiers,
        })
      );
    }

    return (config.baseClass ?? "") + (styles[rootClass] || "");
  };

export default getClassNameFactory;

