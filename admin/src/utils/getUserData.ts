export default () => {
  const json = window.localStorage.getItem("user");
  if (json) {
    return JSON.parse(json);
  } else return null;
};
