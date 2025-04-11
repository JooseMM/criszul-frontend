/* import enviroment variables  */
const enviroment = import.meta.env;

fetch(enviroment.VITE_API!, {
  headers: {
    [enviroment.VITE_KEY_NAME!]: enviroment.VITE_SECRET!,
  },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(
        "Http error, please contact your provider if this error persists ",
      );
    }
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((err) =>
    console.error(
      "Http error, please contact your provider if this error persists ",
    ),
  );
