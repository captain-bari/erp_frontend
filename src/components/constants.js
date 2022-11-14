var url = "url";

const setUrl = (newState) => {
  commonState = newState;
};

var commonState = {
  name: "name",
  role: "role",
  tokken: "tokken",
};

const setCommonState = (newState) => {
  commonState = newState;
};

export { url, setUrl, commonState, setCommonState };
